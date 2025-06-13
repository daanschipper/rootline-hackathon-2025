import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SelectionSection from '../components/SelectionSection';
import ServicesSection from '../components/ServicesSection';
import { useBasket } from '../context/BasketContext';

const yachts = [
  { id: 'y1', name: 'Azure Dream', price: '€250,000', length: '120ft', guests: '12 guests', crew: '8 crew', details: 'Luxurious mega yacht with state-of-the-art amenities, infinity pool, and helipad.', imageType: 'yacht1' },
  { id: 'y2', name: 'Golden Horizon', price: '€350,000', length: '150ft', guests: '16 guests', crew: '12 crew', details: 'Ultra-luxury yacht featuring spa, cinema, and multiple entertainment decks.', imageType: 'yacht2' },
  { id: 'y3', name: 'Pearl Majesty', price: '€450,000', length: '180ft', guests: '20 guests', crew: '15 crew', details: 'Spectacular super yacht with beach club, gym, and underwater viewing lounge.', imageType: 'yacht3' },
  { id: 'y4', name: 'Sapphire Seas', price: '€200,000', length: '95ft', guests: '10 guests', crew: '6 crew', details: 'Elegant yacht perfect for intimate gatherings with gourmet kitchen and sun deck.', imageType: 'yacht4' },
];

const jets = [
  { id: 'j1', name: 'Gulfstream G650', price: '€150,000', range: '7,000 nm', passengers: '18 passengers', speed: 'Mach 0.925', details: 'Ultra-long-range business jet with luxurious cabin and advanced technology.', imageType: 'jet1' },
  { id: 'j2', name: 'Bombardier Global 7500', price: '€180,000', range: '7,700 nm', passengers: '19 passengers', speed: 'Mach 0.925', details: 'The flagship of business aviation with four living spaces and dedicated crew rest area.', imageType: 'jet2' },
  { id: 'j3', name: 'Dassault Falcon 8X', price: '€120,000', range: '6,450 nm', passengers: '16 passengers', speed: 'Mach 0.90', details: 'Trijet luxury with exceptional range and the quietest cabin in its class.', imageType: 'jet3' },
  { id: 'j4', name: 'Cessna Citation X+', price: '€80,000', range: '3,460 nm', passengers: '12 passengers', speed: 'Mach 0.935', details: 'The fastest business jet with elegant interior and advanced avionics.', imageType: 'jet4' },
];

const services = [
  { id: 's1', name: 'Luxury Fleet Service', icon: '🚗', price: '€25,000', details: 'Maybach S-Class, Rolls-Royce Phantom, and Bugatti Chiron with professional chauffeurs' },
  { id: 's2', name: 'Helicopter Transfer', icon: '🚁', price: '€50,000', details: 'Private helicopter transfers with champagne service and VIP landing permits' },
  { id: 's3', name: 'Haute Horlogerie Collection', icon: '⌚', price: '€100,000', details: 'Access to exclusive Patek Philippe, Richard Mille, and unique auction pieces' },
  { id: 's4', name: 'Michelin Star Chef Team', icon: '👨‍🍳', price: '€30,000', details: '3-Michelin-starred chef team for personalized culinary experiences' },
  { id: 's5', name: 'Wellness & Beauty Suite', icon: '💆', price: '€40,000', details: 'Celebrity spa therapists, beauty experts, and medical wellness team' },
  { id: 's6', name: 'Elite Security Detail', icon: '🛡️', price: '€80,000', details: 'Former special forces security team with armored vehicles and cyber protection' },
  { id: 's7', name: 'Entertainment Ensemble', icon: '🎭', price: '€60,000', details: 'World-class musicians, celebrity DJs, and private performance artists' },
  { id: 's8', name: 'Marine Adventure Package', icon: '🏄', price: '€35,000', details: 'Submarines, jet skis, diving equipment, and professional instructors' },
];

function parsePrice(price) {
  return parseInt(price.replace(/[€,]/g, ''));
}

export default function Home() {
  const [view, setView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedServices, setSelectedServices] = useState(new Set());
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

  const handleSelectItem = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setView('services');
  };

  const handleToggleService = (serviceId) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) newSet.delete(serviceId);
      else newSet.add(serviceId);
      return newSet;
    });
  };

  const handleBack = () => {
    setView(selectedType === 'yacht' ? 'yachts' : 'jets');
  };

  const handleCheckout = () => {
    alert('Reservation complete!');
    setView('home');
    setSelectedItem(null);
    setSelectedServices(new Set());
    setSelectedType('');
  };

  const handleAddToBasket = (itemId, type) => {
    const items = type === 'yacht' ? yachts : jets;
    const item = items.find(i => i.id === itemId);
    addToBasket(item, type);
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
          basketCount={getBasketCount()}
        />
        {view === 'home' && <Hero onShowYachts={handleShowYachts} onShowJets={handleShowJets} />}
        {view === 'yachts' && (
          <SelectionSection 
            title="Superyacht Collection" 
            items={yachts} 
            type="yacht" 
            onSelect={handleSelectItem}
            onAddToBasket={handleAddToBasket}
          />
        )}
        {view === 'jets' && (
          <SelectionSection 
            title="Private Aviation Fleet" 
            items={jets} 
            type="jet" 
            onSelect={handleSelectItem}
            onAddToBasket={handleAddToBasket}
          />
        )}
        {view === 'services' && (
          <ServicesSection
            services={services}
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
            onBack={handleBack}
            onCheckout={handleCheckout}
            totalPrice={totalPrice}
            selectedItem={selectedItem}
          />
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