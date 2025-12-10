"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  X,
  BarChart3,
  LucidePieChart,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  Zap,
  Heart,
  Leaf,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface MealCombination {
  id: string
  name: string
  optimizationType: string
  totals: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    vitaminA: number
    vitaminC: number
    calcium: number
    iron: number
    potassium: number
  }
  meals: {
    breakfast: Array<{ name: string; calories: number; protein: number }>
    lunch: Array<{ name: string; calories: number; protein: number }>
    dinner: Array<{ name: string; calories: number; protein: number }>
  }
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0"]

export function ComparisonDashboard() {
  const [selectedMeals, setSelectedMeals] = useState<MealCombination[]>([])
  const [availableMeals] = useState<MealCombination[]>([
    {
      id: "1",
      name: "High Protein Plan",
      optimizationType: "max_protein",
      totals: {
        calories: 1850,
        protein: 145,
        carbs: 120,
        fat: 65,
        fiber: 28,
        sugar: 45,
        sodium: 1200,
        vitaminA: 2500,
        vitaminC: 180,
        calcium: 1100,
        iron: 18,
        potassium: 3200,
      },
      meals: {
        breakfast: [
          { name: "Greek Yogurt Parfait", calories: 280, protein: 25 },
          { name: "Scrambled Eggs", calories: 140, protein: 12 },
        ],
        lunch: [
          { name: "Grilled Chicken Breast", calories: 230, protein: 43 },
          { name: "Quinoa Salad", calories: 180, protein: 8 },
        ],
        dinner: [
          { name: "Salmon Fillet", calories: 280, protein: 39 },
          { name: "Steamed Broccoli", calories: 55, protein: 6 },
        ],
      },
    },
    {
      id: "2",
      name: "Balanced Nutrition",
      optimizationType: "balanced",
      totals: {
        calories: 1650,
        protein: 95,
        carbs: 180,
        fat: 55,
        fiber: 35,
        sugar: 65,
        sodium: 950,
        vitaminA: 3200,
        vitaminC: 220,
        calcium: 950,
        iron: 15,
        potassium: 2800,
      },
      meals: {
        breakfast: [
          { name: "Oatmeal with Berries", calories: 220, protein: 8 },
          { name: "Almond Butter Toast", calories: 180, protein: 7 },
        ],
        lunch: [
          { name: "Turkey Sandwich", calories: 320, protein: 25 },
          { name: "Mixed Green Salad", calories: 120, protein: 4 },
        ],
        dinner: [
          { name: "Vegetable Stir Fry", calories: 280, protein: 12 },
          { name: "Brown Rice", calories: 150, protein: 4 },
        ],
      },
    },
    {
      id: "3",
      name: "Low Calorie Plan",
      optimizationType: "min_calories",
      totals: {
        calories: 1200,
        protein: 85,
        carbs: 95,
        fat: 35,
        fiber: 32,
        sugar: 35,
        sodium: 800,
        vitaminA: 2800,
        vitaminC: 200,
        calcium: 850,
        iron: 12,
        potassium: 2400,
      },
      meals: {
        breakfast: [
          { name: "Egg White Omelet", calories: 120, protein: 18 },
          { name: "Fresh Fruit Bowl", calories: 80, protein: 2 },
        ],
        lunch: [
          { name: "Grilled Chicken Salad", calories: 250, protein: 35 },
          { name: "Vegetable Soup", calories: 90, protein: 4 },
        ],
        dinner: [
          { name: "Baked Fish", calories: 180, protein: 28 },
          { name: "Roasted Vegetables", calories: 100, protein: 3 },
        ],
      },
    },
    {
      id: "4",
      name: "High Fiber Focus",
      optimizationType: "high_fiber",
      totals: {
        calories: 1750,
        protein: 78,
        carbs: 220,
        fat: 48,
        fiber: 45,
        sugar: 55,
        sodium: 1100,
        vitaminA: 3500,
        vitaminC: 250,
        calcium: 1200,
        iron: 20,
        potassium: 3500,
      },
      meals: {
        breakfast: [
          { name: "High Fiber Cereal", calories: 200, protein: 8 },
          { name: "Banana", calories: 105, protein: 1 },
        ],
        lunch: [
          { name: "Bean and Veggie Wrap", calories: 350, protein: 15 },
          { name: "Apple Slices", calories: 80, protein: 0 },
        ],
        dinner: [
          { name: "Lentil Curry", calories: 280, protein: 18 },
          { name: "Whole Grain Rice", calories: 160, protein: 4 },
        ],
      },
    },
  ])

  const addMealToComparison = (mealId: string) => {
    if (selectedMeals.length >= 4) return
    const meal = availableMeals.find((m) => m.id === mealId)
    if (meal && !selectedMeals.find((m) => m.id === mealId)) {
      setSelectedMeals([...selectedMeals, meal])
    }
  }

  const removeMealFromComparison = (mealId: string) => {
    setSelectedMeals(selectedMeals.filter((m) => m.id !== mealId))
  }

  const getMacroData = () => {
    return selectedMeals.map((meal) => ({
      name: meal.name,
      Protein: meal.totals.protein,
      Carbs: meal.totals.carbs,
      Fat: meal.totals.fat,
      Fiber: meal.totals.fiber,
    }))
  }

  const getCalorieData = () => {
    return selectedMeals.map((meal, index) => ({
      name: meal.name,
      calories: meal.totals.calories,
      fill: COLORS[index % COLORS.length],
    }))
  }

  const getMicronutrientData = () => {
    if (selectedMeals.length === 0) return []

    const nutrients = ["vitaminA", "vitaminC", "calcium", "iron", "potassium"]
    return nutrients.map((nutrient) => {
      const data: any = { nutrient: nutrient.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()) }
      selectedMeals.forEach((meal) => {
        data[meal.name] = meal.totals[nutrient as keyof typeof meal.totals]
      })
      return data
    })
  }

  const getOptimizationTypeColor = (type: string) => {
    const colors = {
      max_protein: "bg-red-100 text-red-800",
      balanced: "bg-purple-100 text-purple-800",
      min_calories: "bg-green-100 text-green-800",
      high_fiber: "bg-orange-100 text-orange-800",
      low_sodium: "bg-pink-100 text-pink-800",
      max_calories: "bg-blue-100 text-blue-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getOptimizationIcon = (type: string) => {
    const icons = {
      max_protein: TrendingUp,
      balanced: Award,
      min_calories: TrendingUp,
      high_fiber: Leaf,
      low_sodium: Heart,
      max_calories: Zap,
    }
    return icons[type as keyof typeof icons] || Award
  }

  const getNutritionalInsights = (meal: MealCombination) => {
    const insights = []

    if (meal.totals.protein > 100) {
      insights.push({ type: "success", message: "Excellent protein content for muscle building" })
    }
    if (meal.totals.fiber > 30) {
      insights.push({ type: "success", message: "High fiber content supports digestive health" })
    }
    if (meal.totals.sodium > 1500) {
      insights.push({ type: "warning", message: "High sodium content - consider reducing" })
    }
    if (meal.totals.calories < 1300) {
      insights.push({ type: "info", message: "Low calorie plan - ensure adequate nutrition" })
    }

    return insights
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="selection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="selection">Selection</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="selection" className="space-y-6">
          {/* Meal Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Meals to Compare</CardTitle>
              <CardDescription>Choose up to 4 meal combinations for side-by-side comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableMeals.map((meal) => {
                  const isSelected = selectedMeals.find((m) => m.id === meal.id)
                  const Icon = getOptimizationIcon(meal.optimizationType)

                  return (
                    <Card
                      key={meal.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? "ring-2 ring-purple-500 bg-purple-50" : ""
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Icon className="h-5 w-5 text-purple-600" />
                          {isSelected ? (
                            <Button size="sm" variant="ghost" onClick={() => removeMealFromComparison(meal.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addMealToComparison(meal.id)}
                              disabled={selectedMeals.length >= 4}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <CardTitle className="text-base">{meal.name}</CardTitle>
                        <Badge className={getOptimizationTypeColor(meal.optimizationType)}>
                          {meal.optimizationType.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Calories:</span>
                            <span className="font-medium">{meal.totals.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Protein:</span>
                            <span className="font-medium">{meal.totals.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fiber:</span>
                            <span className="font-medium">{meal.totals.fiber}g</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Meals Preview */}
          {selectedMeals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selected for Comparison ({selectedMeals.length}/4)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedMeals.map((meal) => (
                    <Badge key={meal.id} variant="secondary" className="flex items-center gap-2">
                      {meal.name}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                        onClick={() => removeMealFromComparison(meal.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {selectedMeals.length > 0 ? (
            <div className="grid gap-6">
              {/* Quick Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Overview</CardTitle>
                  <CardDescription>Key nutritional metrics comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Metric</th>
                          {selectedMeals.map((meal) => (
                            <th key={meal.id} className="text-center p-2 min-w-[120px]">
                              {meal.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "calories", label: "Calories", unit: "" },
                          { key: "protein", label: "Protein", unit: "g" },
                          { key: "carbs", label: "Carbs", unit: "g" },
                          { key: "fat", label: "Fat", unit: "g" },
                          { key: "fiber", label: "Fiber", unit: "g" },
                          { key: "sodium", label: "Sodium", unit: "mg" },
                        ].map((metric) => (
                          <tr key={metric.key} className="border-b">
                            <td className="p-2 font-medium">{metric.label}</td>
                            {selectedMeals.map((meal) => (
                              <td key={meal.id} className="text-center p-2">
                                {meal.totals[metric.key as keyof typeof meal.totals]}
                                {metric.unit}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Nutritional Insights */}
              <div className="grid md:grid-cols-2 gap-4">
                {selectedMeals.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{meal.name} - Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getNutritionalInsights(meal).map((insight, index) => (
                          <div key={index} className="flex items-start gap-2">
                            {insight.type === "success" && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                            {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                            {insight.type === "info" && <BarChart3 className="h-4 w-4 text-blue-600 mt-0.5" />}
                            <span className="text-sm">{insight.message}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Meals Selected</h3>
                <p className="text-gray-600">Select meals from the Selection tab to see comparison data.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {selectedMeals.length > 0 ? (
            <div className="space-y-6">
              {selectedMeals.map((meal) => (
                <Card key={meal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{meal.name}</CardTitle>
                      <Badge className={getOptimizationTypeColor(meal.optimizationType)}>
                        {meal.optimizationType.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Macronutrients */}
                      <div>
                        <h4 className="font-semibold mb-3">Macronutrients</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-xl font-bold text-red-600">{meal.totals.calories}</div>
                            <div className="text-sm text-red-700">Calories</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{meal.totals.protein}g</div>
                            <div className="text-sm text-blue-700">Protein</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{meal.totals.carbs}g</div>
                            <div className="text-sm text-green-700">Carbs</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <div className="text-xl font-bold text-yellow-600">{meal.totals.fat}g</div>
                            <div className="text-sm text-yellow-700">Fat</div>
                          </div>
                        </div>
                      </div>

                      {/* Micronutrients */}
                      <div>
                        <h4 className="font-semibold mb-3">Micronutrients</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Fiber:</span>
                            <span className="font-medium">{meal.totals.fiber}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sodium:</span>
                            <span className="font-medium">{meal.totals.sodium}mg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vitamin A:</span>
                            <span className="font-medium">{meal.totals.vitaminA}IU</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vitamin C:</span>
                            <span className="font-medium">{meal.totals.vitaminC}mg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Calcium:</span>
                            <span className="font-medium">{meal.totals.calcium}mg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Iron:</span>
                            <span className="font-medium">{meal.totals.iron}mg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Potassium:</span>
                            <span className="font-medium">{meal.totals.potassium}mg</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Meal Breakdown */}
                    <div>
                      <h4 className="font-semibold mb-3">Meal Breakdown</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {["breakfast", "lunch", "dinner"].map((mealType) => (
                          <div key={mealType}>
                            <h5 className="font-medium capitalize mb-2">{mealType}</h5>
                            <div className="space-y-2">
                              {meal.meals[mealType as keyof typeof meal.meals].map((item, index) => (
                                <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-gray-600">
                                    {item.calories} cal • {item.protein}g protein
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <LucidePieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Detailed Data</h3>
                <p className="text-gray-600">Select meals to view detailed nutritional breakdowns.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          {selectedMeals.length > 0 ? (
            <div className="grid gap-6">
              {/* Macronutrient Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Macronutrient Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getMacroData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Protein" fill="#ef4444" />
                      <Bar dataKey="Carbs" fill="#22c55e" />
                      <Bar dataKey="Fat" fill="#eab308" />
                      <Bar dataKey="Fiber" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Calorie Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Calorie Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsPieChart>
                        <Pie
                          data={getCalorieData()}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="calories"
                          label={({ name, calories }) => `${name}: ${calories}`}
                        >
                          {getCalorieData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Micronutrient Radar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Micronutrient Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={getMicronutrientData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="nutrient" />
                        <PolarRadiusAxis />
                        {selectedMeals.map((meal, index) => (
                          <Radar
                            key={meal.id}
                            name={meal.name}
                            dataKey={meal.name}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                            fillOpacity={0.1}
                          />
                        ))}
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Chart Data</h3>
                <p className="text-gray-600">Select meals to view interactive charts and visualizations.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
