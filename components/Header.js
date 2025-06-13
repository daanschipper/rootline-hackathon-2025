import Link from 'next/link';

export default function Header({ onLogoClick, onShowYachts, onShowJets }) {
  return (
    <header>
      <nav>
        <div className="logo" onClick={onLogoClick || undefined} style={{ cursor: onLogoClick ? 'pointer' : undefined }}>
          <Link href="/">ZENITH RENTALS</Link>
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
          <Link href="/members">Members</Link>
          <Link href="/concierge">Concierge</Link>
        </div>
      </nav>
    </header>
  );
} 