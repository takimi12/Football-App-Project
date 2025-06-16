import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new MongoClient(process.env.MONGO_URI as string)
const dbName = 'myDatabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect()
    const db = client.db(dbName)
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
    console.error('API error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
