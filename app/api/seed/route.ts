import { NextResponse } from "next/server"
import { seedProducts } from "@/scripts/seed-products"

export async function POST() {
  try {
    const result = await seedProducts()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully seeded ${result.count} products`,
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in seed route:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}
