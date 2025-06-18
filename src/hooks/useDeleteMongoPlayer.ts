import { Team } from '../types/teams'
import { Player } from '../types/players'

export const useDeleteMongoPlayer = (
	teams: Team[] | undefined,
	refetch: () => void,
) => {
	const handleDelete = async (player: Player) => {
		const isInTeam = teams?.some((team) => team.players.includes(player._id))
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
				await fetch(
					`https://football-app-project-fhr7.vercel.app/api/players/${player._id}`,
					{
						method: 'DELETE',
					},
				)
				refetch()
			} catch (error) {
				console.error('Failed to delete player:', error)
			}
		}
	}

	return { handleDelete }
}
