const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGODB_URI

if (!uri) {
	console.error('❌ Missing MongoDB connection string in MONGODB_URI')
	throw new Error('MONGODB_URI not set')
}

let cachedClient = null

async function connectToDatabase() {
	if (!cachedClient) {
		const client = new MongoClient(uri, {
			serverApi: {
				version: '1',
				strict: true,
				deprecationErrors: true,
			},
		})
		await client.connect()
		cachedClient = client
	}
	return cachedClient.db('myDatabase')
}

module.exports = async (req, res) => {
	const {
		query: { matchId },
		method,
	} = req

	if (!ObjectId.isValid(matchId)) {
		return res.status(400).json({ error: 'Invalid match ID' })
	}

	const db = await connectToDatabase()
	const matches = db.collection('matches')

	try {
		if (method === 'PUT') {
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

			// Walidacja danych wejściowych
			if (
				!team1Id ||
				!team2Id ||
				typeof team1Score !== 'number' ||
				typeof team2Score !== 'number' ||
				!date
			) {
				return res.status(400).json({ error: 'Missing required fields' })
			}

			const result = await matches.updateOne(
				{ _id: new ObjectId(matchId) },
				{
					$set: {
						team1Id,
						team1Name,
						team2Id,
						team2Name,
						team1Score,
						team2Score,
						date,
						duration,
						location,
					},
				}
			)

			if (result.matchedCount === 0) {
				return res.status(404).json({ error: 'Match not found' })
			}

			return res.status(200).json({ message: 'Match updated successfully' })
		}

		res.setHeader('Allow', ['PUT'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	} catch (err) {
		console.error('❌ API PUT handler error:', err)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
