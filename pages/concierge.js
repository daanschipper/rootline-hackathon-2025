import Header from '../components/Header';

export default function Concierge() {
  return (
    <>
      <Header />
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-content">
          <h1>Concierge Service</h1>
          <p>Our world-class concierge team is at your service. More details coming soon.</p>
        </div>
      </section>
    </>
  );
} 