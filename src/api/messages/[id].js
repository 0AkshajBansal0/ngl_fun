import getDB from '../db.js';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await getDB();
  const collection = db.collection('messages');

  if (req.method === 'PUT') {
    const result = await collection.updateOne({ id }, { $set: { approved: true } });
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const result = await collection.deleteOne({ id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ success: true });
  }

  res.status(405).end(); // Method Not Allowed
}
