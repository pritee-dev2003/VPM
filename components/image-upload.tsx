"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Link, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setIsUploading(true)

    try {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)
      onImageUpload(objectUrl)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      onImageUpload(imageUrl.trim())
      setImageUrl("")
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <Link className="h-4 w-4" />
            Image URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <motion.div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50 hover:bg-muted/20"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="p-4 rounded-full bg-primary/10"
                  >
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <p className="text-lg font-medium">Processing image...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div className="p-4 rounded-full bg-muted" whileHover={{ scale: 1.1 }}>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {dragActive ? "Drop your image here" : "Drag & drop your image here"}
                    </p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>

                  <Button onClick={openFileDialog} variant="outline" className="gap-2 bg-transparent">
                    <Upload className="h-4 w-4" />
                    Choose File
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </TabsContent>

        <TabsContent value="url" className="mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Link className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Enter Image URL</h3>
              </div>

              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
                  className="flex-1"
                />
                <Button onClick={handleUrlSubmit} disabled={!imageUrl.trim()} className="gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Load Image
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Paste a direct link to an image file (JPG, PNG, GIF, WebP)
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
