"use client"

import { motion } from "framer-motion"
import { Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MobileHeader() {
  return (
    <motion.header
      className="lg:hidden border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-lg bg-primary/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-balance">Visual Matcher</h1>
              <p className="text-xs text-muted-foreground text-pretty">AI-powered search</p>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Visual Product Matcher
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground text-pretty">
                  Find visually similar products with AI-powered image search across multiple categories including
                  animals, fruits, clothes, vehicles, and more.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Upload images or use URLs</li>
                    <li>• Advanced similarity matching</li>
                    <li>• Filter by category and price</li>
                    <li>• Mobile-responsive design</li>
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
