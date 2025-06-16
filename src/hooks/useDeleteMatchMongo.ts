import { useMutation } from '@tanstack/react-query'

const deleteMatchMongo = async (matchId: string) => {
	const response = await fetch(`http://localhost:3002/matches/${matchId}`, {
		method: 'DELETE',
	})

	if (!response.ok) {
		throw new Error('Failed to delete match')
	}

	return response.json()
}

export const useDeleteMatchMongo = () => {
	return useMutation({
		mutationFn: deleteMatchMongo,
		onError: (error) => {
			console.error('Error deleting match:', error)
		},
	})
}
