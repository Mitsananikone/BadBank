import mongoose from 'mongoose';
require('dotenv').config();
import { UserContext } from '../contexts/usercontext';
import { useContext } from 'react';
import User from './UserModel';

// Create a new user
export async function createUser({ name, email, password }) {
  try {
    const user = new User({
      name,
      email,
      password,
      balance: 0,
      transactionHistory: [],
    });
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

// Get a user by ID
export async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Failed to fetch user by ID');
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const users = await User.find();
    return users.map(user => ({
      ...user.toObject(),
      _id: user._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Failed to fetch all users');
  }
}

// Login a user
export async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email, password });
    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Failed to log in user');
  }
}

// Update user balance
export async function updateUserBalance(userId, amount, balance, transactionType) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    let changeAmount;
    let balanceAmount;
    if (transactionType === 'Deposit') {
      changeAmount = amount;
      balanceAmount = balance + changeAmount;
    } else {
      changeAmount = amount;
      balanceAmount = balance - changeAmount;
    }

    user.balance = balanceAmount;

    await user.save();
    return { success: true };
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw new Error('Failed to update user balance');
  }
}

// Save transaction history for a user
export async function saveTransactionHistory(userId, amount, balance, transactionType) {
  try {
    const user = await getUserById(userId);

    if (!user) {
      console.error('User not found');
      throw new Error('User not found');
    }

    let changeAmount;
    let balanceAmount;
    if (transactionType === 'Deposit') {
      changeAmount = amount;
      balanceAmount = balance + changeAmount;
    } else if (transactionType === 'Withdraw') {
      changeAmount = amount;
      balanceAmount = balance - changeAmount;
    }

    user.transactionHistory.push({
      changeAmount: changeAmount,
      balanceAmount: balanceAmount,
      transactionType: transactionType,
      timestamp: new Date(),
    });

    await user.save();
    console.log('Transaction history saved successfully.');
  } catch (error) {
    console.error('Error saving transaction history:', error);
    throw new Error('Failed to save transaction history.');
  }
}

// Get transaction history for a user
export async function getUserTransactions(userId) {
  try {
    const user = await getUserById(userId);
    if (user) {
      return user.transactionHistory.map(transaction => ({
        ...transaction.toObject(),
        _id: transaction._id.toString(),
      }));
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    throw new Error('Failed to fetch user transactions');
  }
}
