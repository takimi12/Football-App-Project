const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGODB_URI

if (!uri) {
	console.error('❌ Missing MongoDB connection string in MONGODB_URI')
	throw new Error('MONGODB_URI not set')
}

let cachedClient = null

module.exports = async (req, res) => {
	// Połączenie z MongoDB
	if (!cachedClient) {
		try {
			const client = new MongoClient(uri, {
				serverApi: {
					version: '1',
					strict: true,
					deprecationErrors: true,
				},
			})
			await client.connect()
			cachedClient = client
		} catch (err) {
			console.error('❌ MongoDB connection error:', err)
			return res
				.status(500)
				.json({ error: 'Failed to connect to database' })
		}
	}

	const db = cachedClient.db('myDatabase')
	const matches = db.collection('matches')

	// Pobierz ID meczu z URL
	const { matchId } = req.query

	// Sprawdź czy matchId jest prawidłowe
	if (!matchId || !ObjectId.isValid(matchId)) {
		return res.status(400).json({ error: 'Invalid match ID' })
	}

	try {
		// PUT - Edytuj mecz
		if (req.method === 'PUT') {
			const {
				team1Id,
				team1Name,
				team2Id,
				team2Name,
				team1Score,
				team2Score,
				date,
				duration,
				location,
			} = req.body

			// Walidacja danych
			if (
				!team1Id ||
				!team2Id ||
				team1Score === undefined ||
				team2Score === undefined ||
				!date
			) {
				return res.status(400).json({
					error: 'Missing required fields: team1Id, team2Id, team1Score, team2Score, date',
				})
			}

			// Sprawdź czy mecz istnieje
			const existingMatch = await matches.findOne({
				_id: new ObjectId(matchId),
			})
			if (!existingMatch) {
				return res.status(404).json({ error: 'Match not found' })
			}

			// Zaktualizuj mecz
			const updateData = {
				team1Id,
				team1Name,
				team2Id,
				team2Name,
				team1Score: parseInt(team1Score),
				team2Score: parseInt(team2Score),
				date,
				duration: duration || '',
				location: location || '',
				updatedAt: new Date().toISOString(),
			}

			const result = await matches.updateOne(
				{ _id: new ObjectId(matchId) },
				{ $set: updateData },
			)

			if (result.matchedCount === 0) {
				return res.status(404).json({ error: 'Match not found' })
			}

			// Pobierz zaktualizowany mecz
			const updatedMatch = await matches.findOne({
				_id: new ObjectId(matchId),
			})

			return res.status(200).json({
				message: 'Match updated successfully',
				match: updatedMatch,
			})
		}

		// DELETE - Usuń mecz
		if (req.method === 'DELETE') {
			// Sprawdź czy mecz istnieje
			const existingMatch = await matches.findOne({
				_id: new ObjectId(matchId),
			})
			if (!existingMatch) {
				return res.status(404).json({ error: 'Match not found' })
			}

			// Usuń mecz
			const result = await matches.deleteOne({
				_id: new ObjectId(matchId),
			})

			if (result.deletedCount === 0) {
				return res.status(404).json({ error: 'Match not found' })
			}

			return res.status(200).json({
				message: 'Match deleted successfully',
				deletedId: matchId,
			})
		}

		// GET - Pobierz pojedynczy mecz (opcjonalnie)
		if (req.method === 'GET') {
			const match = await matches.findOne({ _id: new ObjectId(matchId) })

			if (!match) {
				return res.status(404).json({ error: 'Match not found' })
			}

			return res.status(200).json(match)
		}

		// Metoda nie jest obsługiwana
		res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	} catch (err) {
		console.error('❌ API handler error:', err)
		return res.status(500).json({
			error: 'Internal Server Error',
			details: err.message,
		})
	}
}
