import { useMutation } from '@tanstack/react-query'
import { Match } from '../types/match'

export const useAddMatchMongo = () => {
	const mutation = useMutation({
		mutationFn: async (newMatch: Omit<Match, 'id'>) => {
			const response = await fetch('http://localhost:3002/matches', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newMatch),
			})

			if (!response.ok) {
				const message = await response.text()
				throw new Error(`Błąd dodawania meczu: ${message}`)
			}

			return response.json()
		},
	})

	return { addMatch: mutation }
}
