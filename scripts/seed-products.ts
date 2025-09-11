import { getDatabase } from "../lib/mongodb"

const categories = [
  "animals",
  "fruits",
  "clothes",
  "vehicles",
  "electronics",
  "furniture",
  "books",
  "toys",
  "jewelry",
  "sports",
]

const sampleProducts = [
  // Animals
  {
    name: "Golden Retriever Puppy",
    category: "animals",
    description: "Adorable golden retriever puppy",
    imageUrl: "/golden-retriever-puppy.png",
    price: 1200,
    tags: ["dog", "pet", "puppy", "golden"],
  },
  {
    name: "Persian Cat",
    category: "animals",
    description: "Beautiful long-haired Persian cat",
    imageUrl: "/persian-cat-white-fluffy.jpg",
    price: 800,
    tags: ["cat", "pet", "persian", "fluffy"],
  },
  {
    name: "Tropical Fish",
    category: "animals",
    description: "Colorful tropical aquarium fish",
    imageUrl: "/tropical-fish-colorful-aquarium.jpg",
    price: 25,
    tags: ["fish", "tropical", "aquarium", "colorful"],
  },
  {
    name: "Parakeet Bird",
    category: "animals",
    description: "Green and yellow parakeet",
    imageUrl: "/green-parakeet-bird.jpg",
    price: 150,
    tags: ["bird", "parakeet", "green", "pet"],
  },
  {
    name: "Hamster",
    category: "animals",
    description: "Cute Syrian hamster",
    imageUrl: "/syrian-hamster-cute.jpg",
    price: 30,
    tags: ["hamster", "small", "pet", "cute"],
  },

  // Fruits
  {
    name: "Red Apples",
    category: "fruits",
    description: "Fresh red delicious apples",
    imageUrl: "/red-apples-fresh.jpg",
    price: 5,
    tags: ["apple", "red", "fresh", "healthy"],
  },
  {
    name: "Bananas",
    category: "fruits",
    description: "Ripe yellow bananas",
    imageUrl: "/yellow-bananas-ripe.jpg",
    price: 3,
    tags: ["banana", "yellow", "ripe", "potassium"],
  },
  {
    name: "Strawberries",
    category: "fruits",
    description: "Sweet fresh strawberries",
    imageUrl: "/fresh-strawberries-sweet.jpg",
    price: 8,
    tags: ["strawberry", "sweet", "red", "berry"],
  },
  {
    name: "Orange Citrus",
    category: "fruits",
    description: "Juicy navel oranges",
    imageUrl: "/navel-oranges-juicy.jpg",
    price: 6,
    tags: ["orange", "citrus", "juicy", "vitamin"],
  },
  {
    name: "Grapes",
    category: "fruits",
    description: "Purple seedless grapes",
    imageUrl: "/purple-grapes-seedless.jpg",
    price: 7,
    tags: ["grapes", "purple", "seedless", "sweet"],
  },

  // Clothes
  {
    name: "Denim Jacket",
    category: "clothes",
    description: "Classic blue denim jacket",
    imageUrl: "/blue-denim-jacket-classic.jpg",
    price: 89,
    tags: ["jacket", "denim", "blue", "casual"],
  },
  {
    name: "White T-Shirt",
    category: "clothes",
    description: "Cotton white t-shirt",
    imageUrl: "/white-cotton-t-shirt.png",
    price: 25,
    tags: ["tshirt", "white", "cotton", "basic"],
  },
  {
    name: "Black Jeans",
    category: "clothes",
    description: "Slim fit black jeans",
    imageUrl: "/black-jeans-slim-fit.jpg",
    price: 75,
    tags: ["jeans", "black", "slim", "denim"],
  },
  {
    name: "Red Dress",
    category: "clothes",
    description: "Elegant red evening dress",
    imageUrl: "/red-evening-dress-elegant.jpg",
    price: 150,
    tags: ["dress", "red", "elegant", "evening"],
  },
  {
    name: "Sneakers",
    category: "clothes",
    description: "White athletic sneakers",
    imageUrl: "/white-athletic-sneakers.png",
    price: 120,
    tags: ["shoes", "sneakers", "white", "athletic"],
  },

  // Vehicles
  {
    name: "Sports Car",
    category: "vehicles",
    description: "Red sports car convertible",
    imageUrl: "/red-convertible-sports-car.png",
    price: 45000,
    tags: ["car", "sports", "red", "convertible"],
  },
  {
    name: "Mountain Bike",
    category: "vehicles",
    description: "Blue mountain bike",
    imageUrl: "/blue-mountain-bike.jpg",
    price: 800,
    tags: ["bike", "mountain", "blue", "cycling"],
  },
  {
    name: "Motorcycle",
    category: "vehicles",
    description: "Black cruiser motorcycle",
    imageUrl: "/black-cruiser-motorcycle.jpg",
    price: 15000,
    tags: ["motorcycle", "black", "cruiser", "bike"],
  },
  {
    name: "Electric Scooter",
    category: "vehicles",
    description: "White electric scooter",
    imageUrl: "/white-electric-scooter.jpg",
    price: 400,
    tags: ["scooter", "electric", "white", "urban"],
  },
  {
    name: "Pickup Truck",
    category: "vehicles",
    description: "Blue pickup truck",
    imageUrl: "/blue-pickup-truck.png",
    price: 35000,
    tags: ["truck", "pickup", "blue", "utility"],
  },

  // Electronics
  {
    name: "Smartphone",
    category: "electronics",
    description: "Latest smartphone with camera",
    imageUrl: "/modern-smartphone-black.jpg",
    price: 899,
    tags: ["phone", "smartphone", "mobile", "technology"],
  },
  {
    name: "Laptop Computer",
    category: "electronics",
    description: "Silver laptop computer",
    imageUrl: "/silver-laptop-computer.jpg",
    price: 1299,
    tags: ["laptop", "computer", "silver", "portable"],
  },
  {
    name: "Headphones",
    category: "electronics",
    description: "Wireless bluetooth headphones",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 199,
    tags: ["headphones", "wireless", "bluetooth", "audio"],
  },
  {
    name: "Smart Watch",
    category: "electronics",
    description: "Black fitness smart watch",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 299,
    tags: ["watch", "smart", "fitness", "wearable"],
  },
  {
    name: "Gaming Console",
    category: "electronics",
    description: "Modern gaming console",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 499,
    tags: ["gaming", "console", "entertainment", "video"],
  },

  // Furniture
  {
    name: "Office Chair",
    category: "furniture",
    description: "Ergonomic black office chair",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 299,
    tags: ["chair", "office", "ergonomic", "black"],
  },
  {
    name: "Wooden Table",
    category: "furniture",
    description: "Oak wood dining table",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 599,
    tags: ["table", "wood", "dining", "oak"],
  },
  {
    name: "Sofa Couch",
    category: "furniture",
    description: "Gray fabric sofa",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 899,
    tags: ["sofa", "couch", "gray", "fabric"],
  },
  {
    name: "Bookshelf",
    category: "furniture",
    description: "Tall wooden bookshelf",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 199,
    tags: ["bookshelf", "wood", "storage", "tall"],
  },
  {
    name: "Bed Frame",
    category: "furniture",
    description: "Queen size bed frame",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 399,
    tags: ["bed", "frame", "queen", "bedroom"],
  },

  // Books
  {
    name: "Programming Book",
    category: "books",
    description: "JavaScript programming guide",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 45,
    tags: ["book", "programming", "javascript", "education"],
  },
  {
    name: "Novel Fiction",
    category: "books",
    description: "Bestselling fiction novel",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 15,
    tags: ["book", "novel", "fiction", "reading"],
  },
  {
    name: "Cookbook",
    category: "books",
    description: "Italian cuisine cookbook",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 35,
    tags: ["book", "cookbook", "italian", "recipes"],
  },
  {
    name: "Art Book",
    category: "books",
    description: "Modern art photography book",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 55,
    tags: ["book", "art", "photography", "modern"],
  },
  {
    name: "History Book",
    category: "books",
    description: "World history textbook",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 65,
    tags: ["book", "history", "textbook", "education"],
  },

  // Toys
  {
    name: "Teddy Bear",
    category: "toys",
    description: "Brown plush teddy bear",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 25,
    tags: ["toy", "teddy", "bear", "plush"],
  },
  {
    name: "Building Blocks",
    category: "toys",
    description: "Colorful building blocks set",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 35,
    tags: ["toy", "blocks", "building", "colorful"],
  },
  {
    name: "Remote Car",
    category: "toys",
    description: "RC racing car toy",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 89,
    tags: ["toy", "car", "remote", "racing"],
  },
  {
    name: "Puzzle Game",
    category: "toys",
    description: "1000 piece jigsaw puzzle",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 20,
    tags: ["toy", "puzzle", "jigsaw", "game"],
  },
  {
    name: "Action Figure",
    category: "toys",
    description: "Superhero action figure",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 15,
    tags: ["toy", "action", "figure", "superhero"],
  },

  // Jewelry
  {
    name: "Gold Necklace",
    category: "jewelry",
    description: "Elegant gold chain necklace",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 299,
    tags: ["jewelry", "necklace", "gold", "elegant"],
  },
  {
    name: "Silver Ring",
    category: "jewelry",
    description: "Sterling silver ring",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 89,
    tags: ["jewelry", "ring", "silver", "sterling"],
  },
  {
    name: "Diamond Earrings",
    category: "jewelry",
    description: "Diamond stud earrings",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 599,
    tags: ["jewelry", "earrings", "diamond", "stud"],
  },
  {
    name: "Pearl Bracelet",
    category: "jewelry",
    description: "White pearl bracelet",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 149,
    tags: ["jewelry", "bracelet", "pearl", "white"],
  },
  {
    name: "Watch Luxury",
    category: "jewelry",
    description: "Luxury gold watch",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 1299,
    tags: ["jewelry", "watch", "luxury", "gold"],
  },

  // Sports
  {
    name: "Basketball",
    category: "sports",
    description: "Official size basketball",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 35,
    tags: ["sports", "basketball", "ball", "orange"],
  },
  {
    name: "Tennis Racket",
    category: "sports",
    description: "Professional tennis racket",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 149,
    tags: ["sports", "tennis", "racket", "professional"],
  },
  {
    name: "Soccer Ball",
    category: "sports",
    description: "FIFA approved soccer ball",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 45,
    tags: ["sports", "soccer", "football", "FIFA"],
  },
  {
    name: "Golf Clubs",
    category: "sports",
    description: "Set of golf clubs",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 599,
    tags: ["sports", "golf", "clubs", "set"],
  },
  {
    name: "Yoga Mat",
    category: "sports",
    description: "Purple yoga exercise mat",
    imageUrl: "/placeholder.svg?height=300&width=300",
    price: 29,
    tags: ["sports", "yoga", "mat", "exercise"],
  },
]

export async function seedProducts() {
  try {
    const db = await getDatabase()
    const collection = db.collection("products")

    // Clear existing products
    await collection.deleteMany({})

    // Add timestamps to products
    const productsWithTimestamps = sampleProducts.map((product) => ({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    // Insert new products
    const result = await collection.insertMany(productsWithTimestamps)

    console.log(`Successfully seeded ${result.insertedCount} products`)
    return { success: true, count: result.insertedCount }
  } catch (error) {
    console.error("Error seeding products:", error)
    return { success: false, error: error.message }
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedProducts().then(() => process.exit(0))
}
