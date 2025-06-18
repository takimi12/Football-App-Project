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
	const players = db.collection('players')

	const {
		query: { id },
		method,
	} = req

	if (!id || typeof id !== 'string') {
		return res.status(400).json({ error: 'Invalid or missing player ID' })
	}

	try {
		const objectId = new ObjectId(id)

		if (method === 'DELETE') {
			const result = await players.deleteOne({ _id: objectId })
			return res.status(200).json({ deleted: result.deletedCount })
		}

		if (method === 'PUT') {
			const result = await players.updateOne(
				{ _id: objectId },
				{ $set: req.body },
			)
			return res.status(200).json({ updated: result.modifiedCount })
		}

		res.setHeader('Allow', ['PUT', 'DELETE'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	} catch (err) {
		console.error('❌ API handler error:', err)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
