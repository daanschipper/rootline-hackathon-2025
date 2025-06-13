import Header from '../components/Header';

const members = [
  { name: 'Alexandra Knight', avatar: '🧑‍💼' },
  { name: 'Benjamin Carter', avatar: '🧔' },
  { name: 'Charlotte Lee', avatar: '👩‍💼' },
  { name: 'David Kim', avatar: '👨‍💼' },
  { name: 'Elena Rossi', avatar: '👩' },
];

export default function Members() {
  return (
    <>
      <Header />
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-content">
          <h1>Our Team</h1>
          <p>Exclusive content and benefits for Zenith Rentals members coming soon.</p>
        </div>
        <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {members.map((member, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #FFD70033', borderRadius: 16, padding: 24, minWidth: 160, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{member.avatar}</div>
              <div style={{ color: '#FFD700', fontWeight: 700, fontSize: 22, fontFamily: 'Playfair Display, serif', marginBottom: 0 }}>{member.name}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
} 