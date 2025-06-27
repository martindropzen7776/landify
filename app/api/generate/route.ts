import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json()

    if (!prompt || !userId) {
      return NextResponse.json({ error: "Prompt and userId are required" }, { status: 400 })
    }

    // Verify user exists
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId)
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const systemPrompt = `You are an expert web developer and designer. Create a complete, modern, and responsive HTML landing page based on the user's prompt. 

Requirements:
- Generate complete HTML with embedded CSS (no external dependencies)
- Use modern CSS with flexbox/grid for responsive design
- Include proper semantic HTML structure
- Use a professional color scheme that matches the content
- Add smooth animations and hover effects
- Make it mobile-responsive
- Include proper meta tags and structure
- Use modern typography and spacing
- Add call-to-action buttons and sections as appropriate
- Ensure the design is clean, professional, and conversion-focused

Return ONLY the complete HTML code without any explanations or markdown formatting.`

    const { text: htmlContent } = await generateText({
      model: groq("llama3-70b-8192"),
      system: systemPrompt,
      prompt: `Create a landing page for: ${prompt}`,
      maxTokens: 4000,
    })

    return NextResponse.json({ html: htmlContent })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json({ error: "Failed to generate landing page" }, { status: 500 })
  }
}
