import { useMutation, useQueryClient } from '@tanstack/react-query'

const updateMatchMongo = async (matchData: {
	matchId: string
	team1Id: string
	team2Id: string
	team1Score: number
	team2Score: number
	date: string
	duration: string
	location: string
}) => {
	const { matchId, ...updatedData } = matchData

	const response = await fetch(`https://football-app-project-fhr7.vercel.app//api/matches/${matchId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedData),
	})

	if (!response.ok) {
		throw new Error('Failed to update match')
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
