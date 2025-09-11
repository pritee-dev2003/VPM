"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, X, SlidersHorizontal, DollarSign, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FilterPanelProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  similarityRange: [number, number]
  onSimilarityRangeChange: (range: [number, number]) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  availableTags: string[]
  sortBy: string
  onSortChange: (sort: string) => void
  isMobile?: boolean
}

const sortOptions = [
  { value: "similarity", label: "Best Match" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
]

export default function FilterPanel({
  priceRange,
  onPriceRangeChange,
  similarityRange,
  onSimilarityRangeChange,
  selectedTags,
  onTagsChange,
  availableTags,
  sortBy,
  onSortChange,
  isMobile = false,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const clearAllFilters = () => {
    onPriceRangeChange([0, 2000])
    onSimilarityRangeChange([0.6, 1])
    onTagsChange([])
    onSortChange("similarity")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Sort By
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onSortChange(option.value)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price Range
          </Label>
          <span className="text-xs text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          min={0}
          max={2000}
          step={50}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Similarity Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4" />
            Similarity
          </Label>
          <span className="text-xs text-muted-foreground">
            {Math.round(similarityRange[0] * 100)}% - {Math.round(similarityRange[1] * 100)}%
          </span>
        </div>
        <Slider
          value={similarityRange}
          onValueChange={(value) => onSimilarityRangeChange(value as [number, number])}
          min={0.5}
          max={1}
          step={0.05}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Tags Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Tags</Label>
          {selectedTags.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => onTagsChange([])} className="text-xs h-6 px-2">
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {availableTags.slice(0, 20).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer text-xs hover:bg-primary/20 transition-colors"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear All */}
      <Button variant="outline" onClick={clearAllFilters} className="w-full gap-2 bg-transparent">
        <X className="h-4 w-4" />
        Clear All Filters
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
            {(selectedTags.length > 0 || sortBy !== "similarity") && (
              <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                {selectedTags.length + (sortBy !== "similarity" ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Sort
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-4 sticky top-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Filters</h3>
          {(selectedTags.length > 0 || sortBy !== "similarity") && (
            <Badge variant="secondary" className="ml-auto">
              {selectedTags.length + (sortBy !== "similarity" ? 1 : 0)} active
            </Badge>
          )}
        </div>
        <FilterContent />
      </Card>
    </motion.div>
  )
}
