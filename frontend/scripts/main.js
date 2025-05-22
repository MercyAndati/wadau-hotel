document.addEventListener('DOMContentLoaded', function() {
    // Initialize special item display
    displaySpecialItem();
    
    // Update cart indicator
    updateCartIndicator();

    // Button handlers
    document.getElementById('view-button')?.addEventListener('click', () => {
        window.location.href = `category.html?category=main-course&subcategory=mbuzi-choma`;
    });
    
    document.getElementById('my-tray')?.addEventListener('click', () => {
        window.location.href = 'mytray.html';
    });
    
    // Category buttons
    const categories = {
        'Platters-btn': 'platters',
        'Main-course-btn': 'main-course',
        'Snacks-btn': 'snacks',
        'Beverages-btn': 'beverages'
    };
    
    Object.entries(categories).forEach(([id, category]) => {
        document.getElementById(id)?.addEventListener('click', () => {
            window.location.href = `category.html?category=${category}`;
        });
    });
});

function displaySpecialItem() {
    const container = document.getElementById('special-item-content');
    if (!container) return;
    
    const menuData = window.menuData;
    const mbuziChoma = menuData.categories
        .find(c => c.id === "main-course")
        .subcategories.find(s => s.id === "mbuzi-choma");

    container.innerHTML = `
        <div class="special-item-content">
            <div class="image-placeholder">
                <img src="${mbuziChoma.image}" alt="${mbuziChoma.name}">
            </div>
            <div class="special-item-text">
                <h3>${mbuziChoma.name}</h3>
                <p>${mbuziChoma.description}</p>
            </div>
        </div>
    `;
}

function updateCartIndicator() {
    const trayButton = document.getElementById('my-tray');
    if (trayButton) {
        const itemCount = cart.getItemCount();
        trayButton.innerHTML = `My Tray ${itemCount > 0 ? `(${itemCount})` : ''} <i class="fa-solid fa-bowl-food"></i>`;
    }
}