import React, { useState } from 'react';

function createLuxuryImage(type, name) {
  if (type.includes('yacht')) {
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='bg${type}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%231a1a1a;stop-opacity:1' /><stop offset='100%' style='stop-color:%232a2a2a;stop-opacity:1' /></linearGradient><linearGradient id='gold${type}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23FFD700;stop-opacity:1' /><stop offset='100%' style='stop-color:%23F7E7CE;stop-opacity:1' /></linearGradient></defs><rect width='800' height='600' fill='url(%23bg${type})'/><path d='M150 350 Q400 250 650 350 L650 450 Q400 400 150 450 Z' fill='url(%23gold${type})' opacity='0.3'/><path d='M200 300 L600 300 L580 280 L220 280 Z' fill='url(%23gold${type})' opacity='0.5'/><circle cx='300' cy='330' r='15' fill='%23FFD700' opacity='0.8'/><circle cx='400' cy='330' r='15' fill='%23FFD700' opacity='0.8'/><circle cx='500' cy='330' r='15' fill='%23FFD700' opacity='0.8'/><text x='400' y='500' text-anchor='middle' fill='%23FFD700' font-family='serif' font-size='28' font-weight='bold'>${name}</text></svg>`.replace(/#/g, '%23');
  } else {
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='bg${type}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%231a1a1a;stop-opacity:1' /><stop offset='100%' style='stop-color:%232a2a2a;stop-opacity:1' /></linearGradient><linearGradient id='gold${type}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23FFD700;stop-opacity:1' /><stop offset='100%' style='stop-color:%23F7E7CE;stop-opacity:1' /></linearGradient></defs><rect width='800' height='600' fill='url(%23bg${type})'/><path d='M200 300 L500 300 L600 250 L600 320 L500 330 L500 350 L450 340 L200 340 L150 320 Z' fill='url(%23gold${type})' opacity='0.3'/><ellipse cx='350' cy='320' rx='200' ry='20' fill='url(%23gold${type})' opacity='0.2'/><circle cx='250' cy='315' r='20' fill='%23FFD700' opacity='0.8'/><circle cx='350' cy='315' r='20' fill='%23FFD700' opacity='0.8'/><circle cx='450' cy='315' r='20' fill='%23FFD700' opacity='0.8'/><text x='400' y='450' text-anchor='middle' fill='%23FFD700' font-family='serif' font-size='28' font-weight='bold'>${name}</text></svg>`.replace(/#/g, '%23');
  }
}

export default function SelectionSection({ title, items, type, onSelect }) {
  return (
    <section className="selection-section">
      <h2 className="section-title">{title}</h2>
      <div className="selection-grid">
        {items.map(item => {
          const imgSrc = `/images/${item.imageType}.png`;
          return (
            <div key={item.id} className="luxury-card">
              <img src={imgSrc} alt={item.name} />
              <div className="luxury-card-content">
                <h3>{item.name}</h3>
                <div className="price">{item.price}/{type === 'yacht' ? 'day' : 'hour'}</div>
                <div className="details">
                  {type === 'yacht' ? (
                    <p>{item.length} • {item.guests} • {item.crew}</p>
                  ) : (
                    <p>{item.range} • {item.passengers}</p>
                  )}
                  <p>{item.details}</p>
                </div>
                <button 
                  className="select-btn"
                  onClick={() => onSelect(item, type)}
                >
                  Select
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 