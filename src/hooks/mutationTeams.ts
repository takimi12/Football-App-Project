import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Team } from '../types/teams'

// Define the type for new team input
type NewTeam = Omit<Team, 'id'>

export const useAddTeam = () => {
	const queryClient = useQueryClient()

	// Mutation for adding a new team
	const mutation = useMutation({
		mutationFn: async (team: NewTeam) => {
			const response = await fetch('http://localhost:3000/teams', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(team),
			})
			if (!response.ok) throw new Error('Failed to add team')
			return response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] }) // Invalidate teams query to refetch
		},
	})

	return mutation
}
