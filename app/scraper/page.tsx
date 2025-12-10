import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Database, Globe, RefreshCw } from "lucide-react"
import Link from "next/link"
import { ScraperInterface } from "@/components/scraper-interface"

export default function ScraperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </Link>
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Dining Data Scraper</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Data Collection
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Purdue Dining Court Data Collection</h2>
            <p className="text-gray-600 text-lg mb-6">
              Scrape the latest menu information and nutritional data from Purdue dining courts to keep our meal
              optimization engine up to date.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <Globe className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Web Scraping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Automatically fetch menu data from official Purdue dining websites
                  </p>
                </CardContent>
              </Card>

              <Card className="border-indigo-200">
                <CardHeader className="pb-3">
                  <RefreshCw className="h-6 w-6 text-indigo-600 mb-2" />
                  <CardTitle className="text-lg">Real-time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Keep nutritional data current with daily menu changes</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <Database className="h-6 w-6 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Database Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Seamlessly populate our meal optimization database</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Scraper Interface */}
          <ScraperInterface />
        </div>
      </div>
    </div>
  )
}
