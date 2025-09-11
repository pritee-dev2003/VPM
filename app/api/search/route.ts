import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { scoreProducts } from "@/lib/similarity"

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, category = "all", limit = 20, minSimilarity = 0.6 } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ success: false, error: "Image URL is required" }, { status: 400 })
    }

    const startTime = Date.now()

    const db = await getDatabase()
    const collection = db.collection("products")

    // Build filter based on category
    const filter = category && category !== "all" ? { category } : {}

    // Fetch products from database (get more than limit for better filtering)
    const products = await collection
      .find(filter)
      .limit(limit * 2) // Get more products to filter from
      .toArray()

    // Convert MongoDB ObjectIds to strings
    const productsWithStringIds = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }))

    const scoredProducts = scoreProducts(imageUrl, productsWithStringIds, category)

    // Filter by minimum similarity and limit results
    const filteredResults = scoredProducts.filter((product) => product.similarityScore >= minSimilarity).slice(0, limit)

    const endTime = Date.now()
    const searchTime = (endTime - startTime) / 1000

    // Calculate search statistics
    const averageSimilarity =
      filteredResults.length > 0
        ? filteredResults.reduce((sum, product) => sum + product.similarityScore, 0) / filteredResults.length
        : 0

    return NextResponse.json({
      success: true,
      results: filteredResults,
      stats: {
        totalResults: filteredResults.length,
        searchTime,
        averageSimilarity,
      },
      metadata: {
        totalScanned: productsWithStringIds.length,
        minSimilarity,
        category: category === "all" ? "All Categories" : category,
      },
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
