import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, BarChart3, Calculator, TrendingUp, Activity, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-muted/30">
        <div className="container py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              Nutritional Intelligence Platform
            </Badge>
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl">Purdue Meal Planning</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Professional-grade nutritional analysis and meal optimization for Purdue dining courts. Make data-driven
              decisions with comprehensive macro and micronutrient insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/optimizer">
                <Button size="lg">
                  <Target className="mr-2 h-4 w-4" />
                  Start Analysis
                </Button>
              </Link>
              <Link href="/comparison">
                <Button variant="outline" size="lg">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Data
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dining Courts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono font-bold">12</div>
                <p className="text-xs text-muted-foreground">Active locations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Food Items</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Analyzed items</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimizations</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono font-bold">6</div>
                <p className="text-xs text-muted-foreground">Algorithm types</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono font-bold">99.2%</div>
                <p className="text-xs text-muted-foreground">Data precision</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Optimization Algorithms</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Six distinct optimization strategies for comprehensive meal planning
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-l-4 border-l-chart-1">
                <CardHeader>
                  <CardTitle className="text-base">Maximum Protein</CardTitle>
                  <CardDescription>Optimize for highest protein content per meal combination</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold text-chart-1">45g+</div>
                  <p className="text-sm text-muted-foreground">Average protein per meal</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-chart-2">
                <CardHeader>
                  <CardTitle className="text-base">Maximum Calories</CardTitle>
                  <CardDescription>High-energy meal combinations for active lifestyles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold text-chart-2">850+</div>
                  <p className="text-sm text-muted-foreground">Calories per combination</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-chart-3">
                <CardHeader>
                  <CardTitle className="text-base">Minimum Calories</CardTitle>
                  <CardDescription>Controlled-calorie options for weight management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold text-chart-3">400-</div>
                  <p className="text-sm text-muted-foreground">Calories per combination</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <CardTitle className="text-base">Low Sodium</CardTitle>
                  <CardDescription>Heart-healthy options with reduced sodium content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold text-accent">{"<600mg"}</div>
                  <p className="text-sm text-muted-foreground">Sodium per combination</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive">
                <CardHeader>
                  <CardTitle className="text-base">High Fiber</CardTitle>
                  <CardDescription>Digestive health optimization with maximum fiber</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold text-destructive">15g+</div>
                  <p className="text-sm text-muted-foreground">Fiber per combination</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-base">Balanced Nutrition</CardTitle>
                  <CardDescription>Optimal macro ratios for comprehensive nutrition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold">40/30/30</div>
                  <p className="text-sm text-muted-foreground">Carbs/Protein/Fat ratio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Ready to optimize your nutrition?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Access professional-grade meal analysis and optimization tools
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link href="/optimizer">
                <Button size="lg">
                  <Calculator className="mr-2 h-4 w-4" />
                  Launch Platform
                </Button>
              </Link>
              <Link href="/analysis">
                <Button variant="outline" size="lg">
                  <Shield className="mr-2 h-4 w-4" />
                  View Analysis Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
