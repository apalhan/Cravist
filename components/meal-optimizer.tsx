"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  Heart,
  Leaf,
  BarChart3,
  Clock,
  CheckCircle,
} from "lucide-react"

interface FoodItem {
  id: string
  name: string
  diningCourt: string
  mealType: "breakfast" | "lunch" | "dinner"
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  servingSize: string
}

interface OptimizedMeal {
  id: string
  optimizationType: string
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
    { value: "max_protein", label: "Maximum Protein", icon: TrendingUp, color: "red" },
    { value: "max_calories", label: "Maximum Calories", icon: TrendingUp, color: "blue" },
    { value: "min_calories", label: "Minimum Calories", icon: TrendingDown, color: "green" },
    { value: "balanced", label: "Balanced Nutrition", icon: Target, color: "purple" },
    { value: "low_sodium", label: "Low Sodium", icon: Heart, color: "pink" },
    { value: "high_fiber", label: "High Fiber", icon: Leaf, color: "orange" },
  ]

  const diningCourts = [
    "All Dining Courts",
    "Wiley Dining Court",
    "Ford Dining Court",
    "Earhart Dining Court",
    "Hillenbrand Dining Court",
    "Windsor Dining Court",
  ]

  // Mock food items for demonstration
  const mockFoodItems: FoodItem[] = [
    {
      id: "1",
      name: "Scrambled Eggs",
      diningCourt: "Wiley",
      mealType: "breakfast",
      category: "entree",
      calories: 140,
      protein: 12,
      carbs: 2,
      fat: 10,
      fiber: 0,
      sodium: 180,
      servingSize: "2 eggs",
    },
    {
      id: "2",
      name: "Greek Yogurt",
      diningCourt: "Wiley",
      mealType: "breakfast",
      category: "side",
      calories: 100,
      protein: 15,
      carbs: 6,
      fat: 0,
      fiber: 0,
      sodium: 60,
      servingSize: "6 oz",
    },
    {
      id: "3",
      name: "Grilled Chicken Breast",
      diningCourt: "Ford",
      mealType: "lunch",
      category: "entree",
      calories: 230,
      protein: 43,
      carbs: 0,
      fat: 5,
      fiber: 0,
      sodium: 70,
      servingSize: "6 oz",
    },
    {
      id: "4",
      name: "Quinoa Salad",
      diningCourt: "Ford",
      mealType: "lunch",
      category: "side",
      calories: 180,
      protein: 8,
      carbs: 32,
      fat: 4,
      fiber: 6,
      sodium: 200,
      servingSize: "1 cup",
    },
    {
      id: "5",
      name: "Salmon Fillet",
      diningCourt: "Earhart",
      mealType: "dinner",
      category: "entree",
      calories: 280,
      protein: 39,
      carbs: 0,
      fat: 12,
      fiber: 0,
      sodium: 90,
      servingSize: "6 oz",
    },
    {
      id: "6",
      name: "Roasted Vegetables",
      diningCourt: "Earhart",
      mealType: "dinner",
      category: "side",
      calories: 80,
      protein: 2,
      carbs: 18,
      fat: 0,
      fiber: 4,
      sodium: 20,
      servingSize: "1 cup",
    },
  ]

  const handleOptimize = async () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)
    setOptimizedMeals([])

    // Simulate optimization process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setOptimizationProgress(i)
    }

    // Generate mock optimized meals
    const mockOptimizedMeals: OptimizedMeal[] = [
      {
        id: "1",
        optimizationType: selectedOptimization,
        breakfast: [mockFoodItems[0], mockFoodItems[1]],
        lunch: [mockFoodItems[2], mockFoodItems[3]],
        dinner: [mockFoodItems[4], mockFoodItems[5]],
        totals: {
          calories: 1110,
          protein: 119,
          carbs: 58,
          fat: 31,
          fiber: 10,
          sodium: 620,
        },
        score: 95,
      },
      {
        id: "2",
        optimizationType: selectedOptimization,
        breakfast: [mockFoodItems[1]],
        lunch: [mockFoodItems[2], mockFoodItems[3]],
        dinner: [mockFoodItems[4]],
        totals: {
          calories: 890,
          protein: 105,
          carbs: 38,
          fat: 21,
          fiber: 6,
          sodium: 420,
        },
        score: 88,
      },
      {
        id: "3",
        optimizationType: selectedOptimization,
        breakfast: [mockFoodItems[0]],
        lunch: [mockFoodItems[2]],
        dinner: [mockFoodItems[4], mockFoodItems[5]],
        totals: {
          calories: 730,
          protein: 96,
          carbs: 20,
          fat: 27,
          fiber: 4,
          sodium: 360,
        },
        score: 82,
      },
    ]

    setOptimizedMeals(mockOptimizedMeals)
    setSelectedMeal(mockOptimizedMeals[0])
    setIsOptimizing(false)
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
              <CardTitle>Optimization Settings</CardTitle>
              <CardDescription>Configure your meal optimization preferences and goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Optimization Goal</label>
                  <Select value={selectedOptimization} onValueChange={setSelectedOptimization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select optimization goal" />
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dining Court Preference</label>
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
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{getOptimizationTypeInfo(selectedOptimization)?.label}</strong> optimization will prioritize{" "}
                    {selectedOptimization === "max_protein" && "meals with the highest protein content"}
                    {selectedOptimization === "max_calories" && "meals with the highest caloric density"}
                    {selectedOptimization === "min_calories" && "meals with the lowest caloric content"}
                    {selectedOptimization === "balanced" && "meals with optimal macro and micronutrient balance"}
                    {selectedOptimization === "low_sodium" && "meals with minimal sodium content"}
                    {selectedOptimization === "high_fiber" && "meals with maximum fiber content"}.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleOptimize}
                  disabled={!selectedOptimization || isOptimizing}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isOptimizing ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Optimization
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

          {/* Optimization Types Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optimizationTypes.map((type) => (
              <Card
                key={type.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedOptimization === type.value ? "ring-2 ring-green-500 bg-green-50" : ""
                }`}
                onClick={() => setSelectedOptimization(type.value)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <type.icon className={`h-5 w-5 text-${type.color}-600`} />
                    <CardTitle className="text-base">{type.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {type.value === "max_protein" && "Maximize protein intake for muscle building and recovery"}
                    {type.value === "max_calories" && "Maximize caloric intake for bulking or high energy needs"}
                    {type.value === "min_calories" && "Minimize calories for weight management or cutting"}
                    {type.value === "balanced" && "Optimize for well-rounded nutritional balance"}
                    {type.value === "low_sodium" && "Minimize sodium for heart health and blood pressure"}
                    {type.value === "high_fiber" && "Maximize fiber for digestive health and satiety"}
                  </p>
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
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedMeal?.id === meal.id ? "ring-2 ring-green-500 bg-green-50" : ""
                    }`}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Option {index + 1}</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {meal.score}% match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Calories:</span> {meal.totals.calories}
                        </div>
                        <div>
                          <span className="text-gray-600">Protein:</span> {meal.totals.protein}g
                        </div>
                        <div>
                          <span className="text-gray-600">Carbs:</span> {meal.totals.carbs}g
                        </div>
                        <div>
                          <span className="text-gray-600">Fat:</span> {meal.totals.fat}g
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
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {selectedMeal.score}% Optimized
                    </Badge>
                  </div>

                  {/* Nutritional Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Daily Nutritional Totals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{selectedMeal.totals.calories}</div>
                          <div className="text-sm text-red-700">Calories</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{selectedMeal.totals.protein}g</div>
                          <div className="text-sm text-blue-700">Protein</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{selectedMeal.totals.carbs}g</div>
                          <div className="text-sm text-green-700">Carbs</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{selectedMeal.totals.fat}g</div>
                          <div className="text-sm text-yellow-700">Fat</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{selectedMeal.totals.fiber}g</div>
                          <div className="text-sm text-orange-700">Fiber</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
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
                            {selectedMeal[mealType as keyof typeof selectedMeal].map((item: FoodItem) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {item.diningCourt} • {item.servingSize}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{item.calories} cal</Badge>
                                  <Badge variant="outline">{item.protein}g protein</Badge>
                                </div>
                              </div>
                            ))}
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
                  Configure your optimization settings and run the optimizer to see results.
                </p>
                <Button variant="outline" onClick={() => setSelectedOptimization("")}>
                  Go to Configuration
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
