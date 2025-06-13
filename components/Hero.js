import React from 'react';

export default function Hero({ onShowYachts, onShowJets }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Beyond Luxury</h1>
        <p>Where Dreams Become Reality</p>
        <div className="cta-buttons">
          <button className="cta-button primary-btn" onClick={onShowYachts}><span>Explore Yachts</span></button>
          <button className="cta-button secondary-btn" onClick={onShowJets}>Discover Jets</button>
        </div>
      </div>
    </section>
  );
} 