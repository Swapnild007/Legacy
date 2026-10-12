# Legacy Entertainment Hub

## Route
- `/entertainment`

## Scope
A discovery directory for free-to-access movies, shows, and live television, prioritizing India and official providers. The home workspace sidebar links to the new page.

## Current providers
- WAVES by Prasar Bharati: official OTT destination for VOD, shows, movies, live TV/radio and regional programming.
- Prasar Bharati Live TV: official live-TV directory.
- YouTube: discover official rights-holder and broadcaster uploads/streams; individual videos may be paid or unavailable.
- Plex Free Movies & TV: ad-supported catalogue where available.

## Playback policy
This initial version opens official provider sites. It does not scrape private APIs, proxy streams, download copyrighted content, or embed players without verified provider permission. No stable authorised embed method was confirmed for the listed providers during implementation, so embedded playback is deliberately deferred.

## Known limitations
- The catalogue is a curated provider directory, not a live title-level catalogue API.
- Search and filters operate on the curated provider metadata, not on each provider's full catalogue.
- Free availability, languages, ads, registration and regional restrictions vary by title and provider.
- The UI does not claim all content at a provider is free.

## Validation
The route and home sidebar link were added on `feat/entertainment-hub`. Run the repository's existing `npm run typecheck`, `npm test`, and `npm run build` in CI or a local checkout before merge. Browser playback and provider availability must be tested from India on the deployed preview.
