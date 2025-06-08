document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("id");
    
    if (!orderId) {
        window.location.href = "index.html";
        return;
    }
    
    // Load order details
    loadOrderDetails(orderId);
    
    // Set up button events
    document.getElementById("cancel-order").addEventListener("click", () => {
        if (confirm("Are you sure you want to cancel this order?")) {
            cancelOrder(orderId);
        }
    });
    
    document.getElementById("add-items").addEventListener("click", () => {
        // In a real app, this would open a menu to add items
        alert("Adding items functionality would go here");
    });
    
    document.getElementById("request-payment").addEventListener("click", () => {
        requestPayment(orderId);
    });
});

// In order.js, update the loadOrderDetails function
function loadOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem("wadau-reservations")) || [];
  const order = orders.find(o => o.createdAt === orderId);
  
  if (!order) {
    window.location.href = "index.html";
    return;
  }

  const date = new Date(order.date);
  const formattedDate = date.toLocaleDateString();
  console.log("Order with notes:", order); // Debugging line
  // Display order info
  const orderInfo = document.getElementById("order-info");
  orderInfo.innerHTML = `
    <div class="order-info-grid">
      <img src="../frontend/images/waiter.png" alt="Orders" class="chef-icon">
      <div class="customer-details">
        <h2>${order.name || "Guest"}</h2>
        <div class="order-items-preview">
          ${order.items?.slice(0, 2).map(item => `
            <span>${item.name} (${item.quantity})</span>
          `).join("")}
          ${order.items?.length > 2 ? `<span>+${order.items.length - 2} more</span>` : ''}
        </div>
      </div>
      <div class="order-total">
        <strong>KSh ${order.amount || "0.00"}</strong>
      </div>
      <div class="payment-method">
        <span class="payment-badge ${order.paymentMethod === "Pay Now" || order.paymentStatus === 'paid' ? "payment-paid" : "payment-pending"}">
          ${order.paymentMethod || "Pay on Arrival"}
        </span>
      </div>
      <div class="payment-action">
        <button id="request-payment" class="pay-button ${order.paymentMethod === "Pay Now" || order.paymentStatus === 'paid' ? 'paid' : ''}">
          ${order.paymentMethod === "Pay Now" || order.paymentStatus === 'paid' ? "Paid" : "Request Payment"}
        </button>
      </div>
    </div>
  `;
  
  // Update payment button behavior
  const paymentButton = document.getElementById("request-payment");
  if (paymentButton) {
    if (order.paymentMethod === "Pay Now" || order.paymentStatus === 'paid') {
      paymentButton.textContent = "Paid";
      paymentButton.disabled = true;
      paymentButton.classList.add("paid");
      paymentButton.style.backgroundColor = "black";
    }
  }

  // Display full order items with notes
  const itemsContainer = document.getElementById("items-container");
  if (order.items && order.items.length > 0) {
    itemsContainer.innerHTML = order.items.map(item => `
      <div class="menu-item2">
        <hr class="full-width-line">
        <div class="item-info2">
          <span class="item-name">${item.name}</span>
          ${item.note ? `
            <div class="staff-note" style="margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px; font-size: 14px;">
              ${item.note}
            </div>
          ` : ''}
        </div>
        <div class="item-details2">
          <div class="quantity2">
            <span>${item.quantity}</span>
          </div>
          <span class="price2">Ksh ${(item.price * item.quantity).toFixed(2)}</span>
          <button class="add-to-tray2" data-item-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join('');

    // Add event listeners to remove buttons
    document.querySelectorAll(".add-to-tray2").forEach(button => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        removeItemFromOrder(orderId, e.target.dataset.itemId);
      });
    });
  } else {
    itemsContainer.innerHTML = '<p class="no-items">No items in this order</p>';
  }
}
function cancelOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem("wadau-reservations")) || [];
    const updatedOrders = orders.filter(o => o.createdAt !== orderId);
    
    localStorage.setItem("wadau-reservations", JSON.stringify(updatedOrders));
    window.location.href = "index.html";
}

function removeItemFromOrder(orderId, itemId) {
    const orders = JSON.parse(localStorage.getItem("wadau-reservations")) || [];
    const orderIndex = orders.findIndex(o => o.createdAt === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].items = orders[orderIndex].items.filter(item => item.id !== itemId);
        localStorage.setItem("wadau-reservations", JSON.stringify(orders));
        loadOrderDetails(orderId);
    }
}

function requestPayment(orderId) {
    // In a real app, this would trigger a payment request to the customer
    alert(`Payment request sent for order ${orderId}`);
    
    const paymentButton = document.getElementById("request-payment");
    paymentButton.textContent = "Payment Requested";
    paymentButton.disabled = true;
    paymentButton.style.backgroundColor = "transparent";
}