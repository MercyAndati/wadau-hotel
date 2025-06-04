/*********************
 * GLOBAL DECLARATIONS
 *********************/
// Cart system
window.cart = {
  items: JSON.parse(localStorage.getItem("wadau-cart") || "[]"),

  addItem: function (id, quantity, price, name, image) {
    const existingItem = this.items.find((item) => item.id === id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({ id, quantity, price, name, image })
    }
    this.saveToStorage()
    this.dispatchUpdate()
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

// Special items configuration
window.SPECIAL_ITEMS = {
  "main-course": {
    id: "mbuzi-choma",
    name: "Mbuzi Choma",
    description: "Tender, juicy goat marinated in select spices and grilled to perfection.",
    image: "images/goatImage.png",
  },
  "beverages": {
    id: "non-alcoholic",
    name: "Fresh Juice",
    description: "Refreshing seasonal fruit juices made from fresh ingredients.",
    image: "images/juice.png",
  },
}

// State variables
let currentCarouselIndex = 0;
let carouselItems = [];
let currentMobileItem = null;

/*********************
 * CORE FUNCTIONALITY
 *********************/
// Initialization
function initializePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category");
  const subcategoryId = urlParams.get("subcategory");
  const subSubcategoryId = urlParams.get("subsubcategory");
  const showItemId = urlParams.get("showItem");

  if (subSubcategoryId) {
    loadSubSubcategoryItems(categoryId, subcategoryId, subSubcategoryId, showItemId);
  } else if (subcategoryId) {
    loadSubcategoryItems(categoryId, subcategoryId, showItemId);
  } else if (categoryId) {
    loadCategoryContent(categoryId, showItemId);
  } else if (showItemId) {
    loadItemDirectly(showItemId);
  }
}
 document.addEventListener("DOMContentLoaded", () => {
  function checkMenuData() {
    if (window.menuData && window.menuData.categories) {
      initializePage()
      return true
    }
    return false
  }

  if (!checkMenuData()) {
    let attempts = 0
    const maxAttempts = 30
    const interval = setInterval(() => {
      attempts++
      if (checkMenuData() || attempts >= maxAttempts) {
        clearInterval(interval)
        if (attempts >= maxAttempts) {
          showError("Menu data failed to load. Please refresh the page.")
        }
      }
    }, 100)
  }
})

function loadItemDirectly(itemId) {
    const item = findItemById(itemId);
    if (!item) return showError("Item not found");
    
    const path = findItemCategoryPath(itemId);
    if (!path) return showError("Could not determine item category");

    if (path.subSubcategoryId) {
        loadSubSubcategoryItems(
            path.categoryId,
            path.subcategoryId,
            path.subSubcategoryId,
            itemId
        );
    } else if (path.subcategoryId) {
        loadSubcategoryItems(
            path.categoryId,
            path.subcategoryId,
            itemId
        );
    } else {
        loadCategoryContent(path.categoryId, itemId);
    }
}

// Content loading
function loadCategoryContent(categoryId, showItemId = null) {
  const category = findCategory(categoryId)
  if (!category) return showError("Category not found")

  const container = document.getElementById("category-content")
  const specialItem = SPECIAL_ITEMS[categoryId]

  if (category.items && category.items.length > 0) {
    // Category with items - show name + image + items
    carouselItems = category.items
    currentCarouselIndex = 0

    const categoryImage = category.image || "images/placeholder-goat.jpg"

    container.innerHTML = `
      <!-- Desktop Layout -->
      <section class="highlight">
        <img src="${carouselItems[0].image || "images/placeholder-goat.jpg"}" 
             alt="${carouselItems[0].name}" 
             class="highlight-img">
        <div class="highlight-details">
          <h2>${carouselItems[0].name}</h2>
          <p>${carouselItems[0].description || "Delicious item from our menu."}</p>
          <div class="slider-dots">
            ${carouselItems
              .map(
                (_, index) => `
              <span class="dot ${index === 0 ? "active" : ""}" 
                    onclick="goToCarouselItem(${index})"></span>
            `,
              )
              .join("")}
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
      
      <!-- Mobile Layout -->
      <div class="mobile-category-layout mobile-only">
        <div class="mobile-category-title">${category.name}</div>
        <div class="mobile-category-image-container">
          ${
            categoryImage !== "images/placeholder-goat.jpg"
              ? `<img src="${categoryImage}" alt="${category.name}" class="mobile-category-image">`
              : `<div class="mobile-category-placeholder">
                   <span>Category Image</span>
                 </div>`
          }
        </div>
      </div>
      
      <div class="menu-list2 desktop-items" id="items-container">
        ${category.items.map(createItemCard).join("")}
      </div>
      <nav class="menu-list mobile-items">
        ${category.items.map(createItemCard).join("")}
      </nav>
    `

    loadFontAwesome()

    // If showItemId is provided, automatically show that item on mobile
    if (showItemId && window.innerWidth <= 768) {
      const itemToShow = findItemInCategory(category, showItemId);
      if (itemToShow) {
        setTimeout(() => showMobileItem(itemToShow), 100);
      }
    }
  }
  else if (category.subcategories) {
    // Category with subcategories - show name + image/special + subcategories
    const categoryImage = specialItem?.image || category.image || "images/placeholder-goat.jpg"

    container.innerHTML = `
      <!-- Desktop Layout -->
      <section class="highlight">
        <img src="${categoryImage}" alt="${category.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${category.name}</h2>
          <p>${specialItem?.description || category.description || `Choose from our selection of ${category.name.toLowerCase()}.`}</p>
          ${specialItem ? `<button class="button" onclick="goToSubcategory('${categoryId}', '${specialItem.id}')">View Special</button>` : ""}
        </div>
      </section>
      
      <!-- Mobile Layout -->
      <div class="mobile-category-layout mobile-only">
        <div class="mobile-category-title">${category.name}</div>
        <div class="mobile-category-image-container" ${specialItem ? `onclick="goToSubcategory('${categoryId}', '${specialItem.id}')"` : ""}>
          ${
            categoryImage !== "images/placeholder-goat.jpg"
              ? `<img src="${categoryImage}" alt="${category.name}" class="mobile-category-image">`
              : `<div class="mobile-category-placeholder">
                   <span>Category Image</span>
                 </div>`
          }
          ${
            specialItem
              ? `
            <div class="mobile-category-overlay">
              <h3>Our special</h3>
              <button class="mobile-see-more">See more</button>
            </div>
          `
              : ""
          }
        </div>
      </div>
      
      <nav class="menu-list">
        <div class="menu-title desktop-only">${category.name}</div>
        <hr class="full-width-line">
        ${category.subcategories
          .map(
            (subcategory) => `
          <div class="menu-item" onclick="goToSubcategory('${categoryId}', '${subcategory.id}')">
            <span>${subcategory.name}</span>
            <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
          </div>
          <hr class="full-width-line">
        `,
          )
          .join("")}
      </nav>
    `
  }

  setupQuantitySelectors()
  if (showItemId && window.innerWidth <= 768) {
    const itemToShow = category.items?.find(item => item.id === showItemId) ||
                      category.subcategories?.flatMap(sc => sc.items || []).find(item => item.id === showItemId) ||
                      category.subcategories?.flatMap(sc => sc.subcategories?.flatMap(ssc => ssc.items || [])).find(item => item.id === showItemId)
    
    if (itemToShow) {
      setTimeout(() => showMobileItem(itemToShow), 100)
    }
  }
}
function loadSubcategoryItems(categoryId, subcategoryId, showItemId = null) {
  const category = findCategory(categoryId)
  if (!category) return showError("Category not found")

  const subcategory = findSubcategory(category, subcategoryId)
  if (!subcategory) return showError("Subcategory not found")

  const container = document.getElementById("category-content")

  if (subcategory.items) {
    // Subcategory with items - show name + image + items
    const subcategoryImage = subcategory.image || "images/placeholder-goat.jpg"

    container.innerHTML = `
      <!-- Desktop Layout -->
      <section class="highlight">
        <img src="${subcategoryImage}" alt="${subcategory.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${subcategory.name}</h2>
          <p>${subcategory.description || "Delicious items from our menu."}</p>
        </div>
      </section>
      
      <!-- Mobile Layout -->
      <div class="mobile-category-layout mobile-only">
        <div class="mobile-category-title">${subcategory.name}</div>
        <div class="mobile-category-image-container">
          ${
            subcategoryImage !== "images/placeholder-goat.jpg"
              ? `<img src="${subcategoryImage}" alt="${subcategory.name}" class="mobile-category-image">`
              : `<div class="mobile-category-placeholder">
                   <span>Category Image</span>
                 </div>`
          }
        </div>
      </div>
      
      <div class="menu-list2 desktop-items" id="items-container">
        ${subcategory.items.map(createItemCard).join("")}
      </div>
      <nav class="menu-list mobile-items">
        ${subcategory.items.map(createItemCard).join("")}
      </nav>
    `

    // If showItemId is provided, automatically show that item on mobile
    if (showItemId && window.innerWidth <= 768) {
      const itemToShow = subcategory.items.find((item) => item.id === showItemId)
      if (itemToShow) {
        setTimeout(() => showMobileItem(itemToShow), 100)
      }
    }
  } else if (subcategory.subcategories) {
    // Subcategory with sub-subcategories - show name + image + sub-subcategories
    const subcategoryImage = subcategory.image || "images/placeholder-goat.jpg"

    container.innerHTML = `
      <!-- Desktop Layout -->
      <section class="highlight">
        <img src="${subcategoryImage}" alt="${subcategory.name}" class="highlight-img">
        <div class="highlight-details">
          <h2>${subcategory.name}</h2>
          <p>${subcategory.description || "Choose from our selection."}</p>
        </div>
      </section>
      
      <!-- Mobile Layout -->
      <div class="mobile-category-layout mobile-only">
        <div class="mobile-category-title">${subcategory.name}</div>
        <div class="mobile-category-image-container">
          ${
            subcategoryImage !== "images/placeholder-goat.jpg"
              ? `<img src="${subcategoryImage}" alt="${subcategory.name}" class="mobile-category-image">`
              : `<div class="mobile-category-placeholder">
                   <span>Category Image</span>
                 </div>`
          }
        </div>
      </div>
      
      <nav class="menu-list">
        <div class="menu-title desktop-only">${subcategory.name}</div>
        <hr class="full-width-line">
        ${subcategory.subcategories
          .map(
            (subSub) => `
            <div class="menu-item" onclick="goToSubSubcategory('${categoryId}', '${subcategoryId}', '${subSub.id}')">
              <span>${subSub.name}</span>
              <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
            </div>
            <hr class="full-width-line">
          `,
          )
          .join("")}
      </nav>
    `
  }

  setupQuantitySelectors()
}
function loadSubSubcategoryItems(categoryId, subcategoryId, subSubcategoryId, showItemId = null) {
  const category = findCategory(categoryId)
  if (!category) return showError("Category not found")

  const subcategory = findSubcategory(category, subcategoryId)
  if (!subcategory) return showError("Subcategory not found")

  const subSubcategory = findSubcategory(subcategory, subSubcategoryId)
  if (!subSubcategory || !subSubcategory.items) return showError("Items not found")

  const container = document.getElementById("category-content")
  const subSubcategoryImage = subSubcategory.image || "images/placeholder-goat.jpg"

  container.innerHTML = `
    <!-- Desktop Layout -->
    <section class="highlight">
      <img src="${subSubcategoryImage}" alt="${subSubcategory.name}" class="highlight-img">
      <div class="highlight-details">
        <h2>${subSubcategory.name}</h2>
        <p>${subSubcategory.description || "Delicious items from our menu."}</p>
      </div>
    </section>
    
    <!-- Mobile Layout -->
    <div class="mobile-category-layout mobile-only">
      <div class="mobile-category-title">${subSubcategory.name}</div>
      <div class="mobile-category-image-container">
        ${
          subSubcategoryImage !== "images/placeholder-goat.jpg"
            ? `<img src="${subSubcategoryImage}" alt="${subSubcategory.name}" class="mobile-category-image">`
            : `<div class="mobile-category-placeholder">
                 <span>Category Image</span>
               </div>`
        }
      </div>
    </div>
    
    <div class="menu-list2 desktop-items" id="items-container">
      ${subSubcategory.items.map(createItemCard).join("")}
    </div>
    <nav class="menu-list mobile-items">
      ${subSubcategory.items.map(createItemCard).join("")}
    </nav>
  `

  setupQuantitySelectors()

  // If showItemId is provided, automatically show that item on mobile
  if (showItemId && window.innerWidth <= 768) {
    const itemToShow = subSubcategory.items.find((item) => item.id === showItemId)
    if (itemToShow) {
      setTimeout(() => showMobileItem(itemToShow), 100)
    }
  }
}

// UI rendering
function createItemCard(item) {
  // Check if mobile view
  if (window.innerWidth <= 768) {
    return `
    <div class="menu-item mobile-menu-item" onclick="showMobileItem(${JSON.stringify(item).replace(/"/g, "&quot;")})">
      <span>${item.name}</span>
      <img src="images/right-arrow.png" alt="Arrow" class="menu-icon">
    </div>
  `
  }

  const isInCart = window.cart.items.find((cartItem) => cartItem.id === item.id)
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
  `
}

 function setupQuantitySelectors() {
  // Handled by inline onclick events
}

// Navigation
function goBack() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category");
  const subcategoryId = urlParams.get("subcategory");
  const subSubcategoryId = urlParams.get("subsubcategory");

  if (currentMobileItem && window.innerWidth <= 768) {
    // Mobile item view - hide the item
    hideMobileItem();
    // Replace state to remove the item ID from URL
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('showItem');
    window.history.replaceState({}, '', currentUrl.toString());
  } else if (window.innerWidth <= 768 && window.history.length > 1) {
    // Mobile list view - regular back navigation
    window.history.back();
  } else if (subSubcategoryId) {
    // Desktop: Currently viewing subsubcategory - go back to subcategory
    window.location.href = `category.html?category=${categoryId}&subcategory=${subcategoryId}`;
  } else if (subcategoryId) {
    // Desktop: Currently viewing subcategory - go back to category
    window.location.href = `category.html?category=${categoryId}`;
  } else if (categoryId) {
    // Desktop: Currently viewing category - go back to home
    window.location.href = "index.html";
  } else if (window.history.length > 1) {
    // Fallback - regular back navigation
    window.history.back();
  } else {
    // No history - go to home
    window.location.href = "index.html";
  }
}

 function goToMyTray() {
    window.location.href = "mytray.html"
}

function goToSubcategory(categoryId, subcategoryId) {
  const newUrl = `category.html?category=${categoryId}&subcategory=${subcategoryId}`;
  window.history.pushState({ categoryId, subcategoryId }, '', newUrl);
  window.location.href = newUrl;
}

function goToSubSubcategory(categoryId, subcategoryId, subSubcategoryId) {
  const newUrl = `category.html?category=${categoryId}&subcategory=${subcategoryId}&subsubcategory=${subSubcategoryId}`;
  window.history.pushState({ categoryId, subcategoryId, subSubcategoryId }, '', newUrl);
  window.location.href = newUrl;
}

// Carousel functionality
function navigateCarousel(direction) {
  currentCarouselIndex = (currentCarouselIndex + direction + carouselItems.length) % carouselItems.length
  updateCarouselDisplay()
}

function goToCarouselItem(index) {
  currentCarouselIndex = index
  updateCarouselDisplay()
}

function updateCarouselDisplay() {
  const item = carouselItems[currentCarouselIndex]
  const highlightSection = document.querySelector(".highlight")

  if (!highlightSection) return

  highlightSection.classList.add("fade-out")

  setTimeout(() => {
    const highlightImg = highlightSection.querySelector(".highlight-img")
    const highlightTitle = highlightSection.querySelector(".highlight-details h2")
    const highlightDesc = highlightSection.querySelector(".highlight-details p")

    if (highlightImg) {
      highlightImg.src = item.image || "images/placeholder-goat.jpg"
      highlightImg.alt = item.name
    }
    if (highlightTitle) highlightTitle.textContent = item.name
    if (highlightDesc) highlightDesc.textContent = item.description || "Delicious item from our menu."

    const dots = highlightSection.querySelectorAll(".dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentCarouselIndex)
    })

    highlightSection.classList.remove("fade-out")
  }, 300)
}

document.addEventListener("DOMContentLoaded", () => {
  function checkMenuData() {
    if (window.menuData && window.menuData.categories) {
      initializePage()
      return true
    }
    return false
  }

  if (!checkMenuData()) {
    let attempts = 0
    const maxAttempts = 30
    const interval = setInterval(() => {
      attempts++
      if (checkMenuData() || attempts >= maxAttempts) {
        clearInterval(interval)
        if (attempts >= maxAttempts) {
          showError("Menu data failed to load. Please refresh the page.")
        }
      }
    }, 100)
  }
})

// Mobile functionality
function showMobileItem(item) {
  const mobileDisplay = document.getElementById("mobile-item-display")
  const mobileImg = document.getElementById("mobile-item-img")
  const mobilePlaceholder = document.getElementById("mobile-item-placeholder")
  const mobileDescription = document.getElementById("mobile-description")
  const mobileDescriptionText = document.getElementById("mobile-description-text")
  const mobileQuantity = document.getElementById("mobile-quantity")
  const mobilePrice = document.getElementById("mobile-price")
  const mobileAddBtn = document.getElementById("mobile-add-to-tray")

  if (window.innerWidth <= 768) {
    currentMobileItem = item
    // Push a new state to the history
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('showItem', item.id);
    window.history.pushState({ itemId: item.id }, '', currentUrl.toString());
    // Handle image display
    if (item.image) {
      mobileImg.src = item.image
      mobileImg.alt = item.name
      mobileImg.style.display = "block"
      mobilePlaceholder.style.display = "none"
    } else {
      mobileImg.style.display = "none"
      mobilePlaceholder.style.display = "flex"
      mobilePlaceholder.textContent = "Item Image"
    }

    mobileDescriptionText.textContent = item.description || "Delicious item from our menu."

    // Set quantity from cart if item is already in cart
    const cartItem = window.cart.items.find((cartItem) => cartItem.id === item.id)
    const currentQuantity = cartItem ? cartItem.quantity : 1
    mobileQuantity.textContent = currentQuantity
    mobilePrice.textContent = `Ksh ${item.price * currentQuantity}`

    // Update button text based on cart status
    const isInCart = window.cart.items.find((cartItem) => cartItem.id === item.id)
    mobileAddBtn.textContent = isInCart ? "Remove" : "Add to Tray"
    mobileAddBtn.style.background = isInCart ? "white" : "black"
    mobileAddBtn.style.color = isInCart ? "black" : "white"
    mobileAddBtn.style.border = isInCart ? "2px solid black" : "none"

    mobileDisplay.style.display = "flex"

    // Hide other content
    document.getElementById("category-content").style.display = "none"
  }
}

function hideMobileItem() {
  document.getElementById("mobile-item-display").style.display = "none";
  document.getElementById("category-content").style.display = "block";
  currentMobileItem = null;
  
  // Update URL without adding to history
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete('showItem');
  window.history.replaceState({}, '', currentUrl.toString());
}


// Cart interactions
function updateQuantity(itemId, change) {
  const quantityElement = document.getElementById(`quantity-${itemId}`)
  const priceElement = document.getElementById(`price-${itemId}`)
  const button = document.getElementById(`btn-${itemId}`)

  if (!quantityElement || !priceElement) return

  const item = findItemById(itemId)
  if (!item) return

  let quantity = Number.parseInt(quantityElement.textContent) + change
  if (quantity < 1) quantity = 1

  quantityElement.textContent = quantity
  priceElement.textContent = item.price * quantity

  // If item is in cart, update the quantity there too
  const isInCart = window.cart.items.find((cartItem) => cartItem.id === itemId)
  if (isInCart) {
    window.cart.updateQuantity(itemId, quantity)
    
    // Update button immediately
    button.textContent = "Remove"
    button.style.backgroundColor = "white"
    button.style.color = "black"
    button.style.border = "2px solid black"
  }
}
 function toggleCart(itemId) {
  const button = document.getElementById(`btn-${itemId}`)
  const quantityElement = document.getElementById(`quantity-${itemId}`)

  if (!button || !quantityElement) return

  const quantity = Number.parseInt(quantityElement.textContent)
  const item = findItemById(itemId)

  if (!item) return

  const cartItem = window.cart.items.find((cartItem) => cartItem.id === itemId)
  if (cartItem) {
    window.cart.removeItem(itemId)
    button.textContent = "Add to tray"
    button.style.backgroundColor = ""
    button.style.color = ""
    button.style.border = ""
  } else {
    window.cart.addItem(itemId, quantity, item.price, item.name, item.image || "images/placeholder-goat.jpg")
    button.textContent = "Remove"
    button.style.backgroundColor = "white"
    button.style.color = "black"
    button.style.border = "2px solid black"
  }
}

// Helper functions
function findCategory(categoryId) {
  return window.menuData.categories.find((c) => c.id === categoryId)
}
function findSubcategory(parentCategory, subcategoryId) {
  return parentCategory.subcategories?.find((s) => s.id === subcategoryId)
}
function findItemById(itemId) {
    for (const category of window.menuData?.categories || []) {
        // Check category items
        const categoryItem = category.items?.find(i => i.id === itemId);
        if (categoryItem) return categoryItem;

        // Check subcategories
        for (const subcategory of category.subcategories || []) {
            const subcategoryItem = subcategory.items?.find(i => i.id === itemId);
            if (subcategoryItem) return subcategoryItem;

            // Check sub-subcategories
            for (const subSub of subcategory.subcategories || []) {
                const subSubItem = subSub.items?.find(i => i.id === itemId);
                if (subSubItem) return subSubItem;
            }
        }
    }
    return null;
}

 function findItemInCategory(category, itemId) {
  // Check main items
  if (category.items) {
    const item = category.items.find(i => i.id === itemId);
    if (item) return item;
  }

  // Check subcategories
  if (category.subcategories) {
    for (const subcategory of category.subcategories) {
      // Check subcategory items
      if (subcategory.items) {
        const item = subcategory.items.find(i => i.id === itemId);
        if (item) return item;
      }

      // Check sub-subcategories
      if (subcategory.subcategories) {
        for (const subSub of subcategory.subcategories) {
          if (subSub.items) {
            const item = subSub.items.find(i => i.id === itemId);
            if (item) return item;
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
  `
}
function loadFontAwesome() {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  document.head.appendChild(link)
}

/*********************
 * EVENT LISTENERS
 *********************/
// DOM ready handler
  // Mobile event handlers
document.addEventListener("DOMContentLoaded", () => {
  // Info button toggle
  document.getElementById("mobile-info-btn")?.addEventListener("click", () => {
    const description = document.getElementById("mobile-description")
    description.style.display = description.style.display === "none" ? "block" : "none"
  })

  // Counter buttons
  // Update the mobile decrease event listener
  document.getElementById("mobile-decrease")?.addEventListener("click", () => {
    const quantityEl = document.getElementById("mobile-quantity")
    const priceEl = document.getElementById("mobile-price")
    let quantity = Number.parseInt(quantityEl.textContent)
    if (quantity > 1) {
      quantity--
      quantityEl.textContent = quantity
      if (currentMobileItem) {
        priceEl.textContent = `Ksh ${currentMobileItem.price * quantity}`
        
        // If item is in cart, update the quantity there too
        const isInCart = window.cart.items.find((cartItem) => cartItem.id === currentMobileItem.id)
        if (isInCart) {
          window.cart.updateQuantity(currentMobileItem.id, quantity)
        }
      }
    }
  })

  // Update the mobile increase event listener
  document.getElementById("mobile-increase")?.addEventListener("click", () => {
    const quantityEl = document.getElementById("mobile-quantity")
    const priceEl = document.getElementById("mobile-price")
    let quantity = Number.parseInt(quantityEl.textContent)
    quantity++
    quantityEl.textContent = quantity
    if (currentMobileItem) {
      priceEl.textContent = `Ksh ${currentMobileItem.price * quantity}`
      
      // If item is in cart, update the quantity there too
      const isInCart = window.cart.items.find((cartItem) => cartItem.id === currentMobileItem.id)
      if (isInCart) {
        window.cart.updateQuantity(currentMobileItem.id, quantity)
      }
    }
  })

  // Add to tray button
  document.getElementById("mobile-add-to-tray")?.addEventListener("click", function () {
    if (!currentMobileItem) return

    const quantity = Number.parseInt(document.getElementById("mobile-quantity").textContent)
    const isInCart = window.cart.items.find((cartItem) => cartItem.id === currentMobileItem.id)

    if (isInCart) {
      window.cart.removeItem(currentMobileItem.id)
      this.textContent = "Add to Tray"
      this.style.background = "black"
      this.style.color = "white"
      this.style.border = "none"
    } else {
      window.cart.addItem(
        currentMobileItem.id,
        quantity,
        currentMobileItem.price,
        currentMobileItem.name,
        currentMobileItem.image || null,
      )
      this.textContent = "Remove"
      this.style.background = "white"
      this.style.color = "black"
      this.style.border = "2px solid black"
    }
  })
})

  // Navigation handlers
// Initialize back buttons when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('back-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });

  document.querySelector('.back')?.addEventListener('click', (e) => {
    e.preventDefault();
    goBack();
  });
});

  // Initialize page
function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("category");
    const subcategoryId = urlParams.get("subcategory");
    const subSubcategoryId = urlParams.get("subsubcategory");
    const showItemId = urlParams.get("showItem") || localStorage.getItem("showItemId");

    // Clear stored ID immediately after reading
    localStorage.removeItem("showItemId");

    if (subSubcategoryId) {
        loadSubSubcategoryItems(categoryId, subcategoryId, subSubcategoryId, showItemId);
    } else if (subcategoryId) {
        loadSubcategoryItems(categoryId, subcategoryId, showItemId);
    } else if (categoryId) {
        loadCategoryContent(categoryId, showItemId);
    } else if (showItemId) {
        // Fallback for direct item access
        loadItemDirectly(showItemId);
    }
}
window.addEventListener('popstate', (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const showItemId = urlParams.get('showItem');
  
  if (showItemId && window.innerWidth <= 768) {
    // Mobile: Show the item if we're going back to an item view
    const item = findItemById(showItemId);
    if (item) {
      showMobileItem(item);
    }
  } else if (currentMobileItem) {
    // Mobile: Hide the item if we're going back to the list view
    hideMobileItem();
  } else {
    // Desktop: Reload the page to show the correct level
    initializePage();
  }
});
// Window events
// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && currentMobileItem) {
    hideMobileItem()
  }
})
// Handle cart updates
window.addEventListener("cartUpdated", () => {
  // Update mobile view if open
  if (currentMobileItem) {
    const mobileAddBtn = document.getElementById("mobile-add-to-tray")
    const isInCart = window.cart.items.find((cartItem) => cartItem.id === currentMobileItem.id)
    
    if (isInCart) {
      mobileAddBtn.textContent = "Remove"
      mobileAddBtn.style.background = "white"
      mobileAddBtn.style.color = "black"
      mobileAddBtn.style.border = "2px solid black"
      document.getElementById("mobile-quantity").textContent = isInCart.quantity
      document.getElementById("mobile-price").textContent = `Ksh ${currentMobileItem.price * isInCart.quantity}`
    } else {
      mobileAddBtn.textContent = "Add to Tray"
      mobileAddBtn.style.background = "black"
      mobileAddBtn.style.color = "white"
      mobileAddBtn.style.border = "none"
    }
  }
}
)
/*********************
 * GLOBAL EXPORTS
 *********************/
window.navigateCarousel = navigateCarousel;
window.goToCarouselItem = goToCarouselItem;
window.showMobileItem = showMobileItem;
window.hideMobileItem = hideMobileItem;
