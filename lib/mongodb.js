import mongoose from 'mongoose';
require('dotenv').config();
// const uri = process.env.NEXT_PUBLIC_API_URL;
let isConnected = false;



export async function connectToDatabase() {
  try {
    if (isConnected) {
      return { db: mongoose.connection };
    }

    await mongoose.connect(process.env.MONGODB_URI, {
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
