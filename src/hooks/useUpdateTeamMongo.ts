import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TeamMongo } from '../types/teams'

type UpdatedTeam = Partial<Omit<TeamMongo, 'id'>> & { _id: string }

export const useUpdateTeamMongo = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async (team: UpdatedTeam) => {
			const { _id, ...dataToUpdate } = team
			const response = await fetch(
				`https://football-app-project-fhr7.vercel.app/api/teams/${_id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataToUpdate),
				},
			)
			if (!response.ok) {
				const errData = await response.json()
				throw new Error(errData?.error || 'Failed to update team')
			}
			return response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] })
		},
		onError: (error: unknown) => {
			console.error('❌ Update failed:', error)
		},
	})

	return mutation
}
