import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
require('dotenv').config();
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const adminPassword = process.env.admin;
  const router = useRouter();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === adminPassword) {
      // Navigate to /alldata
      router.push('/alldata');
    } else {
      // Show another pop-up asking to try again or exit
      if (confirm('Incorrect password. Do you want to try again?')) {
        setPassword('');
      } else {
        router.push('/home');
      }
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popup_body}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>
            Log in as Administrator
          </h1>
          <input
            type="password"
            placeholder='Admin password is "admin"'
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
