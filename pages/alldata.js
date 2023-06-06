import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AllData.module.css'
// You might need to adjust the import path depending on your file structure
import { getDatabase } from '../lib/db';
import { connectToDatabase } from '@/lib/mongodb';

function AllData({ allUsers = [] }) {
  const [users, setUsers] = useState(allUsers);


  async function deleteUser(id) {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // remove user from state
        setUsers(users.filter(user => user._id !== id));
      } else {
        console.error("Error deleting user: ", await response.text());
      }
    } catch (err) {
      console.error("Error deleting user: ", err);
    }
  }

  return (
    <div className={styles.AllData_container}>
      <h1> Administrator Page </h1>
     
      <table className={styles.AllData_table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.balance}</td>
              <td>
                <button className={styles.AllData_button} onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

AllData.propTypes = {
  allUsers: PropTypes.array,
};

export async function getServerSideProps() {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users').find().toArray();
    const stringifiedUsers = JSON.stringify(users);
    const parsedUsers = JSON.parse(stringifiedUsers, (key, value) => {
      if (key === '_id') {
        return value.toString();
      }
      return value;
    });

    return { props: { allUsers: parsedUsers } };
  } catch (error) {
    console.error(error);
    return { props: { allUsers: [] } };
  }
}

export default AllData;
