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
    if (user) {
      // Call the function to fetch user data from MongoDB Atlas
      getUserData(user._id)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Failed to fetch user data from MongoDB Atlas DASHBOARD:', error);
        });
    }
  }, [user]);
  
  const getUserData = async (userId) => {
    try {
      // Replace this with your actual API call or database query to fetch user data
      const response = await fetch(`/api/user/${userId}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    if (userData) {
      setTransactionHistory(userData.transactionHistory);
    }
  }, [userData]);

  return (
    <div className={styles.UserData_container}>
      <div className={styles.UserData_header}>
        Transaction History
        {/* {userData && <h1>{userData.name}</h1>} */}
      </div>
      <div className={styles.UserData_table_container}>
        {/* <DashBoard user={userData} /> */}
        <table className={styles.UserData_table}>
          <thead>
            <tr>
              {/* <th>User</th> */}
              <th>Transaction</th>
              <th>Day</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction) => {
              const timestamp = new Date(transaction.timestamp); // Convert to Date object
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
                  {/* <td style={{ textTransform: 'capitalize' }}>{userData.name}</td> */}
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
