// scripts/reservation.js
document.addEventListener('DOMContentLoaded', function() {
    // Set up back/cancel button
    const cancelButton = document.querySelector('.checkout-cancel-link');
    if (cancelButton) {
        cancelButton.addEventListener('click', goBack);
    }
     // Set up back button
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }
    // Set up payment buttons
    document.querySelector('.paynow')?.addEventListener('click', function() {
        processReservation('Pay Now');
    });

    document.querySelector('.paylater')?.addEventListener('click', function() {
        processReservation('Pay on Arrival');
    });

    // Set min date to today
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Add input validation
    setupFormValidation();
});

function goBack() {
    window.history.back();
}

function processReservation(paymentMethod) {
    const form = document.querySelector('.checkout-right form');
    if (!form) return;

    const inputs = form.querySelectorAll('.checkout-input');
    const formData = {};

    // Validate all fields are filled
    let isValid = true;
    inputs.forEach(input => {
        formData[input.placeholder.toLowerCase().replace(/[^a-z]+/g, '')] = input.value;
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }

    // Get existing reservation data (including amount)
    const existingData = JSON.parse(localStorage.getItem('current-reservation')) || {};
    
    const reservation = {
        ...existingData, // This includes the amount from mytray
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.arrivaltime,
        guests: formData.noofguests,
        paymentMethod: paymentMethod,
        createdAt: new Date().toISOString()
    };

    // Save to localStorage temporarily
    localStorage.setItem('current-reservation', JSON.stringify(reservation));

    if (paymentMethod === 'Pay Now') {
        window.location.href = 'payment.html';
    } else {
        // For "Pay on Arrival", save directly
        const reservations = JSON.parse(localStorage.getItem('wadau-reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('wadau-reservations', JSON.stringify(reservations));
        window.location.href = 'subscription.html';
    }
}

function setupFormValidation() {
    const form = document.querySelector('.checkout-right form');
    if (!form) return;

    const inputs = form.querySelectorAll('.checkout-input');
    
    inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });

        // Clear error on focus
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });

    // Special validation for phone numbers
    const phoneInput = document.querySelector('input[placeholder="Phone"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Allows numbers and + character
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
    }
}