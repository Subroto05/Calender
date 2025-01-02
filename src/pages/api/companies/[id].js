import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export default async function handler(req, res) {
  const { id } = req.query

  try {
    await client.connect()
    const database = client.db('communication_tracker')
    const companies = database.collection('companies')

    switch (req.method) {
      case 'PUT':
        const updateData = req.body
        const updateResult = await companies.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        )
        if (updateResult.matchedCount === 0) {
          res.status(404).json({ error: 'Company not found' })
        } else {
          res.status(200).json({ _id: id, ...updateData })
        }
        break

      case 'DELETE':
        const deleteResult = await companies.deleteOne({ _id: new ObjectId(id) })
        if (deleteResult.deletedCount === 0) {
          res.status(404).json({ error: 'Company not found' })
        } else {
          res.status(200).json({ message: 'Company deleted successfully' })
        }
        break

      default:
        res.setHeader('Allow', ['PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to database' })
  } finally {
    await client.close()
  }
}

