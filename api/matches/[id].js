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
			console.log('Received update data:', data)

			// Walidacja danych
			if (!data || typeof data !== 'object') {
				return res.status(400).json({ error: 'Invalid request body' })
			}

			// Przygotowanie danych do aktualizacji
			const updateData = { ...data }

			// Konwersja team1Id i team2Id do ObjectId tylko jeśli są to prawidłowe ObjectId
			// W przeciwnym razie zostaw je jako stringi
			if (updateData.team1Id) {
				if (ObjectId.isValid(updateData.team1Id)) {
					updateData.team1Id = new ObjectId(updateData.team1Id)
				}
				// Jeśli nie jest prawidłowym ObjectId, zostaw jako string
			}
			
			if (updateData.team2Id) {
				if (ObjectId.isValid(updateData.team2Id)) {
					updateData.team2Id = new ObjectId(updateData.team2Id)
				}
				// Jeśli nie jest prawidłowym ObjectId, zostaw jako string
			}

			// Sprawdź czy mecz istnieje
			const existingMatch = await matches.findOne({ _id: objectId })
			if (!existingMatch) {
				return res.status(404).json({ error: 'Match not found' })
			}

			console.log('Updating match with data:', updateData)

			const result = await matches.updateOne(
				{ _id: objectId },
				{ $set: updateData }
			)

			console.log('Update result:', result)

			return res.status(200).json({ 
				updated: result.modifiedCount,
				matchedCount: result.matchedCount 
			})
		}

		res.setHeader('Allow', ['PUT', 'DELETE'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	} catch (error) {
		console.error('❌ API error:', error)
		console.error('Error stack:', error.stack)
		return res.status(500).json({ 
			error: 'Internal Server Error',
			message: error.message,
			stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
		})
	}
}