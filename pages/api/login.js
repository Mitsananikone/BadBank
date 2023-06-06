import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { loginUser } from '../../lib/dal';
import dbConfig from '../../db.config';


// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('Missing email or password');
    }

    const user = await loginUser(email, password);
    
    //  console.log("api/login: " + user)

    if (!user) {
      throw new Error('User not found');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
}
