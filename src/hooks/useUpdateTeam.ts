import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Team } from '../types/teams'

type UpdatedTeam = Partial<Omit<Team, 'id'>> & { id: string }

export const useUpdateTeam = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async (team: UpdatedTeam) => {
			const response = await fetch(
				`http://localhost:3000/teams/${team.id}`,
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
