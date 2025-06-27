"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, FileCode, Globe, Code, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
}

export default function ExportModal({ isOpen, onClose, projectName }: ExportModalProps) {
  const [exportOptions, setExportOptions] = useState({
    format: "html",
    includeAssets: true,
    minifyCode: true,
    responsiveImages: true,
    includeAnalytics: false,
  })
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export completed! 📦",
        description: `${projectName} has been exported successfully. Download will start shortly.`,
      })
      onClose()
    }, 3000)
  }

  const exportFormats = [
    {
      value: "html",
      label: "HTML + CSS + JS",
      description: "Complete web package ready to deploy",
      icon: FileCode,
    },
    {
      value: "react",
      label: "React Components",
      description: "JSX components for React applications",
      icon: Code,
    },
    {
      value: "wordpress",
      label: "WordPress Theme",
      description: "Ready-to-install WordPress theme",
      icon: Globe,
    },
    {
      value: "figma",
      label: "Figma Design",
      description: "Editable Figma design file",
      icon: Package,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Download className="w-5 h-5 mr-2" />
            Export {projectName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format Selection */}
          <div>
            <Label className="text-base font-medium mb-4 block">Choose Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportFormats.map((format) => (
                <Card
                  key={format.value}
                  className={`cursor-pointer transition-all duration-200 ${
                    exportOptions.format === format.value
                      ? "ring-2 ring-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setExportOptions({ ...exportOptions, format: format.value })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <format.icon className="w-6 h-6 text-purple-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">{format.label}</h3>
                        <p className="text-sm text-gray-500 mt-1">{format.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <Label className="text-base font-medium mb-4 block">Export Options</Label>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAssets"
                  checked={exportOptions.includeAssets}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeAssets: checked as boolean })
                  }
                />
                <Label htmlFor="includeAssets" className="text-sm">
                  Include all assets (images, fonts, icons)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="minifyCode"
                  checked={exportOptions.minifyCode}
                  onCheckedChange={(checked) => setExportOptions({ ...exportOptions, minifyCode: checked as boolean })}
                />
                <Label htmlFor="minifyCode" className="text-sm">
                  Minify code for production
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="responsiveImages"
                  checked={exportOptions.responsiveImages}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, responsiveImages: checked as boolean })
                  }
                />
                <Label htmlFor="responsiveImages" className="text-sm">
                  Generate responsive image variants
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAnalytics"
                  checked={exportOptions.includeAnalytics}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeAnalytics: checked as boolean })
                  }
                />
                <Label htmlFor="includeAnalytics" className="text-sm">
                  Include analytics tracking code
                </Label>
              </div>
            </div>
          </div>

          {/* File Size Estimate */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Estimated file size</h4>
                <p className="text-sm text-gray-500">Based on your selected options</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">2.4 MB</div>
                <div className="text-sm text-gray-500">ZIP archive</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Project
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
