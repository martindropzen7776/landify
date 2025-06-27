"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Save, Eye, Download, Copy, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@supabase/supabase-js"
import ChatSupport from "@/components/chat-support"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function CreateLanding() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [title, setTitle] = useState("")
  const [htmlContent, setHtmlContent] = useState("")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the landing page you want to create",
        variant: "destructive",
      })
      return
    }

    setGenerating(true)
    toast({
      title: "AI is generating... 🤖",
      description: "This may take a few seconds",
    })

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          userId: user?.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate landing page")
      }

      const data = await response.json()
      setHtmlContent(data.html)

      // Auto-generate title from prompt
      if (!title) {
        const words = prompt.split(" ").slice(0, 5).join(" ")
        setTitle(words.charAt(0).toUpperCase() + words.slice(1))
      }

      toast({
        title: "Landing page generated! ✨",
        description: "Your AI-powered landing page is ready",
      })
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Generation failed",
        description: "Please try again with a different prompt",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Please enter a title",
        description: "Give your landing page a name",
        variant: "destructive",
      })
      return
    }

    if (!htmlContent) {
      toast({
        title: "No content to save",
        description: "Generate a landing page first",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const { error } = await supabase.from("landings").insert({
        user_id: user?.id,
        title: title.trim(),
        prompt: prompt.trim(),
        html_content: htmlContent,
      })

      if (error) throw error

      toast({
        title: "Landing saved successfully! 💾",
        description: "Your landing page has been saved to your dashboard",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Save failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    if (!htmlContent) {
      toast({
        title: "No content to preview",
        description: "Generate a landing page first",
        variant: "destructive",
      })
      return
    }

    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(htmlContent)
      newWindow.document.close()
    }
  }

  const handleExport = () => {
    if (!htmlContent) {
      toast({
        title: "No content to export",
        description: "Generate a landing page first",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title || "landing-page"}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Export successful! 📦",
      description: "HTML file has been downloaded",
    })
  }

  const handleCopy = async () => {
    if (!htmlContent) {
      toast({
        title: "No content to copy",
        description: "Generate a landing page first",
        variant: "destructive",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(htmlContent)
      toast({
        title: "Copied to clipboard! 📋",
        description: "HTML code has been copied",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#5A27F3] to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Create Landing Page</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                disabled={!htmlContent}
                className="hover:bg-gray-50 bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={!htmlContent}
                className="hover:bg-gray-50 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !htmlContent}
                className="bg-[#5A27F3] hover:bg-[#4A1FD3]"
                size="sm"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <Label htmlFor="prompt" className="text-lg font-semibold mb-4 block">
                  Describe your landing page
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., A modern SaaS landing page for a project management tool with hero section, features, pricing, and testimonials. Use a professional blue color scheme."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-[#5A27F3] focus:ring-[#5A27F3]"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{prompt.length}/1000 characters</span>
                  <Button
                    onClick={handleGenerate}
                    disabled={generating || !prompt.trim()}
                    className="bg-[#5A27F3] hover:bg-[#4A1FD3] shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Title Input */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <Label htmlFor="title" className="text-lg font-semibold mb-4 block">
                  Landing page title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your landing page"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-200 focus:border-[#5A27F3] focus:ring-[#5A27F3]"
                />
              </CardContent>
            </Card>

            {/* Export Options */}
            {htmlContent && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Export Options</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={handleCopy} className="flex-1 hover:bg-gray-50 bg-transparent">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy HTML
                    </Button>
                    <Button variant="outline" onClick={handleExport} className="flex-1 hover:bg-gray-50 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download HTML
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Preview</h3>
                  {htmlContent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreview}
                      className="hover:bg-gray-50 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Full Preview
                    </Button>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden">
                  {htmlContent ? (
                    <div className="bg-white">
                      <iframe srcDoc={htmlContent} className="w-full h-96 border-0" title="Landing Page Preview" />
                    </div>
                  ) : (
                    <div className="h-96 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">No preview yet</p>
                        <p className="text-sm text-gray-500">
                          Enter a prompt and click "Generate with AI" to see your landing page
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatSupport />
    </div>
  )
}
