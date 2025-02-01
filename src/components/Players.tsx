import React, { useState } from 'react'
import { usePlayers } from '../hooks/usePlayers'
import { useTeams } from '../hooks/useTeams'
import { Player } from '../types/players'
import styled from 'styled-components'

const PlayersContainer = styled.div`
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
`

const Title = styled.h1`
	text-align: center;
	font-size: 2.5rem;
	color: ${({ theme }) => theme.text};
	margin-bottom: 20px;
`

const Form = styled.form`
	background-color: ${({ theme }) => theme.formBackground};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
`

const FormField = styled.div`
	margin-bottom: 15px;
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

const PlayersList = styled.ul`
	list-style-type: none;
	padding: 0;
`

const PlayerItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	background-color: ${({ theme }) => theme.listItemBackground};
	margin-bottom: 10px;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const PlayerInfo = styled.div`
	display: flex;
	gap: 15px;
`

const PlayerLabel = styled.label`
	font-weight: bold;
	color: ${({ theme }) => theme.text};
`

const PlayerText = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.text};
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

const PlayerCannotDeleteMessage = styled.p`
	color: ${({ theme }) => theme.warningText};
	font-size: 0.875rem;
	margin-top: 10px;
	font-style: italic;
	text-align: center;
`

export const Players = () => {
	const { data, refetch } = usePlayers()
	const { teams } = useTeams()
	const [newPlayer, setNewPlayer] = useState({
		firstName: '',
		lastName: '',
	})
	const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
	})

	if (!data) return <p>No data available</p>

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		setNewPlayer((prev) => ({
			...prev,
			[name]: value,
		}))
		setErrors((prev) => ({
			...prev,
			[name]: '',
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const newErrors = {
			firstName: '',
			lastName: '',
		}

		if (newPlayer.firstName.length < 3 || newPlayer.firstName.length > 10) {
			newErrors.firstName = 'Imię musi mieć od 3 do 10 liter.'
		}

		if (newPlayer.lastName.length < 3 || newPlayer.lastName.length > 10) {
			newErrors.lastName = 'Nazwisko musi mieć od 3 do 10 liter.'
		}

		if (newErrors.firstName || newErrors.lastName) {
			setErrors(newErrors)
			return
		}

		try {
			const method = editingPlayer ? 'PUT' : 'POST'
			const url = editingPlayer
				? `http://localhost:3000/players/${editingPlayer.id}`
				: 'http://localhost:3000/players'

			await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPlayer),
			})

			refetch()
			setNewPlayer({ firstName: '', lastName: '' })
		} catch (error) {
			console.error('Failed to add/edit player:', error)
		}
	}

	const handleEdit = (player: Player) => {
		setEditingPlayer(player)
		setNewPlayer({
			firstName: player.firstName,
			lastName: player.lastName,
		})
	}

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
				await fetch(`http://localhost:3000/players/${player.id}`, {
					method: 'DELETE',
				})
				refetch()
			} catch (error) {
				console.error('Failed to delete player:', error)
			}
		}
	}

	const renderAddPlayerForm = () => (
		<Form onSubmit={handleSubmit}>
			<FormField>
				<Input
					type="text"
					name="firstName"
					value={newPlayer.firstName}
					onChange={handleInputChange}
					placeholder="First Name"
				/>
				{errors.firstName && (
					<ErrorMessage>{errors.firstName}</ErrorMessage>
				)}
			</FormField>
			<FormField>
				<Input
					type="text"
					name="lastName"
					value={newPlayer.lastName}
					onChange={handleInputChange}
					placeholder="Last Name"
				/>
				{errors.lastName && (
					<ErrorMessage>{errors.lastName}</ErrorMessage>
				)}
			</FormField>
			<Button type="submit">Add Player</Button>
		</Form>
	)

	const renderEditPlayerForm = () => (
		<Form onSubmit={handleSubmit}>
			<FormField>
				<Input
					type="text"
					name="firstName"
					value={newPlayer.firstName}
					onChange={handleInputChange}
					placeholder="First Name"
					required
				/>
				{errors.firstName && (
					<ErrorMessage>{errors.firstName}</ErrorMessage>
				)}
			</FormField>
			<FormField>
				<Input
					type="text"
					name="lastName"
					value={newPlayer.lastName}
					onChange={handleInputChange}
					placeholder="Last Name"
					required
				/>
				{errors.lastName && (
					<ErrorMessage>{errors.lastName}</ErrorMessage>
				)}
			</FormField>
			<Button type="submit">Update Player</Button>
		</Form>
	)

	return (
		<PlayersContainer>
			<Title>Players</Title>

			{editingPlayer ? renderEditPlayerForm() : renderAddPlayerForm()}

			<PlayersList>
				{data.map((el) => {
					const playerInTeam = teams?.some((team) =>
						team.players.includes(el.id),
					)

					return (
						<PlayerItem key={el.id}>
							<PlayerInfo>
								<div>
									<PlayerLabel>First Name</PlayerLabel>
									<PlayerText>{el.firstName}</PlayerText>
								</div>
								<div>
									<PlayerLabel>Last Name</PlayerLabel>
									<PlayerText>{el.lastName}</PlayerText>
								</div>
								<div>
									<PlayerLabel>Team</PlayerLabel>
									<PlayerText>
										{playerInTeam
											? teams?.find((team) =>
													team.players.includes(
														el.id,
													),
												)?.name
											: 'No team'}
									</PlayerText>
								</div>
							</PlayerInfo>
							<div>
								<EditButton onClick={() => handleEdit(el)}>
									Edit
								</EditButton>
								{playerInTeam ? (
									<PlayerCannotDeleteMessage>
										Nie mozna usunąć zawodnika nalezacego do
										druzyny
									</PlayerCannotDeleteMessage>
								) : (
									<DeleteButton
										onClick={() => handleDelete(el)}
										disabled={playerInTeam}
									>
										{playerInTeam
											? 'Nie mona usunąć zawodnika nalezacego do druzyny'
											: 'Delete'}
									</DeleteButton>
								)}
							</div>
						</PlayerItem>
					)
				})}
			</PlayersList>
		</PlayersContainer>
	)
}
