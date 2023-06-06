import { useContext, useState } from 'react';
import { UserContext } from '../contexts/usercontext';
import ATM from '../components/atm/atm';
import styles from '../styles/ATM.module.css';
import { useRouter } from 'next/router';
import dbConfig from '../db.config';
import { getUserById } from '@/lib/dal';
import { DashBoard } from '@/components/dashboard/dashboard';
export async function getServerSideProps(context) {
  const { userId } = context.query; // Extract the userId from the query parameters

  try {
    // Fetch the user data using the userId
    const user = await getUserById(userId);

    // Return the user data as props
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);

    // Return the error as props to the error page for debugging
    return {
      props: {
        error: error.message,
      },
    };
  }
}

function Deposit() {
  const { user, setUser } = useContext(UserContext);
  const [deposit, setDeposit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const clearForm = () => {
    setShow(true);
    setStatus('');
    setDeposit(0);
  };

  const submitDeposit = async (e) => {
    e.preventDefault();
    setShow(false);
    setLoading(true);

    if (isNaN(deposit)) {
      setStatus('Please enter a valid number');
      setLoading(false);
      return;
    }

    // if (parseFloat(deposit) <= 0) {
    //   setStatus('Please enter a positive number');
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(`${dbConfig.apiurl}/api/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, amount: parseFloat(deposit), balance: parseFloat(user.balance)})
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);
        setUser({ ...user, balance: (user.balance + parseFloat(deposit)) });
        setShowSuccess(true);
        setDeposit(0);
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      console.error('Error depositing funds:', error);
      setStatus('Error depositing funds: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (typeof error !== 'undefined') {
    // Render error message or redirect to an appropriate error page
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>{error}</p>
      </div>
    );
  }

  const secondCardButton = deposit <= 0 || loading;

  if (!user) {
    const Router = useRouter();

    const handleLoginClick = () => {
      Router.push('/home');
    }
    return (
      <div className={styles.container}>
        <div className={styles.loggedOff} onClick={handleLoginClick}> </div>
      </div>
    );
  }

  return (
   
    <div className={styles.container}>
   {/* <DashBoard user={user} /> */}
      <div>
        <ATM
          bgcolor="success"
          txtcolor="black"
          header="DEPOSIT"
          title="BALANCE"
          balance={`$${user.balance}`}
          // status={status}
          disabled="true"
          show={show}
          showSuccess={showSuccess}
          body={
            show ? (
              <div className={styles.form}>
                {/* Deposit form */}
                <label>
                  <br />
                  Deposit Amount
                </label>
                <input
                  type="number"
                  className={`${styles['form-control']} ${styles['glowing-border']}`}
                  id="deposit"
                  placeholder="Amount to Deposit"
                  value={deposit}
                  onChange={(e) => setDeposit(e.currentTarget.value)}
                />
                <button
                  id="ATMsubmit"
                  type="submit"
                  className="btn btn-light"
                  disabled={secondCardButton}
                  onClick={submitDeposit}
                >
                  {loading ? 'Depositing...' : 'Deposit'}
                </button>                
              </div>
            ) : (
              // Success message
                <div className={styles.popup}>
                  <div className={styles.popup_body}>
                    {/* <h3>Success!</h3> */}
                    <p>{status}</p>
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        clearForm();
                        setShow(true);
                        setShowSuccess(false);
                      }}
                    >
                      OK
                    </button>
                  </div>
                </div>
      
            )
          }
        />
      </div>
    </div>
  );
}

export default Deposit;