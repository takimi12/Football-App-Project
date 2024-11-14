import { useQuery } from '@tanstack/react-query'
import { Team } from '../types/teams'

export const useTeams = () => {
	const { data, refetch } = useQuery<Team[]>({
		queryKey: ['teams'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3000/teams')
			return response.json()
		},
	})

	const teams = data

	return { teams, refetch }
}
