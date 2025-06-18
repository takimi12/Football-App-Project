import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const uri = process.env.MONGODB_URI as string
const dbName = 'myDatabase'

if (!uri) {
	console.error('❌ Missing MongoDB connection string in MONGODB_URI')
	throw new Error('MONGODB_URI not set')
}

let cachedClient: MongoClient | null = null

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
	return cachedClient.db(dbName)
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const db = await connectToDatabase()
		const matches = db.collection('matches')

		if (req.method === 'POST') {
			const result = await matches.insertOne(req.body)
			return res.status(201).json({ insertedId: result.insertedId })
		}

		if (req.method === 'GET') {
			const data = await matches.find({}).toArray()
			return res.status(200).json(data)
		}

		res.setHeader('Allow', ['GET', 'POST'])
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	} catch (error) {
		console.error('❌ API handler error:', error)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
