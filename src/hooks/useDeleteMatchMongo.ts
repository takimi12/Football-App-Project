import { useMutation } from '@tanstack/react-query'

const deleteMatchMongo = async (matchId: string) => {
	const response = await fetch(
		`https://football-app-project-fhr7.vercel.app/api/matches/${matchId}`,
		{
			method: 'DELETE',
		},
	)

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
