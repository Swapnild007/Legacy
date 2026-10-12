export type ImageSize = "1024x1024" | "1536x1024" | "1024x1536";
export type ImageQuality = "low" | "medium" | "high";

export interface GenerateImageInput {
  prompt: string;
  size: ImageSize;
  quality: ImageQuality;
}

export interface GeneratedImage {
  b64_json?: string;
  url?: string;
  revised_prompt?: string;
}

interface OpenAIImageResponse {
  data?: Array<{
    b64_json?: string;
    url?: string;
    revised_prompt?: string;
  }>;
  error?: { message?: string };
}

/**
 * Provider boundary for Legacy Image Studio.
 * Credentials stay server-side; the browser must never receive API keys.
 */
export async function generateImage(input: GenerateImageInput): Promise<GeneratedImage> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Image generation is not configured. Set OPENAI_API_KEY in the server environment.");
  }

  const model = process.env.IMAGE_GENERATION_MODEL || "gpt-image-1";
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      prompt: input.prompt,
      size: input.size,
      quality: input.quality,
      n: 1
    }),
    signal: AbortSignal.timeout(120_000)
  });

  const payload = await response.json().catch(() => ({})) as OpenAIImageResponse;
  if (!response.ok) {
    throw new Error(payload.error?.message || `Image provider request failed (HTTP ${response.status}).`);
  }

  const image = payload.data?.[0];
  if (!image || (!image.b64_json && !image.url)) {
    throw new Error("The image provider returned no usable image.");
  }
  return image;
}
