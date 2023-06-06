import React, { useContext } from 'react';
import styles from '@/styles/Home.module.css';
import HeroBanner from '@/components/herobanner/herobanner';
import InfoBannerHome from '@/components/infobanner-home/infobanner-home';
import SectionNav from '@/components/sectionnav/sectionnav';
import ProductServiceCard from '@/components/productsservices/productsservices';
import SlickSlider from '@/components/slickslider/slickslider';
import Footer from '@/components/footer/footer';
import { UserContext } from '../contexts/usercontext';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.App}>
      <div className={styles.App_container}>
        {/* Hero Banner */}
        <section id={styles.HeroBanner_container}>
          <HeroBanner />
        </section>

        {/* Slider */}
        <section id={styles.Slider_container}>
          <SlickSlider />
        </section>

        {/* Info Banner (Commented out) */}
        {/* <section id={styles.InfoBannerSlide_container}>
          <InfoBannerHome/>
        </section> */}

        {/* Section Navigation */}
        <section id={styles.SectionNav_container} className="fadeInSection">
          <SectionNav />
        </section>

        {/* Products and Services */}
        <section id={styles.ProdServ_container} className="fadeInSection">
          <div className="product-service-header">
            <h3>Presenting products and services that are right for you</h3>
          </div>

          {/* Product/Service Card 1 */}
          <div className={styles.product_service_container}>
            <div className={styles.prodserv_card_container}>
              <ProductServiceCard
                icon="/images/prodserv_onlinebusiness.png"
                title="Online Business"
                body="Online businesses have lower overhead costs and wider reach, making them an attractive option for entrepreneurs."
                link="https://www.squarespace.com/small-business-website/"
              />
            </div>
          </div>

          {/* Product/Service Card 2 */}
          <div className={styles.product_service_container}>
            <div className={styles.prodserv_card_container}>
              <ProductServiceCard
                icon="/images/prodserv_businessplan.png"
                title="Business Plan"
                body="A well-crafted business plan is essential for securing funding and building a successful business."
                link="https://wisebusinessplans.com/bank-business-plan/"
              />
            </div>
          </div>

          {/* Product/Service Card 3 */}
          <div className={styles.product_service_container}>
            <div className={styles.prodserv_card_container}>
              <ProductServiceCard
                icon="/images/prodserv_mobilebank.png"
                title="Mobile Bank"
                body="Mobile banks offer convenient banking services on-the-go with lower fees and higher interest rates than traditional banks."
                link="https://www.forbes.com/advisor/banking/best-mobile-banking-apps/"
              />
            </div>
          </div>

          {/* Product/Service Card 4 */}
          <div className={styles.product_service_container}>
            <div className={styles.prodserv_card_container}>
              <ProductServiceCard
                icon="/images/prodserv_onlinedeposit.png"
                title="Online Deposit"
                body="Online deposit is a convenient and efficient way to manage finances with immediate access to funds."
                link="https://www.forbes.com/advisor/banking/complete-guide-to-mobile-check-deposit/"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <section id={styles.footer_container}>
        <Footer />
      </section>
    </div>
  );
}
