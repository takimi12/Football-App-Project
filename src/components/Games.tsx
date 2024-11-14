import React, { useState } from 'react'
import { useTeams } from '../hooks/useTeams'
import { useGetMatches } from '../hooks/useGetMatch'
import { useAddMatch } from '../hooks/useAddMatch'
import { useUpdateMatch } from '../hooks/useUpdateMatch'
import { useDeleteMatch } from '../hooks/useDeleteMatch'
import { Team } from '../types/teams'
import styled from 'styled-components'
import { Match } from '../types/match'

// Styled Components (without changes)
const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`

const Title = styled.h2`
	text-align: center;
	color: ${({ theme }) => theme.text};
	font-size: 2rem;
`

const FormContainer = styled.form`
	background-color: ${({ theme }) => theme.formBackground};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 30px;
	width: 100%;
	max-width: 600px;
`

const FormField = styled.div`
	margin-bottom: 15px;
`

const Label = styled.label`
	font-size: 1rem;
	font-weight: bold;
	color: ${({ theme }) => theme.text};
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

const ErrorText = styled.span`
	color: red;
	font-size: 0.875rem;
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

const MatchListContainer = styled.div`
	margin-top: 40px;
`

const MatchItem = styled.li`
	background-color: ${({ theme }) => theme.listItemBackground};
	padding: 15px;
	border-radius: 8px;
	margin-bottom: 15px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const MatchInfo = styled.div`
	margin-bottom: 10px;
`

const MatchActions = styled.div`
	display: flex;
	gap: 10px;
`

const EditButton = styled.button`
	background-color: ${({ theme }) => theme.editButtonBackground};
	color: ${({ theme }) => theme.editButtonText};
	padding: 8px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;

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

	&:hover {
		background-color: ${({ theme }) => theme.deleteButtonHoverBackground};
	}
`

export const Games: React.FC = () => {
	const { teams } = useTeams()
	const { addMatch } = useAddMatch()
	const { refetch, matches } = useGetMatches()
	const { mutate: updateMatch } = useUpdateMatch()
	const { mutate: deleteMatch } = useDeleteMatch()

	const [matchId, setMatchId] = useState<string | null>(null)
	const [team1Id, setTeam1Id] = useState<string>('')
	const [team2Id, setTeam2Id] = useState<string>('')
	const [team1Score, setTeam1Score] = useState<string>('')
	const [team2Score, setTeam2Score] = useState<string>('')
	const [date, setDate] = useState<string>('')
	const [duration, setDuration] = useState<string>('')
	const [location, setLocation] = useState<string>('')

	// Validation messages
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

		// Validate if team1 and team2 are not the same
		if (team1Id === team2Id) {
			setTeamError('Zespol 1  i zespol 2 nie mogą byc takie same')
			isValid = false
		} else {
			setTeamError('')
		}

		// Validate that both teams are selected
		const team1 = teams?.find((team) => team.id === team1Id)
		const team2 = teams?.find((team) => team.id === team2Id)
		if (!team1 || !team2) {
			setTeamError('Wybierz jakąś druzyne.')
			isValid = false
		}

		// Validate if scores are valid numbers and no more than 2 digits
		if (!/^\d{1,2}$/.test(team1Score) || !/^\d{1,2}$/.test(team2Score)) {
			setScoreError('Wprowadzona liczba nie moe miec więcej niz 2 znaki')
			isValid = false
		} else {
			setScoreError('')
		}

		// Validate date is not empty
		if (!date) {
			setDateError('Data jest wymagana.')
			isValid = false
		} else {
			// Validate date is not in the future
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
			team1Id: team1?.id || '',
			team1Name: team1?.name || '',
			team2Id: team2?.id || '',
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
		setMatchId(match.id)
		setTeam1Id(match.team1Id)
		setTeam2Id(match.team2Id)
		setTeam1Score(String(match.team1Score))
		setTeam2Score(String(match.team2Score))
		setDate(match.date)
		setDuration(match.duration)
		setLocation(match.location)
	}

	const handleDelete = (matchId: string) => {
		deleteMatch(matchId)
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
						{teams?.map((team: Team) => (
							<option key={team.id} value={team.id}>
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
							?.filter((team: Team) => team.id !== team1Id)
							.map((team: Team) => (
								<option key={team.id} value={team.id}>
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
						max={new Date().toISOString().slice(0, 16)} // Prevent future dates
					/>
					{dateError && <ErrorText>{dateError}</ErrorText>}
				</FormField>

				<FormField>
					<Label>Duration:</Label>
					<Select
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
					>
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
						<MatchItem key={match.id}>
							<MatchInfo>
								<strong>Match ID:</strong> {match.id}
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
								<strong>Duration:</strong> {match.duration}{' '}
								minutes
							</MatchInfo>
							<MatchInfo>
								<strong>Location:</strong> {match.location}
							</MatchInfo>

							<MatchActions>
								<EditButton onClick={() => handleEdit(match)}>
									Edit
								</EditButton>
								<DeleteButton
									onClick={() => handleDelete(match.id)}
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
