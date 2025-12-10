"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Target, BarChart3, Clock, CheckCircle, Zap, Activity, Coffee } from "lucide-react"

interface FoodItem {
  id: string
  name: string
  dining_court_id: string
  meal_type: "breakfast" | "lunch" | "dinner"
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  serving_size: string
}

interface OptimizedMeal {
  id: string
  optimizationType: string
  calorieTarget: number
  breakfast: FoodItem[]
  lunch: FoodItem[]
  dinner: FoodItem[]
  totals: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sodium: number
  }
  score: number
}

export function MealOptimizer() {
  const [selectedOptimization, setSelectedOptimization] = useState("")
  const [selectedDiningCourt, setSelectedDiningCourt] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [optimizedMeals, setOptimizedMeals] = useState<OptimizedMeal[]>([])
  const [selectedMeal, setSelectedMeal] = useState<OptimizedMeal | null>(null)

  const optimizationTypes = [
    {
      value: "quick_meal",
      label: "Quick Meal (1,500 cal)",
      icon: Coffee,
      color: "green",
      calorieTarget: 1500,
      description: "Light, efficient meals for busy days or cutting phases",
    },
    {
      value: "balanced_meal",
      label: "Balanced Meal (2,500 cal)",
      icon: Target,
      color: "blue",
      calorieTarget: 2500,
      description: "Well-rounded nutrition for maintenance and general health",
    },
    {
      value: "power_meal",
      label: "Power Meal (4,000 cal)",
      icon: Zap,
      color: "red",
      calorieTarget: 4000,
      description: "High-energy meals for bulking, athletes, or high activity levels",
    },
  ]

  const diningCourts = [
    "All Dining Courts",
    "Wiley Dining Court",
    "Ford Dining Court",
    "Earhart Dining Court",
    "Hillenbrand Dining Court",
    "Windsor Dining Court",
  ]

  const handleOptimize = async () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)
    setOptimizedMeals([])

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setOptimizationProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const selectedType = optimizationTypes.find((type) => type.value === selectedOptimization)

      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          optimizationType: selectedOptimization,
          calorieTarget: selectedType?.calorieTarget,
          diningCourt: selectedDiningCourt === "All Dining Courts" ? undefined : selectedDiningCourt,
        }),
      })

      clearInterval(progressInterval)
      setOptimizationProgress(100)

      if (!response.ok) {
        throw new Error("Optimization failed")
      }

      const data = await response.json()
      setOptimizedMeals(data.meals)
      setSelectedMeal(data.meals[0])
    } catch (error) {
      console.error("[v0] Optimization error:", error)
      // Fallback to mock data if API fails
      const mockOptimizedMeals: OptimizedMeal[] = [
        {
          id: "1",
          optimizationType: selectedOptimization,
          calorieTarget: optimizationTypes.find((t) => t.value === selectedOptimization)?.calorieTarget || 2500,
          breakfast: [],
          lunch: [],
          dinner: [],
          totals: {
            calories: optimizationTypes.find((t) => t.value === selectedOptimization)?.calorieTarget || 2500,
            protein: 120,
            carbs: 250,
            fat: 80,
            fiber: 25,
            sodium: 1800,
          },
          score: 85,
        },
      ]
      setOptimizedMeals(mockOptimizedMeals)
      setSelectedMeal(mockOptimizedMeals[0])
    } finally {
      setIsOptimizing(false)
    }
  }

  const getOptimizationTypeInfo = (type: string) => {
    return optimizationTypes.find((opt) => opt.value === type)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="configure" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configure" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Configure
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="space-y-6">
          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Meal Optimization Settings</CardTitle>
              <CardDescription>
                Select your calorie target and dining preferences for optimized meal planning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Calorie Target</label>
                  <Select value={selectedOptimization} onValueChange={setSelectedOptimization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select calorie target" />
                    </SelectTrigger>
                    <SelectContent>
                      {optimizationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <label className="text-sm font-medium text-center block">Dining Court Preference</label>
                  <Select value={selectedDiningCourt} onValueChange={setSelectedDiningCourt}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dining court" />
                    </SelectTrigger>
                    <SelectContent>
                      {diningCourts.map((court) => (
                        <SelectItem key={court} value={court}>
                          {court}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedOptimization && (
                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{getOptimizationTypeInfo(selectedOptimization)?.label}</strong> -{" "}
                    {getOptimizationTypeInfo(selectedOptimization)?.description}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleOptimize}
                  disabled={!selectedOptimization || isOptimizing}
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                  size="lg"
                >
                  {isOptimizing ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing Meals...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Generate Meal Plans
                    </>
                  )}
                </Button>
              </div>

              {isOptimizing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Optimization Progress</span>
                    <span>{optimizationProgress}%</span>
                  </div>
                  <Progress value={optimizationProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            {optimizationTypes.map((type) => (
              <Card
                key={type.value}
                className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                  selectedOptimization === type.value ? "border-slate-900 bg-slate-50" : "border-gray-200"
                }`}
                onClick={() => setSelectedOptimization(type.value)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <type.icon className={`h-6 w-6 text-${type.color}-600`} />
                    <div>
                      <CardTitle className="text-base">{type.label.split(" (")[0]}</CardTitle>
                      <div className="text-2xl font-bold text-slate-900">{type.calorieTarget.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">calories/day</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {optimizedMeals.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Meal Options */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold">Optimized Meal Plans</h3>
                {optimizedMeals.map((meal, index) => (
                  <Card
                    key={meal.id}
                    className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                      selectedMeal?.id === meal.id ? "border-slate-900 bg-slate-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Plan {index + 1}</CardTitle>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                          {meal.score}% match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Target:</span>
                          <span className="text-sm font-medium">{meal.calorieTarget?.toLocaleString()} cal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Actual:</span>
                          <span className="text-sm font-medium">{meal.totals.calories.toLocaleString()} cal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Protein:</span>
                          <span className="text-sm font-medium">{meal.totals.protein}g</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed View */}
              {selectedMeal && (
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Meal Plan Details</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {selectedMeal.score}% Optimized
                      </Badge>
                      <Badge className="bg-slate-900 text-white">
                        {selectedMeal.calorieTarget?.toLocaleString()} cal target
                      </Badge>
                    </div>
                  </div>

                  {/* Nutritional Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Daily Nutritional Totals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-slate-50 rounded-lg border">
                          <div className="text-2xl font-bold text-slate-900">
                            {selectedMeal.totals.calories.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Calories</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg border">
                          <div className="text-2xl font-bold text-blue-600">{selectedMeal.totals.protein}g</div>
                          <div className="text-sm text-blue-700">Protein</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg border">
                          <div className="text-2xl font-bold text-green-600">{selectedMeal.totals.carbs}g</div>
                          <div className="text-sm text-green-700">Carbs</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg border">
                          <div className="text-2xl font-bold text-yellow-600">{selectedMeal.totals.fat}g</div>
                          <div className="text-sm text-yellow-700">Fat</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg border">
                          <div className="text-2xl font-bold text-orange-600">{selectedMeal.totals.fiber}g</div>
                          <div className="text-sm text-orange-700">Fiber</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border">
                          <div className="text-2xl font-bold text-purple-600">{selectedMeal.totals.sodium}mg</div>
                          <div className="text-sm text-purple-700">Sodium</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Meal Breakdown */}
                  <div className="space-y-4">
                    {["breakfast", "lunch", "dinner"].map((mealType) => (
                      <Card key={mealType}>
                        <CardHeader>
                          <CardTitle className="text-base capitalize">{mealType}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedMeal[mealType as keyof typeof selectedMeal]?.length > 0 ? (
                              selectedMeal[mealType as keyof typeof selectedMeal].map((item: FoodItem) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                >
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-600">{item.serving_size}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{item.calories} cal</Badge>
                                    <Badge variant="outline">{item.protein}g protein</Badge>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4 text-gray-500">No items selected for {mealType}</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Optimization Results</h3>
                <p className="text-gray-600 mb-4">
                  Select a calorie target and generate meal plans to see optimized results.
                </p>
                <Button variant="outline" onClick={() => setSelectedOptimization("")}>
                  Configure Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
