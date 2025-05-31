const transitionDelay = 300

document.addEventListener("DOMContentLoaded", () => {
  console.log("MyTray page loaded")
  console.log("Cart available:", !!window.cart)
  console.log("Cart items:", window.cart ? window.cart.items : "No cart")

  if (window.cart) {
    setupTrayPage()
  } else {
    setTimeout(() => {
      if (window.cart) {
        setupTrayPage()
      } else {
        showError("Cart system failed to load. Please refresh the page.")
      }
    }, 100)
  }
})

function setupTrayPage() {
  console.log("Setting up tray page")
  const backButton = document.getElementById("back-button")
  if (backButton) backButton.addEventListener("click", goBack)

  const checkoutButton = document.getElementById("checkout-button")
  const mobileCheckoutButton = document.getElementById("mobile-checkout-button")

  const handleCheckout = () => {
    if (window.cart.items.length === 0) {
      alert("Your tray is empty. Please add items first.")
      return
    }

    localStorage.setItem(
      "current-reservation",
      JSON.stringify({
        amount: window.cart.getTotal().toFixed(2),
      }),
    )

    window.location.href = "reservation.html"
  }

  if (checkoutButton) checkoutButton.addEventListener("click", handleCheckout)
  if (mobileCheckoutButton) mobileCheckoutButton.addEventListener("click", handleCheckout)

  updateTrayDisplay()
}

function goBack() {
  document.body.style.opacity = 0
  setTimeout(() => window.history.back(), transitionDelay)
}

function renderTrayItems() {
  const trayItems = document.getElementById("tray-items")
  if (!trayItems) {
    console.error("Tray items container not found")
    return
  }

  console.log("Rendering tray items, cart length:", window.cart.items.length)
  console.log("Window width:", window.innerWidth)

  if (window.cart.items.length === 0) {
    trayItems.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Your tray is empty</p>'
    return
  }

  // Check if mobile view
  if (window.innerWidth <= 768) {
    console.log("Rendering mobile view")
    // Mobile view - use menu-list format
    trayItems.innerHTML = `
      <nav class="menu-list">
        ${window.cart.items
          .map(
            (item, index) => `
              <div class="menu-item" onclick="goToItemDetails('${item.id}')">
                  <span>${item.name} (${item.quantity}) - Ksh ${(item.price * item.quantity).toFixed(2)}</span>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="event.stopPropagation(); removeFromTray('${item.id}')" 
                            style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 15px; font-size: 12px; cursor: pointer;">
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
    `
  } else {
    console.log("Rendering desktop view")
    // Desktop view - keep existing format
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
      .join("")

    // Add event listeners for desktop view
    document.querySelectorAll('[data-action="decrease"]').forEach((button) => {
      button.addEventListener("click", (e) => updateTrayQuantity(e.target.dataset.id, -1))
    })

    document.querySelectorAll('[data-action="increase"]').forEach((button) => {
      button.addEventListener("click", (e) => updateTrayQuantity(e.target.dataset.id, 1))
    })

    document.querySelectorAll('[data-action="remove"]').forEach((button) => {
      button.addEventListener("click", (e) => removeFromTray(e.target.dataset.id))
    })
  }
}

function goToItemDetails(itemId) {
  // Find the item in the cart to get its details
  const cartItem = window.cart.items.find((item) => item.id === itemId)
  if (!cartItem) return

  // Find the original item data to get category information
  const originalItem = findItemById(itemId)
  if (!originalItem) return

  // Navigate to the item's category page
  const categoryInfo = findItemCategory(itemId)
  if (categoryInfo) {
    let url = `category.html?category=${categoryInfo.categoryId}`
    if (categoryInfo.subcategoryId) {
      url += `&subcategory=${categoryInfo.subcategoryId}`
    }
    if (categoryInfo.subSubcategoryId) {
      url += `&subsubcategory=${categoryInfo.subSubcategoryId}`
    }

    document.body.style.opacity = 0
    setTimeout(() => {
      window.location.href = url
    }, transitionDelay)
  }
}

function findItemById(itemId) {
  if (!window.menuData) return null

  for (const category of window.menuData.categories) {
    if (category.items) {
      const item = category.items.find((i) => i.id === itemId)
      if (item) return item
    }

    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.items) {
          const item = subcategory.items.find((i) => i.id === itemId)
          if (item) return item
        }

        if (subcategory.subcategories) {
          for (const subSub of subcategory.subcategories) {
            if (subSub.items) {
              const item = subSub.items.find((i) => i.id === itemId)
              if (item) return item
            }
          }
        }
      }
    }
  }
  return null
}

function findItemCategory(itemId) {
  if (!window.menuData) return null

  for (const category of window.menuData.categories) {
    if (category.items) {
      const item = category.items.find((i) => i.id === itemId)
      if (item) return { categoryId: category.id }
    }

    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.items) {
          const item = subcategory.items.find((i) => i.id === itemId)
          if (item)
            return {
              categoryId: category.id,
              subcategoryId: subcategory.id,
            }
        }

        if (subcategory.subcategories) {
          for (const subSub of subcategory.subcategories) {
            if (subSub.items) {
              const item = subSub.items.find((i) => i.id === itemId)
              if (item)
                return {
                  categoryId: category.id,
                  subcategoryId: subcategory.id,
                  subSubcategoryId: subSub.id,
                }
            }
          }
        }
      }
    }
  }
  return null
}

function updateTrayQuantity(itemId, change) {
  const item = window.cart.items.find((i) => i.id === itemId)
  if (item && item.quantity + change > 0) {
    window.cart.updateQuantity(itemId, item.quantity + change)
    updateTrayDisplay()
  }
}

function removeFromTray(itemId) {
  window.cart.removeItem(itemId)
  updateTrayDisplay()
}

function updateTrayDisplay() {
  console.log("Updating tray display")
  renderTrayItems()
  updateItemsSummary()
  updateTotalPriceDisplay()
}

function updateItemsSummary() {
  const summaryElement = document.getElementById("items-summary")
  if (summaryElement) {
    summaryElement.textContent =
      window.cart.items.length === 0
        ? "Your selected items will appear here"
        : window.cart.items.map((item) => `${item.name} (${item.quantity})`).join(", ")
  }
}

function updateTotalPriceDisplay() {
  const totalElement = document.getElementById("total-price")
  if (totalElement) {
    totalElement.textContent = `KSh ${window.cart.getTotal().toFixed(2)}`
  }
}

function showError(message) {
  const trayItems = document.getElementById("tray-items")
  if (trayItems) {
    trayItems.innerHTML = `<div style="text-align: center; padding: 40px; color: #d32f2f;">${message}</div>`
  }
}

// Make functions globally available
window.goToItemDetails = goToItemDetails
window.removeFromTray = removeFromTray

// Handle window resize to re-render items
window.addEventListener("resize", () => {
  updateTrayDisplay()
})