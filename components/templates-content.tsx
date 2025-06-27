"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Zap, Filter } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "SaaS Startup",
    category: "SaaS",
    description: "Modern landing page for software companies",
    thumbnail: "/placeholder.svg?height=300&width=400&text=SaaS+Startup",
    tags: ["Modern", "Clean", "Conversion-focused"],
    popular: true,
  },
  {
    id: 2,
    title: "Life Coach",
    category: "Coaching",
    description: "Personal branding for coaches and consultants",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Life+Coach",
    tags: ["Personal", "Professional", "Trust-building"],
    popular: false,
  },
  {
    id: 3,
    title: "E-commerce Store",
    category: "E-commerce",
    description: "Product showcase for online stores",
    thumbnail: "/placeholder.svg?height=300&width=400&text=E-commerce",
    tags: ["Product-focused", "Sales", "Mobile-first"],
    popular: true,
  },
  {
    id: 4,
    title: "Local Business",
    category: "Local Business",
    description: "Perfect for restaurants and local services",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Local+Business",
    tags: ["Local SEO", "Contact-focused", "Reviews"],
    popular: false,
  },
  {
    id: 5,
    title: "Casino Gaming",
    category: "Casino",
    description: "High-converting gaming and casino sites",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Casino+Gaming",
    tags: ["High-energy", "Conversion", "Entertainment"],
    popular: false,
  },
  {
    id: 6,
    title: "Affiliate Marketing",
    category: "Affiliate",
    description: "Optimized for affiliate product promotion",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Affiliate",
    tags: ["Conversion", "Product-focused", "CTA-heavy"],
    popular: true,
  },
  {
    id: 7,
    title: "Health & Wellness",
    category: "Health",
    description: "Fitness and wellness service providers",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Health+Wellness",
    tags: ["Clean", "Trustworthy", "Results-focused"],
    popular: false,
  },
  {
    id: 8,
    title: "Agency Portfolio",
    category: "Agency",
    description: "Showcase your agency's work and services",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Agency+Portfolio",
    tags: ["Portfolio", "Professional", "Case studies"],
    popular: false,
  },
]

const categories = [
  "All",
  "SaaS",
  "Coaching",
  "E-commerce",
  "Local Business",
  "Casino",
  "Affiliate",
  "Health",
  "Agency",
]

export default function TemplatesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Landing Page Templates</h1>
        <p className="text-gray-600">Choose from our collection of high-converting, industry-specific templates</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 border-gray-200">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={template.thumbnail || "/placeholder.svg"}
                alt={template.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {template.popular && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">Popular</Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg truncate">{template.title}</h3>
                <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                  {template.category}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100">
                    +{template.tags.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 hover:bg-purple-50 hover:border-purple-200 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
