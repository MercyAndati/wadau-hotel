document.addEventListener("DOMContentLoaded", () => {
  let name = new URLSearchParams(window.location.search).get("name") || "Guest"

  try {
    const reservations = JSON.parse(localStorage.getItem("wadau-reservations")) || []
    if (reservations.length > 0) {
      const latestReservation = reservations[reservations.length - 1]
      name = latestReservation.name || name
      localStorage.setItem("current-reservation", JSON.stringify(latestReservation))
    }
  } catch (e) {
    console.error("Error reading reservations:", e)
  }

  updateWelcomeMessage(name.split(" ")[0])
  setupHomeButton()
  setupSubscriptionCheckbox(name)
  verifyCartEmpty()
    // Back button handlers
  document.getElementById('back-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });

  document.querySelector('.back')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });
})

function updateWelcomeMessage(firstName) {
  const welcomeMessage = document.getElementById("welcome-message")
  if (welcomeMessage) {
    welcomeMessage.innerHTML = `
            <p id="welcome-message">Dear ${firstName}, welcome to the Wadau Experience. </p>
            <p>We're looking forward to your arrival.</p>
        `
  }
}

function setupHomeButton() {
  document.getElementById("home-button")?.addEventListener("click", () => {
    if (window.cart) {
      window.cart.items = []
      window.cart.saveToStorage()
    }
    window.location.href = "/";
  })
}

function setupSubscriptionCheckbox(name) {
  const subscribeCheckbox = document.getElementById("subscribe-checkbox")
  if (subscribeCheckbox) {
    subscribeCheckbox.checked = localStorage.getItem("subscribedToOffers") === "true"
    subscribeCheckbox.addEventListener("change", function () {
      localStorage.setItem("subscribedToOffers", this.checked.toString())
      if (this.checked) saveSubscriberInfo(name)
    })
  }
}

function saveSubscriberInfo(name) {
  try {
    const reservation = JSON.parse(localStorage.getItem("current-reservation") || {})
    const subscribers = JSON.parse(localStorage.getItem("wadau-subscribers")) || []

    subscribers.push({
      name,
      phone: reservation.phone || "",
      email: reservation.email || "",
      subscribeDate: new Date().toISOString(),
      preferences: [],
    })

    localStorage.setItem("wadau-subscribers", JSON.stringify(subscribers))
  } catch (e) {
    console.error("Error saving subscriber info:", e)
  }
}

function verifyCartEmpty() {
  const cartItems = JSON.parse(localStorage.getItem("wadau-cart") || "[]")
  if (cartItems.length > 0) {
    console.error("Cart was not cleared properly!")
    localStorage.setItem("wadau-cart", "[]")
  }
}

function goBack() {
  window.history.back();
}
