document.addEventListener('DOMContentLoaded', function() {
    // Ensure cart is properly initialized
    if (typeof cart === 'undefined') {
        console.error('Cart is not defined!');
        return;
    }

    // Back button functionality
    document.getElementById('back-button').addEventListener('click', function() {
        window.history.back();
    });

    // My Tray button in header
    document.getElementById('my-tray').addEventListener('click', function() {
        window.location.href = 'mytray.html';
    });

    // Checkout button - redirect to reservation
    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.items.length === 0) {
            alert('Your tray is empty. Please add items first.');
            return;
        }
        window.location.href = 'reservation.html';
    });

    // Initial render
    updateTrayDisplay();
});

function renderTrayItems() {
    const trayItems = document.getElementById('tray-items');
    trayItems.innerHTML = '';

    if (!cart.items || cart.items.length === 0) {
        trayItems.innerHTML = '<p class="empty-tray">Your tray is empty</p>';
        return;
    }

    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'tray-item';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image || 'images/default.jpg'}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-controls">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <span class="price">KSh ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        trayItems.appendChild(itemElement);
    });

    setupTrayItemControls();
}

function setupTrayItemControls() {
    // Quantity minus buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const item = cart.items.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                cart.updateQuantity(itemId, item.quantity - 1);
                updateTrayDisplay();
            }
        });
    });

    // Quantity plus buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const item = cart.items.find(i => i.id === itemId);
            if (item) {
                cart.updateQuantity(itemId, item.quantity + 1);
                updateTrayDisplay();
            }
        });
    });

    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            cart.removeItem(itemId);
            updateTrayDisplay();
        });
    });
}

function updateTrayDisplay() {
    renderTrayItems();
    updateItemsSummary();
    updateTotalPriceDisplay();
}

function updateItemsSummary() {
    const summaryElement = document.getElementById('items-summary');
    if (!cart.items || cart.items.length === 0) {
        summaryElement.textContent = 'Your selected items will appear here';
        return;
    }

    const itemNames = cart.items.map(item => `${item.name} (${item.quantity})`);
    summaryElement.textContent = itemNames.join(', ');
}

function updateTotalPriceDisplay() {
    const total = cart.getTotal();
    document.getElementById('total-price').textContent = `KSh ${total.toFixed(2)}`;
}