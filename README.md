# KI i klasserommet

**Live:** [knyttneven.github.io/Ki-klasserommet](https://knyttneven.github.io/Ki-klasserommet/)

A practical AI prompt tool for Norwegian upper secondary school teachers, built around Microsoft Copilot. No backend, no build step, no dependencies — runs entirely in the browser.

---

## Features

- **Kurskartet** — interactive island map with 6 thematic chapters and ready-made prompt cards
- **Veiviseren** — step-by-step wizard that generates a tailored Copilot prompt based on subject, year level, and pedagogical goal, with links to the national curriculum (udir.no)
- **Min bank** — personal prompt library stored locally in the browser, with export to `.txt`
- **Kompasset** — guidance portal with tips, how-to guides, and video resources
- PIN-protected admin panel for adding cards and publishing content updates
- Progress tracking with a fog-of-war unlock mechanic
- Accessible (ARIA roles, keyboard navigation, skip links, `lang=nb`)

## Tech stack

| Layer   | Technology |
|---------|-----------|
| Markup  | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Logic   | Vanilla JavaScript (ES2020+, no frameworks) |
| Data    | Plain JS files (`data.js`, `kompasset-data.js`) |
| Storage | `localStorage` / `sessionStorage` |
| Hosting | GitHub Pages (or any static file server) |
| Build   | None required |

## Getting started

Clone the repo and open `index.html` in a browser — no install needed.

Copy `config.example.js` to `config.js` and set your values:

```js
export const CONFIG = {
  ADMIN_PIN:    "your-pin",
  fogUnlockAt:  3,
  copilotUrl:   "https://copilot.microsoft.com",
  siteName:     "KI i klasserommet",
  siteSubtitle: "Praktiske prompt-kort for lærere i videregående",
  kontakt:      ""
};
```

> **Important:** Never commit `config.js` with a real PIN to a public repository. It is listed in `.gitignore`.

## File overview

```
index.html          Kurskartet — start page / island map
veiviser.html       Veiviseren — prompt wizard
min-bank.html       Min bank — personal prompt library
kompasset.html      Kompasset — guidance portal
kompasset.js        All Kompasset logic
style.css           Shared styles
kompasset.css       Kompasset-specific styles
config.example.js   Configuration template — copy to config.js
data.js             All content: islands, prompt cards, subjects, curriculum
kompasset-data.js   Guidance content: categories and tip blocks
```

## Customising content

**Prompt cards** — edit `data.js`. Each card in `ISLANDS[n].cards`:

```js
{
  id:     "und-01",
  title:  "Card title",
  time:   "5 min",
  out:    "What the teacher gets",
  do:     "Instruction for the teacher",
  prompt: "You are a teacher in [SUBJECT]…",
  tags:   ["Vg1", "Norwegian"],
  udir:   "NOR01-06"
}
```

**Guidance content** — edit `kompasset-data.js` directly, or use the in-app admin panel (triple-click the logo to access).

**Curriculum links** — update the `FAG` array in `data.js` when Udir changes curriculum codes.

## Hosting

Copy all files to any static file server — school web server, SharePoint, or GitHub Pages. No build step or server-side code required. HTTPS recommended.

## Privacy

All user data (progress, saved prompts, admin edits) is stored exclusively in the user's browser via `localStorage`. No data is sent to any server. No tracking, no cookies, no analytics.

## License

Open source. See [LICENSE](./LICENSE) for details.
