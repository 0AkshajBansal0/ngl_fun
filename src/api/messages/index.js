import getDB from '../db.js';

export default async function handler(req, res) {
  const db = await getDB();
  const collection = db.collection('messages');

  if (req.method === 'GET') {
    const messages = await collection.find({ approved: true }).toArray();
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const message = {
      ...req.body,
      approved: false,
      timestamp: Date.now(),
    };
    await collection.insertOne(message);
    return res.status(201).json(message);
  }

  res.status(405).end(); // Method Not Allowed
}
