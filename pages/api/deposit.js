import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { updateUserBalance, saveTransactionHistory, getUserById } from '../../lib/dal';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method !== 'POST') {
    // Handle invalid HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { userId, amount, balance } = req.body;

    if (isNaN(amount)) {
      // Check if the amount is a valid number
      res.status(400).json({ message: 'Please enter a valid number' });
      return;
    }

    if (parseFloat(amount) <= 0) {
      // Check if the amount is a positive number
      res.status(400).json({ message: 'Please enter a positive number' });
      return;
    }

    await updateUserBalance(userId, amount, balance, 'Deposit');
    
    let user = await getUserById(userId);

    await saveTransactionHistory(user, amount, balance, 'Deposit');

    if (!user) {
      // Handle the case where the user is not found
      res.status(400).json({ message: result.message });
      return;
    }

    // Set the necessary headers for CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json({ message: 'Deposit successful' });
  } catch (error) {
    console.error('Error depositing funds:', error);
    res.status(500).json({ message: 'Error depositing funds', error: error.message });
  }
}
