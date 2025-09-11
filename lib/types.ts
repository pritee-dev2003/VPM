export interface Product {
  _id?: string
  name: string
  category: string
  description: string
  imageUrl: string
  price: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface SearchResult extends Product {
  similarityScore?: number
}

export interface UploadResponse {
  success: boolean
  imageUrl?: string
  error?: string
}
