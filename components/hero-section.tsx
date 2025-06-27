"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Zap, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HeroSection() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the landing page you want to create.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Landing page created successfully! 🎉",
        description: "Your AI-powered landing page is ready for editing.",
      })
      // In a real app, you'd redirect to the editor
      window.location.href = "/editor"
    }, 3000)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.15) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Landing Page Builder
          </div>

          {/* Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build high-converting landing pages with just a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">prompt</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            No code. No design skills. Just describe it, and let AI create it for you.
          </p>

          {/* Prompt Input */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-200 max-w-4xl mx-auto">
            <Textarea
              placeholder="Describe your landing page idea… (e.g., 'A modern SaaS landing page for a project management tool with hero section, features, pricing, and testimonials')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[140px] border-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0 bg-transparent"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <div className="text-sm text-gray-500 order-2 sm:order-1">{prompt.length}/1000 characters</div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 order-1 sm:order-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-3" />
                    Generate with AI
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              10,000+ pages created
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              No credit card required
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Export ready code
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
