// scripts/subscription.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Try to get name from URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('name');
    
    // 2. If not in URL, get from localStorage reservations
    if (!name) {
        try {
            const reservations = JSON.parse(localStorage.getItem('wadau-reservations')) || [];
            if (reservations.length > 0) {
                // Get the most recent reservation
                const latestReservation = reservations[reservations.length - 1];
                name = latestReservation.name || 'Guest';
                
                // Also store reservation details for potential future use
                localStorage.setItem('current-reservation', JSON.stringify(latestReservation));
            } else {
                name = 'Guest';
            }
        } catch (e) {
            console.error("Error reading reservations:", e);
            name = 'Guest';
        }
    }
    
    // 3. Extract first name for personalization
    const firstName = name.split(' ')[0];
    
    // 4. Update welcome message with reservation details
    updateWelcomeMessage(firstName);
    
    // 5. Set up home button functionality
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            // Clear cart when going home
            if (window.cart) {
                window.cart.items = [];
                window.cart.saveToStorage();
            }
            window.location.href = 'index.html';
        });
    }
    
    // 6. Set up subscription checkbox
    const subscribeCheckbox = document.getElementById('subscribe-checkbox');
    if (subscribeCheckbox) {
        // Load saved preference
        subscribeCheckbox.checked = localStorage.getItem('subscribedToOffers') === 'true';
        
        // Save on change
        subscribeCheckbox.addEventListener('change', function() {
            localStorage.setItem('subscribedToOffers', this.checked.toString());
            
            // If subscribing, save the reservation email if available
            if (this.checked) {
                saveSubscriberInfo(name);
            }
        });
    }
    
    // 7. Add any additional reservation details to the page
    displayReservationSummary();
});

function updateWelcomeMessage(firstName) {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.innerHTML = `
            <p id="welcome-message">Dear ${firstName}, welcome to the Wadau Experience. </p>
            <p>We're looking forward to your arrival.</p>
        `;
    }
}

function saveSubscriberInfo(name) {
    try {
        const reservation = JSON.parse(localStorage.getItem('current-reservation')) || {};
        const subscriberData = {
            name: name,
            phone: reservation.phone || '',
            email: reservation.email || '',
            subscribeDate: new Date().toISOString(),
            preferences: [] // Can be populated with user preferences later
        };
        
        // Save to subscribers list
        const subscribers = JSON.parse(localStorage.getItem('wadau-subscribers')) || [];
        subscribers.push(subscriberData);
        localStorage.setItem('wadau-subscribers', JSON.stringify(subscribers));
    } catch (e) {
        console.error("Error saving subscriber info:", e);
    }
}