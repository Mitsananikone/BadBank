import React from 'react';
import styles from './infobanner-home.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function InfoBannerHome(props) {
    const { heading, title, body, image, link } = props;
  
    return (
      <div className={styles.infoBanner}>
        <div className={styles.infoBanner_container}>
          <div className={styles.infobanner_image_container}>
            <img src={image} alt={`Image of ${title}`} />

            <div className={styles.infobanner_text_container}>
              <div className={styles.infobanner_text_wrapper}>
                <h2 className={styles.infobanner_heading}>{heading}</h2>
                <h3 className={styles.infobanner_title}>{title}</h3>
                <p className={styles.infobanner_body}>{body}</p>
              </div>
              <div className={styles.infobanner_card_footer}>
                <a href={link}>
                    <button className={styles.infobanner_learn_more_button}>Learn more</button>
                </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default function InfoBannerSlide() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 10000,
      cssEase: 'linear',
      arrows: true,
    };
  
    return (
      <div >
        <div className={styles.infoBanner_slider_container}>
          <Slider {...settings}>
            <div className="slider-image">
              <InfoBannerHome 
                heading="Premium Credit Card"
                title="Enjoy premium benefits with our credit card"
                body="Get access to exclusive rewards, higher credit limits, and a variety of perks that make your spending worthwhile."
                image="/images/infoBanner_alignright1.jpg"
                
              />
            </div>
            <div className="slider_image">
              <InfoBannerHome 
                heading="Debit Card with No Monthly Fees"
                title="Stay in control of your finances with our debit card"
                body="Say goodbye to monthly maintenance fees and enjoy easy access to your funds with our no-fee debit card."
                image="/images/infoBanner_alignright2.jpg"
          
              />
            </div>
            <div className="slider_image">
              <InfoBannerHome 
                heading="Prepaid Card "
                title="Manage your expenses with ease"
                body="With no overdraft fees or interest charges, it's the perfect solution for managing your day-to-day expenses."
                image="/images/infoBanner_alignright3.jpg"
            
              />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
  

