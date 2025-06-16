import { MongoClient, ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new MongoClient(process.env.MONGO_URI as string)
const dbName = 'myDatabase'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { id } = req.query

	if (typeof id !== 'string') {
		return res.status(400).json({ error: 'Invalid ID format' })
	}

	try {
		await client.connect()
		const db = client.db(dbName)
		const matches = db.collection('matches')

		if (req.method === 'DELETE') {
			const result = await matches.deleteOne({ _id: new ObjectId(id) })
			return res.status(200).json({ deleted: result.deletedCount })
		}

		if (req.method === 'PUT') {
			const result = await matches.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: req.body },
			)
			return res.status(200).json({ updated: result.modifiedCount })
		}

		res.setHeader('Allow', ['PUT', 'DELETE'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	} catch (error) {
		console.error('API error:', error)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
