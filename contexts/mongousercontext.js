import { getConnectedDatabase } from '../lib/db';


export async function MongoUserContext(userId) {
  try {
    const { db } = await getConnectedDatabase();
    const userCollection = db.collection('users');

    // Query the collection to find the user with the specified userId
    const mongoUser = await userCollection.findOne({ userId });
    console.log(mongoUser.name);
    return mongoUser;
  } catch (error) {
    console.error('Error fetching user data from MongoDB Atlas:', error);
    throw error;
  }
}
