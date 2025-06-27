"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Save,
  Download,
  Globe,
  Palette,
  Type,
  Layout,
  Zap,
  Smartphone,
  Monitor,
  Tablet,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function EditorLayout() {
  const [prompt, setPrompt] = useState(
    "A modern SaaS landing page for a project management tool with pricing section and testimonials",
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewMode, setViewMode] = useState("desktop")
  const { toast } = useToast()

  const handleRegenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Page regenerated successfully! ✨",
        description: "Your landing page has been updated with the new prompt.",
      })
    }, 2000)
  }

  const handleSave = () => {
    toast({
      title: "Project saved! 💾",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleExport = () => {
    toast({
      title: "Export started! 📦",
      description: "Your landing page is being packaged for download.",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Published successfully! 🚀",
      description: "Your landing page is now live at landify.ai/your-page",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-purple-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">SaaS Landing Page</h1>
                <p className="text-sm text-gray-500">Last saved 2 minutes ago</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave} className="hover:bg-purple-50 bg-transparent">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport} className="hover:bg-purple-50 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export ZIP
            </Button>
            <Button
              onClick={handlePublish}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
              size="sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - AI Controls */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* AI Prompt Section */}
          <div className="p-6 border-b border-gray-200">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  AI Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe changes you want to make..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
                <Button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Regenerate
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors" className="text-xs">
                  <Palette className="w-4 h-4 mr-1" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="fonts" className="text-xs">
                  <Type className="w-4 h-4 mr-1" />
                  Fonts
                </TabsTrigger>
                <TabsTrigger value="layout" className="text-xs">
                  <Layout className="w-4 h-4 mr-1" />
                  Layout
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4 mt-4">
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Primary Color</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex space-x-2">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl border-2 border-purple-600 cursor-pointer"></div>
                      <div className="w-10 h-10 bg-blue-600 rounded-xl border-2 border-transparent hover:border-gray-300 cursor-pointer transition-all"></div>
                      <div className="w-10 h-10 bg-green-600 rounded-xl border-2 border-transparent hover:border-gray-300 cursor-pointer transition-all"></div>
                      <div className="w-10 h-10 bg-red-600 rounded-xl border-2 border-transparent hover:border-gray-300 cursor-pointer transition-all"></div>
                    </div>
                    <Select defaultValue="white">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Background" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="gray">Light Gray</SelectItem>
                        <SelectItem value="gradient">Gradient</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fonts" className="space-y-4 mt-4">
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Typography</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select defaultValue="inter">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Font Family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="large">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Heading Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4 mt-4">
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Layout Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Section Spacing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">Tight</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="loose">Loose</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Container Width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Narrow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="wide">Wide</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 flex flex-col">
          {/* Preview Controls */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("desktop")}
                  className={viewMode === "desktop" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "tablet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("tablet")}
                  className={viewMode === "tablet" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("mobile")}
                  className={viewMode === "mobile" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>

              <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                {viewMode === "desktop" && "1440px"}
                {viewMode === "tablet" && "768px"}
                {viewMode === "mobile" && "375px"}
              </Badge>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 bg-gray-100 p-6 overflow-auto">
            <div
              className={`
              mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300
              ${viewMode === "desktop" ? "max-w-6xl" : ""}
              ${viewMode === "tablet" ? "max-w-2xl" : ""}
              ${viewMode === "mobile" ? "max-w-sm" : ""}
            `}
            >
              {/* Mock Landing Page Preview */}
              <div className="relative">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl"></div>
                      <span className="font-bold text-lg">ProjectFlow</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                      <span className="text-gray-600 hover:text-purple-600 cursor-pointer">Features</span>
                      <span className="text-gray-600 hover:text-purple-600 cursor-pointer">Pricing</span>
                      <span className="text-gray-600 hover:text-purple-600 cursor-pointer">About</span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                      Get Started
                    </Button>
                  </div>
                </div>

                {/* Hero Section */}
                <div className="px-6 py-16 text-center bg-gradient-to-br from-purple-50 to-blue-50">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Manage Projects Like a{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                      Pro
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Streamline your workflow, collaborate with your team, and deliver projects on time with our powerful
                    project management platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                      Start Free Trial
                    </Button>
                    <Button variant="outline" className="px-8 py-3 bg-transparent hover:bg-purple-50">
                      Watch Demo
                    </Button>
                  </div>
                </div>

                {/* Features Section */}
                <div className="px-6 py-16">
                  <h2 className="text-3xl font-bold text-center mb-12">Why Choose ProjectFlow?</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="px-6 py-16 bg-gray-50">
                  <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
                  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {["Starter", "Pro", "Enterprise"].map((plan, i) => (
                      <div
                        key={plan}
                        className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                          i === 1 ? "ring-2 ring-purple-600 transform scale-105" : ""
                        }`}
                      >
                        <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                        <div className="text-3xl font-bold mb-4">
                          ${(i + 1) * 9}
                          <span className="text-lg text-gray-600">/mo</span>
                        </div>
                        <Button
                          className={`w-full ${i === 1 ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}`}
                          variant={i === 1 ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="px-6 py-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                  <p className="text-xl mb-8 opacity-90">Join thousands of teams already using ProjectFlow</p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="px-8 py-3 bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Start Your Free Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
