import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Team } from '../types/teams'

type NewTeam = Omit<Team, 'id'>

export const useAddTeam = () => {
	const queryClient = useQueryClient()

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
			queryClient.invalidateQueries({ queryKey: ['teams'] })
		},
	})

	return mutation
}
