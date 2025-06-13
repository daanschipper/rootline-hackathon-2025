import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SelectionSection from '../components/SelectionSection';
import ServicesSection from '../components/ServicesSection';

const yachts = [
  { id: 'y1', name: 'Azure Dream', price: '$250,000', length: '120ft', guests: '12 guests', crew: '8 crew', details: 'Luxurious mega yacht with state-of-the-art amenities, infinity pool, and helipad.', imageType: 'yacht1' },
  { id: 'y2', name: 'Golden Horizon', price: '$350,000', length: '150ft', guests: '16 guests', crew: '12 crew', details: 'Ultra-luxury yacht featuring spa, cinema, and multiple entertainment decks.', imageType: 'yacht2' },
  { id: 'y3', name: 'Pearl Majesty', price: '$450,000', length: '180ft', guests: '20 guests', crew: '15 crew', details: 'Spectacular super yacht with beach club, gym, and underwater viewing lounge.', imageType: 'yacht3' },
  { id: 'y4', name: 'Sapphire Seas', price: '$200,000', length: '95ft', guests: '10 guests', crew: '6 crew', details: 'Elegant yacht perfect for intimate gatherings with gourmet kitchen and sun deck.', imageType: 'yacht4' },
];

const jets = [
  { id: 'j1', name: 'Gulfstream G650', price: '$150,000', range: '7,000 nm', passengers: '18 passengers', speed: 'Mach 0.925', details: 'Ultra-long-range business jet with luxurious cabin and advanced technology.', imageType: 'jet1' },
  { id: 'j2', name: 'Bombardier Global 7500', price: '$180,000', range: '7,700 nm', passengers: '19 passengers', speed: 'Mach 0.925', details: 'The flagship of business aviation with four living spaces and dedicated crew rest area.', imageType: 'jet2' },
  { id: 'j3', name: 'Dassault Falcon 8X', price: '$120,000', range: '6,450 nm', passengers: '16 passengers', speed: 'Mach 0.90', details: 'Trijet luxury with exceptional range and the quietest cabin in its class.', imageType: 'jet3' },
  { id: 'j4', name: 'Cessna Citation X+', price: '$80,000', range: '3,460 nm', passengers: '12 passengers', speed: 'Mach 0.935', details: 'The fastest business jet with elegant interior and advanced avionics.', imageType: 'jet4' },
];

const services = [
  { id: 's1', name: 'Luxury Fleet Service', icon: '🚗', price: '$25,000', details: 'Maybach S-Class, Rolls-Royce Phantom, and Bugatti Chiron with professional chauffeurs' },
  { id: 's2', name: 'Helicopter Transfer', icon: '🚁', price: '$50,000', details: 'Private helicopter transfers with champagne service and VIP landing permits' },
  { id: 's3', name: 'Haute Horlogerie Collection', icon: '⌚', price: '$100,000', details: 'Access to exclusive Patek Philippe, Richard Mille, and unique auction pieces' },
  { id: 's4', name: 'Michelin Star Chef Team', icon: '👨‍🍳', price: '$30,000', details: '3-Michelin-starred chef team for personalized culinary experiences' },
  { id: 's5', name: 'Wellness & Beauty Suite', icon: '💆', price: '$40,000', details: 'Celebrity spa therapists, beauty experts, and medical wellness team' },
  { id: 's6', name: 'Elite Security Detail', icon: '🛡️', price: '$80,000', details: 'Former special forces security team with armored vehicles and cyber protection' },
  { id: 's7', name: 'Entertainment Ensemble', icon: '🎭', price: '$60,000', details: 'World-class musicians, celebrity DJs, and private performance artists' },
  { id: 's8', name: 'Marine Adventure Package', icon: '🏄', price: '$35,000', details: 'Submarines, jet skis, diving equipment, and professional instructors' },
];

function parsePrice(price) {
  return parseInt(price.replace(/[^\d]/g, ''));
}

export default function Home() {
  const [view, setView] = useState('home'); // home, yachts, jets, services
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedServices, setSelectedServices] = useState(new Set());

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

  let totalPrice = 0;
  if (selectedItem) totalPrice += parsePrice(selectedItem.price);
  for (const id of selectedServices) {
    const service = services.find(s => s.id === id);
    if (service) totalPrice += parsePrice(service.price);
  }
  totalPrice = `$${totalPrice.toLocaleString()}`;

  return (
    <>
      <Header
        onLogoClick={() => setView('home')}
        onShowYachts={handleShowYachts}
        onShowJets={handleShowJets}
      />
      {view === 'home' && <Hero onShowYachts={handleShowYachts} onShowJets={handleShowJets} />}
      {view === 'yachts' && (
        <SelectionSection title="Superyacht Collection" items={yachts} type="yacht" onSelect={handleSelectItem} />
      )}
      {view === 'jets' && (
        <SelectionSection title="Private Aviation Fleet" items={jets} type="jet" onSelect={handleSelectItem} />
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
    </>
  );
} 