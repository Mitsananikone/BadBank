import mongoose from 'mongoose';
import dbConfig from '../db.config';
// const uri = dbConfig.apiurl;
let isConnected = false;



export async function connectToDatabase() {
  try {
    if (isConnected) {
      return { db: mongoose.connection };
    }

    await mongoose.connect(dbConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    })
    mongoose.connection.on('error', (err) => {
      console.log(err);
      process.exit();
     });
    
    isConnected = true;
    return { db: mongoose.connection };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to connect to the database');
  }
}

export async function closeDatabaseConnection() {
  try {
    if (isConnected) {
      await mongoose.disconnect();
      isConnected = false;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to close the database connection');
  }
}

export default mongoose;
