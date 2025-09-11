import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    const db = await getDatabase()
    const collection = db.collection("products")

    const filter = category && category !== "all" ? { category } : {}

    const products = await collection.find(filter).skip(skip).limit(limit).toArray()

    return NextResponse.json({
      success: true,
      products: products.map((product) => ({
        ...product,
        _id: product._id.toString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
