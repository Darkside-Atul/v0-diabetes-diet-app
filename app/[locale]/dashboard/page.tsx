"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, ChefHat, Calendar, TrendingUp, Target, Clock, Plus, BookOpen, Activity } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function DashboardPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Diacare</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-primary font-medium">
              {t("common.features")}
            </Link>
            <Link href="/recipes" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("dashboard.browseRecipes")}
            </Link>
            <Link href="/meal-plan" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("dashboard.planMeals")}
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              J
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">{t("dashboard.welcome")}</h1>
          <p className="text-muted-foreground text-lg">Here's your health overview for today. You're doing great!</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/recipes/generate">
            <Button size="lg" className="h-16 text-left justify-start gap-3 w-full">
              <Plus className="h-5 w-5" />
              <div>
                <div className="font-semibold">{t("dashboard.generateRecipe")}</div>
                <div className="text-sm opacity-90">Get AI-powered suggestions</div>
              </div>
            </Button>
          </Link>

          <Link href="/meal-plan">
            <Button variant="outline" size="lg" className="h-16 text-left justify-start gap-3 bg-transparent w-full">
              <Calendar className="h-5 w-5" />
              <div>
                <div className="font-semibold">{t("dashboard.planMeals")}</div>
                <div className="text-sm text-muted-foreground">Schedule your week</div>
              </div>
            </Button>
          </Link>

          <Link href="/recipes">
            <Button variant="outline" size="lg" className="h-16 text-left justify-start gap-3 bg-transparent w-full">
              <BookOpen className="h-5 w-5" />
              <div>
                <div className="font-semibold">{t("dashboard.browseRecipes")}</div>
                <div className="text-sm text-muted-foreground">Browse saved recipes</div>
              </div>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Today's Overview
                </CardTitle>
                <CardDescription>Your daily nutrition and health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">1,847</div>
                    <div className="text-sm text-muted-foreground mb-2">{t("dashboard.calories")} consumed</div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">75% of daily goal</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">142</div>
                    <div className="text-sm text-muted-foreground mb-2">Avg {t("dashboard.bloodSugar")}</div>
                    <Badge variant="secondary" className="text-xs">
                      Normal range
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">3/3</div>
                    <div className="text-sm text-muted-foreground mb-2">Meals logged</div>
                    <Badge variant="outline" className="text-xs">
                      Complete
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Recipes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  {t("dashboard.recentActivity")}
                </CardTitle>
                <CardDescription>Your latest AI-generated meal suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <ChefHat className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Mediterranean Quinoa Bowl</h4>
                      <p className="text-sm text-muted-foreground">
                        Vegetarian • 420 {t("dashboard.calories")} • Low glycemic
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          High Protein
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Diabetes-friendly
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Recipe
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <ChefHat className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Grilled Salmon with Vegetables</h4>
                      <p className="text-sm text-muted-foreground">
                        Pescatarian • 380 {t("dashboard.calories")} • Heart-healthy
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Omega-3 Rich
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Low {t("dashboard.carbs")}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Recipe
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <ChefHat className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Lentil and Vegetable Curry</h4>
                      <p className="text-sm text-muted-foreground">
                        Vegan • 350 {t("dashboard.calories")} • High fiber
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Plant-based
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Gluten-free
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Recipe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {t("dashboard.healthMetrics")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily {t("dashboard.calories")}</span>
                    <span className="text-muted-foreground">1,847 / 2,200</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Protein Intake</span>
                    <span className="text-muted-foreground">85g / 120g</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fiber Goal</span>
                    <span className="text-muted-foreground">28g / 35g</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recipes Generated</span>
                    <Badge variant="secondary">12 this week</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meals Logged</span>
                    <Badge variant="secondary">18/21</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Goal Achievement</span>
                    <Badge variant="secondary">85%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Lunch</div>
                      <div className="text-xs text-muted-foreground">Mediterranean Bowl</div>
                    </div>
                    <div className="text-xs text-muted-foreground">12:30 PM</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Dinner</div>
                      <div className="text-xs text-muted-foreground">Grilled Salmon</div>
                    </div>
                    <div className="text-xs text-muted-foreground">7:00 PM</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Snack</div>
                      <div className="text-xs text-muted-foreground">Greek Yogurt</div>
                    </div>
                    <div className="text-xs text-muted-foreground">3:00 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
