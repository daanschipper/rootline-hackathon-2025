import Header from '../components/Header';

export default function Members() {
  return (
    <>
      <Header />
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-content">
          <h1>Members Area</h1>
          <p>Exclusive content and benefits for Zenith Rentals members coming soon.</p>
        </div>
      </section>
    </>
  );
} 