import { useContext, useState } from 'react';
import { UserContext } from '../contexts/usercontext';
import ATM from '../components/atm/atm';
import styles from '../styles/ATM.module.css';
import { useRouter } from 'next/router';

export default function Deposit() {
  const { user, setUser } = useContext(UserContext);
  const [deposit, setDeposit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // Clear the form inputs and status messages
  const clearForm = () => {
    setShow(true);
    setStatus('');
    setDeposit(0);
  };

  // Handle the form submission for deposit
  const submitDeposit = async (e) => {
    e.preventDefault();
    setShow(false);
    setLoading(true);

    if (isNaN(deposit)) {
      setStatus('Please enter a valid number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, amount: parseFloat(deposit), balance: parseFloat(user.balance) })
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

  // Redirect to the login page if user is not logged in
  if (!user) {
    const handleLoginClick = () => {
      router.push('/home');
    }
    return (
      <div className={styles.container}>
        <div className={styles.loggedOff} onClick={handleLoginClick}> </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <ATM
          bgcolor="success"
          txtcolor="black"
          header="DEPOSIT"
          title="BALANCE"
          balance={`$${user.balance}`}
          disabled="true"
          show={show}
          showSuccess={showSuccess}
          body={
            show ? (
              <div className={styles.form}>
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
                  disabled={loading || deposit <= 0}
                  onClick={submitDeposit}
                >
                  {loading ? 'Depositing...' : 'Deposit'}
                </button>
              </div>
            ) : (
              <div className={styles.popup}>
                <div className={styles.popup_body}>
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
