import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express(); // <-- Moved to top before usage
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '/dist'))); // ⬅️ Now works fine

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '/dist/index.html'));
});


const uri = process.env.VITE_MONGODB_URI;
if (!uri) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    return client.db();
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1);
  }
}

let db;

// Initialize database connection
connectDB().then((database) => {
  db = database;
});

// Get approved messages
app.get('/api/messages', async (req, res) => {
  try {
    const approvedMessages = await db.collection('messages').find({ approved: true }).toArray();
    res.json(approvedMessages);
  } catch (error) {
    console.error('Error fetching approved messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get pending messages
app.get('/api/messages/pending', async (req, res) => {
  try {
    const pendingMessages = await db.collection('messages').find({ approved: false }).toArray();
    res.json(pendingMessages);
  } catch (error) {
    console.error('Error fetching pending messages:', error);
    res.status(500).json({ error: 'Failed to fetch pending messages' });
  }
});

// Add new message
app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = {
      ...req.body,
      approved: false,
      timestamp: Date.now()
    };
    const result = await db.collection('messages').insertOne(newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Approve message
app.put('/api/messages/:id/approve', async (req, res) => {
  try {
    const result = await db.collection('messages').updateOne(
      { id: req.params.id },
      { $set: { approved: true } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error approving message:', error);
    res.status(500).json({ error: 'Failed to approve message' });
  }
});

// Reject message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const result = await db.collection('messages').deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});