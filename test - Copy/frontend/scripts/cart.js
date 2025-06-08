window.cart = {
  addItem: function (id, quantity, price, name, image, note = "") {
    const existingItem = this.items.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
      if (note) existingItem.note = note; // This line preserves the note
    } else {
      this.items.push({ id, quantity, price, name, image, note });
    }
    this.saveToStorage();
    this.dispatchUpdate();
  },

  removeItem: function (id) {
    this.items = this.items.filter((item) => item.id !== id)
    this.saveToStorage()
    this.dispatchUpdate()
  },

  updateQuantity: function (itemId, newQuantity) {
    const item = this.items.find((i) => i.id === itemId)
    if (item) {
      item.quantity = newQuantity
      this.saveToStorage()
      this.dispatchUpdate()
    }
  },

  getTotal: function () {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getItemCount: function () {
    return this.items.reduce((count, item) => count + item.quantity, 0)
  },

  saveToStorage: function () {
    localStorage.setItem("wadau-cart", JSON.stringify(this.items))
  },

  dispatchUpdate: () => {
    window.dispatchEvent(new Event("cartUpdated"))
  },

  clearCart: function () {
    this.items = []
    this.saveToStorage()
    this.dispatchUpdate()
  },
}