const menuData = {
    
    categories: [
        {
            id: "platters",
            name: "Platters",
            items: [
                {
                    id: "wadau-platter",
                    name: "Wadau Platter for Two",
                    description: "Consists of sizeable portions of beef, goat and chicken. Accompanied by pilau, rice, biryani rice, greens, garden salad, kachumbari, avocado and fried egg.",
                    price: 3000,
                    image: "images/platters/wadau-platter.jpg"
                },
                {
                    id: "beef-platter",
                    name: "Beef Platter for two",
                    description: "Consists of sizeable portions of beef, goat and kienyeji chicken. Accompaled by ugali and kachumbari.",
                    price: 3000,
                    image: "images/platters/beef-platter.jpg"
                }
            ]
        },
        {
            id: "main-course",
            name: "Main Course",
            subcategories: [
                {
                    id: "mbuzi-choma",
                    name: "Mbuzi Choma",
                    image: "images/main-course/mbuzi-choma.jpg",
                    description: "Tender, juicy goat marinated in select spices and grilled to perfection. Can be served with with traditional sides like kachumbari, ugali, roast potatoes or fries (sides are priced separately).",
                    items: [
                        {
                            id: "arm",
                            name: "Arm",
                            price: 300,
                            image: "images/main-course/goat-arm.jpg"
                        },
                        {
                            id: "rib",
                            name: "Rib",
                            price: 4000,
                            image: "images/main-course/goat-rib.jpg"
                        },
                        {
                            id: "half-rib",
                            name: "Half Rib",
                            price: 2000,
                            image: "images/main-course/half-rib.jpg"
                        },
                        {
                            id: "leg-hip",
                            name: "Leg and Hip",
                            price: 2000,
                            image: "images/main-course/leg-hip.jpg"
                        }
                    ]
                },
                {
                    id: "wadau-kuku",
                    name: "Wadau Kuku Kienyeji",
                    description:"Juicy kienyeji chicken, marinated in select spices and pan fried to a crispy perfection. Accompaniments sold separately",
                    items: [
                        {
                            id: "full-chicken",
                            name: "Full Chicken",
                            price: 3000,
                            image: "images/main-course/full-chicken.jpg"
                        },
                        {
                            id: "half-chicken",
                            name: "Half Chicken",
                            price: 1500,
                            image: "images/main-course/half-chicken.jpg"
                        }
                    ]
                },
                {
                    id: "fried-delight",
                    name: "Wadau's Fried Delight",
                    description: "Experience the rich, savoury flavours of Wadau's pan-fried beef or goat meat, marinated in a select blend of spices and cooked to a crispy perfection.",
                    items: [
                        {
                            id: "beef-1kg",
                            name: "Beef 1kg",
                            price: 1800,
                            image: "images/main-course/fried-beef.jpg"
                        },
                        {
                            id: "mbuzi-1kg",
                            name: "Mbuzi 1kg",
                            price: 1500,
                            image: "images/main-course/fried-goat.jpg"
                        }
                    ]
                },
                {
                    id: "Swahili-dishes",
                    name: "Swahili-dishes",
                    description: "Enjoy the rich aromatic flavours of traditional Swahili dishes. From coconut-infused pilau to tender biryani, each dish is prepared with a unique blend of spices and fresh ingredients capturing the vibrant taste of the coastal Kenya.",
                    items: [
                        {
                            id: "beef-pilau",
                            name: "Beef Pilau",
                            price: 1500,
                            image: "images/main-course/beef-pilau.jpg"
                        },
                        {
                            id: "goat-pilau",
                            name: "Goat Pilau",
                            price: 2000,
                            image: "images/main-course/goat-pilau.jpg"
                        },
                        {
                            id: "chicken-biriani",
                            name: "Chicken Biriani",
                            price: 2500,
                            image: "images/main-course/chicken-biriani.jpg"
                        }
                    ]
                },
                {
                    id: "sides",
                    name: "Sides",
                    description:"The perfect complement to any main dish, our selection of sides adds flavor and variety to your meal. From crispy fries and fresh salads to buttery vegetables and savory rice, there's something for everyone to enjoy.",
                    items: [
                        {
                            id: "french-fries",
                            name: "French Fries",
                            price: 300,
                            image: "images/main-course/french-fries.jpg"
                        },
                        {
                            id: "roast-potatoes",
                            name: "Roast Potatoes",
                            price: 300,
                            image: "images/main-course/roast-potatoes.jpg"
                        },
                        {
                            id: "sauteed-potatoes",
                            name: "Sautéed Potatoes",
                            price: 350,
                            image: "images/main-course/sauteed-potatoes.jpg"
                        },
                        {
                            id: "mashed-potatoes",
                            name: "Mashed Potatoes",
                            price: 300,
                            image: "images/main-course/mashed-potatoes.jpg"
                        },
                        {
                            id: "plain-rice",
                            name: "Plain Rice",
                            price: 400,
                            image: "images/main-course/plain-rice.jpg"
                        },
                        {
                            id: "coconut-rice",
                            name: "Coconut Rice",
                            price: 400,
                            image: "images/main-course/coconut-rice.jpg"
                        },
                        {
                            id: "vegetable-rice",
                            name: "Vegetable Rice",
                            price: 400,
                            image: "images/main-course/vegetable-rice.jpg"
                        }
                    ]
                }
            ]
        },
        {
            id: "snacks",
            name: "Snacks",
            items: [
                {
                    id: "wadau-burgers",
                    name: "Wadau's Burgers",
                    description: "Picture a perfectly seasoned beef patty nestled in a fresh bun topped with crisp lettuce, ripe tomatoes, and creamy cheese. Served with crispy fries and fresh garden salad, this burger offers a complete and satisyling meal.",
                    price: 1000,
                    image: "images/snacks/burger.jpg"
                },
                {
                    id: "samosas",
                    name: "Samosas (3 pieces)",
                    description: "Crispy, savory pastries filled with a flavorful blend of ingredients, perfectly spiced and fried to a golden crunch. A delicious snack or appetizer, served with a dipping sauce.",
                    price: 350,
                    image: "images/snacks/samosas.jpg"
                },
                {
                    id: "sausages",
                    name: "Sausages (2 pieces)",
                    description: "Juicy and flavorful, our sausages are cooked to perfection, offering a satisfying bite every time. Enjoy them on their own or paired with your favorite sides.",
                    price: 200,
                    image: "images/snacks/sausages.jpg"
                }
            ]
        },
        {
            id: "beverages",
            name: "Beverages",
            description: "Quench your thirst with our selection of refreshing beverages. From non-alcoholic drinks to a variety of alcoholic options, we have something for everyone. Enjoy seasonal fruit juices, soft drinks, and a wide range of spirits including beer, gin, whiskey, and more.",
            subcategories: [
                {
                    id: "non-alcoholic",
                    name: "Non-Alcoholic",
                    items: [
                        {
                            id: "fresh-juice",
                            name: "Fresh Juice",
                            description: "A rich and smooth spirit distilled from sugarcane, offering a range of flavors from sweet and light to dark and robust. Perfect for cocktails, neat sipping, or mixing with your favorite drinks.",
                            price: 400,
                            image: "images/beverages/juice.jpg"
                        },
                        {
                            id: "mocktails",
                            name: "Mocktails",
                            description: "Virgin fruit cocktails",
                            price: 600,
                            image: "images/beverages/mocktail.jpg"
                        },
                        {
                            id: "soda",
                            name: "Soda",
                            description: "Assorted soft drinks",
                            price: 200,
                            image: "images/beverages/soda.jpg"
                        }
                    ]
                },
                {
                    id: "alcoholic",
                    name: "Alcoholic",
                    description:"Explore a premium select selection of whiskeys, gins, rums, tequilas, cognacs, vodkas, and more. Whether you prefer a smooth sip, a bold a bold cocktail, or a sparkling toast, our curated collection offers something for every taste. Cheers!",
                    subcategories: [
                        {
                            id: "beer",
                            name: "Beers",
                            description: "Enjoy a refreshing selection of local and international beers, perfect for any occasion. Whether you prefer a crisp lager, a smooth ale, or a rich stout, our collection offers something to suit every taste. Cheers!",
                            items: [
                                {
                                    id: "heineken",
                                    name: "Heineken",
                                    price: 450,
                                    image: "images/beverages/heineken.jpg"
                                },
                                {
                                    id: "local-beer",
                                    name: "Local Beers",
                                    price: 400,
                                    image: "images/beverages/local-beer.jpg"
                                }
                            ]
                        },
                        {
                            id: "brandy",
                            name: "Brandy",
                            description:"A timeless spirit known for its smooth, rich flavor and warm finish. Perfect for sipping neat, on the rocks, or as a base for classic cocktails. Enjoy the depth and elegance of our carefully selected brandies",
                            items: [
                                {
                                    id: "viceroy",
                                    name: "Viceroy",
                                    price: 4500,
                                    image: "images/beverages/viceroy.jpg"
                                },
                                {
                                    id: "martel-vsop",
                                    name: "Martel VSOP",
                                    price: 20000,
                                    image: "images/beverages/martel-vsop.jpg"
                                }
                            ]
                        },
                        {
                            id: "cognac",
                            name: "Cognac",
                            description:"A premium and retined brandy from France, known for its rich, smooth, and complex flavors. Perfect for sipping neat, on the rocks, or as a luxurious cocktail base. Experience elegance in every sip",
                            items: [
                                {
                                    id: "hennessy-vs-700",
                                    name: "Hennessy VS (700ml)",
                                    price: 10000,
                                    image: "images/beverages/hennessy-vs.jpg"
                                },
                                {
                                    id: "hennessy-vs-1000",
                                    name: "Hennessy VS (1000ml)",
                                    price: 18000,
                                    image: "images/beverages/hennessy-vs.jpg"
                                },
                                {
                                    id: "hennessy-vsop",
                                    name: "Hennessy VSOP",
                                    price: 21000,
                                    image: "images/beverages/hennessy-vsop.jpg"
                                },
                                {
                                    id: "hennessy-xo",
                                    name: "Hennessy XO",
                                    price: 55000,
                                    image: "images/beverages/hennessy-xo.jpg"
                                },
                                {
                                    id: "remy-martin",
                                    name: "Remy Martin",
                                    price: 18000,
                                    image: "images/beverages/remy-martin.jpg"
                                },
                                {
                                    id: "martel-blue",
                                    name: "Martel Blue Swift",
                                    price: 23000,
                                    image: "images/beverages/martel-blue.jpg"
                                }
                            ]
                        },
                        {
                            id: "gin",
                            name: "Gin",
                            description: "A versatile and aromatic spirit, crafted with botanicals for a refreshing and distinct flavor. Perfect for classic cocktails like gin & tonic or martinis, or enjoyed neat for a crisp, smooth experience.",
                            items: [
                                {
                                    id: "tanqueray-serv",
                                    name: "Tanqueray Serv",
                                    price: 7500,
                                    image: "images/beverages/tanqueray.jpg"
                                },
                                {
                                    id: "tanqueray-royal",
                                    name: "Tanqueray Royal",
                                    price: 7500,
                                    image: "images/beverages/tanqueray-royal.jpg"
                                },
                                {
                                    id: "tanqueray-10",
                                    name: "Tanqueray 10 Yrs",
                                    price: 10000,
                                    image: "images/beverages/tanqueray-10.jpg"
                                },
                                {
                                    id: "tanqueray-ldg",
                                    name: "Tanqueray LDG",
                                    price: 8000,
                                    image: "images/beverages/tanqueray-ldg.jpg"
                                },
                                {
                                    id: "hendrix",
                                    name: "Hendrix",
                                    price: 12000,
                                    image: "images/beverages/hendrix.jpg"
                                },
                                {
                                    id: "gilbeys",
                                    name: "Gilbeys",
                                    price: 4500,
                                    image: "images/beverages/gilbeys.jpg"
                                },
                                {
                                    id: "gordons-clear",
                                    name: "Gordons Gin Clear",
                                    price: 5500,
                                    image: "images/beverages/gordons-clear.jpg"
                                },
                                {
                                    id: "gordons-pink",
                                    name: "Gordons Gin Pink",
                                    price: 6500,
                                    image: "images/beverages/gordons-pink.jpg"
                                }
                            ]
                        },
                        {
                            id: "liqueurs",
                            name: "Liqueurs",
                            description:"Sweet, flavorful spirits infused with fruits, herbs, or spices, perfect for sipping, mixing in cocktails, or adding a rich twist to desserts. Smooth, indulgent, and versatile for any occasion.",
                            items: [
                                {
                                    id: "amarula",
                                    name: "Amarula",
                                    price: 6000,
                                    image: "images/beverages/amarula.jpg"
                                },
                                {
                                    id: "baileys-1000",
                                    name: "Bailey's (1000ml)",
                                    price: 8000,
                                    image: "images/beverages/baileys.jpg"
                                },
                                {
                                    id: "baileys-750",
                                    name: "Bailey's (750ml)",
                                    price: 5500,
                                    image: "images/beverages/baileys.jpg"
                                },
                                {
                                    id: "kahlua",
                                    name: "Kahlua",
                                    price: 6000,
                                    image: "images/beverages/kahlua.jpg"
                                },
                                {
                                    id: "sheradon",
                                    name: "Sheradon",
                                    price: 8000,
                                    image: "images/beverages/sheradon.jpg"
                                }
                            ]
                        },
                        {
                            id: "rum",
                            name: "Rum",
                            description:"A rich and smooth spirit distilled from sugarcane, offering a range of flavors from sweet and light to dark and robust. Perfect for cocktails, neat sipping, or mixing with your favorite drinks.",
                            items: [
                                {
                                    id: "malibu",
                                    name: "Malibu",
                                    price: 7500,
                                    image: "images/beverages/malibu.jpg"
                                },
                                {
                                    id: "bacardi",
                                    name: "Bacardi",
                                    price: 7000,
                                    image: "images/beverages/bacardi.jpg"
                                }
                            ]
                        },
                        {
                            id: "sparkling-wines",
                            name: "Sparkling Wines & Champagne",
                            description:"Elegant and effervescent, perfect for celebrations or casual toasts. From crisp Prosecco to luxurious Champagne, our selection offers refreshing bubbles with bright, fruity, and refined flavors.",
                            items: [
                                {
                                    id: "moet",
                                    name: "MOET",
                                    price: 22000,
                                    image: "images/beverages/moet.jpg"
                                },
                                {
                                    id: "canti-prosecco",
                                    name: "Canti Prosecco",
                                    price: 5000,
                                    image: "images/beverages/canti-prosecco.jpg"
                                },
                                {
                                    id: "chamdor",
                                    name: "Chamdor Sparkling",
                                    price: 3000,
                                    image: "images/beverages/chamdor.jpg"
                                },
                                {
                                    id: "nederberg-brut",
                                    name: "Nederberg Brut",
                                    price: 5000,
                                    image: "images/beverages/nederberg-brut.jpg"
                                },
                                {
                                    id: "nederberg-rose",
                                    name: "Nederberg Rose",
                                    price: 5000,
                                    image: "images/beverages/nederberg-rose.jpg"
                                }
                            ]
                        },
                        {
                            id: "tequila",
                            name: "Tequila",
                            description:"A bold and vibrant spirit made from blue agave, known for its smooth yet fiery character. Enjoy it neat, in classic cocktails like margaritas, or as a lively shot with salt and lime.",
                            items: [
                                {
                                    id: "jose-cuervo",
                                    name: "Jose Cuervo",
                                    price: 8000,
                                    image: "images/beverages/jose-cuervo.jpg"
                                },
                                {
                                    id: "camino-gold",
                                    name: "Camino Gold",
                                    price: 14000,
                                    image: "images/beverages/camino-gold.jpg"
                                },
                                {
                                    id: "tequila-rose",
                                    name: "Tequila Rose",
                                    price: 7500,
                                    image: "images/beverages/tequila-rose.jpg"
                                }
                            ]
                        },
                        {
                            id: "vodka",
                            name: "Vodka",
                            description:"A bold and vibrant spirit made from blue agave, known for its smooth yet fiery character. Enjoy it neat, in classic cocktails like margaritas, or as a lively shot with salt and lime.",
                            items: [
                                {
                                    id: "smirnoff-red",
                                    name: "Smirnoff Red",
                                    price: 6000,
                                    image: "images/beverages/smirnoff-red.jpg"
                                },
                                {
                                    id: "ciroc-blue",
                                    name: "Ciroc Blue",
                                    price: 7500,
                                    image: "images/beverages/ciroc-blue.jpg"
                                },
                                {
                                    id: "ciroc-red",
                                    name: "Ciroc Red",
                                    price: 6000,
                                    image: "images/beverages/ciroc-red.jpg"
                                }
                            ]
                        },
                        {
                            id: "whiskey",
                            name: "Whiskey",
                            description:"A timeless and versatile spirit, carefully aged to develop deep, rich flavors ranging from smooth and sweet to bold and smoky. Enjoy it neat, on the rocks, or in classic cocktails, perfectly curated for a premium experience at our restaurant.",
                            items: [
                                {
                                    id: "macallan",
                                    name: "Macallan",
                                    price: 25000,
                                    image: "images/beverages/macallan.jpg"
                                },
                                {
                                    id: "glenfiddich-18",
                                    name: "Glenfiddich 18 Yrs",
                                    price: 18000,
                                    image: "images/beverages/glenfiddich-18.jpg"
                                },
                                {
                                    id: "glenfiddich-15",
                                    name: "Glenfiddich 15 Yrs",
                                    price: 14000,
                                    image: "images/beverages/glenfiddich-15.jpg"
                                },
                                {
                                    id: "glenfiddich-12",
                                    name: "Glenfiddich 12 Yrs",
                                    price: 10000,
                                    image: "images/beverages/glenfiddich-12.jpg"
                                },
                                {
                                    id: "singleton-15",
                                    name: "Singleton 15 Yrs",
                                    price: 12000,
                                    image: "images/beverages/singleton-15.jpg"
                                },
                                {
                                    id: "singleton-12",
                                    name: "Singleton 12 Yrs",
                                    price: 10000,
                                    image: "images/beverages/singleton-12.jpg"
                                },
                                {
                                    id: "jd-honey",
                                    name: "JD Honey",
                                    price: 8000,
                                    image: "images/beverages/jd-honey.jpg"
                                },
                                {
                                    id: "gentleman",
                                    name: "Gentleman",
                                    price: 12000,
                                    image: "images/beverages/gentleman.jpg"
                                },
                                {
                                    id: "founders-reserve",
                                    name: "Founders Reserve",
                                    price: 7500,
                                    image: "images/beverages/founders-reserve.jpg"
                                },
                                {
                                    id: "jack-daniels-700",
                                    name: "Jack Daniels (700ml)",
                                    price: 6000,
                                    image: "images/beverages/jack-daniels.jpg"
                                },
                                {
                                    id: "jack-daniels-1000",
                                    name: "Jack Daniels (1000ml)",
                                    price: 8000,
                                    image: "images/beverages/jack-daniels.jpg"
                                },
                                {
                                    id: "taliskar",
                                    name: "Taliskar",
                                    price: 10000,
                                    image: "images/beverages/taliskar.jpg"
                                },
                                {
                                    id: "lagavulin",
                                    name: "Lagavulin",
                                    price: 10000,
                                    image: "images/beverages/lagavulin.jpg"
                                },
                                {
                                    id: "jb",
                                    name: "J&B",
                                    price: 7500,
                                    image: "images/beverages/jb.jpg"
                                },
                                {
                                    id: "jameson",
                                    name: "Jameson",
                                    price: 6000,
                                    image: "images/beverages/jameson.jpg"
                                },
                                {
                                    id: "jw-blue",
                                    name: "Johnnie Walker Blue",
                                    price: 35000,
                                    image: "images/beverages/jw-blue.jpg"
                                },
                                {
                                    id: "jw-18",
                                    name: "Johnnie Walker 18 Yrs",
                                    price: 18000,
                                    image: "images/beverages/jw-18.jpg"
                                },
                                {
                                    id: "jw-gold",
                                    name: "Johnnie Walker Gold",
                                    price: 14000,
                                    image: "images/beverages/jw-gold.jpg"
                                },
                                {
                                    id: "jw-green",
                                    name: "Johnnie Walker Green",
                                    price: 10500,
                                    image: "images/beverages/jw-green.jpg"
                                },
                                {
                                    id: "jw-black",
                                    name: "Johnnie Walker Black",
                                    price: 7500,
                                    image: "images/beverages/jw-black.jpg"
                                },
                                {
                                    id: "jw-dblack",
                                    name: "Johnnie Walker D Black",
                                    price: 10500,
                                    image: "images/beverages/jw-dblack.jpg"
                                },
                                {
                                    id: "jw-red",
                                    name: "Johnnie Walker Red",
                                    price: 5500,
                                    image: "images/beverages/jw-red.jpg"
                                },
                                {
                                    id: "southern-comfort",
                                    name: "Southern Comfort",
                                    price: 6000,
                                    image: "images/beverages/southern-comfort.jpg"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "other",
                    name: "Other",
                    items: [
                        {
                            id: "water",
                            name: "Bottle of Water",
                            description: "A rich and smooth spirit distilled from sugarcane, offering a range of flavors from sweet and light to dark and robust. Perfect for cocktails, neat sipping, or mixing with your favorite drinks.",
                            price: 200,
                            image: "images/beverages/water.jpg"
                        }
                    ]
                }
            ]
        }
    ]
};

// Function to get all main categories
function getMainCategories() {
    return menuData.categories.map(category => ({
        id: category.id,
        name: category.name
    }));
}

// Function to get items by category ID
function getItemsByCategory(categoryId) {
    const category = menuData.categories.find(c => c.id === categoryId);
    if (!category) return null;
    
    if (category.items) {
        return category.items;
    } else if (category.subcategories) {
        // For categories with subcategories, return all items flattened
        return category.subcategories.flatMap(sub => sub.items || []);
    }
    
    return [];
}

// Function to get subcategories by category ID
function getSubcategories(categoryId) {
    const category = menuData.categories.find(c => c.id === categoryId);
    return category?.subcategories || null;
}

// Function to get all items (for search functionality)
function getAllItems() {
    return menuData.categories.flatMap(category => {
        if (category.items) {
            return category.items.map(item => ({
                ...item,
                category: category.name
            }));
        } else if (category.subcategories) {
            return category.subcategories.flatMap(sub => {
                if (sub.items) {
                    return sub.items.map(item => ({
                        ...item,
                        category: category.name,
                        subcategory: sub.name
                    }));
                } else if (sub.subcategories) {
                    return sub.subcategories.flatMap(subSub => 
                        subSub.items.map(item => ({
                            ...item,
                            category: category.name,
                            subcategory: sub.name,
                            subSubcategory: subSub.name
                        }))
                    );
                }
                return [];
            });
        }
        return [];
    });
}
console.log("Menu data initialized:", menuData.categories.length, "categories loaded");
// Export for browser (critical addition)
if (typeof window !== 'undefined') {
    window.menuData = menuData;
    console.log("Menu data exported to window:", Object.keys(menuData));
}

// Ensure global availability
if (typeof window !== 'undefined') {
    window.menuDataExported = true;
    console.log("Menu data exported successfully");
    window.menuData = menuData;
}