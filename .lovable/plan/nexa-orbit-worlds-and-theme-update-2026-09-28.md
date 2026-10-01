# NEXA-ORBIT Worlds and Theme Update

## What will change
- Expand the shared world catalogue from three to seven entries, adding Story Hub, Detective AD, Code AD, and Magnet Game with the supplied descriptions and exact external links.
- Keep one consistent card design and ensure every Visit Website action opens its destination in a new tab.
- Add a compact Worlds search/discovery area that filters all seven projects by name and description, with a clear empty state and direct visit actions.
- Add a Worlds link to the existing navigation so visitors can reach discovery quickly without creating duplicate pages.
- Add a premium dark theme and an accessible theme toggle while preserving the current light theme as the default.
- Add a public XML sitemap and reference it from robots.txt; update page metadata to mention the expanded collection.

## Interaction and responsive behavior
- Preserve swipe, mouse-drag, previous/next controls, keyboard arrows, music playback, install behavior, and all current content.
- Adapt the desktop orbit to feature selected worlds without overcrowding, while the carousel and discovery grid expose every world.
- Keep controls touch-friendly and prevent overflow across mobile, tablet, desktop, and large screens.
- Persist the selected theme on the device and honor the visitor’s system preference until they choose one.
- Keep transitions lightweight and automatically reduce motion and visual effects on constrained devices.

## Technical details
- Keep one shared world-data source so navigation/discovery/cards cannot drift apart.
- Apply dark mode through semantic color tokens on the document root; no duplicated light/dark page markup.
- Add a client-safe theme initializer to avoid a visible theme flash during startup.
- Use the existing single content route; external worlds remain direct links rather than unnecessary local duplicate pages.

## Verification
- Check the generated app and diagnostics for build, console, runtime, network, and missing-asset errors.
- Exercise search, theme persistence, carousel arrows/dots/keyboard/swipe, install fallback, music controls, anchor navigation, and every external project URL.
- Verify desktop, tablet, and mobile layouts for overflow, legibility, card alignment, and control reachability.
- Confirm the sitemap and robots reference are publicly reachable and that no duplicate local routes were introduced.
