import { NextResponse } from "next/server";
import { generateImage, type ImageQuality, type ImageSize } from "@/lib/image-studio/provider";

export const runtime = "nodejs";
export const maxDuration = 150;

const ALLOWED_SIZES: ImageSize[] = ["1024x1024", "1536x1024", "1024x1536"];
const ALLOWED_QUALITIES: ImageQuality[] = ["low", "medium", "high"];
const MAX_PROMPT_LENGTH = 8_000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "A JSON request is required." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const prompt = typeof input.prompt === "string" ? input.prompt.trim() : "";
  const size = input.size;
  const quality = input.quality ?? "medium";

  if (!prompt) return NextResponse.json({ error: "Enter an image prompt." }, { status: 400 });
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json({ error: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.` }, { status: 400 });
  }
  if (typeof size !== "string" || !ALLOWED_SIZES.includes(size as ImageSize)) {
    return NextResponse.json({ error: "Choose a supported image size." }, { status: 400 });
  }
  if (typeof quality !== "string" || !ALLOWED_QUALITIES.includes(quality as ImageQuality)) {
    return NextResponse.json({ error: "Choose low, medium, or high quality." }, { status: 400 });
  }

  try {
    const image = await generateImage({
      prompt,
      size: size as ImageSize,
      quality: quality as ImageQuality
    });
    return NextResponse.json({ image, model: process.env.IMAGE_GENERATION_MODEL || "gpt-image-1" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image generation failed.";
    const status = message.includes("not configured") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
