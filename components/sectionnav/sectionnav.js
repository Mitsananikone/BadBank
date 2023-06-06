/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import styles from './sectionnav.module.css';

export default function SectionNav() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tabInfo = [
    {
      title: 'Understanding the Risks and Rewards of Investing.',
      header: 'Investing Basics',
      body: ' Investing refers to the act of allocating resources, usually money, with the expectation of generating an income or profit. Investing basics involve understanding the risks and rewards of investing, the different types of investments available, and how to create a diversified investment portfolio.',
      image: '/images/SectionNavImage1.jpeg',
    },
    {
      title: 'How to Choose the Right Credit Card for Your Needs.',
      header: 'Find a Credit Card',
      body: "Credit cards are a popular financial tool used to make purchases or pay for services on credit. When looking to find a credit card, it's important to consider factors such as the card's interest rates, fees, rewards programs, and credit limits to ensure that it fits your needs and financial situation.",
      image: '/images/SectionNavImage2.jpeg',
    },
    {
      title: 'The Fast and Convenient Way to Pay and Get Paid.',
      header: 'Payment Technologies',
      body: 'Payment technologies refer to the different methods of making and accepting payments, such as credit cards, debit cards, mobile payments, and electronic fund transfers. Payment technologies have greatly simplified the process of paying and receiving payments, making it faster and more convenient for consumers and businesses.',
      image: '/images/SectionNavImage3.jpeg',
    },
    {
      title: 'The Perks and Rewards of Using a Credit Card.',
      header: 'Card Benefits',
      body: 'Card benefits are the perks and rewards that come with using certain credit cards, such as cashback rewards, travel rewards, or other incentives. These benefits can vary greatly depending on the type of card, but can be an important factor to consider when selecting a credit card.',
      image: '/images/SectionNavImage4.jpeg',
    },
    {
      title: 'The Future of Payments – Secure and Convenient.',
      header: 'Digital Wallets',
      body: 'Digital wallets are electronic devices or software programs that allow consumers to securely store their payment information and make digital payments through a mobile device or computer. Digital wallets have become increasingly popular due to their convenience, speed, and enhanced security features, such as two-factor authentication and encryption.',
      image: '/images/SectionNavImage5.jpeg',
    },
  ];

  const handleTabClick = (index) => {
    setTimeout(() => {
        setSelectedTab(index);
        setIsAnimating(true);
        setTimeout(() => {
        setIsAnimating(false);
        }, 200);
    }, 100);
  };

  return (
    <div className={styles.secnav_parent}>
      <div className={styles.secnav_row_outer}>
        <div className={styles.secnav_row_inner}>
          <div className={styles.secnav_row_margin}>
            <div className={styles.secnav_col_outer}>
              <div className={styles.secnav_col_inner}>
                <div className={styles.secnav_heading}>
                  <h3> Business Banking </h3>
                </div>
                <div className={styles.secnav_tabs}>
                  <ul className={styles.secnav_tabs_list}>
                    {tabInfo.map((tab, index) => (
                      <li
                        className={`${styles.secnav_tabs_list_item}${
                          selectedTab === index ? ' active' : ''
                        }`}
                        key={index}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleTabClick(index);
                          }}
                        >
                          <span>{tab.header}</span>
                          {selectedTab === index && (
                            <div className={`${styles.secnav_active_tab_line}`}></div>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className={`${styles.secnav_tabs_wrap}`}>
                    <div
                      className={`${styles.secnav_tab_inner}${
                        isAnimating ? ' animating' : ''
                      }`}
                    >
                      <div
                        className={`${styles.secnav_image}${
                          isAnimating ? ' animating' : ''
                        }`}
                      >
                        <img
                          src={tabInfo[selectedTab].image}
                          alt="SectionNavImage"
                        />
                      </div>
                      <div
                        className={`${styles.secnav_infoblock}${
                          isAnimating ? ' animating' : ''
                        }`}
                      >
                        <h3>{tabInfo[selectedTab].title}</h3>
                        <p>{tabInfo[selectedTab].body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
