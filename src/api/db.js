import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = { useUnifiedTopology: true };

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function getDB() {
  const client = await clientPromise;
  return client.db(); // optionally: client.db("your-db-name")
}
