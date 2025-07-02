import React from 'react'
import { useMongoPlayers } from '../hooks/useGetMongoPlayers'
import { useState } from 'react'
import { PlayerMongo } from '../types/players'
import { TeamMongo } from '../types/teams'
import { useGetMatchMongo } from '../hooks/useGetMatchMongo'
import { useGetTeamsMongo } from '../hooks/useGetTeamsMongo'
import { useAddTeamMongo } from '../hooks/useAddTeamMongo'
import { useUpdateTeamMongo } from '../hooks/useUpdateTeamMongo'
import { useDeleteTeamMongo } from '../hooks/useDeleteTeamMongo'
import {
	Container,
	Title,
	FormContainer,
	FormField,
	Label,
	Input,
	Select,
	ErrorMessage,
	Button,
	EditButton,
	DeleteButton,
	TeamContainer,
	TeamInfo,
} from './styled/Teams.styles'

export const Teams = () => {
	const { teams } = useGetTeamsMongo()
	const { data: availablePlayers = [] } = useMongoPlayers()
	const addTeamMutation = useAddTeamMongo()
	const updateTeamMutation = useUpdateTeamMongo()
	const deleteTeamMutation = useDeleteTeamMongo()
	const { matches } = useGetMatchMongo()

	const [newTeam, setNewTeam] = useState({
		name: '',
		yearFounded: '',
		location: '',
		players: [] as PlayerMongo[],
	})
	const [errors, setErrors] = useState({
		name: '',
		yearFounded: '',
		location: '',
		players: '',
	})
	const [editingTeam, setEditingTeam] = useState<TeamMongo | null>(null)
	const [selectValue, setSelectValue] = useState('')

	const handleEditTeam = (team: TeamMongo) => {
		const players = team.players
			.map((playerId) =>
				availablePlayers.find((player) => player._id === playerId),
			)
			.filter(Boolean) as PlayerMongo[]

		setEditingTeam(team)
		setNewTeam({
			name: team.name,
			yearFounded: team.yearFounded.toString(),
			location: team.location,
			players: players,
		})
	}

	const cancelEdit = () => {
		setEditingTeam(null)
		setNewTeam({ name: '', yearFounded: '', location: '', players: [] })
		setErrors({ name: '', yearFounded: '', location: '', players: '' })
		setSelectValue('') 
	}

	const handleSaveTeam = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			const teamToSave = {
				...newTeam,
				yearFounded: parseInt(newTeam.yearFounded, 10),
				players: newTeam.players.map((player) => player._id),
			}

			if (editingTeam) {
				updateTeamMutation.mutate({
					_id: editingTeam._id,
					...teamToSave,
				})
			} else {
				addTeamMutation.mutate(teamToSave)
			}
			cancelEdit()
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewTeam((prev) => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedPlayerId = e.target.value

		if (selectedPlayerId === 'none') {
			setNewTeam((prev) => ({
				...prev,
				players: [
					...prev.players,
					{
						_id: 'none',
						firstName: 'brak',
						lastName: 'zawodnika',
						teamId: null,
					},
				],
			}))
			setSelectValue('')
			return
		}

		const selectedPlayer = availablePlayers.find(
			(player) => player._id === selectedPlayerId,
		)

		if (selectedPlayer) {
			setNewTeam((prev) => ({
				...prev,
				players: [...prev.players, selectedPlayer],
			}))
			setSelectValue('')
		}
	}

	const handleRemovePlayer = (playerId: string) => {
		setNewTeam((prev) => ({
			...prev,
			players: prev.players.filter((player) => player._id !== playerId),
		}))
	}

	const validateForm = () => {
		const errors = { name: '', yearFounded: '', location: '', players: '' }
		let isValid = true

		if (newTeam.name.trim().length < 3) {
			errors.name = 'Nazwa drużyny musi mieć co najmniej 3 znaki.'
			isValid = false
		}

		const yearFounded = parseInt(newTeam.yearFounded, 10)
		const currentYear = new Date().getFullYear()

		if (isNaN(yearFounded) || yearFounded < 2000) {
			errors.yearFounded = 'Rok założenia musi być 2000 lub późniejszy.'
			isValid = false
		}

		if (yearFounded > currentYear) {
			errors.yearFounded = 'Rok założenia nie może być w przyszłości.'
			isValid = false
		}

		if (newTeam.location.trim().length < 3) {
			errors.location = 'Lokalizacja musi mieć co najmniej 3 znaki.'
			isValid = false
		}

		if (newTeam.players.length === 0) {
			errors.players =
				"Musisz wybrać co najmniej jednego zawodnika lub opcję 'Brak zawodnika'."
			isValid = false
		}

		setErrors(errors)
		return isValid
	}

	const unselectedPlayers = availablePlayers.filter(
		(player) =>
			!newTeam.players.some(
				(selectedPlayer) => selectedPlayer._id === player._id,
			),
	)

	const isBrakDisabled = newTeam.players.some((p) => p._id === 'none')

	const handleDeleteTeam = (teamId: string) => {
		const confirmDelete = window.confirm(
			'Czy na pewno chcesz usunąć tę drużynę?',
		)
		if (confirmDelete) {
			deleteTeamMutation.mutate(teamId, {
				onSuccess: () => {
					alert('Drużyna została usunięta.')
				},
				onError: (error) => {
					alert(
						'Wystąpił błąd podczas usuwania drużyny: ' +
							error.message,
					)
				},
			})
		}
	}

	return (
		<Container>
			<FormContainer onSubmit={handleSaveTeam}>
				<Title>
					{editingTeam ? 'Edit Teams' : 'Add new teams'}
				</Title>

				<FormField>
					<Label htmlFor="name">Name:</Label>
					<Input
						type="text"
						id="name"
						name="name"
						value={newTeam.name}
						onChange={handleInputChange}
					/>
					{errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
				</FormField>

				<FormField>
					<Label htmlFor="yearFounded">Year Founded:</Label>
					<Input
						type="number"
						id="yearFounded"
						name="yearFounded"
						value={newTeam.yearFounded}
						onChange={handleInputChange}
					/>
					{errors.yearFounded && (
						<ErrorMessage>{errors.yearFounded}</ErrorMessage>
					)}
				</FormField>

				<FormField>
					<Label htmlFor="location">Location:</Label>
					<Input
						type="text"
						id="location"
						name="location"
						value={newTeam.location}
						onChange={handleInputChange}
					/>
					{errors.location && (
						<ErrorMessage>{errors.location}</ErrorMessage>
					)}
				</FormField>

				<FormField>
					<Label htmlFor="players">Players:</Label>
					<Select
						id="players"
						onChange={handleSelectChange}
						name="players"
						value={selectValue} 
						disabled={
							unselectedPlayers.length === 0 && isBrakDisabled
						}
					>
						<option value="">
							choose players
						</option>
						{unselectedPlayers.length > 0 &&
							unselectedPlayers.map((player) => (
								<option key={player._id} value={player._id}>
									{player.firstName} {player.lastName}
								</option>
							))}
					
						{unselectedPlayers.length === 0 && isBrakDisabled && (
							<option disabled>no available players</option>
						)}
					</Select>
					{errors.players && (
						<ErrorMessage>{errors.players}</ErrorMessage>
					)}
				</FormField>

				<FormField>
					<h4>Choose Players:</h4>
					<ul>
						{newTeam.players.map((player) => (
							<li key={player._id}>
								{player.firstName} {player.lastName}{' '}
								<button
									type="button"
									onClick={() =>
										handleRemovePlayer(player._id)
									}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</FormField>

				<div>
					<Button type="submit">
						{editingTeam ? 'Save changes' : 'Add teams'}
					</Button>
					{editingTeam && (
						<Button type="button" onClick={cancelEdit}>
							Cancel
						</Button>
					)}
				</div>
			</FormContainer>

			{teams?.map((team) => (
				<TeamContainer key={team._id}>
					<TeamInfo>
						<p>
							<strong>Name:</strong> {team.name}
						</p>
						<p>
							<strong>Location:</strong> {team.location}
						</p>
						<p>
							<strong>Year founded:</strong> {team.yearFounded}
						</p>
						<p>
							<strong>Number of players:</strong>{' '}
							{
								team.players.filter(
									(playerId) => playerId !== 'none',
								).length
							}
						</p>
					</TeamInfo>
					<div>
						<EditButton onClick={() => handleEditTeam(team)}>
							Edit
						</EditButton>
						<DeleteButton
							onClick={() => handleDeleteTeam(team._id)}
							disabled={matches?.some(
								(match) =>
									match.team1Id === team._id ||
									match.team2Id === team._id,
							)}
						>
							{matches?.some(
								(match) =>
									match.team1Id === team._id ||
									match.team2Id === team._id,
							)
								? 'You can`t delete the player who take part in matches'
								: 'Delete'}
						</DeleteButton>
					</div>
				</TeamContainer>
			))}
		</Container>
	)
}