import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { MealOptimizer } from "@/components/meal-optimizer"

export default function OptimizerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </Link>
              <div className="flex items-center gap-2">
                <Target className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Meal Optimizer</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Info Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Meal Optimization</h2>
            <p className="text-gray-600 text-lg mb-6">
              Generate optimal meal combinations from Purdue dining courts based on your nutritional goals and
              preferences.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <Target className="h-6 w-6 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Goal-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Optimize for protein, calories, fiber, or balanced nutrition</p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader className="pb-3">
                  <Zap className="h-6 w-6 text-emerald-600 mb-2" />
                  <CardTitle className="text-lg">Real-Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Instant optimization using current dining court menus</p>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardHeader className="pb-3">
                  <TrendingUp className="h-6 w-6 text-teal-600 mb-2" />
                  <CardTitle className="text-lg">Data-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Advanced algorithms for optimal nutritional combinations</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Optimizer Interface */}
          <MealOptimizer />
        </div>
      </div>
    </div>
  )
}
