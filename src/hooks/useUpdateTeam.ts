import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Team } from '../types/teams'

// Define the type for updating a team
type UpdatedTeam = Partial<Omit<Team, 'id'>> & { id: string }

export const useUpdateTeam = () => {
	const queryClient = useQueryClient()

	// Mutation for updating a team
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
			queryClient.invalidateQueries({ queryKey: ['teams'] }) // Invalidate teams query to refetch
		},
	})

	return mutation
}
