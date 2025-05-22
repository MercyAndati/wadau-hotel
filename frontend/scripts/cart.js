class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    addItem(itemId, quantity, price, name, image) {
        const existingItem = this.items.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: itemId,
                name: name,
                price: price,
                quantity: quantity,
                image: image
            });
        }
        
        this.saveToLocalStorage();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToLocalStorage();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveToLocalStorage();
        }
    }

    clearCart() {
        this.items = [];
        this.saveToLocalStorage();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
}

const cart = new Cart();