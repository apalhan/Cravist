import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, TrendingUp, Target } from "lucide-react"
import Link from "next/link"
import { NutritionalAnalysisTools } from "@/components/nutritional-analysis-tools"

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </Link>
              <div className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-teal-600" />
                <h1 className="text-2xl font-bold text-gray-900">Nutritional Analysis</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Advanced Tools
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Info Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Nutritional Analysis</h2>
            <p className="text-gray-600 text-lg mb-6">
              Comprehensive tools for analyzing nutritional data, tracking daily values, setting goals, and monitoring
              dietary restrictions.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="border-teal-200">
                <CardHeader className="pb-3">
                  <Calculator className="h-6 w-6 text-teal-600 mb-2" />
                  <CardTitle className="text-lg">Daily Value Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Track progress toward recommended daily nutritional values</p>
                </CardContent>
              </Card>

              <Card className="border-cyan-200">
                <CardHeader className="pb-3">
                  <Target className="h-6 w-6 text-cyan-600 mb-2" />
                  <CardTitle className="text-lg">Goal Setting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Set and monitor personalized nutritional goals</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Analyze nutritional trends and patterns over time</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analysis Tools */}
          <NutritionalAnalysisTools />
        </div>
      </div>
    </div>
  )
}
