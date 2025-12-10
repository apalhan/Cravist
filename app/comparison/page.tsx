import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, Scale, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ComparisonDashboard } from "@/components/comparison-dashboard"

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </Link>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">Meal Comparison</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Data Analysis
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Info Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Meal Analysis</h2>
            <p className="text-gray-600 text-lg mb-6">
              Compare multiple meal combinations side by side with detailed macro and micronutrient breakdowns to make
              informed dining decisions.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <Scale className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Side-by-Side</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Compare up to 4 meal combinations simultaneously</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="pb-3">
                  <TrendingUp className="h-6 w-6 text-pink-600 mb-2" />
                  <CardTitle className="text-lg">Detailed Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Comprehensive macro and micronutrient analysis</p>
                </CardContent>
              </Card>

              <Card className="border-rose-200">
                <CardHeader className="pb-3">
                  <BarChart3 className="h-6 w-6 text-rose-600 mb-2" />
                  <CardTitle className="text-lg">Visual Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Interactive charts and graphs for easy comparison</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comparison Dashboard */}
          <ComparisonDashboard />
        </div>
      </div>
    </div>
  )
}
