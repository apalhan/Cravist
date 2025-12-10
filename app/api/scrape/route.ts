import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { diningCourt, targetUrl } = await request.json()

    // In a real implementation, this would scrape the actual Purdue dining website
    // For now, we'll simulate the scraping process

    const supabase = await createClient()

    // Mock scraped data
    const mockScrapedData = [
      {
        name: "Grilled Chicken Breast",
        dining_court_id: null, // Will be resolved from dining court name
        meal_type: "lunch",
        category: "entree",
        calories: 230,
        protein: 43,
        carbs: 0,
        fat: 5,
        fiber: 0,
        sugar: 0,
        sodium: 70,
        vitamin_a: 0,
        vitamin_c: 0,
        calcium: 15,
        iron: 1,
        potassium: 350,
        allergens: [],
        dietary_restrictions: [],
        serving_size: "6 oz",
      },
      {
        name: "Quinoa Power Bowl",
        dining_court_id: null,
        meal_type: "lunch",
        category: "entree",
        calories: 320,
        protein: 12,
        carbs: 58,
        fat: 8,
        fiber: 6,
        sugar: 4,
        sodium: 450,
        vitamin_a: 800,
        vitamin_c: 25,
        calcium: 60,
        iron: 3,
        potassium: 520,
        allergens: [],
        dietary_restrictions: ["vegan"],
        serving_size: "1 bowl",
      },
    ]

    // Get dining court ID
    const { data: diningCourtData } = await supabase.from("dining_courts").select("id").eq("name", diningCourt).single()

    if (!diningCourtData) {
      return NextResponse.json({ error: "Dining court not found" }, { status: 404 })
    }

    // Insert scraped data
    const dataToInsert = mockScrapedData.map((item) => ({
      ...item,
      dining_court_id: diningCourtData.id,
    }))

    const { data, error } = await supabase.from("food_items").insert(dataToInsert).select()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to save scraped data" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      itemsScraped: data.length,
      data: data,
    })
  } catch (error) {
    console.error("[v0] Scraping error:", error)
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 })
  }
}
