const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGO_URI
const dbName = 'myDatabase'

if (!uri) {
	throw new Error('MONGO_URI not defined')
}

let cachedClient = null

module.exports = async function handler(req, res) {
	const { id } = req.query

	if (typeof id !== 'string' || !ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'Invalid ID format' })
	}

	try {
		if (!cachedClient) {
			cachedClient = new MongoClient(uri, {
				serverApi: {
					version: '1',
					strict: true,
					deprecationErrors: true,
				},
			})
			await cachedClient.connect()
		}

		const db = cachedClient.db(dbName)
		const matches = db.collection('matches')
		const objectId = new ObjectId(id)

		if (req.method === 'DELETE') {
			const result = await matches.deleteOne({ _id: objectId })
			return res.status(200).json({ deleted: result.deletedCount })
		}

		if (req.method === 'PUT') {
			const data = req.body

			// Debug log
			console.log('Received update data:', JSON.stringify(data, null, 2))

			// Walidacja danych
			if (!data || typeof data !== 'object') {
				console.log('Invalid request body')
				return res.status(400).json({ error: 'Invalid request body' })
			}

			// Przygotowanie danych do aktualizacji - NIE konwertuj team1Id i team2Id
			const updateData = {
				team1Id: data.team1Id, // Zostaw jako string
				team1Name: data.team1Name,
				team2Id: data.team2Id, // Zostaw jako string
				team2Name: data.team2Name,
				team1Score: parseInt(data.team1Score) || 0,
				team2Score: parseInt(data.team2Score) || 0,
				date: data.date,
				duration: data.duration,
				location: data.location
			}

			console.log('Prepared update data:', JSON.stringify(updateData, null, 2))

			// Sprawdź czy mecz istnieje
			const existingMatch = await matches.findOne({ _id: objectId })
			console.log('Existing match found:', !!existingMatch)
			
			if (!existingMatch) {
				return res.status(404).json({ error: 'Match not found' })
			}

			// Aktualizuj mecz
			const result = await matches.updateOne(
				{ _id: objectId },
				{ $set: updateData }
			)

			console.log('Update result:', {
				matchedCount: result.matchedCount,
				modifiedCount: result.modifiedCount
			})

			return res.status(200).json({ 
				success: true,
				updated: result.modifiedCount,
				matchedCount: result.matchedCount 
			})
		}

		res.setHeader('Allow', ['PUT', 'DELETE'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
		
	} catch (error) {
		console.error('❌ API error:', error.name, error.message)
		console.error('Error stack:', error.stack)
		
		// Zwróć bardziej szczegółowy błąd
		return res.status(500).json({ 
			error: 'Internal Server Error',
			message: error.message,
			errorType: error.name,
			details: process.env.NODE_ENV === 'development' ? error.stack : 'Check server logs'
		})
	}
}