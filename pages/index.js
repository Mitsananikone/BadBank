import React, { useContext, useEffect } from 'react';
import Home from "./home"
import { getAllUsers } from '../lib/dal';
import { connectToDatabase } from '../lib/mongodb';
require('dotenv').config();
import { UserContext } from '../contexts/usercontext';



export default function App({ allUsers = [] }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('Index user:', user); // add this line
  }, [user]);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // pass email and password from state
      });

      if (res.status !== 200) {
        throw new Error(await res.text());
      }

      const { user, token } = await res.json(); // assuming the response includes the token

      // Save the user and token in the UserContext state
      setUser({ ...user, token });

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="homeContainer" >
      <Home />
      {/* <button onClick={handleLogin} style={{border: '1px solid red'}}>Login</button> */}
    </div>
  );
}


export async function getServerSideProps() {
  try {
    const { db } = await connectToDatabase();
    const users = db.collection('users').find();
    // const stringifiedUsers = JSON.stringify(users);
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
