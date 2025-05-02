const FAQSection = () => {
  return (
    <section className="faq-section">
      <div className="faq-container">
        <h1 className="faq-main-heading" style={ {  color: '#023E8A' } }   > Have questions?</h1>
        <p className="faq-intro-text">
          We've got answers. Explore our most frequently asked questions to guide you through everything Phopet offers.
        </p>

        <div className="faq-content">
          <div className="faq-subsection">
            <h2 className="faq-subheading"  style={ {  color: '#023E8A' } }>
              Looking for bulk or wholesale pricing?
            </h2>
            <h2 className="faq-subheading"  style={ {  color: '#023E8A' } }>
              Want to know about warranties on parts?
            </h2>
          </div>

          <ul className="faq-list">
            <li className="faq-list-item">Have a specific brand or model in mind?</li>
            <li className="faq-list-item">Need expert advice on car maintenance?</li>
            <li className="faq-list-item">Looking for special discounts or deals?</li>
            <li className="faq-list-item">Need help finding the right part?</li>
            <li className="faq-list-item">Looking for fast shipping options?</li>
            <li className="faq-list-item">Want to track your order?</li>
            <li className="faq-list-item">Have questions about returns & refunds?</li>
            <li className="faq-list-item">Need assistance with installation?</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          background-color: white;
          padding: 3rem 1rem;
        }
        
        .faq-container {
          max-width: 56rem;
          margin: 0 auto;
        }
        
        .faq-main-heading {
          font-size: 1.875rem;
          line-height: 2.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .faq-intro-text {
          font-size: 1.125rem;
          line-height: 1.75rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }
        
        .faq-content > * + * {
          margin-top: 1.5rem;
        }
        
        .faq-subsection > * + * {
          margin-top: 1rem;
        }
        
        .faq-subheading {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .faq-list {
          list-style-type: disc;
          padding-left: 1.25rem;
          color: #4b5563;
        }
        
        .faq-list-item {
          margin-top: 1rem;
        }
        
        .faq-list-item:first-child {
          margin-top: 0;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;