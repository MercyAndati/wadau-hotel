const transitionDelay = 300;

document.addEventListener("DOMContentLoaded", () => {
  if (window.cart) {
    setupTrayPage();
  } else {
    setTimeout(() => {
      if (window.cart) {
        setupTrayPage();
      } else {
        showError("Cart system failed to load. Please refresh the page.");
      }
    }, 100);
  }
  // Back button handlers
  document.getElementById('back-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });

  document.querySelector('.back')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });
});

function setupTrayPage() {
  const backButton = document.getElementById("back-button");
  if (backButton) backButton.addEventListener("click", goBack);

  const checkoutButton = document.getElementById("checkout-button");
  const mobileCheckoutButton = document.getElementById("mobile-checkout-button");

  const handleCheckout = () => {
    if (window.cart.items.length === 0) {
      alert("Your tray is empty. Please add items first.");
      return;
    }

    localStorage.setItem(
      "current-reservation",
      JSON.stringify({
        amount: window.cart.getTotal().toFixed(2),
      })
    );

    window.location.href = "reservation.html";
  };

  if (checkoutButton) checkoutButton.addEventListener("click", handleCheckout);
  if (mobileCheckoutButton) mobileCheckoutButton.addEventListener("click", handleCheckout);

  updateTrayDisplay();
}

function goBack() {
  window.location.href = "index.html";
}

function renderTrayItems() {
  const trayItems = document.getElementById("tray-items");
  if (!trayItems) return;

  if (window.cart.items.length === 0) {
    trayItems.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Your tray is empty</p>';
    return;
  }

 if (window.innerWidth <= 768) {
    trayItems.innerHTML = `
      <nav class="menu-list">
        ${window.cart.items
          .map(
            (item, index) => `
              <div class="menu-item" onclick="handleTrayItemClick('${item.id}')">
                  <span>${item.name} (${item.quantity}) - Ksh ${(item.price * item.quantity).toFixed(2)}</span>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="event.stopPropagation(); removeFromTray('${item.id}')" 
                            style="background: none; color: black; border: 1px solid black; padding: 5px 10px; border-radius: 15px; font-size: 12px; cursor: pointer;">
                      Remove
                    </button>
                    <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
                  </div>
              </div>
              ${index < window.cart.items.length - 1 ? '<hr class="full-width-line">' : ""}
            `,
          )
          .join("")}
      </nav>
    `;
} else {
    // Desktop rendering (unchanged)
    trayItems.innerHTML = window.cart.items
      .map(
        (item) => `
          <div class="menu-item2">
              <hr class="full-width-line">
              <div class="item-info2">
                  <span class="item-name">${item.name}</span>
                  <div class="note-to-chef" style="margin-top: 10px;">
                      <input type="text" placeholder="Note to Chef" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;"> 
                  </div>
              </div>
              <div class="item-details2">
                  <div class="quantity2">
                      <img src="images/left-arrow.png" alt="Decrease" class="icon" data-action="decrease" data-id="${item.id}">
                      <span id="tray-quantity-${item.id}">${item.quantity}</span>
                      <img src="images/right-arrow.png" alt="Increase" class="icon" data-action="increase" data-id="${item.id}">
                  </div>
                  <span class="price2">Ksh ${(item.price * item.quantity).toFixed(2)}</span>
                  <button class="add-to-tray2" data-action="remove" data-id="${item.id}">Remove</button>
              </div>
          </div>
        `,
      )
      .join("");

    document.querySelectorAll('[data-action="decrease"]').forEach((button) => {
      button.addEventListener("click", (e) => updateTrayQuantity(e.target.dataset.id, -1));
    });

    document.querySelectorAll('[data-action="increase"]').forEach((button) => {
      button.addEventListener("click", (e) => updateTrayQuantity(e.target.dataset.id, 1));
    });

    document.querySelectorAll('[data-action="remove"]').forEach((button) => {
      button.addEventListener("click", (e) => removeFromTray(e.target.dataset.id));
    });
  }
}

// Update the handleTrayItemClick function
function handleTrayItemClick(itemId) {
  // Find the item's category path
  const categoryPath = findItemCategoryPath(itemId);
  
  if (!categoryPath) {
    console.error("Could not find category path for item:", itemId);
    return;
  }

  // Store the item ID to show
  localStorage.setItem("showItemId", itemId);
  
  // Build the URL with the correct category path
  let url = "category.html?";
  
  if (categoryPath.subSubcategoryId) {
    url += `category=${categoryPath.categoryId}&subcategory=${categoryPath.subcategoryId}&subsubcategory=${categoryPath.subSubcategoryId}`;
  } else if (categoryPath.subcategoryId) {
    url += `category=${categoryPath.categoryId}&subcategory=${categoryPath.subcategoryId}`;
  } else {
    url += `category=${categoryPath.categoryId}`;
  }
  
  // Navigate to the correct category page
  window.location.href = url;
}

function updateTrayQuantity(itemId, change) {
  const item = window.cart.items.find(i => i.id === itemId);
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
  if (summaryElement) {
    summaryElement.textContent =
      window.cart.items.length === 0
        ? "Your selected items will appear here"
        : window.cart.items.map(item => `${item.name} (${item.quantity})`).join(", ");
  }
}

function updateTotalPriceDisplay() {
  const totalElement = document.getElementById("total-price");
  if (totalElement) {
    totalElement.textContent = `KSh ${window.cart.getTotal().toFixed(2)}`;
  }
}

function showError(message) {
  const trayItems = document.getElementById("tray-items");
  if (trayItems) {
    trayItems.innerHTML = `<div style="text-align: center; padding: 40px; color: #d32f2f;">${message}</div>`;
  }
}

// Helper function to find item by ID
function findItemById(itemId) {
  for (const category of window.menuData.categories) {
    if (category.items) {
      const item = category.items.find((i) => i.id === itemId);
      if (item) return item;
    }

    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.items) {
          const item = subcategory.items.find((i) => i.id === itemId);
          if (item) return item;
        }

        if (subcategory.subcategories) {
          for (const subSub of subcategory.subcategories) {
            if (subSub.items) {
              const item = subSub.items.find((i) => i.id === itemId);
              if (item) return item;
            }
          }
        }
      }
    }
  }
  return null;
}
// Add this helper function to find the category path for an item
function findItemCategoryPath(itemId) {
  for (const category of window.menuData.categories) {
    // Check main category items
    if (category.items) {
      const item = category.items.find(i => i.id === itemId);
      if (item) return { categoryId: category.id };
    }

    // Check subcategories
    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        // Check subcategory items
        if (subcategory.items) {
          const item = subcategory.items.find(i => i.id === itemId);
          if (item) return { 
            categoryId: category.id, 
            subcategoryId: subcategory.id 
          };
        }

        // Check sub-subcategories
        if (subcategory.subcategories) {
          for (const subSub of subcategory.subcategories) {
            if (subSub.items) {
              const item = subSub.items.find(i => i.id === itemId);
              if (item) return {
                categoryId: category.id,
                subcategoryId: subcategory.id,
                subSubcategoryId: subSub.id
              };
            }
          }
        }
      }
    }
  }
  return null;
}

// Make functions globally available
window.handleTrayItemClick = handleTrayItemClick;
window.removeFromTray = removeFromTray;

// Re-render on window resize
window.addEventListener("resize", updateTrayDisplay);
