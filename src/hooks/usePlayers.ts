import { useQuery } from '@tanstack/react-query'
import { Player } from '../types/players'

export const usePlayers = () => {
	const { data, refetch } = useQuery<Player[]>({
		queryKey: ['players'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3000/players')
			return response.json()
		},
	})

	return { data, refetch }
}
