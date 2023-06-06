import mongoose from 'mongoose';

let UserModel;

try {
  // Try to fetch the existing model
  UserModel = mongoose.model('user');
} catch {
  // If the model doesn't exist, create it
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: { type: Number, default: 0 },
    transactionHistory: [
      {
        changeAmount: Number,
        balanceAmount: Number,
        transactionType: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });

  UserModel = mongoose.model('user', userSchema);
}

export default UserModel;
