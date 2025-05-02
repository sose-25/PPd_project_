import React from 'react';
import { 
  FaCheckCircle, 
  FaTruck, 
  FaTag, 
  FaHeadset,
  FaStore,
  FaFileContract,
  FaHandsHelping,
  FaEnvelope
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.assistance}>
        <p>Need assistance with installation?</p>
        <button className={styles.contactButton}>
          <FaEnvelope className={styles.buttonIcon} />
          Contact us
        </button>
      </div>

      <div className={styles.features}>
        <div className={styles.featureItem}>
          <FaCheckCircle className={styles.featureIcon} />
          <span>Original quality</span>
        </div>
        <div className={styles.featureItem}>
          <FaTruck className={styles.featureIcon} />
          <span>Home delivery</span>
        </div>
        <div className={styles.featureItem}>
          <FaTag className={styles.featureIcon} />
          <span>The best prices</span>
        </div>
        <div className={styles.featureItem}>
          <FaHeadset className={styles.featureIcon} />
          <span>Customer service</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentColumn}>
          <h4 className={styles.columnTitle}>
            <FaStore className={styles.icon} />
            Bricoli
          </h4>
        </div>
        
        <div className={styles.contentColumn}>
          <h4 className={styles.columnTitle}>
            <FaFileContract className={styles.icon} />
            How to create a store
          </h4>
          <ul className={styles.linkList}>
            <li><FaTag className={styles.listIcon} /> Terms of sale and payments</li>
            <li><FaHandsHelping className={styles.listIcon} /> Our services</li>
            <li><FaHeadset className={styles.listIcon} /> Help</li>
          </ul>
        </div>

        <div className={styles.contactColumn}>
          <h4 className={styles.columnTitle}>
            <FaEnvelope className={styles.icon} />
            Contact us
          </h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;