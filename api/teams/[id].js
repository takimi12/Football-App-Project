const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGODB_URI

if (!uri) {
	console.error('❌ Missing MongoDB connection string in MONGODB_URI')
	throw new Error('MONGODB_URI not set')
}

let cachedClient = null

module.exports = async (req, res) => {
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
	const teams = db.collection('teams')

	const { id } = req.query

	if (!ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'Invalid team ID' })
	}

	try {
		if (req.method === 'PUT') {
			const updateResult = await teams.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: req.body },
			)

			if (updateResult.matchedCount === 0) {
				return res.status(404).json({ error: 'Team not found' })
			}

			return res
				.status(200)
				.json({ message: 'Team updated successfully' })
		}

		if (req.method === 'DELETE') {
			const deleteResult = await teams.deleteOne({
				_id: new ObjectId(id),
			})

			if (deleteResult.deletedCount === 0) {
				return res.status(404).json({ error: 'Team not found' })
			}

			return res
				.status(200)
				.json({ message: 'Team deleted successfully' })
		}

		res.setHeader('Allow', ['PUT', 'DELETE'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	} catch (err) {
		console.error('❌ API handler error:', err)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
