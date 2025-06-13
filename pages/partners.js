import React from 'react';
import Header from '../components/Header';

export default function Partners() {
  return (
    <>
      <Header />
      <section className="partners-section">
        <div className="partners-container">
          <h2 className="section-title">Partners</h2>
          <div className="partners-content">
            <h3>Become a Partner</h3>
            <p>Join Zenyth as a partner and expand your business opportunities. Complete the form below to start the onboarding process with Zenyth Pay.</p>
            <iframe
              src="https://onboarding.rootline.com/onboarding/blue"
              width="100%"
              height="800px"
              frameBorder="0"
              title="Onboarding Form"
              style={{ maxWidth: '100%', overflow: 'auto' }}
            />
          </div>
        </div>
      </section>
    </>
  );
} 