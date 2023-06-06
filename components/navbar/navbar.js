'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { UserContext } from '../../contexts/usercontext';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignButton() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]);

  const handleLogOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    const popup = document.createElement('div');
    popup.className = `${styles.popup}`;
    popup.innerHTML = `<span>You are logged off</span>`;
    document.body.appendChild(popup);
    setTimeout(() => {
      document.body.removeChild(popup);
      router.push('/');
    }, 1000);
  };

  const handleLogIn = () => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  };

  return (
    <>
    <div className={styles.item}>
      {isLoggedIn ? (
        <Link href="/home">
          <span href="logout" className={styles.link} onClick={handleLogOut}>
            Log Off
          </span>
        </Link>
      ) : null}
    </div>
    </>
  );
}

export default function NavBar() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  const handleNavbarToggle = () => {
    const navbar = document.getElementById('navbarNav');
    navbar.classList.toggle('show');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient fixed-top">
      <div className="container-fluid" style={{ backgroundColor: 'white', marginTop: '-10px' }}>
        <li className={styles.brand}>
          <Link href="/">
            <span className={styles.link}>
              BadBank
              <img src="/images/bankIcon.svg" alt="Bank Icon" style={{ width: '30px', marginRight: '10px' }} />
            </span>
          </Link>
        </li>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto" style={{ marginLeft: 0 }}>
            <li className={styles.item}>
              <Link href="/login">
                <span className={styles.link} style={{ whiteSpace: 'nowrap' }}>
                  Log In
                </span>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/createaccount">
                <span className={styles.link} style={{ whiteSpace: 'nowrap' }}>
                  Create Account
                </span>
              </Link>
            </li>

            {user !== null && (
              <>
                <li className={styles.item}>
                  <Link href="/deposit">
                    <span className={styles.link} style={{ whiteSpace: 'nowrap' }}>
                      Deposit
                    </span>
                  </Link>
                </li>

                <li className={styles.item}>
                  <Link href="/withdraw">
                    <span className={styles.link} style={{ whiteSpace: 'nowrap' }}>
                      Withdraw
                    </span>
                  </Link>
                </li>

                <li className={styles.item}>
                  <Link href="/userdata">
                    <span className={styles.link} style={{ whiteSpace: 'nowrap' }}>
                      Transaction History
                    </span>
                  </Link>
                </li>
              </>
            )}

              <div className={styles.gap}></div>

            <li className={styles.item} >
              <Link href="/adminlogin">
                <span className={styles.link} id={styles.adminButton} style={{ whiteSpace: 'nowrap' }}>
                  Administrator
                </span>
              </Link>
            </li>

            <div className={styles.gap}></div>

            {!isLoginPage && (
              <>
                <li className={`${styles.item} `} >
                  <span htmlFor="usernameInput" className={`${styles.link} capitalize`} style={{ whiteSpace: 'nowrap' }}>
                    {user ? `Welcome, ${user.name}` : ''}
                  </span>
                </li>

                <div className={styles.gap} style={{scale: '0.5'}}></div>
                
                <li className={`${styles.item} `} style={{ whiteSpace: 'nowrap' }} >
                  <SignButton/>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
