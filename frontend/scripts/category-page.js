const transitionDelay = 300;
const SPECIAL_ITEMS = {
  'main-course': {
    id: 'mbuzi-choma',
    name: 'Mbuzi Choma',
    description: 'Tender, juicy goat marinated in select spices and grilled to perfection.',
    image: 'images/goatImage.png'
  },
  'beverages': {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    description: 'Refreshing seasonal fruit juices made from fresh ingredients.',
    image: 'images/juice.png'
  }
};

// Carousel state
let currentCarouselIndex = 0;
let carouselItems = [];

// Carousel navigation functions
function navigateCarousel(direction) {
  currentCarouselIndex = (currentCarouselIndex + direction + carouselItems.length) % carouselItems.length;
  updateCarouselDisplay();
}

function goToCarouselItem(index) {
  currentCarouselIndex = index;
  updateCarouselDisplay();
}

function updateCarouselDisplay() {
  const item = carouselItems[currentCarouselIndex];
  const highlightSection = document.querySelector('.highlight');
  
  if (!highlightSection) return;
  
  highlightSection.classList.add('fade-out');
  
  setTimeout(() => {
    const highlightImg = highlightSection.querySelector('.highlight-img');
    const highlightTitle = highlightSection.querySelector('.highlight-details h2');
    const highlightDesc = highlightSection.querySelector('.highlight-details p');
    
    if (highlightImg) {
      highlightImg.src = item.image || 'images/placeholder-goat.jpg';
      highlightImg.alt = item.name;
    }
    if (highlightTitle) highlightTitle.textContent = item.name;
    if (highlightDesc) highlightDesc.textContent = item.description || "Delicious item from our menu.";
    
    const dots = highlightSection.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentCarouselIndex);
    });
    
    highlightSection.classList.remove('fade-out');
  }, 300); 
}

document.addEventListener("DOMContentLoaded", () => {
  function checkMenuData() {
    if (window.menuData && window.menuData.categories) {
      initializePage();
      return true;
    }
    return false;
  }

  if (!checkMenuData()) {
    let attempts = 0;
    const maxAttempts = 30;
    const interval = setInterval(() => {
      attempts++;
      if (checkMenuData() || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts) {
          showError("Menu data failed to load. Please refresh the page.");
        }
      }
    }, 100);
  }
});

function initializePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category");
  const subcategoryId = urlParams.get("subcategory");
  const subSubcategoryId = urlParams.get("subsubcategory");

  if (subSubcategoryId) {
    loadSubSubcategoryItems(categoryId, subcategoryId, subSubcategoryId);
  } else if (subcategoryId) {
    loadSubcategoryItems(categoryId, subcategoryId);
  } else {
    loadCategoryContent(categoryId);
  }
}

function loadCategoryContent(categoryId) {
  const category = findCategory(categoryId);
  if (!category) return showError("Category not found");

  const container = document.getElementById("category-content");
  const specialItem = SPECIAL_ITEMS[categoryId];

  if (category.items && category.items.length > 0) {
    carouselItems = category.items;
    currentCarouselIndex = 0;
    
    container.innerHTML = `
      <section class="highlight">
        <img src="${carouselItems[0].image || 'images/placeholder-goat.jpg'}" 
             alt="${carouselItems[0].name}" 
             class="highlight-img">
        <div class="highlight-details">
          <h2>${carouselItems[0].name}</h2>
          <p>${carouselItems[0].description || "Delicious item from our menu."}</p>
          <div class="slider-dots">
            ${carouselItems.map((_, index) => `
              <span class="dot ${index === 0 ? 'active' : ''}" 
                    onclick="goToCarouselItem(${index})"></span>
            `).join('')}
          </div>
        </div>
        <div class="carousel-buttons">
          <button class="carousel-button prev" onclick="navigateCarousel(-1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="carousel-button next" onclick="navigateCarousel(1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>
      <div class="menu-list2" id="items-container">
        ${category.items.map(createItemCard).join("")}
      </div>
    `;
    
    loadFontAwesome();
  } else if (category.subcategories) {
    container.innerHTML = specialItem ? `
      <section class="highlight">
        <img src="${specialItem.image}" alt="${specialItem.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${specialItem.name}</h2>
          <p>${specialItem.description}</p>
          <button class="button" onclick="goToSubcategory('${categoryId}', '${specialItem.id}')">
            View
          </button>
        </div>
      </section>
      <nav class="menu-list">
        <div class="menu-title">${category.name}</div>
        <hr class="full-width-line">
        ${category.subcategories.map(subcategory => `
          <div class="menu-item" onclick="goToSubcategory('${categoryId}', '${subcategory.id}')">
            <span>${subcategory.name}</span>
            <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
          </div>
          <hr class="full-width-line">
        `).join('')}
      </nav>
    ` : `
      <section class="highlight">
        <img src="images/placeholder-goat.jpg" alt="${category.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${category.name}</h2>
          <p>${category.description || "Choose from our selection of categories."}</p>
        </div>
      </section>
      <nav class="menu-list">
        <div class="menu-title">${category.name}</div>
        <hr class="full-width-line">
        ${category.subcategories.map(subcategory => `
          <div class="menu-item" onclick="goToSubcategory('${categoryId}', '${subcategory.id}')">
            <span>${subcategory.name}</span>
            <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
          </div>
          <hr class="full-width-line">
        `).join('')}
      </nav>
    `;
  }

  setupQuantitySelectors();
}

function loadSubcategoryItems(categoryId, subcategoryId) {
  const category = findCategory(categoryId);
  if (!category) return showError("Category not found");

  const subcategory = findSubcategory(category, subcategoryId);
  if (!subcategory) return showError("Subcategory not found");

  const container = document.getElementById("category-content");

  if (subcategory.items) {
    container.innerHTML = `
      <section class="highlight">
        <img src="${subcategory.image || "images/placeholder-goat.jpg"}" alt="${subcategory.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${subcategory.name}</h2>
          <p>${subcategory.description || "Delicious items from our menu."}</p>
        </div>
      </section>
      <div class="menu-list2" id="items-container">
        ${subcategory.items.map(createItemCard).join("")}
      </div>
    `;
  } else if (subcategory.subcategories) {
    container.innerHTML = `
      <section class="highlight">
        <img src="${subcategory.image || "images/placeholder-goat.jpg"}" alt="${subcategory.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${subcategory.name}</h2>
          <p>${subcategory.description || "Choose from our selection."}</p>
        </div>
      </section>
      <nav class="menu-list">
        <div class="menu-title">${subcategory.name}</div>
        <hr class="full-width-line">
        ${subcategory.subcategories
          .map(
            (subSub) => `
            <div class="menu-item" onclick="goToSubSubcategory('${categoryId}', '${subcategoryId}', '${subSub.id}')">
              <span>${subSub.name}</span>
              <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
            </div>
            <hr class="full-width-line">
          `
          )
          .join("")}
      </nav>
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

  const container = document.getElementById("category-content");

  container.innerHTML = `
    <section class="highlight">
      <img src="${subSubcategory.image || "images/placeholder-goat.jpg"}" alt="${subSubcategory.name}" class="highlight-img">
      <div class="highlight-details">
        <h2>${subSubcategory.name}</h2>
        <p>${subSubcategory.description || "Delicious items from our menu."}</p>
      </div>
    </section>
    <div class="menu-list2" id="items-container">
      ${subSubcategory.items.map(createItemCard).join("")}
    </div>
  `;

  setupQuantitySelectors();
}

function createItemCard(item) {
  const isInCart = window.cart.items.find((cartItem) => cartItem.id === item.id);

  return `
    <div class="menu-item2">
      <hr class="full-width-line">
      <div class="item-info2">
        <span class="item-name">${item.name}</span>
      </div>
      <div class="item-details2">
        <div class="quantity2">
          <img src="images/left-arrow.png" alt="Decrease" class="icon" onclick="updateQuantity('${item.id}', -1)">
          <span id="quantity-${item.id}">1</span>
          <img src="images/right-arrow.png" alt="Increase" class="icon" onclick="updateQuantity('${item.id}', 1)">
        </div>
        <span class="price2">Ksh <span id="price-${item.id}">${item.price}</span></span>
        <button class="add-to-tray2" id="btn-${item.id}" onclick="toggleCart('${item.id}')" 
                style="${isInCart ? "background: white; color: black; border: 2px solid black;" : ""}">
          ${isInCart ? "Remove" : "Add to tray"}
        </button>
      </div>
    </div>
  `;
}

function setupQuantitySelectors() {
  // Handled by inline onclick events
}

function updateQuantity(itemId, change) {
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  const priceElement = document.getElementById(`price-${itemId}`);

  if (!quantityElement || !priceElement) return;

  const item = findItemById(itemId);
  if (!item) return;

  let quantity = Number.parseInt(quantityElement.textContent) + change;
  if (quantity < 1) quantity = 1;

  quantityElement.textContent = quantity;
  priceElement.textContent = item.price * quantity;
}

function toggleCart(itemId) {
  const button = document.getElementById(`btn-${itemId}`);
  const quantityElement = document.getElementById(`quantity-${itemId}`);

  if (!button || !quantityElement) return;

  const quantity = Number.parseInt(quantityElement.textContent);
  const item = findItemById(itemId);

  if (!item) return;

  if (window.cart.items.find((cartItem) => cartItem.id === itemId)) {
    window.cart.removeItem(itemId);
    button.textContent = "Add to tray";
    button.style.backgroundColor = "";
    button.style.color = "";
    button.style.border = "";
  } else {
    window.cart.addItem(itemId, quantity, item.price, item.name, item.image || "images/placeholder-goat.jpg");
    button.textContent = "Remove";
    button.style.backgroundColor = "white";
    button.style.color = "black";
    button.style.border = "2px solid black";
  }
}

function goBack() {
  document.body.style.opacity = 0;
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("category");
    const subcategoryId = urlParams.get("subcategory");
    const subSubcategoryId = urlParams.get("subsubcategory");

    if (subSubcategoryId) {
      window.location.href = `category.html?category=${categoryId}&subcategory=${subcategoryId}`;
    } else if (subcategoryId) {
      window.location.href = `category.html?category=${categoryId}`;
    } else {
      window.location.href = "index.html";
    }
  }, transitionDelay);
}

function goToMyTray() {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = "mytray.html";
  }, transitionDelay);
}

function goToSubcategory(categoryId, subcategoryId) {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = `category.html?category=${categoryId}&subcategory=${subcategoryId}`;
  }, transitionDelay);
}

function goToSubSubcategory(categoryId, subcategoryId, subSubcategoryId) {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = `category.html?category=${categoryId}&subcategory=${subcategoryId}&subsubcategory=${subSubcategoryId}`;
  }, transitionDelay);
}

function findCategory(categoryId) {
  return window.menuData.categories.find((c) => c.id === categoryId);
}

function findSubcategory(parentCategory, subcategoryId) {
  return parentCategory.subcategories?.find((s) => s.id === subcategoryId);
}

function findItemById(itemId) {
  for (const category of window.menuData.categories) {
    if (category.items) {
      const item = category.items.find((i) => i.id === itemId);
      if (item) return item;
    }

    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.items) {
          const item = subcategory.items.find((i) => i.id === itemId);
          if (item) return item;
        }

        if (subcategory.subcategories) {
          for (const subSub of subcategory.subcategories) {
            if (subSub.items) {
              const item = subSub.items.find((i) => i.id === itemId);
              if (item) return item;
            }
          }
        }
      }
    }
  }
  return null;
}

function showError(message) {
  document.getElementById("category-content").innerHTML = `
    <div style="text-align: center; padding: 40px; color: #666;">
      <p>${message}</p>
    </div>
  `;
}

function loadFontAwesome() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(link);
}

// Global exports
window.navigateCarousel = navigateCarousel;
window.goToCarouselItem = goToCarouselItem;