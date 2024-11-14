import React from 'react'
import { usePlayers } from '../hooks/usePlayers'
import { useTeams } from '../hooks/useTeams'
import { useAddTeam } from '../hooks/mutationTeams'
import { useState } from 'react'
import { Player } from '../types/players'
import { Team } from '../types/teams'
import { useUpdateTeam } from '../hooks/useUpdateTeam'
import { useGetMatches } from '../hooks/useGetMatch'
import styled from 'styled-components'

// Styled Components

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`

const Title = styled.h3`
	text-align: center;
	font-size: 2rem;
	color: ${({ theme }) => theme.text};
`

const FormContainer = styled.form`
	background-color: ${({ theme }) => theme.formBackground};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 600px;
	margin-bottom: 30px;
`

const FormField = styled.div`
	margin-bottom: 20px;
`

const Label = styled.label`
	font-size: 1rem;
	color: ${({ theme }) => theme.text};
	font-weight: bold;
`

const Input = styled.input`
	width: 100%;
	padding: 10px;
	font-size: 1rem;
	border: 2px solid ${({ theme }) => theme.inputBorder};
	border-radius: 5px;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: ${({ theme }) => theme.inputFocusBorder};
		outline: none;
	}
`

const Select = styled.select`
	width: 100%;
	padding: 10px;
	font-size: 1rem;
	border: 2px solid ${({ theme }) => theme.inputBorder};
	border-radius: 5px;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: ${({ theme }) => theme.inputFocusBorder};
		outline: none;
	}
`

const ErrorMessage = styled.p`
	color: red;
	font-size: 0.875rem;
	margin-top: 5px;
`

const Button = styled.button`
	background-color: ${({ theme }) => theme.buttonBackground};
	color: ${({ theme }) => theme.buttonText};
	padding: 10px 20px;
	font-size: 1rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		transform 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.buttonHoverBackground};
		transform: scale(1.05);
	}

	&:disabled {
		background-color: ${({ theme }) => theme.buttonDisabledBackground};
		cursor: not-allowed;
	}
`

const EditButton = styled.button`
	background-color: ${({ theme }) => theme.editButtonBackground};
	color: ${({ theme }) => theme.editButtonText};
	padding: 8px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.editButtonHoverBackground};
	}
`

const DeleteButton = styled.button`
	background-color: ${({ theme }) => theme.deleteButtonBackground};
	color: ${({ theme }) => theme.deleteButtonText};
	padding: 8px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.deleteButtonHoverBackground};
	}

	&:disabled {
		background-color: ${({ theme }) =>
			theme.deleteButtonDisabledBackground};
		cursor: not-allowed;
	}
`

const TeamContainer = styled.div`
	display: flex;
	gap: 30px;
	padding: 20px;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.listItemBackground};
	margin-bottom: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const TeamInfo = styled.div`
	flex: 1;
`

export const Teams = () => {
	const { teams } = useTeams()
	const { data: availablePlayers = [] } = usePlayers()
	const addTeamMutation = useAddTeam()
	const updateTeamMutation = useUpdateTeam()
	const { matches } = useGetMatches()

	const [newTeam, setNewTeam] = useState({
		name: '',
		yearFounded: '',
		location: '',
		players: [] as Player[],
	})
	const [errors, setErrors] = useState({
		name: '',
		yearFounded: '',
		location: '',
		players: '',
	})
	const [editingTeam, setEditingTeam] = useState<Team | null>(null)

	const handleEditTeam = (team: Team) => {
		const players = team.players
			.map((playerId) =>
				availablePlayers.find((player) => player.id === playerId),
			)
			.filter(Boolean) as Player[]

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
	}

	const handleSaveTeam = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			const teamToSave = {
				...newTeam,
				yearFounded: parseInt(newTeam.yearFounded, 10),
				players: newTeam.players.map((player) => player.id),
			}

			if (editingTeam) {
				updateTeamMutation.mutate({ id: editingTeam.id, ...teamToSave })
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
						id: 'none',
						firstName: 'brak',
						lastName: 'zawodnika',
						teamId: null,
					},
				],
			}))
			return
		}

		const selectedPlayer = availablePlayers.find(
			(player) => player.id === selectedPlayerId,
		)

		if (selectedPlayer) {
			setNewTeam((prev) => ({
				...prev,
				players: [...prev.players, selectedPlayer],
			}))
		}
	}

	const handleRemovePlayer = (playerId: string) => {
		setNewTeam((prev) => ({
			...prev,
			players: prev.players.filter((player) => player.id !== playerId),
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
		const currentYear = new Date().getFullYear() // Bieżący rok

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
				(selectedPlayer) => selectedPlayer.id === player.id,
			),
	)

	const isBrakDisabled = newTeam.players.length > 0

	const handleDeleteTeam = () => {
		const confirmDelete = window.confirm(
			'Czy na pewno chcesz usunąć tę drużynę?',
		)
		if (confirmDelete) {
			alert('Drużyna została usunięta.')
		}
	}

	return (
		<Container>
			<FormContainer onSubmit={handleSaveTeam}>
				<Title>
					{editingTeam ? 'Edytuj Drużynę' : 'Dodaj Nową Drużynę'}
				</Title>

				<FormField>
					<Label htmlFor="name">Nazwa:</Label>
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
					<Label htmlFor="yearFounded">Rok Założenia:</Label>
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
					<Label htmlFor="location">Lokalizacja:</Label>
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
					<Label htmlFor="players">Zawodnicy:</Label>
					<Select
						id="players"
						onChange={handleSelectChange}
						name="players"
					>
						<option value="" disabled={newTeam.players.length > 0}>
							Wybierz zawodnika
						</option>
						{unselectedPlayers.map((player) => (
							<option key={player.id} value={player.id}>
								{player.firstName} {player.lastName}
							</option>
						))}
						<option value="none" disabled={isBrakDisabled}>
							Brak zawodnika
						</option>
					</Select>
					{errors.players && (
						<ErrorMessage>{errors.players}</ErrorMessage>
					)}
				</FormField>

				<FormField>
					<h4>Wybrani Zawodnicy:</h4>
					<ul>
						{newTeam.players.map((player) => (
							<li key={player.id}>
								{player.firstName} {player.lastName}
								<button
									type="button"
									onClick={() =>
										handleRemovePlayer(player.id)
									}
								>
									Usuń
								</button>
							</li>
						))}
					</ul>
				</FormField>

				<div>
					<Button type="submit">
						{editingTeam ? 'Zapisz Zmiany' : 'Dodaj Drużynę'}
					</Button>
					{editingTeam && (
						<Button type="button" onClick={cancelEdit}>
							Anuluj
						</Button>
					)}
				</div>
			</FormContainer>

			{teams?.map((team) => (
				<TeamContainer key={team.id}>
					<TeamInfo>
						<p>
							<strong>Nazwa:</strong> {team.name}
						</p>
						<p>
							<strong>Lokalizacja:</strong> {team.location}
						</p>
						<p>
							<strong>Rok Założenia:</strong> {team.yearFounded}
						</p>
						<p>
							<strong>Liczba Zawodników:</strong>{' '}
							{team.players.length}
						</p>
					</TeamInfo>
					<div>
						<EditButton onClick={() => handleEditTeam(team)}>
							Edytuj
						</EditButton>
						<DeleteButton
							onClick={() => handleDeleteTeam()}
							disabled={matches?.some(
								(match) =>
									match.team1Id === team.id ||
									match.team2Id === team.id,
							)}
						>
							{matches?.some(
								(match) =>
									match.team1Id === team.id ||
									match.team2Id === team.id,
							)
								? 'Nie można usunąć drużyny biorącej udział w rozgrywkach'
								: 'Usuń'}
						</DeleteButton>
					</div>
				</TeamContainer>
			))}
		</Container>
	)
}
