import { useMutation } from '@tanstack/react-query'

const deleteMatch = async (matchId: string) => {
	const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
		method: 'DELETE',
	})

	if (!response.ok) {
		throw new Error('Failed to delete match')
	}

	return response.json()
}

export const useDeleteMatch = () => {
	return useMutation({
		mutationFn: deleteMatch,
		onError: (error) => {
			console.error('Error deleting match:', error)
		},
	})
}
