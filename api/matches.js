const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://tomek12olech:7MytflC2STM5Wroe@cluster.etrcyrp.mongodb.net/myDatabase?retryWrites=true&w=majority';

let cachedClient = null;

module.exports = async (req, res) => {
  if (!cachedClient) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      cachedClient = client;
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
      return res.status(500).json({ error: 'Failed to connect to database' });
    }
  }

  const db = cachedClient.db('myDatabase');
  const matches = db.collection('matches');

  try {
    if (req.method === 'POST') {
      const result = await matches.insertOne(req.body);
      return res.status(201).json({ insertedId: result.insertedId });
    }

    if (req.method === 'GET') {
      const data = await matches.find({}).toArray();
      return res.status(200).json(data);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('❌ API handler error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
