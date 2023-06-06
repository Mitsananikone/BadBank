import mongoose from 'mongoose';
require('dotenv').config();
import UserModel from '../../../lib/UserModel';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
});

export default async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching user data' });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request
    const { id } = req.query;

    try {
      const result = await UserModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
