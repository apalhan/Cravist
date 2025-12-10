import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface OptimizationRequest {
  optimizationType: string
  diningCourt?: string
  calorieTarget?: number // Added calorie target parameter
  constraints?: {
    maxCalories?: number
    minProtein?: number
    maxSodium?: number
    minFiber?: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const { optimizationType, diningCourt, calorieTarget, constraints }: OptimizationRequest = await request.json()

    const supabase = await createClient()

    // Fetch available food items
    let query = supabase.from("food_items").select(`
      *,
      dining_courts (name)
    `)

    if (diningCourt && diningCourt !== "All Dining Courts") {
      query = query.eq("dining_courts.name", diningCourt)
    }

    const { data: foodItems, error } = await query

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to fetch food items" }, { status: 500 })
    }

    if (!foodItems || foodItems.length === 0) {
      return NextResponse.json({ error: "No food items found" }, { status: 404 })
    }

    const optimizedMeals = await optimizeMeals(foodItems, optimizationType, calorieTarget, constraints)

    return NextResponse.json({
      success: true,
      optimizationType,
      calorieTarget,
      meals: optimizedMeals,
    })
  } catch (error) {
    console.error("[v0] Optimization error:", error)
    return NextResponse.json({ error: "Optimization failed" }, { status: 500 })
  }
}

async function optimizeMeals(foodItems: any[], optimizationType: string, calorieTarget?: number, constraints?: any) {
  // Group food items by meal type
  const breakfastItems = foodItems.filter((item) => item.meal_type === "breakfast")
  const lunchItems = foodItems.filter((item) => item.meal_type === "lunch")
  const dinnerItems = foodItems.filter((item) => item.meal_type === "dinner")

  console.log("[v0] Available items:", {
    breakfast: breakfastItems.length,
    lunch: lunchItems.length,
    dinner: dinnerItems.length,
    total: foodItems.length,
  })

  const optimizedMeals = []

  for (let i = 0; i < 3; i++) {
    let breakfast, lunch, dinner

    if (calorieTarget) {
      // Target specific calorie distribution: 25% breakfast, 35% lunch, 40% dinner
      const breakfastTarget = Math.round(calorieTarget * 0.25)
      const lunchTarget = Math.round(calorieTarget * 0.35)
      const dinnerTarget = Math.round(calorieTarget * 0.4)

      breakfast = selectItemsForCalorieTarget(breakfastItems, breakfastTarget, optimizationType)
      lunch = selectItemsForCalorieTarget(lunchItems, lunchTarget, optimizationType)
      dinner = selectItemsForCalorieTarget(dinnerItems, dinnerTarget, optimizationType)
    } else {
      // Original optimization logic
      breakfast = selectOptimalItems(breakfastItems, optimizationType, 2)
      lunch = selectOptimalItems(lunchItems, optimizationType, 2)
      dinner = selectOptimalItems(dinnerItems, optimizationType, 2)
    }

    const totals = calculateTotals([...breakfast, ...lunch, ...dinner])
    const score = calculateOptimizationScore(totals, optimizationType, calorieTarget)

    optimizedMeals.push({
      id: `meal_${i + 1}`,
      optimizationType,
      calorieTarget,
      breakfast,
      lunch,
      dinner,
      totals,
      score,
    })
  }

  // Sort by optimization score
  return optimizedMeals.sort((a, b) => b.score - a.score)
}

function selectItemsForCalorieTarget(items: any[], calorieTarget: number, optimizationType: string) {
  if (items.length === 0) return []

  const selectedItems = []
  let currentCalories = 0
  const tolerance = calorieTarget * 0.15 // 15% tolerance

  // Sort items by optimization criteria first
  const sortedItems = [...items]
  switch (optimizationType) {
    case "max_protein":
      sortedItems.sort((a, b) => (b.protein || 0) - (a.protein || 0))
      break
    case "max_calories":
      sortedItems.sort((a, b) => (b.calories || 0) - (a.calories || 0))
      break
    case "min_calories":
      sortedItems.sort((a, b) => (a.calories || 0) - (b.calories || 0))
      break
    default:
      sortedItems.sort((a, b) => (b.protein || 0) - (a.protein || 0))
  }

  // Select items to reach target calories
  for (const item of sortedItems) {
    const itemCalories = item.calories || 0
    if (currentCalories + itemCalories <= calorieTarget + tolerance) {
      selectedItems.push(item)
      currentCalories += itemCalories

      if (currentCalories >= calorieTarget - tolerance) {
        break
      }
    }
  }

  // If we haven't reached minimum, add more items
  if (currentCalories < calorieTarget - tolerance && selectedItems.length < 4) {
    for (const item of sortedItems) {
      if (!selectedItems.includes(item) && selectedItems.length < 4) {
        selectedItems.push(item)
        currentCalories += item.calories || 0
        if (currentCalories >= calorieTarget - tolerance) break
      }
    }
  }

  return selectedItems.length > 0 ? selectedItems : [sortedItems[0]]
}

function selectOptimalItems(items: any[], optimizationType: string, maxItems: number) {
  const sortedItems = [...items]

  switch (optimizationType) {
    case "max_protein":
      sortedItems.sort((a, b) => (b.protein || 0) - (a.protein || 0))
      break
    case "max_calories":
      sortedItems.sort((a, b) => (b.calories || 0) - (a.calories || 0))
      break
    case "min_calories":
      sortedItems.sort((a, b) => (a.calories || 0) - (b.calories || 0))
      break
    case "low_sodium":
      sortedItems.sort((a, b) => (a.sodium || 0) - (b.sodium || 0))
      break
    case "high_fiber":
      sortedItems.sort((a, b) => (b.fiber || 0) - (a.fiber || 0))
      break
    case "balanced":
      // Calculate a balanced score based on protein/carb/fat ratios
      sortedItems.sort((a, b) => {
        const scoreA = calculateBalancedScore(a)
        const scoreB = calculateBalancedScore(b)
        return scoreB - scoreA
      })
      break
  }

  return sortedItems.slice(0, maxItems)
}

function calculateBalancedScore(item: any) {
  const protein = item.protein || 0
  const carbs = item.carbs || 0
  const fat = item.fat || 0
  const fiber = item.fiber || 0

  // Balanced score favors items with good protein, moderate carbs, healthy fats, and fiber
  return protein * 2 + fiber * 1.5 + Math.min(carbs, 30) + Math.min(fat, 15)
}

function calculateTotals(items: any[]) {
  return items.reduce(
    (totals, item) => ({
      calories: totals.calories + (item.calories || 0),
      protein: totals.protein + (item.protein || 0),
      carbs: totals.carbs + (item.carbs || 0),
      fat: totals.fat + (item.fat || 0),
      fiber: totals.fiber + (item.fiber || 0),
      sodium: totals.sodium + (item.sodium || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 },
  )
}

function calculateOptimizationScore(totals: any, optimizationType: string, calorieTarget?: number) {
  let baseScore = 0

  switch (optimizationType) {
    case "max_protein":
      baseScore = Math.min(totals.protein / 150, 1) * 100
      break
    case "max_calories":
      baseScore = Math.min(totals.calories / 3000, 1) * 100
      break
    case "min_calories":
      baseScore = Math.max(1 - totals.calories / 1800, 0) * 100
      break
    case "low_sodium":
      baseScore = Math.max(1 - totals.sodium / 2000, 0) * 100
      break
    case "high_fiber":
      baseScore = Math.min(totals.fiber / 30, 1) * 100
      break
    case "balanced":
      const proteinScore = Math.min(totals.protein / 80, 1) * 25
      const calorieScore = totals.calories >= 1500 && totals.calories <= 2500 ? 25 : 0
      const fiberScore = Math.min(totals.fiber / 25, 1) * 25
      const sodiumScore = totals.sodium <= 1500 ? 25 : 0
      baseScore = proteinScore + calorieScore + fiberScore + sodiumScore
      break
    default:
      baseScore = 50
  }

  if (calorieTarget) {
    const calorieAccuracy = 1 - Math.abs(totals.calories - calorieTarget) / calorieTarget
    const calorieBonus = Math.max(calorieAccuracy, 0) * 20
    baseScore += calorieBonus
  }

  return Math.min(baseScore, 100)
}
