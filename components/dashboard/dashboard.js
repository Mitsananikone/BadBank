import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/usercontext';
require('dotenv').config();
import styles from './dashboard.module.css';


export const DashBoard = () => {
  const { user } = useContext(UserContext);
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
  

  return (
    <div className = {styles.container}>
      <div className={styles.infoBox} style={{backgroundColor: "dodgerBlue"}}>
        <h3>UserContext</h3>

        {user && (
          <div>
            <p>_id: {user._id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Balance: {user.balance}</p>
          </div>
        )}
      </div>

      <div className={styles.infoBox} style={{backgroundColor: "lime"}}>
        <h3>MongoDB</h3>

        {userData && (
          <div>
            <p>_id: {user._id}</p>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Balance: {userData.balance}</p>
          </div>
        )}
      </div>
    </div>
  );
};
