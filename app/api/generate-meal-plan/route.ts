import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dailyCalories, dietaryRestrictions, preferences, days = 7 } = body

    const prompt = `Create a ${days}-day diabetes-friendly meal plan with the following requirements:
- Daily calorie target: ${dailyCalories} calories
- Dietary restrictions: ${dietaryRestrictions.join(", ") || "None"}
- Additional preferences: ${preferences || "None"}

Please provide a detailed meal plan in JSON format with the following structure:
{
  "totalDays": ${days},
  "dailyCalories": "${dailyCalories}",
  "plan": [
    {
      "day": 1,
      "date": "Day 1",
      "meals": {
        "breakfast": {
          "name": "Recipe name",
          "calories": 300,
          "carbs": "25g",
          "protein": "15g",
          "description": "Brief description"
        },
        "lunch": { ... },
        "dinner": { ... },
        "snack": { ... }
      },
      "totalCalories": 1500,
      "notes": "Any special notes for the day"
    },
    ...
  ],
  "shoppingList": ["ingredient 1", "ingredient 2", ...],
  "nutritionSummary": {
    "avgDailyCalories": 1500,
    "avgCarbs": "150g",
    "avgProtein": "80g",
    "avgFiber": "30g"
  }
}

Focus on variety, balanced nutrition, and diabetes-friendly ingredients with low glycemic index.`

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are a professional nutritionist specializing in diabetes meal planning. Always respond with valid JSON format.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const mealPlanText = data.choices[0].message.content

    let mealPlan
    try {
      const jsonMatch = mealPlanText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        mealPlan = JSON.parse(jsonMatch[0])
      } else {
        mealPlan = JSON.parse(mealPlanText)
      }
    } catch (parseError) {
      console.error("Failed to parse meal plan JSON:", parseError)
      return NextResponse.json({ error: "Failed to parse meal plan. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ mealPlan })
  } catch (error) {
    console.error("Meal plan generation error:", error)
    return NextResponse.json({ error: "Failed to generate meal plan. Please try again." }, { status: 500 })
  }
}
