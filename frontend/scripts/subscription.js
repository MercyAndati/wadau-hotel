document.addEventListener('DOMContentLoaded', function() {
    // 1. get name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('name');
    
    // 2. If not in URL, get from localStorage
    if (!name) {
        try {
            const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            if (reservations.length > 0) {
                // Get the most recent reservation
                const latestReservation = reservations[reservations.length - 1];
                name = latestReservation.name || 'Guest';
            } else {
                name = 'Guest';
            }
        } catch (e) {
            console.error("Error reading reservations:", e);
            name = 'Guest';
        }
    }
    
    // 3. Extract first name
    const firstName = name.split(' ')[0];
    
    // 4. Update welcome message
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.innerHTML = `Dear ${firstName}, welcome to the Wadau Experience.<br>We're looking forward to your arrival.`;
    
    // 5. Home button functionality
    document.getElementById('home-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // 6. Subscription checkbox
    const subscribeCheckbox = document.getElementById('subscribe-checkbox');
    subscribeCheckbox.addEventListener('change', function() {
        localStorage.setItem('subscribedToOffers', this.checked.toString());
    });
    
    // 7. Set initial checkbox state
    subscribeCheckbox.checked = localStorage.getItem('subscribedToOffers') === 'true';
});