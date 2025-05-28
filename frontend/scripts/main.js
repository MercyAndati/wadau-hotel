const transitionDelay = 300;

document.addEventListener("DOMContentLoaded", () => {
    if (window.cart) {
        updateCartIndicator();
    } else {
        setTimeout(updateCartIndicator, 100);
    }

    displaySpecialItem();
});

function displaySpecialItem() {
    if (window.menuData) {
        loadSpecialItem();
    } else {
        const checkInterval = setInterval(() => {
            if (window.menuData) {
                clearInterval(checkInterval);
                loadSpecialItem();
            }
        }, 100);
    }
}

function loadSpecialItem() {
    const specialSection = document.getElementById('special-section');
    const mbuziChoma = window.menuData?.categories
        .find(c => c.id === "main-course")
        ?.subcategories?.find(s => s.id === "mbuzi-choma");

    specialSection.innerHTML = `
        <h2>Our special</h2>
        <div class="special-content">
            <img src="${mbuziChoma?.image || 'images/goatImage.png'}" alt="${mbuziChoma?.name || 'Mbuzi Choma'}" class="special-img">
            <div class="special-details">
                <h3>${mbuziChoma?.name || 'Mbuzi choma'}</h3>
                <p>${mbuziChoma?.description || 'Tender, juicy goat marinated in select spices and grilled to perfection.'}</p>
            </div>
            <button class="button" onclick="goToThisWeekSpecial()">View</button>
        </div>
    `;
}

function goToMyTray() {
    navigateTo("mytray.html");
}

function goToThisWeekSpecial() {
    navigateTo(`category.html?category=main-course&subcategory=mbuzi-choma`);
}

function goToCategory(categoryId) {
    navigateTo(`category.html?category=${categoryId}`);
}

function navigateTo(url) {
    document.body.style.opacity = 0;
    setTimeout(() => window.location.href = url, transitionDelay);
}

function updateCartIndicator() {
    const trayButton = document.querySelector(".tray span");
    if (trayButton && window.cart) {
        const itemCount = window.cart.getItemCount();
        trayButton.textContent = `My Tray ${itemCount > 0 ? `(${itemCount})` : ""}`;
    }
}

window.addEventListener("cartUpdated", updateCartIndicator);