import styles from './herobanner.module.css';
import { useRouter } from 'next/router';

const HeroBanner = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/createaccount');
  };

  return (
    <div className={styles.container}>
      <div className={styles.flex_container}>
        <div className={styles.textBlock}>
          <p className={styles.text_paragraph}></p>
          <h1 className={styles.text_header}>Banking Made Simple</h1>
          <p className={styles.info}>Seamlessly manage your finances, anytime and anywhere</p>
          <div className={styles.getStartedContainer}>
            <a href="#" id={styles.getStartedButton} onClick={handleSubmit}>Get Started</a>
          </div>
        </div>
        <div className={styles.imageBox}>
          <div className={styles.HeroImage}>
            <img src="https://images.unsplash.com/photo-1462206092226-f46025ffe607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyfHxiYW5rfGVufDB8fHx8MTY4NDc3NjYyOXww&ixlib=rb-4.0.3&q=80&w=1080" className="w-full" alt="..." width="800" height="1200" />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default HeroBanner;
