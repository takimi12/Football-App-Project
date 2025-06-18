export interface Team {
	id: string
	name: string
	yearFounded: number
	location: string
	players: string[]
}
export interface TeamMongo {
	_id: string
	name: string
	yearFounded: number
	location: string
	players: string[]
}
