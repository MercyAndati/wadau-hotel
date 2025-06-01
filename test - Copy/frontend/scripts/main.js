const transitionDelay = 300;

function getMainSpecialItem() {
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
      <h2>Our Special</h2>
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

function initializePage() {
  updateSpecialSections();
  
  if (!window.SPECIAL_ITEMS) {
    const checkInterval = setInterval(() => {
      if (window.SPECIAL_ITEMS) {
        clearInterval(checkInterval);
        updateSpecialSections();
      }
    }, 100);
  }

  // Handle cart initialization
  if (window.cart) {
    updateCartIndicator();
  } else {
    setTimeout(updateCartIndicator, 100);
  }
}

function goToMyTray() {
  navigateTo("mytray.html");
}

function goToThisWeekSpecial() {
  navigateTo("category.html?category=main-course&subcategory=mbuzi-choma");
}

function goToCategory(categoryId) {
  navigateTo(`category.html?category=${categoryId}`);
}

function navigateTo(url) {
  window.location.href = url;
}

function updateCartIndicator() {
  const trayButton = document.querySelector(".tray span");
  if (trayButton && window.cart) {
    const itemCount = window.cart.getItemCount();
    trayButton.textContent = `My Tray${itemCount > 0 ? ` (${itemCount})` : ""}`;
  }
}
// Modified goBack function
function goBack() {
    // Check if we can go back in history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback to home if no history
        navigateTo("index.html");
    }
}
// Handle page load
document.addEventListener('DOMContentLoaded', () => {
    // Restore scroll position if available
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
    // Handle back button events
    window.onpopstate = function(event) {
      if (window.history.length > 1) {
          window.history.back();
      } else {
          window.location.href = "index.html";
      }
    };
    // Add back button handlers
  document.getElementById('back-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });

  document.querySelector('.back')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });
});
// Show loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-transition';
    document.body.appendChild(loader);
    setTimeout(() => loader.classList.add('active'), 10);
}
document.addEventListener("DOMContentLoaded", initializePage);
window.addEventListener("cartUpdated", updateCartIndicator);