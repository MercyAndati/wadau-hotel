document.addEventListener("DOMContentLoaded", () => {
    // Toggle pause/resume orders
    const pauseButton = document.getElementById("pause-orders");
    pauseButton.addEventListener("click", () => {
        const isPaused = pauseButton.classList.toggle("active");
        localStorage.setItem("ordersPaused", isPaused);
        
        if (isPaused) {
            pauseButton.innerHTML = '<i class="fas fa-play"></i> <span>Resume Orders</span>';
        } else {
            pauseButton.innerHTML = '<i class="fas fa-pause"></i> <span>Pause Orders</span>';
        }
    });
    
    // Initialize pause state
    if (localStorage.getItem("ordersPaused") === "true") {
        pauseButton.classList.add("active");
        pauseButton.innerHTML = '<i class="fas fa-play"></i> <span>Resume Orders</span>';
    }
    
    // Toggle search bar
    const searchToggle = document.getElementById("search-toggle");
    const searchBar = document.querySelector(".search-bar");
    
    searchToggle.addEventListener("click", () => {
        searchBar.style.display = searchBar.style.display === "none" ? "flex" : "none";
    });
    
    document.querySelector(".cancel-search")?.addEventListener("click", () => {
        searchBar.style.display = "none";
    });
    
    // Load and display orders
    loadOrders();
    
    // Sort orders
    document.getElementById("order-sort").addEventListener("change", (e) => {
        loadOrders(e.target.value);
    });
});

function loadOrders(sortBy = "time") {
    const orders = JSON.parse(localStorage.getItem("wadau-reservations")) || [];
    
    // Sort orders
    if (sortBy === "time") {
        orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "size") {
        orders.sort((a, b) => (b.items?.length || 0) - (a.items?.length || 0));
    } else if (sortBy === "status") {
        orders.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
    }
    
    // Update summary
    document.getElementById("total-orders").textContent = orders.length;
    //update the paid orders count:
    document.getElementById("paid-orders").textContent = 
        `${orders.filter(o => o.paymentStatus === 'paid').length} Paid`;
    
    const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);
    document.getElementById("total-amount").textContent = `KSh ${totalAmount.toFixed(2)}`;
    
    // Display orders
    const container = document.getElementById("orders-container");
    container.innerHTML = "";
    
    if (orders.length === 0) {
        container.innerHTML = '<div class="no-orders">No orders available</div>';
        return;
    }
    
    orders.forEach(order => {
        const orderElement = document.createElement("div");
        orderElement.className = "order-item";
        
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = order.time || "N/A";
        
      orderElement.innerHTML = `
          <div class="order-customer">
              <div class="order-customer-name">${order.name || "Guest"}</div>
              <div class="order-customer-details">
                  ${order.phone || "N/A"} | ${formattedDate} | ${formattedTime} | ${order.guests || 1} guests
              </div>
          </div>
          <div class="order-payment">
              <span class="payment-badge ${order.paymentStatus === 'paid' ? "payment-paid" : "payment-pending"}">
                  ${order.paymentMethod || "Pay on Arrival"}
              </span>
          </div>
          <div class="order-status">
              <select class="status-select" data-order-id="${order.createdAt}">
                  <option value="awaiting" ${(!order.status || order.status === "awaiting") ? "selected" : ""}>Awaiting</option>
                  <option value="processing" ${order.status === "processing" ? "selected" : ""}>Processing</option>
                  <option value="completed" ${order.status === "completed" ? "selected" : ""}>Completed</option>
              </select>
          </div>
      `;
        
        // Make customer details clickable
        orderElement.querySelector('.order-customer').addEventListener('click', () => {
            window.location.href = `order.html?id=${order.createdAt}`;
        });
        
        // Handle status select
        const statusSelect = orderElement.querySelector('.status-select');
        statusSelect.addEventListener('change', (e) => {
            e.stopPropagation();
            updateOrderStatus(e.target.dataset.orderId, e.target.value);
        });
        
        container.appendChild(orderElement);
    });
}

function updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem("wadau-reservations")) || [];
    
    if (status === "completed") {
        // Remove completed orders
        const updatedOrders = orders.filter(o => o.createdAt !== orderId);
        localStorage.setItem("wadau-reservations", JSON.stringify(updatedOrders));
        
        // Reload the orders list
        loadOrders();
    } else {
        // Update status for non-completed orders
        const orderIndex = orders.findIndex(o => o.createdAt === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = status;
            localStorage.setItem("wadau-reservations", JSON.stringify(orders));
        }
    }
}