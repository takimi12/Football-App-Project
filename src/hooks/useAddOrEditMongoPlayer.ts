import { useState } from 'react'
import { Player } from '../types/players'

export const useAddOrEditMongoPlayer = (refetch: () => void) => {
	const [newPlayer, setNewPlayer] = useState({ firstName: '', lastName: '' })
	const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
	const [errors, setErrors] = useState({ firstName: '', lastName: '' })

	const validate = () => {
		const newErrors = { firstName: '', lastName: '' }

		if (newPlayer.firstName.length < 3 || newPlayer.firstName.length > 10) {
			newErrors.firstName = 'Imię musi mieć od 3 do 10 liter.'
		}

		if (newPlayer.lastName.length < 3 || newPlayer.lastName.length > 10) {
			newErrors.lastName = 'Nazwisko musi mieć od 3 do 10 liter.'
		}

		setErrors(newErrors)
		return !newErrors.firstName && !newErrors.lastName
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewPlayer((prev) => ({ ...prev, [name]: value }))
		setErrors((prev) => ({ ...prev, [name]: '' }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		try {
			const method = editingPlayer ? 'PUT' : 'POST'
			const url = editingPlayer
				? `https://football-app-project-fhr7.vercel.app/api/players/${editingPlayer.id}`
				: 'https://football-app-project-fhr7.vercel.app/api/players'

			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newPlayer),
			})

			refetch()
			setNewPlayer({ firstName: '', lastName: '' })
			setEditingPlayer(null)
		} catch (error) {
			console.error('Failed to add/edit player:', error)
		}
	}

	const handleEdit = (player: Player) => {
		setEditingPlayer(player)
		setNewPlayer({ firstName: player.firstName, lastName: player.lastName })
	}

	return {
		newPlayer,
		editingPlayer,
		errors,
		handleInputChange,
		handleSubmit,
		handleEdit,
	}
}
