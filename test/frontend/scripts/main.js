const transitionDelay = 300;

function getMainSpecialItem() {
  // Default to main-course special if available
  return window.SPECIAL_ITEMS?.["main-course"] || {
    name: "Mbuzi Choma",
    description: "Tender, juicy goat marinated in select spices and grilled to perfection.",
    image: "images/goatImage.png"
  };
}

function updateSpecialSections() {
  const specialItem = getMainSpecialItem();
  
  // Update desktop section
  const specialSection = document.getElementById("special-section");
  if (specialSection) {
    specialSection.innerHTML = `
      <h2>Our special</h2>
      <div class="special-content">
        <img src="${specialItem.image}" alt="${specialItem.name}" class="special-img">
        <div class="special-details">
          <h3>${specialItem.name}</h3>
          <p>${specialItem.description}</p>
        </div>
        <button class="button" onclick="goToThisWeekSpecial()">View</button>
      </div>
    `;
  }

  // Update mobile section
  const mobileSpecialSection = document.getElementById("mobile-special-section");
  if (mobileSpecialSection) {
    mobileSpecialSection.innerHTML = `
      <img src="${specialItem.image}" alt="${specialItem.name}" class="mobile-special-image">
      <div class="mobile-special-overlay" onclick="goToThisWeekSpecial()">
        <h3>OUR SPECIAL</h3>
        <button class="see-more">See More</button>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.cart) {
    updateCartIndicator();
  } else {
    setTimeout(updateCartIndicator, 100);
  }

  // First try to update immediately
  updateSpecialSections();
  
  // Then set up a fallback in case SPECIAL_ITEMS isn't loaded yet
  if (!window.SPECIAL_ITEMS) {
    const checkInterval = setInterval(() => {
      if (window.SPECIAL_ITEMS) {
        clearInterval(checkInterval);
        updateSpecialSections();
      }
    }, 100);
  }
});

function goToMyTray() {
  navigateTo("mytray.html")
}

function goToThisWeekSpecial() {
  navigateTo(`category.html?category=main-course&subcategory=mbuzi-choma`)
}

function goToCategory(categoryId) {
  navigateTo(`category.html?category=${categoryId}`)
}

function navigateTo(url) {
  document.body.style.opacity = 0
  setTimeout(() => (window.location.href = url), transitionDelay)
}

function updateCartIndicator() {
  const trayButton = document.querySelector(".tray span")
  if (trayButton && window.cart) {
    const itemCount = window.cart.getItemCount()
    trayButton.textContent = `My Tray ${itemCount > 0 ? `(${itemCount})` : ""}`
  }
}

window.addEventListener("cartUpdated", updateCartIndicator)
