"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: (Product & { similarityScore?: number })[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const isMobile = useMobile()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 0.9) return "bg-green-500"
    if (score >= 0.8) return "bg-blue-500"
    if (score >= 0.7) return "bg-yellow-500"
    return "bg-orange-500"
  }

  const getSimilarityLabel = (score: number) => {
    if (score >= 0.9) return "Excellent"
    if (score >= 0.8) return "Good"
    if (score >= 0.7) return "Fair"
    return "Similar"
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {products.map((product, index) => (
        <motion.div key={product._id || index} variants={itemVariants}>
          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 h-full">
            <div className="relative overflow-hidden">
              <motion.img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                loading="lazy"
              />

              {/* Similarity Score Badge */}
              {product.similarityScore && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge
                    className={`${getSimilarityColor(
                      product.similarityScore,
                    )} text-white font-semibold px-2 py-1 text-xs`}
                  >
                    {Math.round(product.similarityScore * 100)}%
                  </Badge>
                </motion.div>
              )}

              {/* Category Badge */}
              <motion.div
                className="absolute top-2 left-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge variant="secondary" className="capitalize text-xs">
                  {product.category}
                </Badge>
              </motion.div>

              {/* Hover Overlay - Desktop Only */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
                  initial={false}
                >
                  <Button size="sm" variant="secondary" className="gap-1 text-xs">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button size="sm" className="gap-1 text-xs">
                    <ShoppingCart className="h-3 w-3" />
                    Add
                  </Button>
                </motion.div>
              )}
            </div>

            <CardContent className="p-3 lg:p-4 flex-1 flex flex-col">
              <div className="space-y-2 flex-1">
                <motion.h3
                  className="font-semibold text-sm line-clamp-2 text-balance"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {product.name}
                </motion.h3>

                <motion.p
                  className="text-xs text-muted-foreground line-clamp-2 text-pretty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {product.description}
                </motion.p>

                <div className="flex items-center justify-between pt-2">
                  <motion.span
                    className="text-base lg:text-lg font-bold text-primary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {formatPrice(product.price)}
                  </motion.span>

                  {product.similarityScore && (
                    <motion.div
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {getSimilarityLabel(product.similarityScore)}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-1 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {product.tags.slice(0, isMobile ? 2 : 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {product.tags.length > (isMobile ? 2 : 3) && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{product.tags.length - (isMobile ? 2 : 3)}
                      </Badge>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Mobile Action Buttons */}
              {isMobile && (
                <motion.div
                  className="flex gap-2 mt-3 pt-3 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs bg-transparent">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1 gap-1 text-xs">
                    <ShoppingCart className="h-3 w-3" />
                    Add to Cart
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
