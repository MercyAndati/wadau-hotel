document.addEventListener('DOMContentLoaded', function() {
    // Back button
    document.getElementById('back-button').addEventListener('click', function() {
        window.history.back();
    });

    // Payment buttons
    document.querySelector('.paynow').addEventListener('click', function() {
        processReservation('Pay Now');
    });

    document.querySelector('.paylater').addEventListener('click', function() {
        processReservation('Pay on Arrival');
    });

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
});

function processReservation(paymentMethod) {
    const form = document.getElementById('reservation-form');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const mpesa = document.getElementById('m-pesa').value;

    if (!name || !phone || !date || !time || !guests || !mpesa) {
        alert('Please fill in all required fields');
        return;
    }

    const reservation = {
        name: name,
        phone: phone,
        date: date,
        time: time,
        guests: guests,
        mpesa: mpesa,
        paymentMethod: paymentMethod,
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Redirect to subscription page
    window.location.href = 'subscription.html';
}