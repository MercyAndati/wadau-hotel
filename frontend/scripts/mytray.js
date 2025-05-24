// scripts/mytray.js
const transitionDelay = 300;

// Initialize the tray page
document.addEventListener("DOMContentLoaded", () => {
    // Wait for cart to be ready
    if (window.cart) {
        console.log("Cart ready on tray page");
        setupTrayPage();
    } else {
        setTimeout(() => {
            if (window.cart) {
                setupTrayPage();
            } else {
                console.error("Cart not available on tray page");
                showError("Cart system failed to load. Please refresh the page.");
            }
        }, 100);
    }
});

function setupTrayPage() {
    // Set up back button
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }

    // Set up checkout button
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (window.cart.items.length === 0) {
                alert("Your tray is empty. Please add items first.");
                return;
            }
            window.location.href = "reservation.html";
        });
    }

    // Initial render
    updateTrayDisplay();
}

function goBack() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.history.back();
    }, transitionDelay);
}

function renderTrayItems() {
    const trayItems = document.getElementById("tray-items");
    if (!trayItems) return;

    trayItems.innerHTML = "";

    if (!window.cart.items || window.cart.items.length === 0) {
        trayItems.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Your tray is empty</p>';
        return;
    }

    window.cart.items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "menu-item2";
        itemElement.innerHTML = `
            <hr class="full-width-line">
            <div class="item-info2">
                <span class="item-name">${item.name}</span>
                <div class="note-to-chef" style="margin-top: 10px;">
                    <input type="text" placeholder= "Note to Chef" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;"> 
    	         </div>
            </div>
            <div class="item-details2">
                <div class="quantity2">
                    <img src="images/left-arrow.png" alt="Decrease" class="icon" data-action="decrease" data-id="${item.id}">
                    <span id="tray-quantity-${item.id}">${item.quantity}</span>
                    <img src="images/right-arrow.png" alt="Increase" class="icon" data-action="increase" data-id="${item.id}">
                </div>
                <span class="price2">Ksh ${(item.price * item.quantity).toFixed(2)}</span>
                <button class="add-to-tray2" data-action="Remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        trayItems.appendChild(itemElement);
    });

    // Set up event listeners for dynamically created elements
    document.querySelectorAll('[data-action="decrease"]').forEach(button => {
        button.addEventListener('click', (e) => {
            updateTrayQuantity(e.target.dataset.id, -1);
        });
    });

    document.querySelectorAll('[data-action="increase"]').forEach(button => {
        button.addEventListener('click', (e) => {
            updateTrayQuantity(e.target.dataset.id, 1);
        });
    });

    document.querySelectorAll('[data-action="remove"]').forEach(button => {
        button.addEventListener('click', (e) => {
            removeFromTray(e.target.dataset.id);
        });
    });
}

function updateTrayQuantity(itemId, change) {
    const item = window.cart.items.find((i) => i.id === itemId);
    if (item && item.quantity + change > 0) {
        window.cart.updateQuantity(itemId, item.quantity + change);
        updateTrayDisplay();
    }
}

function removeFromTray(itemId) {
    window.cart.removeItem(itemId);
    updateTrayDisplay();
}

function updateTrayDisplay() {
    renderTrayItems();
    updateItemsSummary();
    updateTotalPriceDisplay();
}

function updateItemsSummary() {
    const summaryElement = document.getElementById("items-summary");
    if (!summaryElement) return;

    if (!window.cart.items || window.cart.items.length === 0) {
        summaryElement.textContent = "Your selected items will appear here";
        return;
    }

    const itemNames = window.cart.items.map((item) => `${item.name} (${item.quantity})`);
    summaryElement.textContent = itemNames.join(", ");
}

function updateTotalPriceDisplay() {
    const totalElement = document.getElementById("total-price");
    if (totalElement) {
        const total = window.cart.getTotal();
        totalElement.textContent = `KSh ${total.toFixed(2)}`;
    }
}

function showError(message) {
    const trayItems = document.getElementById("tray-items");
    if (trayItems) {
        trayItems.innerHTML = `<div style="text-align: center; padding: 40px; color: #d32f2f;">${message}</div>`;
    }
}