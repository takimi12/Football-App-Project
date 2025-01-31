import { useQuery } from '@tanstack/react-query'
import { Match } from '../types/match'

export const useGetMatches = () => {
	const { data, refetch, isLoading, error } = useQuery<Match[]>({
		queryKey: ['matches'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3000/matches')
			if (!response.ok) {
				throw new Error('Failed to fetch matches')
			}
			return response.json()
		},
	})

	return { matches: data, refetch, isLoading, error }
}
