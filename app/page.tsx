import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Target, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-900">Purdue Meal Planning</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/optimizer">
                <Button variant="ghost">Meal Optimizer</Button>
              </Link>
              <Link href="/comparison">
                <Button variant="ghost">Compare Meals</Button>
              </Link>
              <Link href="/scraper">
                <Button variant="outline">Data Scraper</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-800">
            Optimize Your Nutrition
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 text-balance">
            Smart Meal Planning for <span className="text-amber-600">Purdue Students</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            Discover the perfect meal combinations from Purdue dining courts. Maximize protein, optimize calories, and
            make informed nutritional choices with comprehensive macro and micronutrient analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/optimizer">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Target className="mr-2 h-5 w-5" />
                Start Optimizing
              </Button>
            </Link>
            <Link href="/comparison">
              <Button size="lg" variant="outline">
                <BarChart3 className="mr-2 h-5 w-5" />
                Compare Meals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Powerful Meal Optimization Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to make the most of Purdue's dining options
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-8 w-8 text-amber-600 mb-2" />
                <CardTitle className="text-lg">Max Protein</CardTitle>
                <CardDescription>
                  Optimize meals for maximum protein intake to support your fitness goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Calorie Control</CardTitle>
                <CardDescription>
                  Find high-calorie meals for bulking or low-calorie options for cutting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Utensils className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle className="text-lg">Balanced Nutrition</CardTitle>
                <CardDescription>Create well-rounded meals with optimal macro and micronutrient ratios</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Daily Planning</CardTitle>
                <CardDescription>Plan complete daily meal schedules across all dining courts</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Optimization Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meal Optimization Categories</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your optimization goal and let our algorithm find the perfect meal combinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Maximum Protein</CardTitle>
                <CardDescription className="text-red-600">
                  Perfect for athletes and fitness enthusiasts looking to maximize muscle building potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-700">45g+ protein</div>
                <p className="text-sm text-red-600 mt-1">Per meal combination</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Maximum Calories</CardTitle>
                <CardDescription className="text-blue-600">
                  Ideal for bulking phases or high-energy requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">800+ calories</div>
                <p className="text-sm text-blue-600 mt-1">Per meal combination</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Minimum Calories</CardTitle>
                <CardDescription className="text-green-600">
                  Great for cutting phases or weight management goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">400- calories</div>
                <p className="text-sm text-green-600 mt-1">Per meal combination</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Low Sodium</CardTitle>
                <CardDescription className="text-purple-600">
                  Heart-healthy options with reduced sodium content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">{"<600mg"} sodium</div>
                <p className="text-sm text-purple-600 mt-1">Per meal combination</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">High Fiber</CardTitle>
                <CardDescription className="text-orange-600">
                  Digestive health focused with maximum fiber content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-700">15g+ fiber</div>
                <p className="text-sm text-orange-600 mt-1">Per meal combination</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-800">Balanced</CardTitle>
                <CardDescription className="text-teal-600">
                  Well-rounded nutrition with optimal macro ratios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-700">40/30/30</div>
                <p className="text-sm text-teal-600 mt-1">Carbs/Protein/Fat ratio</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Optimize Your Meals?</h3>
          <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
            Start making smarter dining choices today with data-driven meal planning
          </p>
          <Link href="/optimizer">
            <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-amber-50">
              <Utensils className="mr-2 h-5 w-5" />
              Launch Meal Optimizer
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
