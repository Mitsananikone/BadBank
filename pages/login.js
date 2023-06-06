import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/usercontext';
import styles from '../styles/Login.module.css';
import dbConfig from '../db.config';
import { useRouter } from 'next/router';
import { UserContextProvider } from '../contexts/usercontext';
import { useFetch } from '../hooks/useFetch';
import MongoUserContext from '../contexts/mongousercontext';
import { DashBoard } from '@/components/dashboard/dashboard';

export default function Login() {
  const Router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, setUser } = useContext(UserContext);


  // useFetch({
  //   url: `${dbConfig.apiurl}/api/user`, // Replace with the appropriate API endpoint to fetch user data
  //   onSuccess: (data) => {
  //     setUser(data); // Update the user context with the fetched data
  //   },
  //   onError: (error) => {
  //     console.error('Error fetching user data:', error);
  //   },
  // });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!emailValid) {
      setMessage('Please enter a valid email.');
      setShowError(true);
      return;
    }

    if (!passwordValid) {
      setMessage('Password should be at least 8 characters.');
      setShowError(true);
      return;
    }

    setLoading(true);

    try {
      const { user } = await fetch(`${dbConfig.apiurl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      }).then((res) => {
        if (res.status !== 200) {
          setShowError(true); // show the error popup if login fails
          throw new Error(res.statusText);
        }
        return res.json();
      });

      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      setUser(user); // set the user in the UserContext state

      // let {mongoUser} = MongoUserContext(user._id);

      setMessage(`Success! Welcome, ${capitalizeFirstLetter(user.name)}.`);
      setShowSuccess(true); // show the success popup if login succeeds
    } catch (error) {
      setMessage(`User Email and Password could not be verified XXXXX`);
      setShowError(true);
    } finally {
      setLoading(false);
      setEmail(''); // Clear the email input
      setPassword(''); // Clear the password input
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.trim().length >= 8);
  };

  const handleCloseErrorPopup = () => {
    setShowError(false);
  };

  const handleCloseSuccessPopup = () => {
    Router.push('/home');
    setShowSuccess(false);
  };

  return (
    <UserContextProvider>
      <div className={styles.container}>
      {/* <DashBoard user={user} /> */}
        <h1>Login</h1>

        {/* <h6> {JSON.stringify(`${mongoUser}`)}</h6> */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={emailValid ? "" : "invalid"}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={passwordValid ? "" : "invalid"}
          />
          <br />
          <button type="submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        

        {showError && (
          <div className={styles.popup}>
            <div className={styles.popup_body}>
              <h3>Error</h3>
              <p>{message}</p>
              <button
                className="btn btn-light"
                onClick={() => {
                  handleCloseErrorPopup();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className={styles.popup}>
            <div className={styles.popup_body}>
              <h3>Success</h3>
              <p>{message}</p>
              <button
                className="btn btn-light"
                onClick={() => {
                  handleCloseSuccessPopup();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </UserContextProvider>
  );
}