import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
 const provider = process.env.OPENROUTER_API_KEY ? "OpenRouter" : process.env.GROQ_API_KEY ? "Groq" : process.env.GEMINI_API_KEY ? "Gemini" : null;
 const model = provider === "OpenRouter" ? process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini" : provider === "Groq" ? process.env.GROQ_MODEL || "llama-3.3-70b-versatile" : provider === "Gemini" ? process.env.GEMINI_MODEL || "gemini-2.5-flash" : undefined;
 return NextResponse.json({ready:Boolean(provider),provider:provider??undefined,model,...(provider?{}:{error:"No supported provider key is configured on the server."})},{headers:{"Cache-Control":"no-store"}});
}
