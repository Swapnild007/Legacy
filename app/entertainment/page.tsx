"use client";

import { useMemo, useState } from "react";

type Category = "All" | "Movies & Shows" | "Live TV" | "Marathi" | "Hindi" | "English" | "News" | "Devotional";
type Provider = {
  title: string; description: string; category: Exclude<Category, "All">[];
  languages: string[]; kind: "Movies & Shows" | "Live TV" | "Mixed";
  url: string; source: string; free: string; embed: false;
};

const providers: Provider[] = [
  {
    title: "WAVES by Prasar Bharati",
    description: "Public-service streaming with films, classic TV, series, cultural programmes, live television and radio.",
    category: ["Movies & Shows", "Live TV", "Marathi", "Hindi", "News", "Devotional"],
    languages: ["Hindi", "Marathi", "English", "Regional"],
    kind: "Mixed", url: "https://wavespb.com/", source: "Prasar Bharati",
    free: "Free-access catalogue; individual partner services or titles may have separate terms.", embed: false
  },
  {
    title: "Prasar Bharati Live TV",
    description: "Official directory for live news, sports, entertainment and Doordarshan regional channels.",
    category: ["Live TV", "Marathi", "Hindi", "News", "Devotional"],
    languages: ["Hindi", "Marathi", "Regional"],
    kind: "Live TV", url: "https://prasarbharati.gov.in/en/live-tv/", source: "Prasar Bharati",
    free: "Official public broadcaster streams; availability can vary by channel.", embed: false
  },
  {
    title: "YouTube",
    description: "Find official broadcaster, studio and creator channels offering full-length films, shows and live streams.",
    category: ["Movies & Shows", "Live TV", "Marathi", "Hindi", "News", "Devotional"],
    languages: ["Hindi", "Marathi", "English", "Regional"],
    kind: "Mixed", url: "https://www.youtube.com/", source: "YouTube / individual rights holders",
    free: "Choose official uploads and streams marked free; paid rentals and memberships are excluded.", embed: false
  },
  {
    title: "Plex Free Movies & TV",
    description: "Ad-supported movies, series and live channels where supported.",
    category: ["Movies & Shows", "Live TV", "Hindi", "English"],
    languages: ["English", "Some international content"],
    kind: "Mixed", url: "https://www.plex.tv/watch-free/", source: "Plex",
    free: "Free ad-supported catalogue; catalogue and geographic availability vary.", embed: false
  }
];

const filters: Category[] = ["All", "Movies & Shows", "Live TV", "Marathi", "Hindi", "News", "Devotional"];

export default function EntertainmentPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [onlyFree, setOnlyFree] = useState(true);
  const visible = useMemo(() => providers.filter(p => {
    const matchesFilter = filter === "All" || p.category.includes(filter);
    const haystack = [p.title, p.description, p.source, ...p.languages, ...p.category].join(" ").toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase().trim()) && (!onlyFree || p.free.length > 0);
  }), [filter, query, onlyFree]);

  return (
    <main style={{ minHeight: "100vh", background: "#0b0d12", color: "#f4f5f7", padding: "28px 18px 48px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a5b4fc", textDecoration: "none" }}>← Back to Legacy</a>
        <header style={{ margin: "26px 0 24px" }}>
          <p style={{ color: "#a5b4fc", letterSpacing: 2, fontSize: 12, fontWeight: 700 }}>LEGACY DISCOVER</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "8px 0" }}>Entertainment Hub</h1>
          <p style={{ color: "#a9afbd", lineHeight: 1.65, maxWidth: 760 }}>Discover free-to-access movies, shows and live channels from official services. Legacy links you to authorised playback and only embeds players when the provider explicitly permits it.</p>
        </header>

        <section aria-label="Featured provider" style={{ border: "1px solid #37334f", borderRadius: 20, padding: "22px 24px", background: "linear-gradient(120deg, #191b2a, #11151e)", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div aria-hidden="true" style={{ width: 58, height: 58, borderRadius: 16, background: "#292544", display: "grid", placeItems: "center", fontSize: 28 }}>▶</div>
            <div style={{ flex: "1 1 240px" }}>
              <span style={{ color: "#c4b5fd", fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>FEATURED · INDIA</span>
              <h2 style={{ margin: "7px 0", fontSize: 23 }}>WAVES by Prasar Bharati</h2>
              <p style={{ margin: "0 0 12px", color: "#c0c5d0", lineHeight: 1.6 }}>A strong starting point for Indian-language entertainment, archival shows, films, cultural programming and live TV/radio from the public broadcaster.</p>
              <a href="https://wavespb.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#a5b4fc", color: "#111322", fontWeight: 800, textDecoration: "none", padding: "11px 15px", borderRadius: 10 }}>Explore WAVES ↗</a>
            </div>
          </div>
        </section>

        <section aria-label="Search and filters" style={{ background: "#141821", border: "1px solid #292f3b", borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <label htmlFor="ent-search" style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>Find something to watch</label>
          <input id="ent-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services, languages or categories…" style={{ boxSizing: "border-box", width: "100%", padding: 13, background: "#0c0f15", color: "white", border: "1px solid #343b49", borderRadius: 10, font: "inherit" }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 13 }}>
            {filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} style={{ border: "1px solid " + (filter === item ? "#a5b4fc" : "#363e4d"), background: filter === item ? "#292544" : "#1b202b", color: filter === item ? "#e4e2ff" : "#d4d8e0", borderRadius: 999, padding: "8px 12px", cursor: "pointer" }}>{item}</button>)}
            <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, color: "#c0c5d0", fontSize: 13 }}><input type="checkbox" checked={onlyFree} onChange={e => setOnlyFree(e.target.checked)} /> Free-access options</label>
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, margin: "18px 2px" }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Official streaming services</h2><span style={{ color: "#929aaa", fontSize: 13 }}>{visible.length} options</span>
        </div>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 255px), 1fr))", gap: 14 }}>
          {visible.map(p => <article key={p.title} style={{ border: "1px solid #292f3b", background: "#141821", borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", minHeight: 270 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}><span style={{ fontSize: 11, color: "#a5b4fc", fontWeight: 800, letterSpacing: 1 }}>{p.kind.toUpperCase()}</span><span style={{ fontSize: 11, color: "#a7e3c0", background: "#173126", padding: "5px 8px", borderRadius: 999 }}>FREE ACCESS</span></div>
            <h3 style={{ fontSize: 19, margin: "15px 0 8px" }}>{p.title}</h3>
            <p style={{ color: "#b4bac7", fontSize: 14, lineHeight: 1.6, margin: "0 0 12px" }}>{p.description}</p>
            <p style={{ color: "#929aaa", fontSize: 12, lineHeight: 1.5, margin: "0 0 10px" }}>{p.free}</p>
            <div style={{ marginTop: "auto" }}>
              <p style={{ color: "#929aaa", fontSize: 11, marginBottom: 12 }}>Source: {p.source} · Languages: {p.languages.join(", ")}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: 11, borderRadius: 10, border: "1px solid #424b5e", color: "#f4f5f7", textDecoration: "none", fontWeight: 700 }}>Open official service ↗</a>
            </div>
          </article>)}
        </section>
        {visible.length === 0 && <p style={{ color: "#b4bac7", padding: 24, textAlign: "center" }}>No services match those filters. Try a broader search.</p>}

        <section style={{ marginTop: 28, padding: 18, borderRadius: 14, background: "#11151e", border: "1px solid #292f3b" }}>
          <h2 style={{ fontSize: 16, marginTop: 0 }}>Playback & availability notes</h2>
          <ul style={{ color: "#a9afbd", fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>This page links to official services; it does not host, proxy, or download copyrighted streams.</li>
            <li>Providers may require sign-in, show advertisements, or offer a mix of free and paid titles. Check the terms shown by each provider.</li>
            <li>Embedded playback is intentionally not enabled yet: no verified embed permission or stable official embed endpoint was confirmed for these providers. Open the official service for playback.</li>
            <li>Provider catalogues and geographic availability can change. Legacy does not claim every title is free in India.</li>
          </ul>
        </section>
        <footer style={{ marginTop: 22, color: "#747d8d", fontSize: 12 }}>Legacy Entertainment Hub · Official provider links · No unofficial stream sources</footer>
      </div>
    </main>
  );
}
