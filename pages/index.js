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

function renderYachts() {
  return yachts.map(yacht => {
    const imgSrc = yacht.id === 'y1' ? '/images/yacht1.png' : `/images/${yacht.imageType}.png`;
    return `
      <div class="luxury-card" onclick="selectItem('${yacht.id}', 'yacht')">
        <img src="${imgSrc}" alt="${yacht.name}">
        <div class="luxury-card-content">
          <h3>${yacht.name}</h3>
          <div class="price">${yacht.price}/day</div>
          <div class="details">
            <p>${yacht.length} • ${yacht.guests} • ${yacht.crew}</p>
            <p>${yacht.details}</p>
          </div>
          <button class="select-btn">Select This Yacht</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderJets() {
  return jets.map(jet => {
    const imgSrc = `/images/${jet.imageType}.png`;
    return `
      <div class="luxury-card" onclick="selectItem('${jet.id}', 'jet')">
        <img src="${imgSrc}" alt="${jet.name}">
        <div class="luxury-card-content">
          <h3>${jet.name}</h3>
          <div class="price">${jet.price}/hour</div>
          <div class="details">
            <p>${jet.range} • ${jet.passengers}</p>
            <p>Max Speed: ${jet.speed}</p>
            <p>${jet.details}</p>
          </div>
          <button class="select-btn">Select This Jet</button>
        </div>
      </div>
    `;
  }).join('');
}

export default function Home() {
  const [view, setView] = useState('home'); // home, yachts, jets, services, terms
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
        <SelectionSection title="Superyacht Collection" items={yachts} type="yacht" onSelect={handleSelectItem} renderItems={renderYachts} />
      )}
      {view === 'jets' && (
        <SelectionSection title="Private Aviation Fleet" items={jets} type="jet" onSelect={handleSelectItem} renderItems={renderJets} />
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
      {view === 'terms' && (
        <section className="terms-section">
          <div className="terms-container">
            <h2 className="section-title">Terms & Conditions</h2>
            <div className="terms-content">
              <h3>Zenyth Luxury Rentals – Terms & Conditions</h3>
              <p>Last updated: 13 June 2025</p>
              <h4>1. Introduction</h4>
              <p>Welcome to Zenyth Luxury Rentals ("Zenyth", "we", "us", or "our"). These Terms & Conditions ("Terms") govern the relationship between Zenyth and any individual or entity ("Client", "you", or "your") who books, pays for, or otherwise uses our luxury rental products or services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.</p>
              <h4>2. Definitions</h4>
              <p>Event: The specific date-bounded occasion for which the Client has reserved our Services.</p>
              <p>Payout: The remittance of funds owed by Zenyth to a Host, Vendor, or Partner following the successful completion of an Event.</p>
              <p>Chargeback: A reversal of funds initiated by the Client's payment provider or card issuer.</p>
              <p>Working Day: Any day other than a weekend or public holiday in the jurisdiction where Zenyth is registered.</p>
              <h4>3. Booking & Payment</h4>
              <p>Booking Confirmation: To secure your reservation, full payment is required immediately upon checkout. Your booking will not be confirmed until the payment has been successfully processed. By proceeding to checkout, you agree to pay the total amount due at the time of booking. Failure to complete payment may result in the loss of your selected reservation.</p>
              <p>Accepted Payment Methods: We accept major credit and debit cards, iDeal, and other payment methods listed on our website.</p>
              <p>Currency: All prices are shown and payable in the currency indicated at the time of booking. Conversions and bank fees are your responsibility.</p>
              <h4>4. Payout Policy</h4>
              <p>Post-Event Disbursement: Zenyth disburses any Payout only after the Event has taken place and Zenyth has verified its successful completion. Verification may include, but is not limited to, confirmed check-in/out records, signed delivery receipts, or event completion reports.</p>
              <p>Payout Window: Once verified, Payouts are initiated within five (5) working days. Bank processing times may affect the exact receipt date.</p>
              <h4>5. Support & Communication</h4>
              <p>Concierge Line: For immediate assistance, Clients may call our 24/7 concierge line at +1 800 ZENITH LX.</p>
              <p>Response Time: We aim to answer all calls within 60 seconds and resolve urgent issues within two (2) hours.</p>
              <p>Written Support: Email queries sent to support@zenithlux.com will receive a response within one (1) working day.</p>
              <h4>6. Responsibility & Chargebacks</h4>
              <p>Zenyth's Responsibility: We assume full responsibility for all support matters related to your booking. If any part of our Service fails to meet the agreed standard, we will remediate, replace, or refund at our discretion and at no additional cost to you.</p>
              <p>Chargeback Handling: In the event of a Chargeback, Zenyth will manage the dispute process directly with the payment provider. We will gather all necessary documentation and evidence, communicate with the Client and the issuing bank, and accept full financial responsibility for legitimate Chargebacks where our Service is proven deficient.</p>
              <p>Client Cooperation: You agree to provide timely information and documentation reasonably requested by Zenyth to investigate and resolve any issue.</p>
              <h4>7. Client Obligations</h4>
              <p>You warrant that all information provided to Zenyth is accurate and complete.</p>
              <p>You agree that all attendees will respect the property, adhere to venue rules, and comply with local laws.</p>
              <p>You indemnify Zenyth against third-party claims arising from your negligence or breach of these Terms.</p>
              <h4>8. Limitations of Liability</h4>
              <p>Except in cases of gross negligence, fraud, or willful misconduct, Zenyth's total liability shall not exceed the total amount paid by you for the specific Event giving rise to the claim.</p>
              <h4>9. Cancellations & Amendments</h4>
              <p>Client-Initiated Cancellation: Reservation deposits are non-refundable. Additional refund eligibility is detailed in the specific product policy presented at checkout.</p>
              <p>Zenyth-Initiated Cancellation: If Zenyth must cancel for reasons beyond our control (e.g., force majeure), you will receive a full refund of all amounts paid.</p>
              <h4>10. Governing Law & Jurisdiction</h4>
              <p>These Terms are governed by the laws of the jurisdiction in which Zenyth is incorporated, without regard to conflict-of-law provisions. Any dispute shall be resolved exclusively in the competent courts of that jurisdiction.</p>
              <h4>11. Severability</h4>
              <p>If any provision of these Terms is held invalid, the remaining provisions shall remain in full force and effect.</p>
              <h4>12. Entire Agreement</h4>
              <p>These Terms constitute the entire agreement between you and Zenyth regarding the Services and supersede all prior agreements.</p>
              <h4>13. Contact Information</h4>
              <p>Zenyth Luxury Rentals</p>
              <p>Website: https://www.zenithlux.com</p>
              <p>Concierge Line: +1 800 ZENITH LX</p>
              <p>Email: support@zenithlux.com</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
} 