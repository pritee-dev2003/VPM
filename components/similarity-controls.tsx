"use client"

import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Settings, Target } from "lucide-react"

interface SimilarityControlsProps {
  minSimilarity: number
  onMinSimilarityChange: (value: number) => void
  maxResults: number
  onMaxResultsChange: (value: number) => void
}

export default function SimilarityControls({
  minSimilarity,
  onMinSimilarityChange,
  maxResults,
  onMaxResultsChange,
}: SimilarityControlsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Search Settings</h3>
        </div>

        <div className="space-y-6">
          {/* Minimum Similarity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Target className="h-3 w-3" />
                Minimum Similarity
              </Label>
              <span className="text-sm text-muted-foreground font-mono">{Math.round(minSimilarity * 100)}%</span>
            </div>
            <Slider
              value={[minSimilarity]}
              onValueChange={(value) => onMinSimilarityChange(value[0])}
              min={0.5}
              max={0.95}
              step={0.05}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Higher values show only very similar products</p>
          </div>

          {/* Max Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Max Results</Label>
              <span className="text-sm text-muted-foreground font-mono">{maxResults}</span>
            </div>
            <Slider
              value={[maxResults]}
              onValueChange={(value) => onMaxResultsChange(value[0])}
              min={10}
              max={50}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Number of products to display</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
