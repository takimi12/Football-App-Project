import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TeamMongo } from '../types/teams'

type UpdatedTeam = Partial<Omit<TeamMongo, 'id'>> & { _id: string }

export const useUpdateTeamMongo = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async (team: UpdatedTeam) => {
			const response = await fetch(
				`https://football-app-project-fhr7.vercel.app/api/teams/${team._id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(team),
				},
			)
			if (!response.ok) throw new Error('Failed to update team')
			return response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] })
		},
	})

	return mutation
}
