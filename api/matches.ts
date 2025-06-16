const { MongoClient } = require('mongodb')

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function handler(req, res) {
  const client = new MongoClient(
    'mongodb+srv://tomek12olech:7MytflC2STM5Wroe@cluster.etrcyrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'
  )
  const dbName = 'myDatabase'

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
  } finally {
    await client.close()
  }
}

module.exports = handler
