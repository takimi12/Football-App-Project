import { Team } from '../types/teams'
import { Player } from '../types/players'

export const useDeletePlayer = (
	teams: Team[] | undefined,
	refetch: () => void,
) => {
	const handleDelete = async (player: Player) => {
		const isInTeam = teams?.some((team) => team.players.includes(player.id))
		if (isInTeam) {
			alert(
				'Nie można usunąć zawodnika, który jest przypisany do drużyny.',
			)
			return
		}

		const confirmDeleteAction = window.confirm(
			`Czy na pewno chcesz usunąć gracza ${player.firstName} ${player.lastName}?`,
		)
		if (confirmDeleteAction) {
			try {
				await fetch(`http://localhost:3001/player/${player.id}`, {
					method: 'DELETE',
				})
				refetch()
			} catch (error) {
				console.error('Failed to delete player:', error)
			}
		}
	}

	return { handleDelete }
}
