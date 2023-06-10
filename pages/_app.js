import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar/navbar';
import { UserContext } from '../contexts/usercontext';
import Footer from '@/components/footer/footer';
import Head from 'next/head';

const Styles = () => (
  <Head>
    <style>{`
    .AppEntry {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
    </style>
  </Head>
)

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <div className='AppEntry' style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <Component {...pageProps} />
      </div>
      {/* <Footer /> */}
    </UserContext.Provider>
  );
}

