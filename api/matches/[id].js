const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGODB_URI

if (!uri) {
    console.error('❌ Missing MongoDB connection string in MONGODB_URI')
    throw new Error('MONGODB_URI not set')
}

let cachedClient = null

module.exports = async (req, res) => {
    // Connect to MongoDB if not already connected
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
    const matchesCollection = db.collection('matches') // Renamed for clarity

    try {
        if (req.method === 'POST') {
            // Handle POST request to add a new match
            const result = await matchesCollection.insertOne(req.body)
            return res.status(201).json({ insertedId: result.insertedId })
        } else if (req.method === 'GET') {
            // Handle GET request to retrieve all matches
            const data = await matchesCollection.find({}).toArray()
            return res.status(200).json(data)
        } else if (req.method === 'PUT') {
            // Handle PUT request to update an existing match
            const { id } = req.query // Get the match ID from the URL query parameters
            const updatedData = req.body // Get the updated match data from the request body

            // Validate if the ID is a valid MongoDB ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid Match ID format' })
            }

            const result = await matchesCollection.updateOne(
                { _id: new ObjectId(id) }, // Query for the document by its _id
                { $set: updatedData } // Set the new data
            )

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'Match not found' })
            }

            return res.status(200).json({ message: 'Match updated successfully' })
        } else if (req.method === 'DELETE') {
            // Handle DELETE request to remove a match
            const { id } = req.query; // Get the match ID from the URL query parameters

            // Validate if the ID is a valid MongoDB ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid Match ID format' });
            }

            const result = await matchesCollection.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Match not found' });
            }

            return res.status(200).json({ message: 'Match deleted successfully' });
        }

        // If the request method is not supported
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (err) {
        console.error('❌ API handler error:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
