document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing category page");
    
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    const subcategoryId = urlParams.get('subcategory');
    const subSubcategoryId = urlParams.get('subsubcategory');
    
    console.log(`Loading: category=${categoryId}, subcategory=${subcategoryId}, subsubcategory=${subSubcategoryId}`);

    // Back button functionality
    document.getElementById('back-button')?.addEventListener('click', function() {
        if (subSubcategoryId) {
            window.location.href = `category.html?category=${categoryId}&subcategory=${subcategoryId}`;
        } else if (subcategoryId) {
            window.location.href = `category.html?category=${categoryId}`;
        } else {
            window.location.href = 'index.html';
        }
    });

    // My Tray button
    document.getElementById('my-tray')?.addEventListener('click', function() {
        window.location.href = 'mytray.html';
    });

    // Load appropriate content
    if (!window.menuData || !window.menuData.categories) {
        showError("Menu data failed to load. Please refresh the page.");
        return;
    }

    if (subSubcategoryId) {
        loadSubSubcategoryItems(categoryId, subcategoryId, subSubcategoryId);
    } else if (subcategoryId) {
        loadSubcategoryItems(categoryId, subcategoryId);
    } else {
        loadCategoryContent(categoryId);
    }
});

//it does the loading of the category content
function loadCategoryContent(categoryId) {
    const category = findCategory(categoryId);
    if (!category) return showError("Category not found");

    const container = document.getElementById('category-content');
    
    if (category.items) {
        container.innerHTML = `
            <h1 class="category-title">${category.name}</h1>
            <div class="items-grid">
                ${category.items.map(item => createItemCard(item)).join('')}
            </div>
        `;
    } else if (category.subcategories) {
        container.innerHTML = `
            <h1 class="category-title">${category.name}</h1>
            <div class="subcategories-list">
                ${category.subcategories.map(subcategory => `
                    <div class="subcategory-card" 
                         onclick="window.location.href='category.html?category=${categoryId}&subcategory=${subcategory.id}'">
                        <div class="subcategory-image">
                            ${subcategory.image ? 
                                `<img src="${subcategory.image}" alt="${subcategory.name}">` : 
                                '<div class="missing-image"><i class="fas fa-utensils"></i></div>'
                            }
                        </div>
                        <div class="subcategory-info">
                            <h3>${subcategory.name}</h3> 
                            <p>${subcategory.description || ''}</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    setupQuantitySelectors();
}

function loadSubcategoryItems(categoryId, subcategoryId) {
    const category = findCategory(categoryId);
    if (!category) return showError("Category not found");
    
    const subcategory = findSubcategory(category, subcategoryId);
    if (!subcategory) return showError("Subcategory not found");

    const container = document.getElementById('category-content');
    
    if (subcategory.items) {
        container.innerHTML = `
            <div class="breadcrumbs">
                <span onclick="window.location.href='category.html?category=${categoryId}'">${category.name}</span> > 
                <span>${subcategory.name}</span>
            </div>
            <h1 class="category-title">${subcategory.name}</h1>
            ${subcategory.description ? `<p class="category-description">${subcategory.description}</p>` : ''}
            <div class="items-grid">
                ${subcategory.items.map(item => createItemCard(item)).join('')}
            </div>
        `;
    } else if (subcategory.subcategories) {
        container.innerHTML = `
            <div class="breadcrumbs">
                <span onclick="window.location.href='category.html?category=${categoryId}'">${category.name}</span> > 
                <span>${subcategory.name}</span>
            </div>
            <h1 class="category-title">${subcategory.name}</h1>
            ${subcategory.description ? `<p class="category-description">${subcategory.description}</p>` : ''}
            <div class="subcategories-list">
                ${subcategory.subcategories.map(subSub => `
                    <div class="subcategory-card" 
                         onclick="window.location.href='category.html?category=${categoryId}&subcategory=${subcategoryId}&subsubcategory=${subSub.id}'">
                        <div class="subcategory-image">
                            ${subSub.image ? 
                                `<img src="${subSub.image}" alt="${subSub.name}">` : 
                                '<div class="missing-image"><i class="fas fa-glass-whiskey"></i></div>'
                            }
                        </div>
                        <div class="subcategory-info">
                            <h3>${subSub.name}</h3>
                            <p>${subSub.description || ''}</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    setupQuantitySelectors();
}

function loadSubSubcategoryItems(categoryId, subcategoryId, subSubcategoryId) {
    const category = findCategory(categoryId);
    if (!category) return showError("Category not found");
    
    const subcategory = findSubcategory(category, subcategoryId);
    if (!subcategory) return showError("Subcategory not found");
    
    const subSubcategory = findSubcategory(subcategory, subSubcategoryId);
    if (!subSubcategory || !subSubcategory.items) return showError("Items not found");

    const container = document.getElementById('category-content');
    
    container.innerHTML = `
        <div class="breadcrumbs">
            <span onclick="window.location.href='category.html?category=${categoryId}'">${category.name}</span> > 
            <span onclick="window.location.href='category.html?category=${categoryId}&subcategory=${subcategoryId}'">${subcategory.name}</span> > 
            <span>${subSubcategory.name}</span>
        </div>
        <h1 class="category-title">${subSubcategory.name}</h1>
        ${subSubcategory.description ? `<p class="category-description">${subSubcategory.description}</p>` : ''}
        <div class="items-grid">
            ${subSubcategory.items.map(item => createItemCard(item)).join('')}
        </div>
    `;
    
    setupQuantitySelectors();
}

// Helper functions
function findCategory(categoryId) {
    return window.menuData.categories.find(c => c.id === categoryId);
}

function findSubcategory(parentCategory, subcategoryId) {
    return parentCategory.subcategories?.find(s => s.id === subcategoryId);
}

function showError(message) {
    document.getElementById('category-content').innerHTML = `
        <div class="error">
            <p>${message}</p>
        </div>
    `;
}

function createItemCard(item) {
    return `
        <div class="item-row" data-id="${item.id}">
            <div class="item-image-container">
                <img src="${item.image || 'images/default.jpg'}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description || ''}</p>
                <div class="item-controls-horizontal">
                    <div class="quantity-selector-vertical">
                        <span>Quantity</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <span class="item-price">KSh ${item.price}</span>
                    <button class="add-to-tray-horizontal" data-id="${item.id}">
                        Add to Tray
                    </button>
                </div>
            </div>
        </div>
    `;
}
function setupQuantitySelectors() {
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const container = this.closest('.quantity-controls');
            const quantityElement = container.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.classList.contains('minus') && quantity > 1) {
                quantity--;
            } else if (this.classList.contains('plus')) {
                quantity++;
            }
            
            quantityElement.textContent = quantity;
        });
    });
    
    document.querySelectorAll('.add-to-tray-horizontal').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemId = this.getAttribute('data-id');
            const container = this.closest('.item-row');
            const quantity = parseInt(container.querySelector('.quantity').textContent);
            const itemName = container.querySelector('.item-name').textContent;
            const itemPrice = parseFloat(container.querySelector('.item-price').textContent.replace('KSh ', ''));
            const itemImage = container.querySelector('.item-image-container img')?.src || 'images/default.jpg';
            
            addToTray(itemId, quantity, itemPrice, itemName, itemImage);
        });
    });
}

function addToTray(itemId, quantity, price, name, image) {
    cart.addItem(itemId, quantity, price, name, image);
    alert(`Added ${quantity} ${name} to your tray!`);
    updateCartIndicator();
}

function updateCartIndicator() {
    const trayButton = document.getElementById('my-tray');
    if (trayButton) {
        const itemCount = cart.getItemCount();
        trayButton.innerHTML = `My Tray ${itemCount > 0 ? `(${itemCount})` : ''} <i class="fa-solid fa-bowl-food"></i>`;
    }
}