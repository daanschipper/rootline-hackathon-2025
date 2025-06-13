import React from 'react';

export default function ServicesSection({ services, selectedServices, onToggleService, onBack, onCheckout, totalPrice, selectedItem }) {
  return (
    <section className="services-section">
      <div className="selected-item">
        {selectedItem && (
          <>
            <h3>{selectedItem.name}</h3>
            <div>{selectedItem.details}</div>
          </>
        )}
      </div>
      <h2 className="section-title">Bespoke Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <div
            className={`service-card${selectedServices.has(service.id) ? ' selected' : ''}`}
            key={service.id}
            onClick={() => onToggleService(service.id)}
          >
            <div className="service-icon">{service.icon}</div>
            <h4>{service.name}</h4>
            <div className="service-price">{service.price}</div>
            <div className="service-details">{service.details}</div>
          </div>
        ))}
      </div>
      <div className="checkout-section">
        <div className="total-price">Total: {totalPrice}/day</div>
        <button className="cta-button secondary-btn back-btn" onClick={onBack}>Return</button>
        <button className="cta-button primary-btn" onClick={onCheckout}><span>Reserve Now</span></button>
      </div>
    </section>
  );
} 