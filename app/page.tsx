"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Upload, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useMobile } from "@/hooks/use-mobile"
import ImageUpload from "@/components/image-upload"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"
import SearchStatsComponent from "@/components/search-stats"
import SimilarityControls from "@/components/similarity-controls"
import FilterPanel from "@/components/filter-panel"
import MobileHeader from "@/components/mobile-header"
import type { Product } from "@/lib/types"

export default function HomePage() {
  const isMobile = useMobile()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchStats, setSearchStats] = useState<{
    totalResults: number
    searchTime: number
    averageSimilarity: number
  } | null>(null)
  const [minSimilarity, setMinSimilarity] = useState(0.7)
  const [maxResults, setMaxResults] = useState(20)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [similarityRange, setSimilarityRange] = useState<[number, number]>([0.6, 1])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("similarity")

  // Get available tags from search results
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    searchResults.forEach((product) => {
      product.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [searchResults])

  // Filter and sort results
  const filteredResults = useMemo(() => {
    const filtered = searchResults.filter((product) => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false

      // Similarity filter
      const similarity = (product as any).similarityScore || 0
      if (similarity < similarityRange[0] || similarity > similarityRange[1]) return false

      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some((tag) => product.tags?.includes(tag))
        if (!hasMatchingTag) return false
      }

      return true
    })

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "similarity":
      default:
        filtered.sort((a, b) => ((b as any).similarityScore || 0) - ((a as any).similarityScore || 0))
        break
    }

    return filtered
  }, [searchResults, priceRange, similarityRange, selectedTags, sortBy])

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    // Clear previous results when new image is uploaded
    setSearchResults([])
    setSearchStats(null)
  }

  const handleSearch = async () => {
    if (!uploadedImage) return

    setIsSearching(true)
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          category: selectedCategory,
          limit: maxResults,
          minSimilarity: minSimilarity,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSearchResults(data.results)
        setSearchStats(data.stats)
      } else {
        console.error("Search failed:", data.error)
      }
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Desktop Header */}
      <motion.header
        className="hidden lg:block border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-lg bg-primary/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Visual Product Matcher</h1>
              <p className="text-muted-foreground text-pretty">
                Find visually similar products with AI-powered image search
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-4 lg:py-8">
        {/* Upload Section */}
        <motion.section
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-6 lg:mb-8">
            <motion.h2
              className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-4 text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Upload Your Image
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm lg:text-lg text-pretty max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Upload an image or provide a URL to find visually similar products across our extensive catalog
            </motion.p>
          </div>

          <ImageUpload onImageUpload={handleImageUpload} />

          {uploadedImage && (
            <motion.div
              className="mt-6 lg:mt-8 flex flex-col items-center gap-4 lg:gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-3 lg:p-4 max-w-md w-full">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded image"
                  className="w-full h-48 lg:h-64 object-cover rounded-lg"
                />
              </Card>

              <div className="flex flex-col gap-4 w-full max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center justify-center">
                  <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    size={isMobile ? "default" : "lg"}
                    className="gap-2 w-full sm:w-auto"
                  >
                    {isSearching ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Search className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    {isSearching ? "Searching..." : "Find Similar Products"}
                  </Button>
                </div>

                {!isMobile && (
                  <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2 mx-auto">
                        <Sparkles className="h-4 w-4" />
                        {showAdvanced ? "Hide" : "Show"} Advanced Settings
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <SimilarityControls
                        minSimilarity={minSimilarity}
                        onMinSimilarityChange={setMinSimilarity}
                        maxResults={maxResults}
                        onMaxResultsChange={setMaxResults}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Search Statistics */}
        {searchStats && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 lg:mb-8"
          >
            <SearchStatsComponent {...searchStats} />
          </motion.section>
        )}

        {/* Results Section */}
        {searchResults.length > 0 && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters - Desktop Sidebar */}
              {!isMobile && (
                <div className="lg:w-80 flex-shrink-0">
                  <FilterPanel
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    similarityRange={similarityRange}
                    onSimilarityRangeChange={setSimilarityRange}
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                    availableTags={availableTags}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>
              )}

              {/* Results */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <motion.h2
                    className="text-xl lg:text-2xl font-bold text-balance"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Similar Products ({filteredResults.length})
                  </motion.h2>

                  {/* Mobile Filter Button */}
                  {isMobile && (
                    <FilterPanel
                      priceRange={priceRange}
                      onPriceRangeChange={setPriceRange}
                      similarityRange={similarityRange}
                      onSimilarityRangeChange={setSimilarityRange}
                      selectedTags={selectedTags}
                      onTagsChange={setSelectedTags}
                      availableTags={availableTags}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      isMobile={true}
                    />
                  )}
                </div>

                <ProductGrid products={filteredResults} />
              </div>
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {!uploadedImage && (
          <motion.div
            className="text-center py-12 lg:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div className="inline-flex p-3 lg:p-4 rounded-full bg-muted/50 mb-4" whileHover={{ scale: 1.05 }}>
              <Upload className="h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground" />
            </motion.div>
            <h3 className="text-lg lg:text-xl font-semibold mb-2">Ready to Find Similar Products?</h3>
            <p className="text-muted-foreground text-sm lg:text-base text-pretty px-4">
              Upload an image to get started with our AI-powered visual search
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
