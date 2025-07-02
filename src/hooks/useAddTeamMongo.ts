import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Team } from '../types/teams'

type NewTeam = Omit<Team, 'id'>

export const useAddTeamMongo = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async (team: NewTeam) => {
			const response = await fetch(
				'https://football-app-project-fhr7.vercel.app/api/teams',

				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(team),
				},
			)
			if (!response.ok) throw new Error('Failed to add team')
			return response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['teams'] })
		},
	})

	return mutation
}
