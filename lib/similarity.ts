// Advanced similarity matching algorithms for visual product matching
// This simulates real-world image analysis techniques

export interface ImageFeatures {
  dominantColors: string[]
  brightness: number
  contrast: number
  saturation: number
  aspectRatio: number
  complexity: number
}

export interface SimilarityWeights {
  color: number
  brightness: number
  contrast: number
  saturation: number
  aspectRatio: number
  category: number
  tags: number
}

// Default weights for similarity calculation
const DEFAULT_WEIGHTS: SimilarityWeights = {
  color: 0.3,
  brightness: 0.15,
  contrast: 0.1,
  saturation: 0.15,
  aspectRatio: 0.1,
  category: 0.15,
  tags: 0.05,
}

// Simulate image feature extraction
export function extractImageFeatures(imageUrl: string): ImageFeatures {
  // In a real implementation, this would use computer vision APIs
  // For demo purposes, we'll generate realistic features based on the image URL

  const hash = simpleHash(imageUrl)
  const random = seedRandom(hash)

  return {
    dominantColors: generateDominantColors(random),
    brightness: random() * 0.6 + 0.2, // 0.2 to 0.8
    contrast: random() * 0.8 + 0.1, // 0.1 to 0.9
    saturation: random() * 0.9 + 0.1, // 0.1 to 1.0
    aspectRatio: random() * 2 + 0.5, // 0.5 to 2.5
    complexity: random() * 0.8 + 0.2, // 0.2 to 1.0
  }
}

// Calculate similarity between uploaded image and product
export function calculateSimilarity(
  uploadedFeatures: ImageFeatures,
  productFeatures: ImageFeatures,
  productCategory: string,
  productTags: string[],
  uploadedCategory?: string,
  weights: SimilarityWeights = DEFAULT_WEIGHTS,
): number {
  let totalScore = 0

  // Color similarity (most important for visual matching)
  const colorSimilarity = calculateColorSimilarity(uploadedFeatures.dominantColors, productFeatures.dominantColors)
  totalScore += colorSimilarity * weights.color

  // Brightness similarity
  const brightnessSimilarity = 1 - Math.abs(uploadedFeatures.brightness - productFeatures.brightness)
  totalScore += brightnessSimilarity * weights.brightness

  // Contrast similarity
  const contrastSimilarity = 1 - Math.abs(uploadedFeatures.contrast - productFeatures.contrast)
  totalScore += contrastSimilarity * weights.contrast

  // Saturation similarity
  const saturationSimilarity = 1 - Math.abs(uploadedFeatures.saturation - productFeatures.saturation)
  totalScore += saturationSimilarity * weights.saturation

  // Aspect ratio similarity
  const aspectRatioSimilarity =
    1 - Math.min(1, Math.abs(uploadedFeatures.aspectRatio - productFeatures.aspectRatio) / 2)
  totalScore += aspectRatioSimilarity * weights.aspectRatio

  // Category bonus
  const categoryBonus = uploadedCategory && uploadedCategory === productCategory ? 1 : 0.7
  totalScore += categoryBonus * weights.category

  // Tag similarity bonus
  const tagSimilarity = calculateTagSimilarity(uploadedCategory, productTags)
  totalScore += tagSimilarity * weights.tags

  // Ensure score is between 0 and 1
  return Math.max(0, Math.min(1, totalScore))
}

// Calculate color similarity using simplified color distance
function calculateColorSimilarity(colors1: string[], colors2: string[]): number {
  if (colors1.length === 0 || colors2.length === 0) return 0.5

  let maxSimilarity = 0

  for (const color1 of colors1) {
    for (const color2 of colors2) {
      const similarity = colorDistance(color1, color2)
      maxSimilarity = Math.max(maxSimilarity, similarity)
    }
  }

  return maxSimilarity
}

// Calculate distance between two colors (simplified)
function colorDistance(color1: string, color2: string): number {
  // Convert hex colors to RGB and calculate distance
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const distance = Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2))

  // Normalize to 0-1 scale (max distance is ~441 for RGB)
  return 1 - distance / 441
}

// Calculate tag similarity based on category and keywords
function calculateTagSimilarity(uploadedCategory: string | undefined, productTags: string[]): number {
  if (!uploadedCategory || productTags.length === 0) return 0.5

  // Check if any tags match the uploaded category
  const categoryMatch = productTags.some(
    (tag) =>
      tag.toLowerCase().includes(uploadedCategory.toLowerCase()) ||
      uploadedCategory.toLowerCase().includes(tag.toLowerCase()),
  )

  return categoryMatch ? 1 : 0.3
}

// Utility functions
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

function seedRandom(seed: number) {
  let x = Math.sin(seed) * 10000
  return () => {
    x = Math.sin(x) * 10000
    return x - Math.floor(x)
  }
}

function generateDominantColors(random: () => number): string[] {
  const colors = []
  const numColors = Math.floor(random() * 3) + 2 // 2-4 colors

  for (let i = 0; i < numColors; i++) {
    const r = Math.floor(random() * 256)
    const g = Math.floor(random() * 256)
    const b = Math.floor(random() * 256)
    colors.push(
      `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
    )
  }

  return colors
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// Enhanced product scoring with multiple factors
export function scoreProducts(uploadedImageUrl: string, products: any[], selectedCategory?: string): any[] {
  const uploadedFeatures = extractImageFeatures(uploadedImageUrl)

  return products
    .map((product) => {
      const productFeatures = extractImageFeatures(product.imageUrl)

      const similarityScore = calculateSimilarity(
        uploadedFeatures,
        productFeatures,
        product.category,
        product.tags || [],
        selectedCategory,
      )

      // Add some realistic variance
      const variance = (Math.random() - 0.5) * 0.1 // ±5% variance
      const finalScore = Math.max(0.6, Math.min(0.99, similarityScore + variance))

      return {
        ...product,
        similarityScore: finalScore,
        features: productFeatures,
      }
    })
    .sort((a, b) => b.similarityScore - a.similarityScore)
}
