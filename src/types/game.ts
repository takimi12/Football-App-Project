export interface Game {
	id: string
	team1Id: string
	team1Name: string
	team2Id: string
	team2Name: string
	team1Score: number
	team2Score: number
	date: string
	duration: string
	location: string
}

export type TeamScore = {
	team: string
	goals: number
}

export type GroupByPeriod = 'day' | 'week' | 'month'
