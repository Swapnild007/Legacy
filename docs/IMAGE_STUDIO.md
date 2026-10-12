# Legacy Image Studio: foundation

## Scope

This change introduces a server-side text-to-image API boundary without replacing Legacy's existing interface or orchestration. The initial adapter targets the OpenAI Images API; the provider contract is intentionally isolated so additional permitted providers can be added later.

## Endpoint

`POST /api/image-studio/generate`

Example request:

```json
{
  "prompt": "A photorealistic editorial portrait with natural window light and realistic skin texture",
  "size": "1024x1536",
  "quality": "medium"
}
```

Supported sizes: `1024x1024`, `1536x1024`, `1024x1536`. Supported quality values: `low`, `medium`, `high`.

Successful responses include an `image` object containing provider-returned image data and the configured model name. Errors use a JSON `error` field.

## Server configuration

Set `OPENAI_API_KEY` in the server-side environment. Optionally set `IMAGE_GENERATION_MODEL`; it defaults to `gpt-image-1`. Never expose either variable through a `NEXT_PUBLIC_*` variable or client-side code.

## Important boundaries

- This foundation generates images from text prompts. Reference-image editing, job history, storage, moderation handling, and a UI are separate follow-up work.
- Provider content policies still apply. This integration does not bypass or disable provider safeguards.
- Configure request rate limits and authentication at the application or deployment layer before exposing this endpoint publicly.
- Image responses can be large. Production deployments should consider private object storage and return short-lived URLs instead of retaining base64 data in application state.
- The route validates request shape and bounds input size; it is not a substitute for deployment-level abuse prevention.

## Acceptance checks

1. Missing API key returns a clear configuration error.
2. Invalid JSON, blank prompts, oversized prompts, unsupported sizes, and unsupported quality values are rejected.
3. Provider failures return a structured error without exposing credentials.
4. Valid requests use server-side credentials and return the generated image payload.
