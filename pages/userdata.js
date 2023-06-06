import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/UserData.module.css';
import { getUserTransactions } from '../lib/dal';
import { DashBoard } from '@/components/dashboard/dashboard';
import { UserContext } from '../contexts/usercontext';

function UserData() {
  const { user } = useContext(UserContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when user context changes
    if (user) {
      getUserData(user._id)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Failed to fetch user data:', error);
        });
    }
  }, [user]);

  const getUserData = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    // Update transaction history when user data changes
    if (userData) {
      setTransactionHistory(userData.transactionHistory);
    }
  }, [userData]);

  return (
    <div className={styles.UserData_container}>
      <div className={styles.UserData_header}>
        <h1>Transaction History</h1>
      </div>
      <div className={styles.UserData_table_container}>
        <table className={styles.UserData_table}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Day</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction) => {
              const timestamp = new Date(transaction.timestamp);
              const dateString = timestamp.toLocaleDateString();
              const timeString = timestamp.toLocaleTimeString();

              return (
                <tr
                  key={transaction._id}
                  className={
                    transaction.transactionType === 'Deposit'
                      ? styles.depositRow
                      : styles.withdrawRow
                  }
                >
                  <td>{transaction.transactionType}</td>
                  <td>{dateString}</td>
                  <td>{timeString}</td>
                  <td>${transaction.changeAmount}</td>
                  <td>${transaction.balanceAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserData;
