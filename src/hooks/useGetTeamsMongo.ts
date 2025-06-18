import { useQuery } from '@tanstack/react-query'
import { TeamMongo } from '../types/teams'

export const useGetTeamsMongo = () => {
	const { data, refetch } = useQuery<TeamMongo[]>({
		queryKey: ['teams'],
		queryFn: async () => {
			const response = await fetch(
				'https://football-app-project-fhr7.vercel.app/api/teams',
			)
			return response.json()
		},
	})

	const teams = data

	return { teams, refetch }
}
