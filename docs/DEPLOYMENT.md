# Legacy deployment and AI provider setup

## Required Vercel environment variables

Add at least one provider key to the **Legacy Vercel project** under Settings → Environment Variables, targeting Production (and Preview/Development if required).

Supported keys, in preference order:

1. `OPENROUTER_API_KEY` (optional model override: `OPENROUTER_MODEL`, default `openai/gpt-4o-mini`)
2. `GROQ_API_KEY` (optional model override: `GROQ_MODEL`, default `llama-3.3-70b-versatile`)
3. `GEMINI_API_KEY` (optional model override: `GEMINI_MODEL`, default `gemini-2.5-flash`)

The first configured provider in that order is selected. Keys are read only by server-side route handlers and must never use a `NEXT_PUBLIC_` prefix. Add keys directly to Legacy's own Vercel project; do not copy configuration from another product.

After saving environment variables, redeploy the Production deployment so the runtime receives them.

## API endpoints

- `GET /api/status`: returns provider readiness and the configured model name, never the secret.
- `POST /api/chat`: accepts `{ "messages": [{ "role": "user" | "assistant", "content": "..." }] }` and returns the generated answer, internal specialist routing metadata, provider, and model.

## Agent runtime behavior

- A single specialist executes one model request.
- Multi-specialist tasks execute bounded specialist calls concurrently, then invoke a synthesis/verification pass.
- The current runtime uses prompt-specialized model calls. It does not yet provide general browser access, arbitrary code execution, connected document search, persistent memory, or external action tools. Specialist labels must not be interpreted as proof those integrations exist.
- High-impact real-world actions require actual tool adapters, authorization enforcement, and approval flows before they can be executed.

## Verification checklist

1. Confirm the latest GitHub commit has a successful Vercel Production deployment.
2. Open `/api/status`; verify `ready: true` and a provider/model are present.
3. Send a simple chat request through the UI.
4. Test a multi-capability request and verify multiple specialists are listed.
5. Check Vercel runtime logs for provider errors, timeout behavior, and unexpected secrets (secrets must never be logged).
6. Run `npm run typecheck` and `npm test` in CI.
