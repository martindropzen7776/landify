"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Eye, Edit, Trash2, TrendingUp, Clock, Globe, Zap, Download } from "lucide-react"
import { useState } from "react"
import ExportModal from "@/components/export-modal"

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "Modern project management tool landing page",
    thumbnail: "/placeholder.svg?height=200&width=300&text=SaaS+Landing",
    status: "Published",
    lastModified: "2 hours ago",
    views: 1234,
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "Fashion brand product showcase",
    thumbnail: "/placeholder.svg?height=200&width=300&text=E-commerce",
    status: "Draft",
    lastModified: "1 day ago",
    views: 0,
  },
  {
    id: 3,
    title: "Coach Portfolio",
    description: "Life coach personal branding site",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Coach+Portfolio",
    status: "Published",
    lastModified: "3 days ago",
    views: 567,
  },
  {
    id: 4,
    title: "Restaurant Menu",
    description: "Local restaurant online presence",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Restaurant",
    status: "Published",
    lastModified: "1 week ago",
    views: 890,
  },
  {
    id: 5,
    title: "Fitness App",
    description: "Health and fitness mobile app",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Fitness+App",
    status: "Draft",
    lastModified: "2 weeks ago",
    views: 0,
  },
  {
    id: 6,
    title: "Crypto Platform",
    description: "Cryptocurrency trading platform",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Crypto+Platform",
    status: "Published",
    lastModified: "3 weeks ago",
    views: 2341,
  },
]

export default function DashboardContent() {
  const [exportModal, setExportModal] = useState({ isOpen: false, projectName: "" })

  const handleExport = (projectName: string) => {
    setExportModal({ isOpen: true, projectName })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your landing pages today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Globe className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,032</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant={project.status === "Published" ? "default" : "secondary"}
                    className={project.status === "Published" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Quick Preview
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 truncate">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{project.lastModified}</span>
                  <span>{project.views.toLocaleString()} views</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-purple-50 hover:border-purple-200 bg-transparent"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-purple-50 hover:border-purple-200 bg-transparent"
                      onClick={() => handleExport(project.title)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-purple-50 hover:border-purple-200 bg-transparent"
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Zap className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
      </div>
      <ExportModal
        isOpen={exportModal.isOpen}
        onClose={() => setExportModal({ isOpen: false, projectName: "" })}
        projectName={exportModal.projectName}
      />
    </div>
  )
}
