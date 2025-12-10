import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface OptimizationRequest {
  optimizationType: string
  diningCourt?: string
  constraints?: {
    maxCalories?: number
    minProtein?: number
    maxSodium?: number
    minFiber?: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const { optimizationType, diningCourt, constraints }: OptimizationRequest = await request.json()

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

    // Optimization algorithms
    const optimizedMeals = await optimizeMeals(foodItems, optimizationType, constraints)

    return NextResponse.json({
      success: true,
      optimizationType,
      meals: optimizedMeals,
    })
  } catch (error) {
    console.error("[v0] Optimization error:", error)
    return NextResponse.json({ error: "Optimization failed" }, { status: 500 })
  }
}

async function optimizeMeals(foodItems: any[], optimizationType: string, constraints?: any) {
  // Group food items by meal type
  const breakfastItems = foodItems.filter((item) => item.meal_type === "breakfast")
  const lunchItems = foodItems.filter((item) => item.meal_type === "lunch")
  const dinnerItems = foodItems.filter((item) => item.meal_type === "dinner")

  const optimizedMeals = []

  // Generate multiple meal combinations
  for (let i = 0; i < 3; i++) {
    const breakfast = selectOptimalItems(breakfastItems, optimizationType, 2)
    const lunch = selectOptimalItems(lunchItems, optimizationType, 2)
    const dinner = selectOptimalItems(dinnerItems, optimizationType, 2)

    const totals = calculateTotals([...breakfast, ...lunch, ...dinner])
    const score = calculateOptimizationScore(totals, optimizationType)

    optimizedMeals.push({
      id: `meal_${i + 1}`,
      optimizationType,
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

function calculateOptimizationScore(totals: any, optimizationType: string) {
  switch (optimizationType) {
    case "max_protein":
      return Math.min(totals.protein / 100, 1) * 100
    case "max_calories":
      return Math.min(totals.calories / 2000, 1) * 100
    case "min_calories":
      return Math.max(1 - totals.calories / 1200, 0) * 100
    case "low_sodium":
      return Math.max(1 - totals.sodium / 2000, 0) * 100
    case "high_fiber":
      return Math.min(totals.fiber / 30, 1) * 100
    case "balanced":
      // Balanced score considers multiple factors
      const proteinScore = Math.min(totals.protein / 80, 1) * 25
      const calorieScore = totals.calories >= 1500 && totals.calories <= 2000 ? 25 : 0
      const fiberScore = Math.min(totals.fiber / 25, 1) * 25
      const sodiumScore = totals.sodium <= 1500 ? 25 : 0
      return proteinScore + calorieScore + fiberScore + sodiumScore
    default:
      return 50
  }
}
