import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import styles from './slickslider.module.css';

const SlickSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: false,
  };

  return (
    <div className={styles.slider_container}>
      <div className={styles.slickslider_container}>
      <div className={styles.partners}>
              <h2>Partners</h2>
            </div>
        <div className={styles.slickslider_inner}>
        
          <div className={styles.flex_container}>
            
            <Slider {...settings}>
              <div className={styles.slickslider_item}>
                <Image
                  src="/images/visa.svg"
                  alt="Visa"
                  className={styles.slickslider_image}
                  width={300}
                  height={200}
                />
              </div>
            <div className={styles.slickslider_item}>
              <Image
                src="/images/mastercard.svg"
                alt="Mastercard"
                className={styles.slickslider_image}
                width={300}
                height={200}
              />
            </div>
            <div className={styles.slickslider_item}>
              <Image
                src="/images/paypal.svg"
                alt="PayPal"
                className={styles.slickslider_image}
                width={300}
                height={200}
              />
            </div>
            <div className={styles.slickslider_item}>
              <Image
                src="/images/stripe.svg"
                alt="Stripe"
                className={styles.slickslider_image}
                width={300}
                height={200}
              />
            </div>
            <div className={styles.slickslider_item}>
              <Image
                src="/images/AmEx.svg"
                alt="American Express"
                className={styles.slickslider_image}
                width={300}
                height={200}
              />
            </div>
          </Slider>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default SlickSlider;
