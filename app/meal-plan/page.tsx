"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Calendar, ChefHat, Plus, Clock, ArrowLeft, ArrowRight, Loader2, Zap } from "lucide-react"
import Link from "next/link"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]

const sampleMeals = {
  Monday: {
    Breakfast: { name: "Greek Yogurt Parfait", calories: 280, time: "10 min" },
    Lunch: { name: "Mediterranean Quinoa Bowl", calories: 420, time: "15 min" },
    Dinner: { name: "Grilled Salmon with Vegetables", calories: 380, time: "25 min" },
    Snack: { name: "Apple with Almond Butter", calories: 150, time: "2 min" },
  },
  Tuesday: {
    Breakfast: { name: "Vegetable Omelet", calories: 320, time: "12 min" },
    Lunch: { name: "Lentil and Vegetable Curry", calories: 350, time: "20 min" },
    Dinner: { name: "Herb-Crusted Chicken Breast", calories: 400, time: "30 min" },
    Snack: { name: "Mixed Nuts", calories: 180, time: "1 min" },
  },
  Wednesday: {
    Breakfast: { name: "Overnight Oats with Berries", calories: 290, time: "5 min" },
    Lunch: { name: "Turkey and Avocado Wrap", calories: 380, time: "8 min" },
    Dinner: { name: "Vegetable Stir-fry with Tofu", calories: 360, time: "18 min" },
    Snack: { name: "Carrot Sticks with Hummus", calories: 120, time: "3 min" },
  },
}

export default function MealPlanPage() {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [generatedMealPlan, setGeneratedMealPlan] = useState<any>(null)
  const [showPlanDialog, setShowPlanDialog] = useState(false)
  const [planFormData, setPlanFormData] = useState({
    dailyCalories: "",
    dietaryRestrictions: [] as string[],
    preferences: "",
    days: "7",
  })

  const handleDietaryRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setPlanFormData((prev) => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, restriction],
      }))
    } else {
      setPlanFormData((prev) => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter((r) => r !== restriction),
      }))
    }
  }

  const handleGenerateMealPlan = async () => {
    setIsGeneratingPlan(true)

    try {
      const response = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate meal plan")
      }

      const data = await response.json()
      setGeneratedMealPlan(data.mealPlan)
    } catch (error) {
      console.error("Error generating meal plan:", error)
      alert("Failed to generate meal plan. Please check your API key and try again.")
    } finally {
      setIsGeneratingPlan(false)
    }
  }

  const getCurrentWeekDates = () => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7))
    return daysOfWeek.map((day, index) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + index)
      return {
        day,
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }
    })
  }

  const weekDates = getCurrentWeekDates()
  const selectedDayMeals = sampleMeals[selectedDay as keyof typeof sampleMeals] || {}

  const getTotalCalories = (dayMeals: any) => {
    return Object.values(dayMeals).reduce((total: number, meal: any) => total + meal.calories, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-serif font-semibold">Diacare</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Generate AI Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Generate AI Meal Plan</DialogTitle>
                  <DialogDescription>
                    Create a personalized weekly meal plan based on your preferences
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dailyCalories">Daily Calorie Target</Label>
                    <Input
                      id="dailyCalories"
                      placeholder="e.g., 1800"
                      value={planFormData.dailyCalories}
                      onChange={(e) => setPlanFormData((prev) => ({ ...prev, dailyCalories: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Dietary Restrictions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Low-carb", "Keto"].map((restriction) => (
                        <div key={restriction} className="flex items-center space-x-2">
                          <Checkbox
                            id={restriction}
                            checked={planFormData.dietaryRestrictions.includes(restriction)}
                            onCheckedChange={(checked) =>
                              handleDietaryRestrictionChange(restriction, checked as boolean)
                            }
                          />
                          <Label htmlFor={restriction} className="text-xs">
                            {restriction}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferences">Additional Preferences</Label>
                    <Textarea
                      id="preferences"
                      placeholder="Any foods you love or want to avoid?"
                      value={planFormData.preferences}
                      onChange={(e) => setPlanFormData((prev) => ({ ...prev, preferences: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <Button
                    onClick={handleGenerateMealPlan}
                    disabled={isGeneratingPlan || !planFormData.dailyCalories}
                    className="w-full"
                  >
                    {isGeneratingPlan ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Plan
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              Meal Plan
            </h1>
            <p className="text-muted-foreground text-lg">Plan your diabetes-friendly meals for the week ahead.</p>
          </div>

          {generatedMealPlan && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Generated Meal Plan
                </CardTitle>
                <CardDescription>
                  {generatedMealPlan.totalDays}-day plan • {generatedMealPlan.dailyCalories} calories/day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {generatedMealPlan.plan?.slice(0, 3).map((day: any, index: number) => (
                    <div key={index} className="bg-background rounded-lg p-4 border">
                      <h4 className="font-semibold mb-2">{day.date || `Day ${day.day}`}</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(day.meals).map(([mealType, meal]: [string, any]) => (
                          <div key={mealType} className="flex justify-between">
                            <span className="capitalize">{mealType}:</span>
                            <span className="text-muted-foreground">{meal.calories} cal</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t text-sm font-medium">Total: {day.totalCalories} calories</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Apply to Calendar</Button>
                  <Button variant="outline" size="sm">
                    View Full Plan
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setGeneratedMealPlan(null)}>
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Week Navigation */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Overview</CardTitle>
                  <CardDescription>
                    {currentWeek === 0
                      ? "This Week"
                      : currentWeek > 0
                        ? `${currentWeek} week${currentWeek > 1 ? "s" : ""} ahead`
                        : `${Math.abs(currentWeek)} week${Math.abs(currentWeek) > 1 ? "s" : ""} ago`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentWeek((prev) => prev - 1)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentWeek(0)}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentWeek((prev) => prev + 1)}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDates.map(({ day, date }) => {
                  const dayMeals = sampleMeals[day as keyof typeof sampleMeals] || {}
                  const totalCalories = getTotalCalories(dayMeals)
                  const isSelected = selectedDay === day

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        isSelected ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="font-medium text-sm">{day.slice(0, 3)}</div>
                      <div className="text-xs text-muted-foreground mb-2">{date}</div>
                      <div className="text-xs">
                        <div className="font-medium">{Object.keys(dayMeals).length} meals</div>
                        <div className="text-muted-foreground">{totalCalories} cal</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daily Meal Plan */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedDay} Meal Plan</span>
                    <Badge variant="secondary">{getTotalCalories(selectedDayMeals)} calories</Badge>
                  </CardTitle>
                  <CardDescription>Your planned meals for {selectedDay.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mealTypes.map((mealType) => {
                    const meal = selectedDayMeals[mealType]

                    return (
                      <div key={mealType} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg">{mealType}</h4>
                          {meal ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {meal.time}
                            </div>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>

                        {meal ? (
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">{meal.name}</h5>
                              <p className="text-sm text-muted-foreground">{meal.calories} calories</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm">
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <ChefHat className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No meal planned</p>
                            <Button variant="link" size="sm" className="mt-2">
                              Browse recipes
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Daily Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Calories</span>
                    <Badge variant="secondary">{getTotalCalories(selectedDayMeals)}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Meals Planned</span>
                    <Badge variant="outline">{Object.keys(selectedDayMeals).length}/4</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prep Time</span>
                    <span className="text-sm text-muted-foreground">
                      {Object.values(selectedDayMeals).reduce((total: number, meal: any) => {
                        const time = Number.parseInt(meal.time.split(" ")[0])
                        return total + time
                      }, 0)}{" "}
                      min
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/recipes/generate">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate AI Recipe
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Copy from Yesterday
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Browse Recipe Library
                  </Button>
                </CardContent>
              </Card>

              {/* Weekly Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Meals Planned</span>
                      <span className="text-muted-foreground">12/28</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "43%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Avg Daily Calories</span>
                      <span className="text-muted-foreground">1,850 / 2,200</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "84%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Recipe Variety</span>
                      <span className="text-muted-foreground">8 unique</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Good variety
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Nutrition Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Try to include a source of protein and fiber in each meal to help maintain stable blood sugar levels
                    throughout the day.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
