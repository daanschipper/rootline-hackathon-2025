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
            <p>If you want to become a partner with Zenyth, you need to sign up with Zenyth Pay and go through the onboarding process.</p>
            <p>For more information, please visit our <a href="https://onboarding.rootline.com/onboarding/blue" target="_blank" rel="noopener noreferrer">onboarding page</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
} 