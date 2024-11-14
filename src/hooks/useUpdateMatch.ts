import { useMutation } from '@tanstack/react-query'

const updateMatch = async (matchData: {
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

	const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
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

export const useUpdateMatch = () => {
	return useMutation({
		mutationFn: updateMatch,
		onError: (error) => {
			console.error('Error updating match:', error)
		},
	})
}
