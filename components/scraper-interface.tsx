"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText,
  Database,
} from "lucide-react"

interface ScrapingResult {
  id: string
  name: string
  diningCourt: string
  mealType: string
  calories: number
  protein: number
  status: "success" | "error" | "pending"
}

export function ScraperInterface() {
  const [isScrapingActive, setIsScrapingActive] = useState(false)
  const [scrapingProgress, setScrapingProgress] = useState(0)
  const [selectedDiningCourt, setSelectedDiningCourt] = useState("")
  const [scrapingResults, setScrapingResults] = useState<ScrapingResult[]>([])
  const [manualData, setManualData] = useState("")

  const diningCourts = [
    "Wiley Dining Court",
    "Ford Dining Court",
    "Earhart Dining Court",
    "Hillenbrand Dining Court",
    "Windsor Dining Court",
  ]

  const handleStartScraping = async () => {
    setIsScrapingActive(true)
    setScrapingProgress(0)
    setScrapingResults([])

    // Simulate scraping process
    const mockResults: ScrapingResult[] = [
      {
        id: "1",
        name: "Grilled Chicken Breast",
        diningCourt: selectedDiningCourt,
        mealType: "lunch",
        calories: 230,
        protein: 43,
        status: "pending",
      },
      {
        id: "2",
        name: "Quinoa Salad",
        diningCourt: selectedDiningCourt,
        mealType: "lunch",
        calories: 180,
        protein: 8,
        status: "pending",
      },
      {
        id: "3",
        name: "Chocolate Chip Cookies",
        diningCourt: selectedDiningCourt,
        mealType: "dessert",
        calories: 150,
        protein: 2,
        status: "pending",
      },
      {
        id: "4",
        name: "Turkey Sandwich",
        diningCourt: selectedDiningCourt,
        mealType: "lunch",
        calories: 320,
        protein: 25,
        status: "pending",
      },
      {
        id: "5",
        name: "Greek Yogurt Parfait",
        diningCourt: selectedDiningCourt,
        mealType: "breakfast",
        calories: 120,
        protein: 15,
        status: "pending",
      },
    ]

    for (let i = 0; i < mockResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedResult = {
        ...mockResults[i],
        status: Math.random() > 0.1 ? ("success" as const) : ("error" as const),
      }

      setScrapingResults((prev) => [...prev.slice(0, i), updatedResult, ...mockResults.slice(i + 1)])
      setScrapingProgress(((i + 1) / mockResults.length) * 100)
    }

    setIsScrapingActive(false)
  }

  const handleStopScraping = () => {
    setIsScrapingActive(false)
  }

  const handleManualUpload = async () => {
    try {
      // Parse manual data and add to database
      console.log("[v0] Processing manual data:", manualData)
      // Here you would process the manual data and add it to the database
      alert("Manual data uploaded successfully!")
      setManualData("")
    } catch (error) {
      console.error("[v0] Error uploading manual data:", error)
      alert("Error uploading manual data")
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scraper" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scraper" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Web Scraper
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scraper" className="space-y-6">
          {/* Scraper Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Scraper Configuration</CardTitle>
              <CardDescription>Configure the web scraper to collect data from Purdue dining courts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dining-court">Dining Court</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="scrape-url">Target URL (Optional)</Label>
                  <Input
                    id="scrape-url"
                    placeholder="https://dining.purdue.edu/menus/..."
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {!isScrapingActive ? (
                  <Button
                    onClick={handleStartScraping}
                    disabled={!selectedDiningCourt}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Scraping
                  </Button>
                ) : (
                  <Button onClick={handleStopScraping} variant="destructive">
                    <Pause className="mr-2 h-4 w-4" />
                    Stop Scraping
                  </Button>
                )}

                <Button variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              {isScrapingActive && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Scraping Progress</span>
                    <span>{Math.round(scrapingProgress)}%</span>
                  </div>
                  <Progress value={scrapingProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Results */}
          {scrapingResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Live Scraping Results</CardTitle>
                <CardDescription>Real-time results from the dining court scraper</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scrapingResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {result.status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {result.status === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
                        {result.status === "pending" && (
                          <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        )}

                        <div>
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-gray-500">
                            {result.diningCourt} • {result.mealType}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{result.calories} cal</Badge>
                        <Badge variant="outline">{result.protein}g protein</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manual Data Entry</CardTitle>
              <CardDescription>Manually add food items and nutritional data to the database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manual-data">Food Data (JSON Format)</Label>
                <Textarea
                  id="manual-data"
                  placeholder={`{
  "name": "Grilled Chicken Breast",
  "diningCourt": "Wiley Dining Court",
  "mealType": "lunch",
  "calories": 230,
  "protein": 43,
  "carbs": 0,
  "fat": 5,
  "fiber": 0,
  "sodium": 70
}`}
                  value={manualData}
                  onChange={(e) => setManualData(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button onClick={handleManualUpload} disabled={!manualData.trim()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Data
                </Button>

                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Ensure your JSON data follows the correct format. Invalid data will be rejected.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scraping Summary</CardTitle>
              <CardDescription>Overview of all scraped data and database status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {scrapingResults.filter((r) => r.status === "success").length}
                  </div>
                  <div className="text-sm text-gray-600">Items Scraped</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {scrapingResults.filter((r) => r.status === "error").length}
                  </div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{diningCourts.length}</div>
                  <div className="text-sm text-gray-600">Dining Courts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
