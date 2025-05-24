// Transition delay for smooth navigation
const transitionDelay = 300

// Declare the cart variable
let cart

document.addEventListener("DOMContentLoaded", () => {
  if (window.cart) {
    console.log("Cart ready on main page");
    updateCartIndicator();
  } else {
    setTimeout(updateCartIndicator, 100);
  }

  displaySpecialItem();
});

function displaySpecialItem() {
  // This will show the Mbuzi Choma special from your menu data
  if (window.menuData) {
    const mbuziChoma = window.menuData.categories
      .find((c) => c.id === "main-course")
      ?.subcategories?.find((s) => s.id === "mbuzi-choma")

    if (mbuziChoma) {
      // Special item is already displayed in HTML, but you can update it dynamically if needed
      console.log("Special item loaded:", mbuziChoma.name)
    }
  }
}

function goToMyTray() {
  document.body.style.opacity = 0
  setTimeout(() => {
    window.location.href = "mytray.html"
  }, transitionDelay)
}

function goToThisWeekSpecial() {
  document.body.style.opacity = 0
  setTimeout(() => {
    window.location.href = `category.html?category=main-course&subcategory=mbuzi-choma`
  }, transitionDelay)
}

function goToCategory(categoryId) {
  document.body.style.opacity = 0
  setTimeout(() => {
    window.location.href = `category.html?category=${categoryId}`
  }, transitionDelay)
}

function updateCartIndicator() {
  const trayButton = document.querySelector(".tray span")
  if (trayButton && window.cart) {
    const itemCount = window.cart.getItemCount()
    trayButton.textContent = `My Tray ${itemCount > 0 ? `(${itemCount})` : ""}`
  }
}

// Update cart indicator when items are added
if (typeof window !== "undefined") {
  window.addEventListener("cartUpdated", updateCartIndicator)
}
