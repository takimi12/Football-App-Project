import { useQuery } from '@tanstack/react-query'
import { PlayerLocal } from '../types/players'

export const usePlayers = () => {
	const { data, refetch } = useQuery<PlayerLocal[]>({
		queryKey: ['players'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3001/players')
			return response.json()
		},
	})

	return { data, refetch }
}
