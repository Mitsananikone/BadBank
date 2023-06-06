import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { updateUserBalance, saveTransactionHistory, getUserById } from '../../lib/dal';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method !== 'POST') {
    // Only allow POST method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { userId, amount, balance } = req.body;

    if (isNaN(amount)) {
      // Check if amount is a valid number
      res.status(400).json({ message: 'Please enter a valid number' });
      return;
    }

    await updateUserBalance(userId, amount, balance, 'Withdraw');
    let user = await getUserById(userId);
    await saveTransactionHistory(user, amount, balance, 'Withdraw'); // Save transaction history for withdrawal

    if (!user) {
      // User not found
      res.status(400).json({ message: 'User not found' });
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json({ message: 'Withdrawal successful' });
  } catch (error) {
    console.error('Error withdrawing funds:', error);
    res.status(500).json({ message: 'Error withdrawing funds', error: error.message });
  }
}
