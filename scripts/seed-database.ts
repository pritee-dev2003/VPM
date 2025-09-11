import { seedProducts } from "./seed-products"

async function main() {
  console.log("🌱 Starting database seeding...")

  try {
    const result = await seedProducts()

    if (result.success) {
      console.log(`✅ Successfully seeded ${result.count} products`)
      console.log("🎉 Database seeding completed!")
    } else {
      console.error("❌ Seeding failed:", result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

main()
