import { useQuery } from '@tanstack/react-query'
import { Game } from '../types/game'

const fetchMongoGames = async (): Promise<Game[]> => {
	const response = await fetch(
		'https://football-app-project-fhr7.vercel.app/api/matches',
	)
	if (!response.ok) {
		throw new Error('Error fetching data')
	}
	return response.json()
}

export const useMongoGames = () => {
	return useQuery<Game[], Error>({
		queryKey: ['games'],
		queryFn: fetchMongoGames,
	})
}
