import React from 'react';
import styles from  './productsservices.module.css';


export default function ProductServiceCard(props) {
  const { icon, title, body, link } = props;

  return (
      <div className={styles.prodserv_container}>
        <div className={styles.prodserv_card}>
            <img src={icon} className={styles.iconImg} alt={`Image of ${title}`} />
          <div className={styles.prodserv_card_header}>
            <h3>{title}</h3>
          </div>
          <div className={styles.prodserv_card_body}>
            <p>{body}</p>
          </div>
          <div className={styles.prodserv_card_footer}>
            <a href={link}>
              <button className={styles.prodserv_learn_more_button}>Learn more</button>
            </a>
          </div>
        </div>
      </div>

  );
}