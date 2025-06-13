import Link from 'next/link';

export default function Header({ onLogoClick, onShowYachts, onShowJets }) {
  return (
    <header>
      <nav>
        <div className="logo" onClick={onLogoClick || undefined} style={{ cursor: onLogoClick ? 'pointer' : undefined }}>
          <Link href="/">ZENYTH</Link>
        </div>
        <div className="nav-links">
          {onShowYachts ? (
            <a href="#" onClick={e => { e.preventDefault(); onShowYachts(); }}>Yachts</a>
          ) : (
            <Link href="/">Yachts</Link>
          )}
          {onShowJets ? (
            <a href="#" onClick={e => { e.preventDefault(); onShowJets(); }}>Private Jets</a>
          ) : (
            <Link href="/">Private Jets</Link>
          )}
          <Link href="/members">Our Team</Link>
          <a href="#" className="nav-link">Concierge</a>
          <a href="/terms" className="nav-link">Terms & Conditions</a>
        </div>
      </nav>
    </header>
  );
} 