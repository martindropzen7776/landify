import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
})

const TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
  <style>
    *{max-width:unset;}
    @media (max-width: 576px){
      #is6i{padding-top:0px;}
      #iwi9{padding-top:17px;}
    }
    body { font-family: Roboto, sans-serif; margin: 0; padding: 0; }
    .ll-container { text-align: center; padding: 20px; }
    .ll-default-heading { font-weight: 700; font-size: 1.5em; margin: 20px 0; }
    .ll-image { width: 100px; margin: 0 auto; }
    .ll-empty-block { text-decoration: none; background: #5A27F3; padding: 15px; border-radius: 10px; color: white; display: inline-block; margin-top: 20px; }
  </style>
</head>
<body>
  <section id="iwi9">
    <div id="is6i" class="ll-container">
      <img id="is9j" src="https://staticlanderlab.com/variants/unpublished/92ad56ab29e347d1779a07879d38c67a/87597143-0535-49f1-feb9-19b2614d4d00.webp" alt="Logo" class="ll-image">
      <h1 id="i59yi" class="ll-default-heading">ENVIANOS MENSAJE PARA CREAR TU USUARIO – DUPLICAMOS TU CARGA</h1>
      <h1 id="iwany" class="ll-default-heading">$1,000,000.00</h1>
      <a id="irjot" href="https://wa.me/5491112345678?text=Hola,%20quiero%20duplicar%20mi%20carga" class="ll-empty-block">QUIERO DUPLICAR MI CARGA</a>
      <!-- LOTTIE_ANIMATION_PLACEHOLDER -->
    </div>
  </section>
</body>
</html>`

const systemPrompt = `
You are an expert frontend developer. Use the following landing page HTML as a strict template.
When generating new landing pages, only change text content, images, links, or headings based on the user's prompt.
Do NOT invent new structure or layout.
Keep all styling, fonts, responsiveness, and structure identical to this template.

If the user asks for an animation, you MUST add the following block inside the \`<!-- LOTTIE_ANIMATION_PLACEHOLDER -->\` comment.
Find a suitable Lottie animation JSON URL from a public source like lottie.host.

<div id="lottie-animation" style="width: 100%; max-width: 400px; height: 300px; margin: 20px auto 0;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"><\/script>
<script>
  try {
    lottie.loadAnimation({
      container: document.getElementById('lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'YOUR_LOTTIE_JSON_URL' // Replace this with the actual Lottie JSON URL
    });
  } catch (e) {
    console.error('Lottie Error:', e);
    var container = document.getElementById('lottie-animation');
    if(container) container.innerHTML = 'Error loading animation.';
  }
<\/script>

If the user does not ask for an animation, leave the placeholder comment empty.

TEMPLATE:
${TEMPLATE}

Return only valid, production-ready HTML. No explanations or markdown.`

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json()

    if (!prompt || !userId) {
      return NextResponse.json({ error: "Prompt and userId are required" }, { status: 400 })
    }

    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId)
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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
