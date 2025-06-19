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
			const result = await matches.updateOne(
				{ _id: objectId },
				{ $set: req.body }
			)
			return res.status(200).json({ updated: result.modifiedCount })
		}

		res.setHeader('Allow', ['PUT', 'DELETE'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	} catch (error) {
		console.error('❌ API error:', error)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
