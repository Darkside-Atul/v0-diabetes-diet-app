"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, User, Settings, Shield, Bell, ArrowLeft, Save, Camera } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    age: "45",
    weight: "180",
    height: "5'10\"",
    activityLevel: "moderate",
    diabetesType: "type2",
    diagnosisYear: "2018",
    targetCalories: "2200",
    dietaryRestrictions: ["vegetarian", "low-sodium"],
    allergies: "None",
    medications: "Metformin 500mg twice daily",
    healthGoals: "Maintain stable blood sugar levels and lose 15 pounds",
    emergencyContact: "Jane Smith - (555) 123-4567",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a database
    console.log("Profile saved:", profileData)
  }

  const handleDietaryRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setProfileData((prev) => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, restriction],
      }))
    } else {
      setProfileData((prev) => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter((r) => r !== restriction),
      }))
    }
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
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              Profile Settings
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your personal information and health preferences to get better recipe recommendations.
            </p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="health">Health Profile</TabsTrigger>
              <TabsTrigger value="preferences">Diet Preferences</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {isEditing && (
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={profileData.age}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, age: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input
                        id="emergency"
                        value={profileData.emergencyContact}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Profile */}
            <TabsContent value="health">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Physical Information</CardTitle>
                    <CardDescription>Your physical stats help us calculate accurate nutritional needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input
                          id="weight"
                          value={profileData.weight}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, weight: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          value={profileData.height}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, height: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="activity">Activity Level</Label>
                        <Select
                          value={profileData.activityLevel}
                          onValueChange={(value) => setProfileData((prev) => ({ ...prev, activityLevel: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="light">Light Activity</SelectItem>
                            <SelectItem value="moderate">Moderate Activity</SelectItem>
                            <SelectItem value="active">Very Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Diabetes Information</CardTitle>
                    <CardDescription>Help us understand your diabetes management needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="diabetesType">Diabetes Type</Label>
                        <Select
                          value={profileData.diabetesType}
                          onValueChange={(value) => setProfileData((prev) => ({ ...prev, diabetesType: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="type1">Type 1</SelectItem>
                            <SelectItem value="type2">Type 2</SelectItem>
                            <SelectItem value="gestational">Gestational</SelectItem>
                            <SelectItem value="prediabetes">Prediabetes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="diagnosis">Year of Diagnosis</Label>
                        <Input
                          id="diagnosis"
                          value={profileData.diagnosisYear}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, diagnosisYear: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        value={profileData.medications}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, medications: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="healthGoals">Health Goals</Label>
                      <Textarea
                        id="healthGoals"
                        value={profileData.healthGoals}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, healthGoals: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Diet Preferences */}
            <TabsContent value="preferences">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutritional Goals</CardTitle>
                    <CardDescription>Set your daily calorie and nutritional targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="targetCalories">Daily Calorie Target</Label>
                        <Input
                          id="targetCalories"
                          value={profileData.targetCalories}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, targetCalories: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-end">
                        <Badge variant="secondary" className="mb-2">
                          Calculated based on your profile
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dietary Restrictions</CardTitle>
                    <CardDescription>Select all dietary restrictions that apply to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "vegetarian",
                        "vegan",
                        "gluten-free",
                        "dairy-free",
                        "low-carb",
                        "keto",
                        "mediterranean",
                        "low-sodium",
                        "heart-healthy",
                        "kosher",
                        "halal",
                        "paleo",
                      ].map((restriction) => (
                        <div key={restriction} className="flex items-center space-x-2">
                          <Checkbox
                            id={restriction}
                            checked={profileData.dietaryRestrictions.includes(restriction)}
                            onCheckedChange={(checked) =>
                              handleDietaryRestrictionChange(restriction, checked as boolean)
                            }
                            disabled={!isEditing}
                          />
                          <Label htmlFor={restriction} className="text-sm capitalize">
                            {restriction.replace("-", " ")}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Allergies & Food Sensitivities</CardTitle>
                    <CardDescription>List any food allergies or sensitivities we should avoid</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={profileData.allergies}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, allergies: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="e.g., Nuts, Shellfish, Eggs..."
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>Manage how you receive updates and reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Meal Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when it's time for your planned meals
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Recipe Suggestions</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly AI-generated recipe recommendations
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Health Tips</Label>
                        <p className="text-sm text-muted-foreground">Get daily diabetes management tips and insights</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Progress Updates</Label>
                        <p className="text-sm text-muted-foreground">Weekly summaries of your health progress</p>
                      </div>
                      <Checkbox />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                    <CardDescription>Control your data privacy and account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymous data to improve AI recommendations
                        </p>
                      </div>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Export My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Change Password
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
