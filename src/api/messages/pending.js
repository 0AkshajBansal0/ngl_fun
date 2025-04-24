import getDB from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const db = await getDB();
  const messages = await db.collection('messages').find({ approved: false }).toArray();
  res.status(200).json(messages);
}
