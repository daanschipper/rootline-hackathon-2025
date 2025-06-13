import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SelectionSection from '../components/SelectionSection';
import ServicesSection from '../components/ServicesSection';
import { useBasket } from '../context/BasketContext';

const yachts = [
  { id: 'y1', name: 'Azure Dream', price: '€25,000', length: '120ft', guests: '12 guests', crew: '8 crew', details: 'Luxurious mega yacht with state-of-the-art amenities, infinity pool, and helipad.', imageType: 'yacht1' },
  { id: 'y2', name: 'Golden Horizon', price: '€15,000', length: '150ft', guests: '16 guests', crew: '12 crew', details: 'Ultra-luxury yacht featuring spa, cinema, and multiple entertainment decks.', imageType: 'yacht2' },
  { id: 'y3', name: 'Pearl Majesty', price: '€15,000', length: '180ft', guests: '20 guests', crew: '15 crew', details: 'Spectacular super yacht with beach club, gym, and underwater viewing lounge.', imageType: 'yacht3' },
  { id: 'y4', name: 'Sapphire Seas', price: '€20,000', length: '95ft', guests: '10 guests', crew: '6 crew', details: 'Elegant yacht perfect for intimate gatherings with gourmet kitchen and sun deck.', imageType: 'yacht4' },
];

const jets = [
  { id: 'j1', name: 'Gulfstream G650', price: '€15,000', range: '7,000 nm', passengers: '18 passengers', speed: 'Mach 0.925', details: 'Ultra-long-range business jet with luxurious cabin and advanced technology.', imageType: 'jet1' },
  { id: 'j2', name: 'Bombardier Global 7500', price: '€18,000', range: '7,700 nm', passengers: '19 passengers', speed: 'Mach 0.925', details: 'The flagship of business aviation with four living spaces and dedicated crew rest area.', imageType: 'jet2' },
  { id: 'j3', name: 'Dassault Falcon 8X', price: '€12,000', range: '6,450 nm', passengers: '16 passengers', speed: 'Mach 0.90', details: 'Trijet luxury with exceptional range and the quietest cabin in its class.', imageType: 'jet3' },
  { id: 'j4', name: 'Cessna Citation X+', price: '€80,000', range: '3,460 nm', passengers: '12 passengers', speed: 'Mach 0.935', details: 'The fastest business jet with elegant interior and advanced avionics.', imageType: 'jet4' },
];

const watches = [
  { id: 'w1', name: 'Patek Philippe Nautilus 5711', price: '€1,500', movement: 'Automatic', case: '40mm', material: 'Platinum', details: 'The legendary Nautilus in platinum with a stunning blue dial. Limited production and highly sought after.', imageType: 'watch1' },
  { id: 'w2', name: 'Audemars Piguet Royal Oak', price: '€850', movement: 'Automatic', case: '41mm', material: '18k Gold', details: 'Iconic Royal Oak with a gold case and bracelet. Features the legendary tapisserie dial pattern.', imageType: 'watch2' },
  { id: 'w3', name: 'Rolex Daytona 116500', price: '€450', movement: 'Automatic', case: '40mm', material: 'Ceramic & Steel', details: 'The legendary Daytona with ceramic bezel. Features a chronograph and tachymeter scale.', imageType: 'watch3' },
  { id: 'w4', name: 'Richard Mille RM 11-03', price: '€1,200', movement: 'Automatic', case: '50mm', material: 'Carbon TPT', details: 'Ultra-modern sports watch with flyback chronograph and annual calendar. Worn by elite athletes.', imageType: 'watch4' },
  { id: 'w5', name: 'Vacheron Constantin Overseas', price: '€350', movement: 'Automatic', case: '41mm', material: 'Steel & Gold', details: 'Elegant sports watch with interchangeable straps. Features the iconic Maltese cross.', imageType: 'watch5' },
  { id: 'w6', name: 'A. Lange & Söhne Zeitwerk', price: '€950', movement: 'Manual', case: '41.9mm', material: 'Platinum', details: 'Revolutionary digital display with mechanical movement. Features jumping hours and minutes.', imageType: 'watch6' },
  { id: 'w7', name: 'Jaeger-LeCoultre Reverso', price: '€150', movement: 'Manual', case: '45.6mm', material: 'Steel', details: 'Art Deco icon with reversible case. Features a second time zone on the reverse.', imageType: 'watch7' },
  { id: 'w8', name: 'Omega Speedmaster Moonwatch', price: '€100', movement: 'Manual', case: '42mm', material: 'Steel', details: 'The legendary Moonwatch, worn on the first lunar landing. Features a chronograph and tachymeter.', imageType: 'watch8' },
];

const services = [
  { id: 's1', name: 'Luxury Fleet Service', icon: '🚗', price: '€2,500', details: 'Maybach S-Class, Rolls-Royce Phantom, and Bugatti Chiron with professional chauffeurs' },
  { id: 's2', name: 'Helicopter Transfer', icon: '🚁', price: '€5,000', details: 'Private helicopter transfers with champagne service and VIP landing permits' },
  { id: 's3', name: 'Haute Horlogerie Collection', icon: '⌚', price: '€10,000', details: 'Access to exclusive Patek Philippe, Richard Mille, and unique auction pieces' },
  { id: 's4', name: 'Michelin Star Chef Team', icon: '👨‍🍳', price: '€3,000', details: '3-Michelin-starred chef team for personalized culinary experiences' },
  { id: 's5', name: 'Wellness & Beauty Suite', icon: '💆', price: '€4,000', details: 'Celebrity spa therapists, beauty experts, and medical wellness team' },
  { id: 's6', name: 'Elite Security Detail', icon: '🛡️', price: '€8,000', details: 'Former special forces security team with armored vehicles and cyber protection' },
  { id: 's7', name: 'Entertainment Ensemble', icon: '🎭', price: '€6,000', details: 'World-class musicians, celebrity DJs, and private performance artists' },
  { id: 's8', name: 'Marine Adventure Package', icon: '🏄', price: '€3,500', details: 'Submarines, jet skis, diving equipment, and professional instructors' },
];

function parsePrice(price) {
  return parseInt(price.replace(/[€,]/g, ''));
}

export default function Home() {
  const [view, setView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const { addToBasket, getBasketCount } = useBasket();

  const handleShowYachts = () => {
    setView('yachts');
    setSelectedItem(null);
    setSelectedType('yacht');
  };

  const handleShowJets = () => {
    setView('jets');
    setSelectedItem(null);
    setSelectedType('jet');
  };

  const handleShowWatches = () => {
    setView('watches');
    setSelectedItem(null);
    setSelectedType('watch');
  };

  const handleSelectItem = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    if (type === 'yacht') {
      setShowServiceMenu(true);
    } else {
      setShowServiceMenu(false);
      addToBasket(item);
      setView('home');
    }
  };

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddToBasket = () => {
    addToBasket(selectedItem);
    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (service) addToBasket(service);
    });
    setShowServiceMenu(false);
    setSelectedItem(null);
    setSelectedServices([]);
    setView('home');
  };

  let totalPrice = 0;
  if (selectedItem) totalPrice += parsePrice(selectedItem.price);
  for (const id of selectedServices) {
    const service = services.find(s => s.id === id);
    if (service) totalPrice += parsePrice(service.price);
  }
  totalPrice = `€${totalPrice.toLocaleString()}`;

  return (
    <div className="app-container">
      {/* Full-page GIF background */}
      <div className="gif-background">
        <img src="/images/mainpage.gif" alt="Luxury background" />
      </div>
      
      {/* Content overlay */}
      <div className="content-overlay">
        <Header
          onLogoClick={() => setView('home')}
          onShowYachts={handleShowYachts}
          onShowJets={handleShowJets}
          onShowWatches={handleShowWatches}
          basketCount={getBasketCount()}
        />
        {view === 'home' && <Hero onShowYachts={handleShowYachts} onShowJets={handleShowJets} onShowWatches={handleShowWatches} />}
        {view === 'yachts' && (
          <SelectionSection 
            title="Superyacht Collection" 
            items={yachts} 
            type="yacht" 
            onSelect={handleSelectItem}
          />
        )}
        {view === 'jets' && (
          <SelectionSection 
            title="Private Aviation Fleet" 
            items={jets} 
            type="jet" 
            onSelect={handleSelectItem}
          />
        )}
        {view === 'watches' && (
          <SelectionSection 
            title="Haute Horlogerie Collection" 
            items={watches} 
            type="watch" 
            onSelect={handleSelectItem}
          />
        )}
        {showServiceMenu && selectedItem && (
          <div className="service-menu-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: '#181818', padding: 32, borderRadius: 16, minWidth: 320, maxWidth: 400 }}>
              <h2 style={{ color: '#FFD700', fontFamily: 'Playfair Display, serif', marginBottom: 24 }}>Add Services for {selectedItem.name}</h2>
              <form onSubmit={e => { e.preventDefault(); handleAddToBasket(); }}>
                {services.map(service => (
                  <label key={service.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16, color: '#fff', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                      style={{ marginRight: 12 }}
                    />
                    <span style={{ fontSize: 24, marginRight: 8 }}>{service.icon}</span>
                    <span style={{ color: '#FFD700', fontWeight: 600, fontFamily: 'Playfair Display, serif', marginRight: 8 }}>{service.name}</span>
                    <span style={{ color: '#F7E7CE', fontWeight: 400 }}>{service.price}</span>
                  </label>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                  <button type="button" onClick={() => { setShowServiceMenu(false); setSelectedItem(null); setSelectedServices([]); }} style={{ marginRight: 16, background: 'transparent', color: '#FFD700', border: '1px solid #FFD700', borderRadius: 4, padding: '8px 20px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ background: '#FFD700', color: '#181818', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 700, cursor: 'pointer' }}>Add to Basket</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .app-container {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .gif-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .gif-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: scale(1.05); /* Slight scale to hide edge pixelation */
          filter: blur(0.5px); /* Very subtle blur to smooth pixels */
        }

        .content-overlay {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }

        /* Add a subtle overlay to improve text readability */
        .gif-background::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(1px);
          pointer-events: none;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* Ensure Hero component text is visible on GIF */
        .hero-section {
          background: transparent !important;
        }

        /* You may need to adjust text colors for better visibility */
        .hero-section h1,
        .hero-section p {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}