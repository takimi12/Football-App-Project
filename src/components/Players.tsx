import { useMongoPlayers } from '../hooks/useGetMongoPlayers'
import { useGetTeamsMongo } from '../hooks/useGetTeamsMongo'
import { useAddOrEditMongoPlayer } from '../hooks/useAddOrEditMongoPlayer'
import { useDeleteMongoPlayer } from '../hooks/useDeleteMongoPlayer'
import { PlayerMongo } from '../types/players'
import {
	PlayersContainer,
	Title,
	Form,
	FormField,
	Input,
	ErrorMessage,
	Button,
	PlayersList,
	PlayerItem,
	PlayerInfo,
	PlayerLabel,
	PlayerText,
	EditButton,
	DeleteButton,
	PlayerCannotDeleteMessage,
} from './styled/Players.styles'

export const Players = () => {
	const { data, refetch } = useMongoPlayers()
	const { teams } = useGetTeamsMongo()

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
					{data.map((player: PlayerMongo) => {
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
