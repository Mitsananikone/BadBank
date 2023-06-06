import { connectToDatabase } from './mongodb';

let connectedDatabase = null;

export async function getConnectedDatabase() {
  if (!connectedDatabase) {
    connectedDatabase = await connectToDatabase();
  }
  return connectedDatabase;
}
