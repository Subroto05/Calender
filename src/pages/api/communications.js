import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req, res) {
  try {
    await client.connect()
    const database = client.db('communication_tracker')
    const communications = database.collection('communications')

    switch (req.method) {
      case 'GET':
        const allCommunications = await communications.find({}).toArray()
        res.status(200).json(allCommunications)
        break

      case 'POST':
        const newCommunication = req.body
        const result = await communications.insertOne(newCommunication)
        res.status(201).json({ _id: result.insertedId, ...newCommunication })
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to database' })
  } finally {
    await client.close()
  }
}

