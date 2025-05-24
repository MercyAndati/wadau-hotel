// scripts/menu-data.js
const menuData = {
  restaurant: {
    name: "Wadau Experience",
    phone: "0 722 861 224",
  },
    
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
                    image: "images/goatImage.png"
                },
                {
                    id: "beef-platter",
                    name: "Beef Platter for two",
                    description: "Consists of sizeable portions of beef, goat and kienyeji chicken. Accompaled by ugali and kachumbari.",
                    price: 3000,
                    image: "images/goatImage.png"
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
                    image: "images/goatImage.png",
                    description: "Tender, juicy goat marinated in select spices and grilled to perfection. Can be served with with traditional sides like kachumbari, ugali, roast potatoes or fries (sides are priced separately).",
                    items: [
                        {
                            id: "arm",
                            name: "Arm",
                            price: 300,
                        },
                        {
                            id: "rib",
                            name: "Rib",
                            price: 4000,
                        },
                        {
                            id: "half-rib",
                            name: "Half Rib",
                            price: 2000,
                        },
                        {
                            id: "leg-hip",
                            name: "Leg and Hip",
                            price: 2000,
                        }
                    ]
                },
                {
                    id: "wadau-kuku",
                    name: "Wadau Kuku Kienyeji",
                    image: "images/goatImage.png",
                    description:"Juicy kienyeji chicken, marinated in select spices and pan fried to a crispy perfection. Accompaniments sold separately",
                    items: [
                        {
                            id: "full-chicken",
                            name: "Full Chicken",
                            price: 3000,
                        },
                        {
                            id: "half-chicken",
                            name: "Half Chicken",
                            price: 1500,
                        }
                    ]
                },
                {
                    id: "fried-delight",
                    name: "Wadau's Fried Delight",
                    image: "images/goatImage.png",
                    description: "Experience the rich, savoury flavours of Wadau's pan-fried beef or goat meat, marinated in a select blend of spices and cooked to a crispy perfection.",
                    items: [
                        {
                            id: "beef-1kg",
                            name: "Beef 1kg",
                            price: 1800,
                        },
                        {
                            id: "mbuzi-1kg",
                            name: "Mbuzi 1kg",
                            price: 1500,
                        }
                    ]
                },
                {
                    id: "Swahili-dishes",
                    name: "Swahili-dishes",
                    image: "images/goatImage.png",
                    description: "Enjoy the rich aromatic flavours of traditional Swahili dishes. From coconut-infused pilau to tender biryani, each dish is prepared with a unique blend of spices and fresh ingredients capturing the vibrant taste of the coastal Kenya.",
                    items: [
                        {
                            id: "beef-pilau",
                            name: "Beef Pilau",
                            price: 1500,
                        },
                        {
                            id: "goat-pilau",
                            name: "Goat Pilau",
                            price: 2000,
                        },
                        {
                            id: "chicken-biriani",
                            name: "Chicken Biriani",
                            price: 2500,
                        }
                    ]
                },
                {
                    id: "sides",
                    name: "Sides",
                    image: "images/goatImage.png",
                    description:"The perfect complement to any main dish, our selection of sides adds flavor and variety to your meal. From crispy fries and fresh salads to buttery vegetables and savory rice, there's something for everyone to enjoy.",
                    items: [
                        {
                            id: "french-fries",
                            name: "French Fries",
                            price: 300,
                        },
                        {
                            id: "roast-potatoes",
                            name: "Roast Potatoes",
                            price: 300,
                        },
                        {
                            id: "sauteed-potatoes",
                            name: "Sautéed Potatoes",
                            price: 350,
                        },
                        {
                            id: "mashed-potatoes",
                            name: "Mashed Potatoes",
                            price: 300,
                        },
                        {
                            id: "plain-rice",
                            name: "Plain Rice",
                            price: 400,
                        },
                        {
                            id: "coconut-rice",
                            name: "Coconut Rice",
                            price: 400,
                        },
                        {
                            id: "vegetable-rice",
                            name: "Vegetable Rice",
                            price: 400,
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
                    image: "images/burgers.jpg"
                },
                {
                    id: "samosas",
                    name: "Samosas (3 pieces)",
                    description: "Crispy, savory pastries filled with a flavorful blend of ingredients, perfectly spiced and fried to a golden crunch. A delicious snack or appetizer, served with a dipping sauce.",
                    price: 350,
                    image: "images/samosa.jpg"
                },
                {
                    id: "sausages",
                    name: "Sausages (2 pieces)",
                    description: "Juicy and flavorful, our sausages are cooked to perfection, offering a satisfying bite every time. Enjoy them on their own or paired with your favorite sides.",
                    price: 200,
                    image: "images/sausages.jpg"
                }
            ]
        },
        {
            id: "beverages",
            name: "Beverages",
            image: "images/juice.png",
            description: "Quench your thirst with our selection of refreshing beverages. From non-alcoholic drinks to a variety of alcoholic options, we have something for everyone. Enjoy seasonal fruit juices, soft drinks, and a wide range of spirits including beer, gin, whiskey, and more.",
            subcategories: [
                {
                    id: "non-alcoholic",
                    name: "Non-Alcoholic",
                    image: "images/juice.png",
                    description: "A rich and smooth spirit distilled from sugarcane, offering a range of flavors from sweet and light to dark and robust. Perfect for cocktails, neat sipping, or mixing with your favorite drinks.",
                    items: [
                        {
                            id: "fresh-juice",
                            name: "Fresh Juice",
                            price: 400,
                        },
                        {
                            id: "mocktails",
                            name: "Mocktails",
                            price: 600,
                        },
                        {
                            id: "soda",
                            name: "Soda",
                            price: 200,
                        }
                    ]
                },
                {
                    id: "alcoholic",
                    name: "Alcoholic",
                    description:"Explore a premium select selection of whiskeys, gins, rums, tequilas, cognacs, vodkas, and more. Whether you prefer a smooth sip, a bold a bold cocktail, or a sparkling toast, our curated collection offers something for every taste. Cheers!",
                    image:"images/beerImage.png",
                    subcategories: [
                        {
                            id: "beer",
                            name: "Beers",
                            image: "images/beerImage.png",
                            description: "Enjoy a refreshing selection of local and international beers, perfect for any occasion. Whether you prefer a crisp lager, a smooth ale, or a rich stout, our collection offers something to suit every taste. Cheers!",
                            items: [
                                {
                                    id: "heineken",
                                    name: "Heineken",
                                    price: 450,
                                },
                                {
                                    id: "local-beer",
                                    name: "Local Beers",
                                    price: 400,
                                }
                            ]
                        },
                        {
                            id: "brandy",
                            name: "Brandy",
                            image: "images/brandy.jpg",
                            description:"A timeless spirit known for its smooth, rich flavor and warm finish. Perfect for sipping neat, on the rocks, or as a base for classic cocktails. Enjoy the depth and elegance of our carefully selected brandies",
                            items: [
                                {
                                    id: "viceroy",
                                    name: "Viceroy",
                                    price: 4500,
                                },
                                {
                                    id: "martel-vsop",
                                    name: "Martel VSOP",
                                    price: 20000,
                                }
                            ]
                        },
                        {
                            id: "cognac",
                            name: "Cognac",
                            image: "images/cognac.png",
                            description:"A premium and retined brandy from France, known for its rich, smooth, and complex flavors. Perfect for sipping neat, on the rocks, or as a luxurious cocktail base. Experience elegance in every sip",
                            items: [
                                {
                                    id: "hennessy-vs-700",
                                    name: "Hennessy VS (700ml)",
                                    price: 10000,
                                },
                                {
                                    id: "hennessy-vs-1000",
                                    name: "Hennessy VS (1000ml)",
                                    price: 18000,
                                },
                                {
                                    id: "hennessy-vsop",
                                    name: "Hennessy VSOP",
                                    price: 21000,
                                },
                                {
                                    id: "hennessy-xo",
                                    name: "Hennessy XO",
                                    price: 55000,
                                },
                                {
                                    id: "remy-martin",
                                    name: "Remy Martin",
                                    price: 18000,
                                },
                                {
                                    id: "martel-blue",
                                    name: "Martel Blue Swift",
                                    price: 23000,
                                }
                            ]
                        },
                        {
                            id: "gin",
                            name: "Gin",
                            image: "images/cognac.png",
                            description: "A versatile and aromatic spirit, crafted with botanicals for a refreshing and distinct flavor. Perfect for classic cocktails like gin & tonic or martinis, or enjoyed neat for a crisp, smooth experience.",
                            items: [
                                {
                                    id: "tanqueray-serv",
                                    name: "Tanqueray Serv",
                                    price: 7500,
                                },
                                {
                                    id: "tanqueray-royal",
                                    name: "Tanqueray Royal",
                                    price: 7500,
                                },
                                {
                                    id: "tanqueray-10",
                                    name: "Tanqueray 10 Yrs",
                                    price: 10000,
                                },
                                {
                                    id: "tanqueray-ldg",
                                    name: "Tanqueray LDG",
                                    price: 8000,
                                },
                                {
                                    id: "hendrix",
                                    name: "Hendrix",
                                    price: 12000,
                                },
                                {
                                    id: "gilbeys",
                                    name: "Gilbeys",
                                    price: 4500,
                                },
                                {
                                    id: "gordons-clear",
                                    name: "Gordons Gin Clear",
                                    price: 5500,
                                },
                                {
                                    id: "gordons-pink",
                                    name: "Gordons Gin Pink",
                                    price: 6500,
                                }
                            ]
                        },
                        {
                            id: "liqueurs",
                            name: "Liqueurs",
                            image: "images/rum.png",
                            description:"Sweet, flavorful spirits infused with fruits, herbs, or spices, perfect for sipping, mixing in cocktails, or adding a rich twist to desserts. Smooth, indulgent, and versatile for any occasion.",
                            items: [
                                {
                                    id: "amarula",
                                    name: "Amarula",
                                    price: 6000,
                                },
                                {
                                    id: "baileys-1000",
                                    name: "Bailey's (1000ml)",
                                    price: 8000,
                                },
                                {
                                    id: "baileys-750",
                                    name: "Bailey's (750ml)",
                                    price: 5500,
                                },
                                {
                                    id: "kahlua",
                                    name: "Kahlua",
                                    price: 6000,
                                },
                                {
                                    id: "sheradon",
                                    name: "Sheradon",
                                    price: 8000,
                                }
                            ]
                        },
                        {
                            id: "rum",
                            name: "Rum",
                            image: "images/rum.png",
                            description:"A rich and smooth spirit distilled from sugarcane, offering a range of flavors from sweet and light to dark and robust. Perfect for cocktails, neat sipping, or mixing with your favorite drinks.",
                            items: [
                                {
                                    id: "malibu",
                                    name: "Malibu",
                                    price: 7500,
                                },
                                {
                                    id: "bacardi",
                                    name: "Bacardi",
                                    price: 7000,
                                }
                            ]
                        },
                        {
                            id: "sparkling-wines",
                            name: "Sparkling Wines & Champagne",
                            image: "images/rum.png",
                            description:"Elegant and effervescent, perfect for celebrations or casual toasts. From crisp Prosecco to luxurious Champagne, our selection offers refreshing bubbles with bright, fruity, and refined flavors.",
                            items: [
                                {
                                    id: "moet",
                                    name: "MOET",
                                    price: 22000,
                                },
                                {
                                    id: "canti-prosecco",
                                    name: "Canti Prosecco",
                                    price: 5000,
                                },
                                {
                                    id: "chamdor",
                                    name: "Chamdor Sparkling",
                                    price: 3000,
                                },
                                {
                                    id: "nederberg-brut",
                                    name: "Nederberg Brut",
                                    price: 5000,
                                },
                                {
                                    id: "nederberg-rose",
                                    name: "Nederberg Rose",
                                    price: 5000,
                                }
                            ]
                        },
                        {
                            id: "tequila",
                            name: "Tequila",
                            image: "images/rum.png",
                            description:"A bold and vibrant spirit made from blue agave, known for its smooth yet fiery character. Enjoy it neat, in classic cocktails like margaritas, or as a lively shot with salt and lime.",
                            items: [
                                {
                                    id: "jose-cuervo",
                                    name: "Jose Cuervo",
                                    price: 8000,
                                },
                                {
                                    id: "camino-gold",
                                    name: "Camino Gold",
                                    price: 14000,
                                },
                                {
                                    id: "tequila-rose",
                                    name: "Tequila Rose",
                                    price: 7500,
                                }
                            ]
                        },
                        {
                            id: "vodka",
                            name: "Vodka",
                            image: "images/vodka.jpg",
                            description:"A bold and vibrant spirit made from blue agave, known for its smooth yet fiery character. Enjoy it neat, in classic cocktails like margaritas, or as a lively shot with salt and lime.",
                            items: [
                                {
                                    id: "smirnoff-red",
                                    name: "Smirnoff Red",
                                    price: 6000,
                                },
                                {
                                    id: "ciroc-blue",
                                    name: "Ciroc Blue",
                                    price: 7500,
                                },
                                {
                                    id: "ciroc-red",
                                    name: "Ciroc Red",
                                    price: 6000,
                                }
                            ]
                        },
                        {
                            id: "whiskey",
                            name: "Whiskey",
                            image: "images/vodka.jpg",
                            description:"A timeless and versatile spirit, carefully aged to develop deep, rich flavors ranging from smooth and sweet to bold and smoky. Enjoy it neat, on the rocks, or in classic cocktails, perfectly curated for a premium experience at our restaurant.",
                            items: [
                                {
                                    id: "macallan",
                                    name: "Macallan",
                                    price: 25000,
                                },
                                {
                                    id: "glenfiddich-18",
                                    name: "Glenfiddich 18 Yrs",
                                    price: 18000,
                                },
                                {
                                    id: "glenfiddich-15",
                                    name: "Glenfiddich 15 Yrs",
                                    price: 14000,
                                },
                                {
                                    id: "glenfiddich-12",
                                    name: "Glenfiddich 12 Yrs",
                                    price: 10000,
                                },
                                {
                                    id: "singleton-15",
                                    name: "Singleton 15 Yrs",
                                    price: 12000,
                                },
                                {
                                    id: "singleton-12",
                                    name: "Singleton 12 Yrs",
                                    price: 10000,
                                },
                                {
                                    id: "jd-honey",
                                    name: "JD Honey",
                                    price: 8000,
                                },
                                {
                                    id: "gentleman",
                                    name: "Gentleman",
                                    price: 12000,
                                },
                                {
                                    id: "founders-reserve",
                                    name: "Founders Reserve",
                                    price: 7500,
                                },
                                {
                                    id: "jack-daniels-700",
                                    name: "Jack Daniels (700ml)",
                                    price: 6000,
                                },
                                {
                                    id: "jack-daniels-1000",
                                    name: "Jack Daniels (1000ml)",
                                    price: 8000,
                                },
                                {
                                    id: "taliskar",
                                    name: "Taliskar",
                                    price: 10000,
                                },
                                {
                                    id: "lagavulin",
                                    name: "Lagavulin",
                                    price: 10000,
                                },
                                {
                                    id: "jb",
                                    name: "J&B",
                                    price: 7500,
                                },
                                {
                                    id: "jameson",
                                    name: "Jameson",
                                    price: 6000,
                                },
                                {
                                    id: "jw-blue",
                                    name: "Johnnie Walker Blue",
                                    price: 35000,
                                },
                                {
                                    id: "jw-18",
                                    name: "Johnnie Walker 18 Yrs",
                                    price: 18000,
                                },
                                {
                                    id: "jw-gold",
                                    name: "Johnnie Walker Gold",
                                    price: 14000,
                                },
                                {
                                    id: "jw-green",
                                    name: "Johnnie Walker Green",
                                    price: 10500,
                                },
                                {
                                    id: "jw-black",
                                    name: "Johnnie Walker Black",
                                    price: 7500,
                                },
                                {
                                    id: "jw-dblack",
                                    name: "Johnnie Walker D Black",
                                    price: 10500,
                                },
                                {
                                    id: "jw-red",
                                    name: "Johnnie Walker Red",
                                    price: 5500,
                                },
                                {
                                    id: "southern-comfort",
                                    name: "Southern Comfort",
                                    price: 6000,
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
                            image: "images/water.png"
                        }
                    ]
                }
            ]
        }
    ]
};

if (typeof window !== 'undefined') {
  window.menuData = menuData;
  console.log("Menu data exported to window");
  
  // Dispatch event when menu data is ready
  window.dispatchEvent(new Event('menuDataLoaded'));
}