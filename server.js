import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.VITE_MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('communication_tracker');
    const companies = database.collection('companies');
    const communicationMethods = database.collection('communication_methods');
    const communications = database.collection('communications');

    // Companies API
    app.get('/api/companies', async (req, res) => {
      const result = await companies.find({}).toArray();
      res.json(result);
    });

    app.post('/api/companies', async (req, res) => {
      const newCompany = req.body;
      const result = await companies.insertOne(newCompany);
      res.json({ _id: result.insertedId, ...newCompany });
    });

    // Communication Methods API
    app.get('/api/communication-methods', async (req, res) => {
      const result = await communicationMethods.find({}).toArray();
      res.json(result);
    });

    app.post('/api/communication-methods', async (req, res) => {
      const newMethod = req.body;
      const result = await communicationMethods.insertOne(newMethod);
      res.json({ _id: result.insertedId, ...newMethod });
    });

    // Communications API
    app.get('/api/communications', async (req, res) => {
      const result = await communications.find({}).toArray();
      res.json(result);
    });

    app.post('/api/communications', async (req, res) => {
      const newCommunication = req.body;
      const result = await communications.insertOne(newCommunication);
      res.json({ _id: result.insertedId, ...newCommunication });
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});