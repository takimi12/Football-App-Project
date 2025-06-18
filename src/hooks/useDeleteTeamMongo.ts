import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTeamMongo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (teamId: string) => {
			const response = await fetch(
				`https://football-app-project-fhr7.vercel.app/api/teams/${teamId}`,
				{
					method: 'DELETE',
				},
			)

			if (!response.ok) {
				throw new Error('Failed to delete team')
			}

			return response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] })
		},
	})
}
