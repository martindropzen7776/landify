"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Sparkles, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@supabase/supabase-js"
import ChatSupport from "@/components/chat-support"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface Landing {
  id: string
  title: string
  prompt: string
  html_content: string
  created_at: string
  updated_at: string
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [landings, setLandings] = useState<Landing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLandings()
  }, [])

  const fetchLandings = async () => {
    try {
      const { data, error } = await supabase
        .from("landings")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setLandings(data || [])
    } catch (error) {
      console.error("Error fetching landings:", error)
      toast({
        title: "Error",
        description: "Failed to load your landing pages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("landings").delete().eq("id", id).eq("user_id", user?.id)

      if (error) throw error

      setLandings(landings.filter((landing) => landing.id !== id))
      toast({
        title: "Deleted successfully",
        description: "Landing page has been deleted",
      })
    } catch (error) {
      console.error("Error deleting landing:", error)
      toast({
        title: "Error",
        description: "Failed to delete landing page",
        variant: "destructive",
      })
    }
  }

  const handlePreview = (landing: Landing) => {
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(landing.html_content)
      newWindow.document.close()
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/login")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#5A27F3] to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#5A27F3] to-blue-600 bg-clip-text text-transparent">
                Landify AI
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-600 hover:text-gray-900">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-gray-600">Create stunning landing pages with AI in seconds</p>
        </div>

        {/* New Landing Button */}
        <div className="mb-8">
          <Button
            onClick={() => router.push("/create")}
            className="bg-[#5A27F3] hover:bg-[#4A1FD3] shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Landing
          </Button>
        </div>

        {/* Landings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                    <div className="h-8 w-8 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : landings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No landing pages yet</h3>
            <p className="text-gray-600 mb-6">Create your first AI-powered landing page to get started</p>
            <Button onClick={() => router.push("/create")} className="bg-[#5A27F3] hover:bg-[#4A1FD3]">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Landing
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landings.map((landing) => (
              <Card
                key={landing.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <iframe
                    srcDoc={landing.html_content}
                    className="w-full h-full pointer-events-none transform scale-50 origin-top-left"
                    style={{ width: "200%", height: "200%" }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        onClick={() => handlePreview(landing)}
                        className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 truncate">{landing.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{landing.prompt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{formatDate(landing.created_at)}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Saved
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(landing)}
                        className="hover:bg-[#5A27F3]/10 hover:border-[#5A27F3]/20"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/edit/${landing.id}`)}
                        className="hover:bg-[#5A27F3]/10 hover:border-[#5A27F3]/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePreview(landing)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/edit/${landing.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(landing.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ChatSupport />
    </div>
  )
}
