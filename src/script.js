// Data with improved image handling
const yachts = [
    {
        id: 'y1',
        name: 'Azure Dream',
        price: '$250,000',
        length: '120ft',
        guests: '12 guests',
        crew: '8 crew',
        details: 'Luxurious mega yacht with state-of-the-art amenities, infinity pool, and helipad.',
        imageType: 'yacht1'
    },
    {
        id: 'y2',
        name: 'Golden Horizon',
        price: '$350,000',
        length: '150ft',
        guests: '16 guests',
        crew: '12 crew',
        details: 'Ultra-luxury yacht featuring spa, cinema, and multiple entertainment decks.',
        imageType: 'yacht2'
    },
    {
        id: 'y3',
        name: 'Pearl Majesty',
        price: '$450,000',
        length: '180ft',
        guests: '20 guests',
        crew: '15 crew',
        details: 'Spectacular super yacht with beach club, gym, and underwater viewing lounge.',
        imageType: 'yacht3'
    },
    {
        id: 'y4',
        name: 'Sapphire Seas',
        price: '$200,000',
        length: '95ft',
        guests: '10 guests',
        crew: '6 crew',
        details: 'Elegant yacht perfect for intimate gatherings with gourmet kitchen and sun deck.',
        imageType: 'yacht4'
    }
];

const jets = [
    {
        id: 'j1',
        name: 'Gulfstream G650',
        price: '$150,000',
        range: '7,000 nm',
        passengers: '18 passengers',
        speed: 'Mach 0.925',
        details: 'Ultra-long-range business jet with luxurious cabin and advanced technology.',
        imageType: 'jet1'
    },
    {
        id: 'j2',
        name: 'Bombardier Global 7500',
        price: '$180,000',
        range: '7,700 nm',
        passengers: '19 passengers',
        speed: 'Mach 0.925',
        details: 'The flagship of business aviation with four living spaces and dedicated crew rest area.',
        imageType: 'jet2'
    },
    {
        id: 'j3',
        name: 'Dassault Falcon 8X',
        price: '$120,000',
        range: '6,450 nm',
        passengers: '16 passengers',
        speed: 'Mach 0.90',
        details: 'Trijet luxury with exceptional range and the quietest cabin in its class.',
        imageType: 'jet3'
    },
    {
        id: 'j4',
        name: 'Cessna Citation X+',
        price: '$80,000',
        range: '3,460 nm',
        passengers: '12 passengers',
        speed: 'Mach 0.935',
        details: 'The fastest business jet with elegant interior and advanced avionics.',
        imageType: 'jet4'
    }
];

const services = [
    {
        id: 's1',
        name: 'Luxury Fleet Service',
        icon: '🚗',
        price: '$25,000',
        details: 'Maybach S-Class, Rolls-Royce Phantom, and Bugatti Chiron with professional chauffeurs'
    },
    {
        id: 's2',
        name: 'Helicopter Transfer',
        icon: '🚁',
        price: '$50,000',
        details: 'Private helicopter transfers with champagne service and VIP landing permits'
    },
    {
        id: 's3',
        name: 'Haute Horlogerie Collection',
        icon: '⌚',
        price: '$100,000',
        details: 'Access to exclusive Patek Philippe, Richard Mille, and unique auction pieces'
    },
    {
        id: 's4',
        name: 'Michelin Star Chef Team',
        icon: '👨‍🍳',
        price: '$30,000',
        details: '3-Michelin-starred chef team for personalized culinary experiences'
    },
    {
        id: 's5',
        name: 'Wellness & Beauty Suite',
        icon: '💆',
        price: '$40,000',
        details: 'Celebrity spa therapists, beauty experts, and medical wellness team'
    },
    {
        id: 's6',
        name: 'Elite Security Detail',
        icon: '🛡️',
        price: '$80,000',
        details: 'Former special forces security team with armored vehicles and cyber protection'
    },
    {
        id: 's7',
        name: 'Entertainment Ensemble',
        icon: '🎭',
        price: '$60,000',
        details: 'World-class musicians, celebrity DJs, and private performance artists'
    },
    {
        id: 's8',
        name: 'Marine Adventure Package',
        icon: '🏄',
        price: '$35,000',
        details: 'Submarines, jet skis, diving equipment, and professional instructors'
    }
];

let selectedItem = null;
let selectedServices = new Set();
let currentType = '';

// Function to create luxury SVG images
function createLuxuryImage(type, name) {
    // Create elegant SVG images with gradient backgrounds
    if (type.includes('yacht')) {
        return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
            <defs>
                <linearGradient id="bg${type}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:%231a1a1a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:%232a2a2a;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="gold${type}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:%23FFD700;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:%23F7E7CE;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(%23bg${type})"/>
            <path d="M150 350 Q400 250 650 350 L650 450 Q400 400 150 450 Z" fill="url(%23gold${type})" opacity="0.3"/>
            <path d="M200 300 L600 300 L580 280 L220 280 Z" fill="url(%23gold${type})" opacity="0.5"/>
            <circle cx="300" cy="330" r="15" fill="%23FFD700" opacity="0.8"/>
            <circle cx="400" cy="330" r="15" fill="%23FFD700" opacity="0.8"/>
            <circle cx="500" cy="330" r="15" fill="%23FFD700" opacity="0.8"/>
            <text x="400" y="500" text-anchor="middle" fill="%23FFD700" font-family="serif" font-size="28" font-weight="bold">${name}</text>
        </svg>`.replace(/#/g, '%23');
    } else {
        return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
            <defs>
                <linearGradient id="bg${type}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:%231a1a1a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:%232a2a2a;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="gold${type}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:%23FFD700;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:%23F7E7CE;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(%23bg${type})"/>
            <path d="M200 300 L500 300 L600 250 L600 320 L500 330 L500 350 L450 340 L200 340 L150 320 Z" fill="url(%23gold${type})" opacity="0.3"/>
            <ellipse cx="350" cy="320" rx="200" ry="20" fill="url(%23gold${type})" opacity="0.2"/>
            <circle cx="250" cy="315" r="20" fill="%23FFD700" opacity="0.8"/>
            <circle cx="350" cy="315" r="20" fill="%23FFD700" opacity="0.8"/>
            <circle cx="450" cy="315" r="20" fill="%23FFD700" opacity="0.8"/>
            <text x="400" y="450" text-anchor="middle" fill="%23FFD700" font-family="serif" font-size="28" font-weight="bold">${name}</text>
        </svg>`.replace(/#/g, '%23');
    }
}

// Navigation Functions
function showHome() {
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('yachts-section').style.display = 'none';
    document.getElementById('jets-section').style.display = 'none';
    document.getElementById('services-section').style.display = 'none';
}

function showYachts() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('yachts-section').style.display = 'block';
    document.getElementById('jets-section').style.display = 'none';
    document.getElementById('services-section').style.display = 'none';
    currentType = 'yacht';
    renderYachts();
}

function showJets() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('yachts-section').style.display = 'none';
    document.getElementById('jets-section').style.display = 'block';
    document.getElementById('services-section').style.display = 'none';
    currentType = 'jet';
    renderJets();
}

// Render Functions
function renderYachts() {
    const grid = document.getElementById('yachts-grid');
    grid.innerHTML = yachts.map(yacht => {
        let imgSrc;
        if (yacht.id === 'y1') {
            imgSrc = 'src/images/yacht1.png';
        } else {
            imgSrc = createLuxuryImage(yacht.imageType, yacht.name);
        }
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
    const grid = document.getElementById('jets-grid');
    grid.innerHTML = jets.map(jet => `
        <div class="luxury-card" onclick="selectItem('${jet.id}', 'jet')">
            <img src="${createLuxuryImage(jet.imageType, jet.name)}" alt="${jet.name}">
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
    `).join('');
}

function selectItem(itemId, type) {
    event.stopPropagation();
    const items = type === 'yacht' ? yachts : jets;
    selectedItem = items.find(item => item.id === itemId);
    selectedServices.clear();
    showServices();
}

function showServices() {
    document.getElementById('yachts-section').style.display = 'none';
    document.getElementById('jets-section').style.display = 'none';
    document.getElementById('services-section').style.display = 'block';

    const selectedDiv = document.getElementById('selected-item');
    selectedDiv.innerHTML = `
        <h3>${selectedItem.name}</h3>
        <p>${selectedItem.price}/${currentType === 'yacht' ? 'day' : 'hour'}</p>
    `;

    renderServices();
    updateTotal();
}

function renderServices() {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = services.map(service => `
        <div class="service-card ${selectedServices.has(service.id) ? 'selected' : ''}" onclick="toggleService('${service.id}')">
            <div class="service-icon">${service.icon}</div>
            <h4>${service.name}</h4>
            <div class="service-price">${service.price}/day</div>
            <div class="service-details">${service.details}</div>
        </div>
    `).join('');
}

function toggleService(serviceId) {
    if (selectedServices.has(serviceId)) {
        selectedServices.delete(serviceId);
    } else {
        selectedServices.add(serviceId);
    }
    renderServices();
    updateTotal();
}

function updateTotal() {
    let total = parseInt(selectedItem.price.replace(/[$,]/g, ''));

    selectedServices.forEach(serviceId => {
        const service = services.find(s => s.id === serviceId);
        total += parseInt(service.price.replace(/[$,]/g, ''));
    });

    document.getElementById('total-price').textContent = `Total: $${total.toLocaleString()}/day`;
}

function goBack() {
    if (currentType === 'yacht') {
        showYachts();
    } else {
        showJets();
    }
}

function proceedToCheckout() {
    alert('Your reservation has been confirmed. Our private concierge team will contact you within 1 hour to arrange every detail of your luxury experience.');
}

// Optional: Add real images for local development
// To use real images, create an 'images' folder and update the image paths:
// Example: Replace createLuxuryImage() calls with:
// <img src="images/yacht1.jpg" alt="${yacht.name}">
// <img src="images/jet1.jpg" alt="${jet.name}">

// Ensure DOM is loaded before executing
window.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    showHome();
});