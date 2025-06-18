import React from 'react'
import { useMongoPlayers } from '../hooks/useGetMongoPlayers'
import { useTeams } from '../hooks/useTeams'
import { useAddOrEditMongoPlayer } from '../hooks/useAddOrEditMongoPlayer'
import { useDeleteMongoPlayer } from '../hooks/useDeleteMongoPlayer'
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
	const { data, refetch } = useMongoPlayers()
	const { teams } = useTeams()


	const {
		newPlayer,
		editingPlayer,
		errors,
		handleInputChange,
		handleSubmit,
		handleEdit,
	} = useAddOrEditMongoPlayer(refetch)

	const { handleDelete } = useDeleteMongoPlayer(teams, refetch)

	const isDataEmpty = !data || data.length === 0

	const renderForm = () => (
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
			<Button type="submit">
				{editingPlayer ? 'Update Player' : 'Add Player'}
			</Button>
		</Form>
	)

	return (
		<PlayersContainer>
			<Title>Players</Title>
			{renderForm()}

			{isDataEmpty ? (
				<p>Brak zawodników w bazie. Dodaj pierwszego zawodnika.</p>
			) : (
				<PlayersList>
					{data.map((player: Player) => {
						const playerInTeam = teams?.some((team) =>
							team.players.includes(player._id),
						)

						return (
							<PlayerItem key={player._id}>
								<PlayerInfo>
									<div>
										<PlayerLabel>First Name</PlayerLabel>
										<PlayerText>
											{player.firstName}
										</PlayerText>
									</div>
									<div>
										<PlayerLabel>Last Name</PlayerLabel>
										<PlayerText>
											{player.lastName}
										</PlayerText>
									</div>
									<div>
										<PlayerLabel>Team</PlayerLabel>
										<PlayerText>
											{playerInTeam
												? teams?.find((team) =>
														team.players.includes(
															player._id,
														),
													)?.name
												: 'No team'}
										</PlayerText>
									</div>
								</PlayerInfo>
								<div>
									<EditButton
										onClick={() => handleEdit(player)}
									>
										Edit
									</EditButton>
									{playerInTeam ? (
										<PlayerCannotDeleteMessage>
											Nie można usunąć zawodnika
											należącego do drużyny
										</PlayerCannotDeleteMessage>
									) : (
										<DeleteButton
											onClick={() => handleDelete(player)}
											disabled={playerInTeam}
										>
											Delete
										</DeleteButton>
									)}
								</div>
							</PlayerItem>
						)
					})}
				</PlayersList>
			)}
		</PlayersContainer>
	)
}
