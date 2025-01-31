import { useQuery } from '@tanstack/react-query'
import { Game } from '../types/game'

const fetchGames = async (): Promise<Game[]> => {
	const response = await fetch('http://localhost:3000/matches')
	if (!response.ok) {
		throw new Error('Error fetching data')
	}
	return response.json()
}

export const useGames = () => {
	return useQuery<Game[], Error>({
		queryKey: ['games'],
		queryFn: fetchGames,
	})
}
