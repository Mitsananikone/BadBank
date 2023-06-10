import React, { useContext, useEffect } from 'react';
import Home from './home';
import { getAllUsers } from '../lib/dal';
import { connectToDatabase } from '../lib/mongodb';
import { UserContext } from '../contexts/usercontext';


require('dotenv').config();

export default function App({ allUsers = [] }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('Index user:', user); // Log the user to the console
  }, [user]);

  // const handleLogin = async () => {
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }), // Pass email and password from state
  //     });

  //     if (res.status !== 200) {
  //       throw new Error(await res.text());
  //     }

  //     const { user, token } = await res.json(); // Assuming the response includes the token

  //     // Save the user and token in the UserContext state
  //     setUser({ ...user, token });

  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };

  return (
    <div className="root" style={{width: '100%'}}>
      <Home />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { db } = await connectToDatabase();
    const users = db.collection('users').find();
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
