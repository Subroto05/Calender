import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req, res) {
  try {
    await client.connect()
    const database = client.db('communication_tracker')
    const companies = database.collection('companies')

    switch (req.method) {
      case 'GET':
        const allCompanies = await companies.find({}).toArray()
        res.status(200).json(allCompanies)
        break

      case 'POST':
        const newCompany = req.body
        const result = await companies.insertOne(newCompany)
        res.status(201).json({ _id: result.insertedId, ...newCompany })
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

