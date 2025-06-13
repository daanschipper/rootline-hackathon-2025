import React from 'react';

export default function Hero({ onShowYachts, onShowJets, onShowWatches }) {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to ZENYTH</h1>
        <p>Your gateway to unparalleled luxury experiences</p>
        <div className="hero-buttons">
          <button onClick={onShowYachts} className="hero-button">
            Explore Yachts
          </button>
          <button onClick={onShowJets} className="hero-button">
            Discover Jets
          </button>
          <button onClick={onShowWatches} className="hero-button">
            View Watches
          </button>
        </div>
      </div>
    </div>
  );
} 