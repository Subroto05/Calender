import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req, res) {
  try {
    await client.connect()
    const database = client.db('communication_tracker')
    const methods = database.collection('communication_methods')

    switch (req.method) {
      case 'GET':
        const allMethods = await methods.find({}).toArray()
        res.status(200).json(allMethods)
        break

      case 'POST':
        const newMethod = req.body
        const result = await methods.insertOne(newMethod)
        res.status(201).json({ _id: result.insertedId, ...newMethod })
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

