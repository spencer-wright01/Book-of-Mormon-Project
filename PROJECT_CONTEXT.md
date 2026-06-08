# PROJECT_CONTEXT

## App Goal

**The Path Back** is a Star Wars-inspired Book of Mormon adventure game. The player creates their own hero, becomes **Master [Name]**, chooses a lightsaber color, completes scripture-based journeys, earns armor and power-ups, and battles **Darth Korvax, the Keeper of Doubt**.

The app is designed to:

- make Book of Mormon stories feel interactive and memorable
- stay reverent toward scripture
- teach doctrine through story, reflection, and gameplay
- remain simple to run and deploy as a static web app

## Current Features

- Home screen with intro, continue flow, and About page
- Player setup with custom name, `Master [Name]` title, and lightsaber color
- Four sequential scripture journeys
- Scripture mentors who guide the player through each mission narrative
- Mini-boss encounters that award and charge mission power-ups
- Inventory and hero loadout screen
- Turn-based final battle against Darth Korvax
- Power-ups now boost attacks and reduce matching boss damage automatically
- Player and boss battle figures with attack, hit, slash, damage, surge, and victory animations
- Victory screen
- Reset game flow with confirmation
- `localStorage` persistence

## Current Architecture

- React
- Vite
- Tailwind CSS via `@tailwindcss/vite`
- Plain JavaScript
- Local React state for screen navigation
- `localStorage` for saved player progress
- No backend
- No database
- No auth
- No external runtime APIs required for players

## Content Model

- `src/data/missions.js`
  - mission structure, journey scenes, legacy prompt data, and rewards
  - default export is currently filtered to four active journeys
- `src/data/bossAttacks.js`
  - Darth Korvax turn data, power-up resistance, damage, and bonus values
- `src/data/missionBosses.js`
  - end-of-journey boss names, attacks, weaknesses, and reward messages
- `src/data/scriptureFocus.js`
  - scripture summaries, teaching points, prompts, and import targets
- `src/utils/gameProgress.js`
  - player creation, hydration, mission status, boss unlock, and active power-up catalog

## File Structure

```text
.
|-- PROJECT_CONTEXT.md
|-- README.md
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- eslint.config.js
|-- index.html
|-- scripts/
|   `-- import-scripture-focus.mjs
`-- src/
    |-- App.jsx
    |-- main.jsx
    |-- index.css
    |-- components/
    |   |-- AboutProject.jsx
    |   |-- FinalBoss.jsx
    |   |-- HealthBar.jsx
    |   |-- Home.jsx
    |   |-- Inventory.jsx
    |   |-- Layout.jsx
    |   |-- Lightsaber.jsx
    |   |-- MissionCard.jsx
    |   |-- MissionBoss.jsx
    |   |-- MissionJourney.jsx
    |   |-- MissionMap.jsx
    |   |-- PlayerAvatar.jsx
    |   |-- PlayerSetup.jsx
    |   `-- VictoryScreen.jsx
    |-- data/
    |   |-- bossAttacks.js
    |   |-- missionBosses.js
    |   |-- missions.js
    |   `-- scriptureFocus.js
    `-- utils/
        |-- gameProgress.js
        `-- storage.js
```

## Important Design Decisions

### Player-Centered Hero Framing

The player's entered character is the active hero of the game.

- The player is **Master [Name]**
- The player chooses the saber color
- The player completes the journeys
- The player earns the armor and charged power-ups
- The player fights Darth Korvax

Book of Mormon figures are mentors, examples, and guides. They are not the player avatar.

### Four-Journey Structure

The active version currently uses four focused journeys:

- Nephi: faith and obedience
- Enos: sincere prayer
- Alma the Younger: repentance through Jesus Christ
- Jesus Christ visits the Nephites: coming unto Christ

Older mission data for the brother of Jared and Captain Moroni is still present in `src/data/missions.js`, but it is not included in the default active mission export.

### Boss Battle Model

The final battle is no longer a right-answer selection flow.

- The player attacks with a button or spacebar
- Darth Korvax counters each turn
- Charged power-ups automatically reduce matching damage
- Charged power-ups also add attack bonus damage
- Animations show attacks, hits, damage popups, power surges, and victory glow

### Static Runtime, Smart Authoring

The deployed app should stay easy to deploy and reliable.

- the deployed app does not depend on MCP
- the deployed app does not depend on a live scripture API
- all player-facing content is local at build time

Development authoring can still use the Open Scripture API or future MCP-connected workflows.

## Remaining Tasks

### High Priority

- Choose exact scripture excerpt references for broader missions:
  - `change-of-alma`
  - `light-at-bountiful`
- Run the scripture import script with `--write` once approved references are chosen
- Play through the four-journey flow in the browser and tune battle damage/animation timing if needed

### Medium Priority

- Add stronger mentor portrait treatment for each scripture guide
- Add more distinct visual identity for armor and power-ups
- Add automated browser-level tests for the core flow

### Future / v2 Ideas

- sound effects or music
- branching mission choices
- more active mini-game mechanics inside journeys
- cloud save or family profiles
- teacher or author content tools

## Deployment Plan

### Local Development

```bash
npm install
npm run dev
```

### Lint / Build

```bash
npm run lint
npm run build
```

### AWS Amplify

- Connect GitHub repository
- Select `main` branch
- Build command:

```bash
npm run build
```

- Output directory:

```text
dist
```

Production runtime is static only. The import script is for development authoring only.

### GitHub Pages

GitHub Pages is supported with:

- `.github/workflows/deploy-pages.yml`
- GitHub Pages source set to `GitHub Actions`
- published artifact: `dist`
- expected URL: `https://spencer-wright01.github.io/Book-of-Mormon-Project/`

`vite.config.js` uses `GITHUB_PAGES=true` to switch the Vite base path to `/Book-of-Mormon-Project/` only for the Pages workflow. Local development and Amplify builds still use `/`.

## Content Import Workflow

```bash
npm run import:scripture -- --id brass-plates-mission
npm run import:scripture -- --id brass-plates-mission --write
```

- Verse-based `excerptReference` imports verse text
- Chapter-level references import chapter summaries
- Keep reviewed, approved content in `src/data/scriptureFocus.js`

## Update Rule

This file should be updated whenever app scope, major UI direction, data structure, deployment assumptions, content workflow, remaining tasks, or architecture decisions change.
