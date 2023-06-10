import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar/navbar';
import { UserContext } from '../contexts/usercontext';
import Footer from '@/components/footer/footer';



export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <div className='AppEntry' style={{width: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center'}}>
        <Component {...pageProps} />
       
      </div>
      <Footer />
    </UserContext.Provider>
  );
}

