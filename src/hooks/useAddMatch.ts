// hooks/useAddMatch.ts
import { useMutation } from '@tanstack/react-query'
import { Match } from '../types/match'

export const useAddMatch = () => {
	const addMatch = useMutation({
		mutationFn: async (newMatch: Omit<Match, 'id'>) => {
			const response = await fetch('http://localhost:3000/matches', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newMatch),
			})

			if (!response.ok) {
				throw new Error('Failed to add match')
			}
			return response.json()
		},
	})

	return { addMatch }
}
