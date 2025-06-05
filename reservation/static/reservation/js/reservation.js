document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkout-cancel-link")?.addEventListener("click", goBack)
  document.getElementById("back-button")?.addEventListener("click", goBack)

  document.querySelector(".paynow")?.addEventListener("click", () => processReservation("Pay Now"))
  document.querySelector(".paylater")?.addEventListener("click", () => processReservation("Pay on Arrival"))

  const dateInput = document.querySelector('input[type="date"]')
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0]
  }

  setupFormValidation()
})

function goBack() {
  window.history.back()
}

function processReservation(paymentMethod) {
  const form = document.querySelector(".checkout-right form")
  if (!form) return

  const inputs = form.querySelectorAll(".checkout-input")
  const formData = {}
  let isValid = true

  inputs.forEach((input) => {
    formData[input.placeholder.toLowerCase().replace(/\W+/g, "")] = input.value
    input.classList.toggle("error", !input.value.trim())
    isValid = isValid && !!input.value.trim()
  })

  if (!isValid) {
    alert("Please fill in all required fields")
    return
  }

  const reservation = {
    ...JSON.parse(localStorage.getItem("current-reservation") || "{}"),
    name: formData.name,
    phone: formData.phone,
    date: formData.date,
    time: formData.arrivaltime,
    guests: formData.noofguests,
    paymentMethod,
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem("current-reservation", JSON.stringify(reservation))

  window.location.href = paymentMethod === "Pay Now" ? "/payment/" : "/subscription/"
}

function setupFormValidation() {
  const form = document.querySelector(".checkout-right form")
  if (!form) return

  form.querySelectorAll(".checkout-input").forEach((input) => {
    input.addEventListener("blur", () => input.classList.toggle("error", !input.value.trim()))
    input.addEventListener("focus", () => input.classList.remove("error"))
  })

  const phoneInput = document.querySelector('input[placeholder="Phone"]')
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9+]/g, "")
    })
  }
}
