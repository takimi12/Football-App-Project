import React, { useState } from 'react'
import { useGetTeamsMongo } from '../hooks/useGetTeamsMongo'
import { useGetMatchMongo } from '../hooks/useGetMatchMongo'
import { useAddMatchMongo } from '../hooks/useAddMatchMongo'
import { useUpdateMatchMongo } from '../hooks/useUpdateMatchMongo'
import { useDeleteMatchMongo } from '../hooks/useDeleteMatchMongo'
import { Team, TeamMongo } from '../types/teams'
import { Match } from '../types/match'
import {
	Container,
	Title,
	FormContainer,
	FormField,
	Label,
	Input,
	ErrorText,
	Select,
	Button,
	MatchListContainer,
	MatchItem,
	MatchInfo,
	MatchActions,
	EditButton,
	DeleteButton,
} from './styled/Games.styles'

export const Games: React.FC = () => {
	const { teams } = useGetTeamsMongo()
	const { addMatch } = useAddMatchMongo()
	const { refetch, matches } = useGetMatchMongo()
	const { mutate: updateMatch } = useUpdateMatchMongo()
	const { mutate: deleteMatchMongo } = useDeleteMatchMongo()
	const [matchId, setMatchId] = useState<string | null>(null)
	const [team1Id, setTeam1Id] = useState<string>('')
	const [team2Id, setTeam2Id] = useState<string>('')
	const [team1Score, setTeam1Score] = useState<string>('')
	const [team2Score, setTeam2Score] = useState<string>('')
	const [date, setDate] = useState<string>('')
	const [duration, setDuration] = useState<string>('')
	const [location, setLocation] = useState<string>('')

	const [teamError, setTeamError] = useState<string>('')
	const [scoreError, setScoreError] = useState<string>('')
	const [dateError, setDateError] = useState<string>('')

	const resetForm = () => {
		setMatchId(null)
		setTeam1Id('')
		setTeam2Id('')
		setTeam1Score('')
		setTeam2Score('')
		setDate('')
		setDuration('')
		setLocation('')
		setTeamError('')
		setScoreError('')
		setDateError('')
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		let isValid = true

		if (team1Id === team2Id) {
			setTeamError('Zespol 1 i zespol 2 nie mogą byc takie same')
			isValid = false
		} else {
			setTeamError('')
		}

		const team1 = teams?.find((team) => team._id === team1Id)
		const team2 = teams?.find((team) => team._id === team2Id)
		if (!team1 || !team2) {
			setTeamError('Wybierz jakąś druzyne.')
			isValid = false
		}

		if (!/^\d{1,2}$/.test(team1Score) || !/^\d{1,2}$/.test(team2Score)) {
			setScoreError('Wprowadzona liczba nie moze miec więcej niz 2 znaki')
			isValid = false
		} else {
			setScoreError('')
		}

		if (!date) {
			setDateError('Data jest wymagana.')
			isValid = false
		} else {
			const selectedDate = new Date(date)
			const currentDate = new Date()
			if (selectedDate > currentDate) {
				setDateError('The selected date cannot be in the future.')
				isValid = false
			} else {
				setDateError('')
			}
		}

		if (!isValid) return

		const newMatch = {
			team1Id: team1?._id || '',
			team1Name: team1?.name || '',
			team2Id: team2?._id || '',
			team2Name: team2?.name || '',
			team1Score: parseInt(team1Score, 10),
			team2Score: parseInt(team2Score, 10),
			date,
			duration,
			location,
		}

		if (matchId) {
			updateMatch({ matchId, ...newMatch })
			refetch()
			resetForm()
		} else {
			addMatch.mutate(newMatch, {
				onSuccess: () => {
					refetch()
					resetForm()
				},
			})
		}
	}

	const handleEdit = (match: Match) => {
		const id = match._id?.toString() ?? ''
		console.log('🛠️ Editing match with ID:', id)
		if (id.length !== 24) {
			console.warn('⚠️ Invalid MongoDB ObjectId format:', id)
		}
		setMatchId(id)
		setTeam1Id(match.team1Id)
		setTeam2Id(match.team2Id)
		setTeam1Score(String(match.team1Score))
		setTeam2Score(String(match.team2Score))
		setDate(match.date)
		setDuration(match.duration)
		setLocation(match.location)
	}

	const handleDelete = (matchId: string) => {
		deleteMatchMongo(matchId)
		refetch()
	}

	return (
		<Container>
			<FormContainer onSubmit={handleSubmit}>
				<Title>{matchId ? 'Edit Match' : 'Add Match'}</Title>

				<FormField>
					<Label>Team 1:</Label>
					<Select
						value={team1Id}
						onChange={(e) => setTeam1Id(e.target.value)}
					>
						<option value="">Select Team</option>
						{teams?.map((team: TeamMongo) => (
							<option key={team._id} value={team._id}>
								{team.name}
							</option>
						))}
					</Select>
					{teamError && <ErrorText>{teamError}</ErrorText>}
				</FormField>

				<FormField>
					<Label>Team 2:</Label>
					<Select
						value={team2Id}
						onChange={(e) => setTeam2Id(e.target.value)}
					>
						<option value="">Select Team</option>
						{teams
							?.filter((team: TeamMongo) => team._id !== team1Id)
							.map((team: TeamMongo) => (
								<option key={team._id} value={team._id}>
									{team.name}
								</option>
							))}
					</Select>
					{teamError && <ErrorText>{teamError}</ErrorText>}
				</FormField>

				<FormField>
					<Label>Team 1 Score:</Label>
					<Input
						type="text"
						value={team1Score}
						onChange={(e) => setTeam1Score(e.target.value)}
						pattern="^\d{1,2}$"
						title="Enter a valid score (1-2 digits)"
					/>
					{scoreError && <ErrorText>{scoreError}</ErrorText>}
				</FormField>

				<FormField>
					<Label>Team 2 Score:</Label>
					<Input
						type="text"
						value={team2Score}
						onChange={(e) => setTeam2Score(e.target.value)}
						pattern="^\d{1,2}$"
						title="Enter a valid score (1-2 digits)"
					/>
					{scoreError && <ErrorText>{scoreError}</ErrorText>}
				</FormField>

				<FormField>
					<Label>Date:</Label>
					<Input
						type="datetime-local"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						max={new Date().toISOString().slice(0, 16)}
					/>
					{dateError && <ErrorText>{dateError}</ErrorText>}
				</FormField>

				<FormField>
					<Label>Duration:</Label>
					<Select
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						required
					>
						<option value="">Select Duration</option>
						<option value="45">45 minutes</option>
						<option value="90">90 minutes</option>
					</Select>
				</FormField>

				<FormField>
					<Label>Location:</Label>
					<Select
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					>
						<option value="">Select Location</option>
						<option value="warszawa">Warszawa</option>
						<option value="krakow">Kraków</option>
						<option value="lublin">Lublin</option>
					</Select>
				</FormField>

				<Button type="submit">
					{matchId ? 'Edit Match' : 'Add Match'}
				</Button>
			</FormContainer>

			<MatchListContainer>
				<h2>Match List</h2>
				<ul>
					{matches?.map((match) => (
						<MatchItem key={match._id}>
							<MatchInfo>
								<strong>Match ID:</strong> {match._id}
							</MatchInfo>
							<MatchInfo>
								<strong>Teams:</strong> {match.team1Name} vs{' '}
								{match.team2Name}
							</MatchInfo>
							<MatchInfo>
								<strong>Score:</strong> {match.team1Score} -{' '}
								{match.team2Score}
							</MatchInfo>
							<MatchInfo>
								<strong>Date:</strong>{' '}
								{new Date(match.date).toLocaleString()}
							</MatchInfo>
							<MatchInfo>
								<strong>Duration:</strong>{' '}
								{match.duration || 'N/A'} minutes
							</MatchInfo>
							<MatchInfo>
								<strong>Location:</strong> {match.location}
							</MatchInfo>

							<MatchActions>
								<EditButton onClick={() => handleEdit(match)}>
									Edit
								</EditButton>
								<DeleteButton
									onClick={() =>
										handleDelete(match._id ?? '')
									}
								>
									Delete
								</DeleteButton>
							</MatchActions>
						</MatchItem>
					))}
				</ul>
			</MatchListContainer>
		</Container>
	)
}
