import { useQuery } from '@tanstack/react-query'
import { Player } from '../types/players'

export const useMongoPlayers = () => {
	const { data, refetch } = useQuery<Player[]>({
		queryKey: ['players'],
		queryFn: async () => {
			const response = await fetch(
				'https://football-app-project-fhr7.vercel.app/api/players',
			)
			return response.json()
		},
	})

	return { data, refetch }
}
