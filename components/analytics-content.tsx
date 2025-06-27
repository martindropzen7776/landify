"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Eye, Users, MousePointer, Clock, Globe, Smartphone, Monitor } from "lucide-react"

const analyticsData = {
  overview: {
    totalViews: 15420,
    uniqueVisitors: 8934,
    conversionRate: 3.2,
    avgSessionTime: "2m 34s",
    trends: {
      views: 12.5,
      visitors: 8.3,
      conversion: -0.4,
      sessionTime: 15.2,
    },
  },
  topPages: [
    {
      name: "SaaS Landing Page",
      views: 4521,
      visitors: 2834,
      conversionRate: 4.2,
      trend: 15.3,
    },
    {
      name: "E-commerce Store",
      views: 3892,
      visitors: 2156,
      conversionRate: 2.8,
      trend: -5.2,
    },
    {
      name: "Coach Portfolio",
      views: 2847,
      visitors: 1923,
      conversionRate: 3.9,
      trend: 22.1,
    },
    {
      name: "Restaurant Menu",
      views: 2156,
      visitors: 1456,
      conversionRate: 2.1,
      trend: 8.7,
    },
  ],
  deviceBreakdown: [
    { device: "Desktop", percentage: 65, icon: Monitor },
    { device: "Mobile", percentage: 28, icon: Smartphone },
    { device: "Tablet", percentage: 7, icon: Globe },
  ],
  recentActivity: [
    {
      action: "Page published",
      page: "SaaS Landing Page",
      time: "2 hours ago",
      type: "success",
    },
    {
      action: "High traffic alert",
      page: "Coach Portfolio",
      time: "4 hours ago",
      type: "info",
    },
    {
      action: "Conversion goal reached",
      page: "E-commerce Store",
      time: "6 hours ago",
      type: "success",
    },
    {
      action: "Page updated",
      page: "Restaurant Menu",
      time: "1 day ago",
      type: "neutral",
    },
  ],
}

export default function AnalyticsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your landing page performance and visitor insights</p>
          </div>
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalViews.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.overview.trends.views}% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.uniqueVisitors.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.overview.trends.visitors}% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              {analyticsData.overview.trends.conversion}% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.avgSessionTime}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.overview.trends.sessionTime}% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Top Performing Pages */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{page.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{page.views.toLocaleString()} views</span>
                      <span>{page.visitors.toLocaleString()} visitors</span>
                      <span>{page.conversionRate}% conversion</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={page.trend > 0 ? "default" : "secondary"}
                      className={page.trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    >
                      {page.trend > 0 ? "+" : ""}
                      {page.trend}%
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.deviceBreakdown.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <device.icon className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-10 text-right">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div
                  className={`w-3 h-3 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "info"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.page}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
