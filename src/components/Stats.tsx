import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { useMongoGames } from '../hooks/useMongoStatistic'
import { GroupByPeriod, TeamScore } from '../types/game'
import {
	Container,
	Title,
	SectionTitle,
	StatsSelector,
	ChartWrapper,
	GameDetails,
	GameInfo,
	ErrorMessage,
} from './styled/Stats.styles'

export const Statistics: React.FC = () => {
	const [groupBy, setGroupBy] = useState<GroupByPeriod>('day')
	const { data: games = [], error } = useMongoGames()

	if (error instanceof Error) {
		return <ErrorMessage>Error: {error.message}</ErrorMessage>
	}
	const latestGame = games.length
		? games.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime(),
			)[0]
		: null

	const newTeamScores: { [teamName: string]: number } = {}

	games.forEach((game) => {
		if (newTeamScores[game.team1Name]) {
			newTeamScores[game.team1Name] += game.team1Score
		} else {
			newTeamScores[game.team1Name] = game.team1Score
		}

		if (newTeamScores[game.team2Name]) {
			newTeamScores[game.team2Name] += game.team2Score
		} else {
			newTeamScores[game.team2Name] = game.team2Score
		}
	})

	const teamScores: TeamScore[] = Object.keys(newTeamScores).map(
		(teamName) => ({
			team: teamName,
			goals: newTeamScores[teamName],
		}),
	)

	const formatDate = (date: string, period: GroupByPeriod): string => {
		const dateObj = new Date(date)

		if (period === 'day') {
			return dateObj.toISOString().split('T')[0]
		} else if (period === 'week') {
			const startOfWeek = new Date(dateObj)
			startOfWeek.setDate(
				dateObj.getDate() -
					dateObj.getDay() +
					(dateObj.getDay() === 0 ? -6 : 1),
			)

			const endOfWeek = new Date(startOfWeek)
			endOfWeek.setDate(startOfWeek.getDate() + 6)

			const formatDay = (date: Date) => {
				const day = date.getDate().toString().padStart(2, '0')
				const month = (date.getMonth() + 1).toString().padStart(2, '0')
				return `${day}.${month}`
			}

			return `${formatDay(startOfWeek)} - ${formatDay(endOfWeek)}`
		} else if (period === 'month') {
			const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
			return `${dateObj.getFullYear()}-${month}`
		}
		return date
	}
	const gameCountsByPeriod = games.reduce(
		(acc: Record<string, number>, game) => {
			const periodKey = formatDate(game.date, groupBy)
			acc[periodKey] = (acc[periodKey] || 0) + 1
			return acc
		},
		{},
	)

	const sortPeriodKeys = (keys: string[]): string[] => {
		if (groupBy === 'week') {
			return keys.sort((a, b) => {
				const [startA] = a.split(' - ')
				const [startB] = b.split(' - ')
				const [dayA, monthA] = startA.split('.')
				const [dayB, monthB] = startB.split('.')
				return (
					new Date(
						2024,
						parseInt(monthA) - 1,
						parseInt(dayA),
					).getTime() -
					new Date(
						2024,
						parseInt(monthB) - 1,
						parseInt(dayB),
					).getTime()
				)
			})
		}
		return keys.sort()
	}

	const sortedPeriodKeys = sortPeriodKeys(Object.keys(gameCountsByPeriod))

	const chartData = {
		labels: sortedPeriodKeys,
		datasets: [
			{
				label: 'Number of Games',
				data: sortedPeriodKeys.map((key) => gameCountsByPeriod[key]),
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
			},
		],
	}
	const topTeamsData = {
		labels: teamScores.map((team) => team.team),
		datasets: [
			{
				label: 'Goals Scored',
				data: teamScores.map((team) => team.goals),
				backgroundColor: 'rgba(153, 102, 255, 0.6)',
			},
		],
	}

	return (
		<Container>
			<Title>Statistics</Title>

			{latestGame ? (
				<GameDetails>
					<SectionTitle>Last Game Played</SectionTitle>
					<GameInfo>
						{latestGame.team1Name} vs {latestGame.team2Name} <br />
						Score: {latestGame.team1Score} - {latestGame.team2Score}{' '}
						<br />
						Date: {new Date(latestGame.date).toLocaleString()}{' '}
						<br />
						Duration: {latestGame.duration} minutes <br />
						Location: {latestGame.location}
					</GameInfo>
				</GameDetails>
			) : (
				<p>Loading last game...</p>
			)}

			<StatsSelector>
				<label>Group by: </label>
				<select
					value={groupBy}
					onChange={(e) =>
						setGroupBy(e.target.value as GroupByPeriod)
					}
				>
					<option value="day">Day</option>
					<option value="week">Week</option>
					<option value="month">Month</option>
				</select>
			</StatsSelector>

			<ChartWrapper>
				<SectionTitle>
					Games Per{' '}
					{groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}
				</SectionTitle>
				<Bar data={chartData} />
			</ChartWrapper>

			<ChartWrapper>
				<SectionTitle>Top 3 Teams by Goals Scored</SectionTitle>
				<Bar data={topTeamsData} />
			</ChartWrapper>
		</Container>
	)
}
