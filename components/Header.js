import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBasket } from '../context/BasketContext';

export default function Header({ onLogoClick, onShowYachts, onShowJets }) {
  const { basket } = useBasket();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="logo" onClick={onLogoClick || undefined} style={{ cursor: onLogoClick ? 'pointer' : undefined }}>
        <Link href="/">
          <img src="/images/zenyth_logo.png" alt="Zenyth Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span>ZENYTH</span>
        </Link>
      </div>
      
      <button
        className="hamburger-menu"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>
      
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {onShowYachts ? (
          <a href="#" onClick={(e) => { e.preventDefault(); onShowYachts(); setIsMenuOpen(false); }}>
            Yachts
          </a>
        ) : (
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Yachts</Link>
        )}
        
        {onShowJets ? (
          <a href="#" onClick={(e) => { e.preventDefault(); onShowJets(); setIsMenuOpen(false); }}>
            Private Jets
          </a>
        ) : (
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Private Jets</Link>
        )}
        
        <Link href="/members" onClick={() => setIsMenuOpen(false)}>Our Team</Link>
        <a href="#" className="nav-link">Concierge</a>
        <a href="/terms" className="nav-link">Terms & Conditions</a>
        <a href="/partners" className="nav-link">Partners</a>
        
        <Link href="/basket" onClick={() => setIsMenuOpen(false)}>
          <button className="basket-button">
            🛒
            {basket.length > 0 && (
              <span className="basket-count">{basket.length}</span>
            )}
          </button>
        </Link>
      </nav>
    </header>
  );
}