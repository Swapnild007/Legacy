"use client";

import { useState } from "react";

type ResultImage = { b64_json?: string; url?: string; revised_prompt?: string };

const presets = [
  { label: "Photorealistic portrait", prompt: "Create a photorealistic editorial portrait of an adult subject, natural skin texture, believable anatomy, soft directional studio lighting, realistic lens depth, refined color grading, no plastic skin." },
  { label: "Cinematic fashion", prompt: "Create a premium fashion editorial photograph of an adult model, expressive pose, tailored contemporary styling, cinematic studio lighting, authentic fabric texture, realistic proportions, sophisticated art direction." },
  { label: "Devotional poster", prompt: "Create a premium devotional poster with respectful traditional iconography, intricate craftsmanship, cinematic lighting, rich but balanced colors, realistic architectural and material details, polished professional composition." },
  { label: "Product photography", prompt: "Create a high-end commercial product photograph, clean studio setup, physically plausible reflections and shadows, accurate materials, crisp focus, premium advertising art direction." },
];

export default function ImageStudioPage() {
  const [prompt, setPrompt] = useState(presets[0].prompt);
  const [size, setSize] = useState("1024x1536");
  const [quality, setQuality] = useState("medium");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState<ResultImage | null>(null);

  async function generate() {
    if (!prompt.trim() || busy) return;
    setBusy(true); setError(""); setImage(null);
    try {
      const response = await fetch("/api/image-studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), size, quality })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image generation failed.");
      setImage(data.image); setModel(data.model || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image generation failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const imageSrc = image?.b64_json ? `data:image/png;base64,${image.b64_json}` : image?.url;

  return (
    <main style={{ minHeight: "100vh", background: "#0b0d12", color: "#f4f5f7", padding: "32px 18px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a5b4fc", textDecoration: "none" }}>← Back to Legacy</a>
        <header style={{ margin: "28px 0 24px" }}>
          <p style={{ color: "#a5b4fc", letterSpacing: 2, fontSize: 12, fontWeight: 700 }}>LEGACY CREATIVE TOOLS</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "8px 0" }}>Image Studio</h1>
          <p style={{ color: "#a9afbd", lineHeight: 1.6, maxWidth: 680 }}>Generate images with a configurable provider. Shape the prompt, choose a format and quality, then refine the brief and run another version.</p>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 20, alignItems: "start" }}>
          <div style={{ background: "#141821", border: "1px solid #292f3b", borderRadius: 18, padding: 20 }}>
            <label htmlFor="prompt" style={{ display: "block", fontWeight: 700, marginBottom: 10 }}>Describe your image</label>
            <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={8000} rows={9} placeholder="Describe subject, setting, framing, lighting, materials and mood…" style={{ boxSizing: "border-box", width: "100%", resize: "vertical", borderRadius: 12, border: "1px solid #343b49", background: "#0c0f15", color: "#f4f5f7", padding: 14, lineHeight: 1.6, font: "inherit" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#929aaa", fontSize: 12, marginTop: 6 }}><span>Be specific about composition and lighting</span><span>{prompt.length}/8000</span></div>

            <p style={{ fontWeight: 700, margin: "22px 0 10px" }}>Start with a preset</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {presets.map(p => <button key={p.label} type="button" onClick={() => setPrompt(p.prompt)} style={{ border: "1px solid #363e4d", background: "#1b202b", color: "#e6e9ef", borderRadius: 999, padding: "9px 12px", cursor: "pointer" }}>{p.label}</button>)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 22 }}>
              <label style={{ fontSize: 13, color: "#b7bdc9" }}>Format
                <select value={size} onChange={e => setSize(e.target.value)} style={{ display: "block", marginTop: 7, width: "100%", padding: 11, background: "#0c0f15", color: "white", border: "1px solid #343b49", borderRadius: 10 }}>
                  <option value="1024x1024">Square</option><option value="1536x1024">Landscape</option><option value="1024x1536">Portrait</option>
                </select>
              </label>
              <label style={{ fontSize: 13, color: "#b7bdc9" }}>Quality
                <select value={quality} onChange={e => setQuality(e.target.value)} style={{ display: "block", marginTop: 7, width: "100%", padding: 11, background: "#0c0f15", color: "white", border: "1px solid #343b49", borderRadius: 10 }}>
                  <option value="low">Low · faster</option><option value="medium">Medium</option><option value="high">High · detailed</option>
                </select>
              </label>
            </div>

            <button type="button" onClick={generate} disabled={busy || !prompt.trim()} style={{ width: "100%", marginTop: 20, padding: 14, border: 0, borderRadius: 12, background: busy ? "#454b59" : "#818cf8", color: "#0b0d12", fontWeight: 800, fontSize: 15, cursor: busy ? "wait" : "pointer" }}>{busy ? "Generating image…" : "Generate image"}</button>
            <p style={{ color: "#8e96a6", fontSize: 12, lineHeight: 1.5, marginBottom: 0 }}>Generation requires a configured server-side provider key. Provider content policies apply.</p>
          </div>

          <div style={{ background: "#141821", border: "1px solid #292f3b", borderRadius: 18, padding: 20, minHeight: 420 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}><h2 style={{ margin: 0, fontSize: 18 }}>Your result</h2>{model && <span style={{ color: "#a5b4fc", fontSize: 12 }}>{model}</span>}</div>
            {busy ? <div role="status" style={{ minHeight: 340, display: "grid", placeItems: "center", color: "#c5cad5", textAlign: "center" }}><div><div style={{ fontSize: 32, marginBottom: 12 }}>✳</div>Creating your image…<p style={{ color: "#8e96a6", fontSize: 13 }}>This can take a little while.</p></div></div>
              : imageSrc ? <div style={{ marginTop: 18 }}><img src={imageSrc} alt={image?.revised_prompt || prompt} style={{ display: "block", width: "100%", maxHeight: 680, objectFit: "contain", borderRadius: 12, background: "#0c0f15" }} />{image?.revised_prompt && <p style={{ color: "#a9afbd", fontSize: 13, lineHeight: 1.5 }}>{image.revised_prompt}</p>}<a href={imageSrc} download="legacy-image.png" style={{ display: "inline-block", marginTop: 8, padding: "10px 14px", borderRadius: 10, background: "#252b38", color: "#fff", textDecoration: "none" }}>Open / save image</a></div>
              : <div style={{ minHeight: 340, display: "grid", placeItems: "center", color: "#8e96a6", textAlign: "center", lineHeight: 1.6 }}><div><div style={{ fontSize: 42, marginBottom: 12 }}>▧</div>Your generated image will appear here.<br />Choose a preset or write your own prompt.</div></div>}
            {error && <div role="alert" style={{ marginTop: 16, padding: 13, background: "#351c23", border: "1px solid #743743", color: "#ffc6cf", borderRadius: 10, lineHeight: 1.5 }}>{error}</div>}
          </div>
        </section>
        <footer style={{ color: "#747d8d", fontSize: 12, marginTop: 24 }}>Legacy Image Studio · Preview feature · Results depend on the configured provider and model.</footer>
      </div>
    </main>
  );
}
