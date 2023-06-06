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
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { userId, amount, balance } = req.body;

    if (isNaN(amount)) {
      res.status(400).json({ message: 'Please enter a valid number' });
      return;
    }

    // if (parseFloat(amount) <= 0) {
    //   res.status(400).json({ message: 'Please enter a positive number' });
    //   return;
    // }

    await updateUserBalance(userId, amount, balance, 'Withdraw');

    let user = await getUserById(userId);


    await saveTransactionHistory(user, amount, balance, 'Withdraw'); // Pass the user object
   
    if (!user) {
      res.status(400).json({ message: result.message });
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
