import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { calories, mealType, dietaryRestrictions, preferences, cookingTime, servings } = body

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    console.log("[v0] Google Gemini API Key exists:", !!apiKey)
    console.log("[v0] Google Gemini API Key length:", apiKey?.length || 0)

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API key not configured. Please add your GOOGLE_GEMINI_API_KEY to the environment variables.",
          instructions: "Get your API key from https://aistudio.google.com/app/apikey",
        },
        { status: 500 },
      )
    }

    const prompt = `Create a diabetes-friendly ${mealType} recipe with the following requirements:
- Target calories: ${calories} per serving
- Servings: ${servings}
- Maximum cooking time: ${cookingTime} minutes
- Dietary restrictions: ${dietaryRestrictions.join(", ") || "None"}
- Additional preferences: ${preferences || "None"}

Please provide a detailed recipe in JSON format with the following structure:
{
  "title": "Recipe name",
  "description": "Brief description",
  "prepTime": "X minutes",
  "cookTime": "X minutes", 
  "servings": "${servings}",
  "calories": "X per serving",
  "carbs": "Xg",
  "protein": "Xg", 
  "fat": "Xg",
  "fiber": "Xg",
  "glycemicIndex": "Low/Medium/High",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["step 1", "step 2", ...],
  "nutritionNotes": ["benefit 1", "benefit 2", ...]
}

Focus on diabetes-friendly ingredients with low glycemic index, high fiber, and balanced macronutrients.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a professional nutritionist and chef specializing in diabetes-friendly recipes. Always respond with valid JSON format only, no additional text.\n\n${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
            responseMimeType: "application/json",
          },
        }),
      },
    )

    console.log("[v0] Google Gemini API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Google Gemini API error response:", errorText)

      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          {
            error: "Authentication failed. Your Google Gemini API key is invalid or expired.",
            instructions:
              "Please verify your API key at https://aistudio.google.com/app/apikey and ensure it's correctly set in your environment variables.",
            details: errorText,
          },
          { status: 401 },
        )
      }

      throw new Error(`Google Gemini API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("[v0] Google Gemini API response received successfully")

    const recipeText = data.candidates[0].content.parts[0].text

    let recipe
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = recipeText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        recipe = JSON.parse(jsonMatch[0])
      } else {
        recipe = JSON.parse(recipeText)
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse recipe JSON:", parseError)
      // Fallback to a structured response if JSON parsing fails
      recipe = {
        title: "Custom Diabetes-Friendly Recipe",
        description: "A personalized recipe created based on your preferences",
        prepTime: "15 minutes",
        cookTime: cookingTime || "20 minutes",
        servings: servings,
        calories: `${calories} per serving`,
        carbs: "30g",
        protein: "20g",
        fat: "10g",
        fiber: "8g",
        glycemicIndex: "Low",
        ingredients: ["Please check the raw response for ingredients"],
        instructions: ["Please check the raw response for instructions"],
        nutritionNotes: ["Diabetes-friendly recipe", "Balanced macronutrients"],
        rawResponse: recipeText,
      }
    }

    return NextResponse.json({ recipe })
  } catch (error) {
    console.error("[v0] Recipe generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate recipe. Please check your API key and try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
