"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Calculator, Target, TrendingUp, AlertCircle, CheckCircle, Activity, Shield } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

interface NutritionalGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  vitaminC: number
  calcium: number
  iron: number
}

interface DailyValues {
  calories: { value: number; dv: number }
  protein: { value: number; dv: number }
  carbs: { value: number; dv: number }
  fat: { value: number; dv: number }
  fiber: { value: number; dv: number }
  sodium: { value: number; dv: number }
  vitaminC: { value: number; dv: number }
  calcium: { value: number; dv: number }
  iron: { value: number; dv: number }
}

export function NutritionalAnalysisTools() {
  const [userProfile, setUserProfile] = useState({
    age: 20,
    gender: "male",
    weight: 70,
    height: 175,
    activityLevel: "moderate",
    goals: "maintain",
  })

  const [nutritionalGoals, setNutritionalGoals] = useState<NutritionalGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
    sodium: 2300,
    vitaminC: 90,
    calcium: 1000,
    iron: 18,
  })

  const [currentIntake, setCurrentIntake] = useState<NutritionalGoals>({
    calories: 1650,
    protein: 95,
    carbs: 180,
    fat: 55,
    fiber: 18,
    sodium: 1200,
    vitaminC: 65,
    calcium: 750,
    iron: 12,
  })

  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowSodium: false,
    lowCarb: false,
  })

  // Mock trend data
  const trendData = [
    { day: "Mon", calories: 1800, protein: 120, fiber: 22 },
    { day: "Tue", calories: 1650, protein: 95, fiber: 18 },
    { day: "Wed", calories: 1900, protein: 140, fiber: 25 },
    { day: "Thu", calories: 1750, protein: 110, fiber: 20 },
    { day: "Fri", calories: 1850, protein: 125, fiber: 23 },
    { day: "Sat", calories: 2100, protein: 160, fiber: 28 },
    { day: "Sun", calories: 1950, protein: 135, fiber: 26 },
  ]

  const calculateDailyValues = (): DailyValues => {
    return {
      calories: { value: currentIntake.calories, dv: 2000 },
      protein: { value: currentIntake.protein, dv: 50 },
      carbs: { value: currentIntake.carbs, dv: 300 },
      fat: { value: currentIntake.fat, dv: 65 },
      fiber: { value: currentIntake.fiber, dv: 25 },
      sodium: { value: currentIntake.sodium, dv: 2300 },
      vitaminC: { value: currentIntake.vitaminC, dv: 90 },
      calcium: { value: currentIntake.calcium, dv: 1000 },
      iron: { value: currentIntake.iron, dv: 18 },
    }
  }

  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    if (userProfile.gender === "male") {
      return 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5
    } else {
      return 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161
    }
  }

  const calculateTDEE = () => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }
    return Math.round(bmr * activityMultipliers[userProfile.activityLevel as keyof typeof activityMultipliers])
  }

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return "bg-red-500"
    if (percentage < 80) return "bg-yellow-500"
    if (percentage <= 100) return "bg-green-500"
    return "bg-blue-500"
  }

  const getProgressStatus = (current: number, goal: number) => {
    const percentage = (current / goal) * 100
    if (percentage < 50) return { status: "low", icon: AlertCircle, color: "text-red-600" }
    if (percentage < 80) return { status: "moderate", icon: Activity, color: "text-yellow-600" }
    if (percentage <= 100) return { status: "good", icon: CheckCircle, color: "text-green-600" }
    return { status: "high", icon: TrendingUp, color: "text-blue-600" }
  }

  const dailyValues = calculateDailyValues()

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="tracking">Daily Tracking</TabsTrigger>
          <TabsTrigger value="goals">Goal Setting</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          {/* BMR/TDEE Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Metabolic Rate Calculator</CardTitle>
              <CardDescription>
                Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({ ...userProfile, age: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={userProfile.gender}
                    onValueChange={(value) => setUserProfile({ ...userProfile, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={userProfile.weight}
                    onChange={(e) => setUserProfile({ ...userProfile, weight: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={userProfile.height}
                    onChange={(e) => setUserProfile({ ...userProfile, height: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select
                    value={userProfile.activityLevel}
                    onValueChange={(value) => setUserProfile({ ...userProfile, activityLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light Activity</SelectItem>
                      <SelectItem value="moderate">Moderate Activity</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="veryActive">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Goals</Label>
                  <Select
                    value={userProfile.goals}
                    onValueChange={(value) => setUserProfile({ ...userProfile, goals: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800">BMR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{Math.round(calculateBMR())}</div>
                    <div className="text-sm text-blue-700">calories/day</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">TDEE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{calculateTDEE()}</div>
                    <div className="text-sm text-green-700">calories/day</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800">Target</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {userProfile.goals === "lose"
                        ? calculateTDEE() - 500
                        : userProfile.goals === "gain"
                          ? calculateTDEE() + 500
                          : calculateTDEE()}
                    </div>
                    <div className="text-sm text-purple-700">calories/day</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Dietary Restrictions */}
          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences & Restrictions</CardTitle>
              <CardDescription>Configure your dietary needs and restrictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(dietaryRestrictions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-600" />
                      <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setDietaryRestrictions({ ...dietaryRestrictions, [key]: checked })}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          {/* Daily Value Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Value Progress</CardTitle>
              <CardDescription>Track your progress toward recommended daily nutritional values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(dailyValues).map(([nutrient, data]) => {
                  const percentage = Math.min((data.value / data.dv) * 100, 120)
                  const status = getProgressStatus(data.value, data.dv)
                  const StatusIcon = status.icon

                  return (
                    <div key={nutrient} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${status.color}`} />
                          <span className="font-medium capitalize">{nutrient}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {data.value} / {data.dv}{" "}
                          {nutrient === "calories"
                            ? ""
                            : ["sodium", "calcium"].includes(nutrient)
                              ? "mg"
                              : ["vitaminC"].includes(nutrient)
                                ? "mg"
                                : "g"}
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={percentage} className="h-2" />
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(percentage)}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">{Math.round(percentage)}% of daily value</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Nutritional Balance */}
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={[
                    {
                      name: "Current",
                      Protein: ((currentIntake.protein * 4) / currentIntake.calories) * 100,
                      Carbs: ((currentIntake.carbs * 4) / currentIntake.calories) * 100,
                      Fat: ((currentIntake.fat * 9) / currentIntake.calories) * 100,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, ""]} />
                  <Area type="monotone" dataKey="Protein" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  <Area type="monotone" dataKey="Carbs" stackId="1" stroke="#22c55e" fill="#22c55e" />
                  <Area type="monotone" dataKey="Fat" stackId="1" stroke="#eab308" fill="#eab308" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Goal Setting */}
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Goals</CardTitle>
              <CardDescription>Set personalized nutritional targets based on your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(nutritionalGoals).map(([nutrient, value]) => (
                  <div key={nutrient} className="space-y-2">
                    <Label htmlFor={nutrient} className="capitalize">
                      {nutrient}{" "}
                      {nutrient === "calories"
                        ? ""
                        : ["sodium", "calcium"].includes(nutrient)
                          ? "(mg)"
                          : ["vitaminC"].includes(nutrient)
                            ? "(mg)"
                            : "(g)"}
                    </Label>
                    <Input
                      id={nutrient}
                      type="number"
                      value={value}
                      onChange={(e) =>
                        setNutritionalGoals({
                          ...nutritionalGoals,
                          [nutrient]: Number.parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    // Auto-calculate goals based on TDEE and profile
                    const tdee = calculateTDEE()
                    setNutritionalGoals({
                      calories: tdee,
                      protein: Math.round(userProfile.weight * 1.6),
                      carbs: Math.round((tdee * 0.45) / 4),
                      fat: Math.round((tdee * 0.25) / 9),
                      fiber: 25,
                      sodium: 2300,
                      vitaminC: 90,
                      calcium: 1000,
                      iron: userProfile.gender === "female" ? 18 : 8,
                    })
                  }}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Auto-Calculate Goals
                </Button>

                <Button variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Save Goals
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(nutritionalGoals)
                  .slice(0, 6)
                  .map(([nutrient, goal]) => {
                    const current = currentIntake[nutrient as keyof typeof currentIntake]
                    const percentage = (current / goal) * 100
                    const status = getProgressStatus(current, goal)
                    const StatusIcon = status.icon

                    return (
                      <div key={nutrient} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-4 w-4 ${status.color}`} />
                            <span className="font-medium capitalize">{nutrient}</span>
                          </div>
                          <Badge variant={percentage >= 80 ? "default" : "secondary"}>{Math.round(percentage)}%</Badge>
                        </div>
                        <Progress value={Math.min(percentage, 100)} />
                        <div className="text-sm text-gray-600">
                          {current} / {goal} {nutrient === "calories" ? "cal" : "g"}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Nutrition Trends</CardTitle>
              <CardDescription>Track your nutritional intake patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="protein" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="fiber" stroke="#eab308" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trend Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Averages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Calories</span>
                    <span className="font-semibold">1,857 cal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Protein</span>
                    <span className="font-semibold">126g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Fiber</span>
                    <span className="font-semibold">23g</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Protein intake trending up 8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Achievement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { name: "Calories", achieved: 85 },
                      { name: "Protein", achieved: 92 },
                      { name: "Fiber", achieved: 78 },
                      { name: "Sodium", achieved: 65 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Achievement"]} />
                    <Bar dataKey="achieved" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
