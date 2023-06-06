import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar/navbar';
import { UserContext } from '../contexts/usercontext';


export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <div className="pagecontainer">
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
}
