import { useMutation, useQueryClient } from '@tanstack/react-query'

const updateMatchMongo = async (matchData: {
	matchId: string
	team1Id: string
	team1Name: string
	team2Id: string
	team2Name: string
	team1Score: number
	team2Score: number
	date: string
	duration: string
	location: string
}) => {
	const { matchId, ...updatedData } = matchData

	if (!/^[0-9a-fA-F]{24}$/.test(matchId)) {
		throw new Error('Invalid matchId format. Expected Mongo ObjectId.')
	}

	const response = await fetch(
		`https://football-app-project-fhr7.vercel.app/api/matches/${matchId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		},
	)

	if (!response.ok) {
		const errorText = await response.text()
		console.error('Server error response:', errorText)
		throw new Error(
			`Failed to update match: ${response.status} ${errorText}`,
		)
	}

	return response.json()
}

export const useUpdateMatchMongo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateMatchMongo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['matches'] })
		},
		onError: (error) => {
			console.error('Error updating match:', error)
		},
	})
}
