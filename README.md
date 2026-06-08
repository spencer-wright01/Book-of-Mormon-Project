# The Path Back

The Path Back is a React + Vite adventure game inspired by Book of Mormon stories and space-fantasy hero journeys. Players become "Master [Name]," complete four scripture journeys, earn power-ups tied to gospel principles, and prepare to face Darth Korvax, the Keeper of Doubt.

## Project Purpose

This project was designed as a Book of Mormon course project and a playable scripture adventure. The goal is to help players engage with scripture stories in a way that feels adventurous, memorable, and reverent. The game uses journeys, reflection prompts, mission bosses, and a final battle to reinforce principles like faith, repentance, prayer, and coming unto Jesus Christ.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Local component state
- `localStorage` for player progress persistence

## Core Features

- Home screen with new game, continue, and project information flow
- Player setup with name entry and lightsaber color selection
- Four sequential scripture journeys based on Book of Mormon passages
- Mission journeys with story scenes and choice-based learning
- Mini-boss encounters that award doctrine-based power-ups
- Inventory/progress tracking for earned and charged power-ups
- Turn-based final boss battle against Darth Korvax with health bars, attack prompts, automatic power-up bonuses, and animations
- Victory screen with learned principles and reflection
- Local progress saving with reset support
- Static build output for AWS Amplify Hosting

## Game Structure

The app includes these screens:

- Home
- Player Setup
- Mission Map
- Mission Journey
- Mission Boss
- Inventory
- Final Battle
- Victory Screen
- About This Project

The mission and boss content lives in local data files so the app can stay simple in v1 without a backend, database, or external runtime API calls.

## Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build in `dist`
- `npm run preview` previews the built app locally
- `npm run lint` runs linting
- `npm run import:scripture` previews or writes scripture authoring imports

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown by Vite in your terminal.

## Build for Production

```bash
npm run build
```

Vite outputs the static site to:

```text
dist
```

Preview the production build with:

```bash
npm run preview
```

## AWS Amplify Deployment

Recommended Amplify settings:

- Repository source: GitHub
- Branch: `main`
- Build command: `npm run build`
- Output directory: `dist`

Typical deployment flow:

1. Push the project to GitHub.
2. In AWS Amplify, choose "Host web app."
3. Connect the GitHub repository.
4. Select the `main` branch.
5. Confirm the build command is `npm run build`.
6. Confirm the output directory is `dist`.
7. Save and deploy.

## GitHub Pages Deployment

This repository also includes a GitHub Actions workflow for GitHub Pages:

- Workflow file: `.github/workflows/deploy-pages.yml`
- Build command: `npm run build`
- Published artifact: `dist`
- Pages URL: `https://spencer-wright01.github.io/Book-of-Mormon-Project/`

The Vite config uses a conditional base path:

- Normal local and Amplify builds use `/`
- GitHub Pages builds use `/Book-of-Mormon-Project/`

To finish setup in GitHub:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` or run the `Deploy to GitHub Pages` workflow manually.

## Course Project Connection

The game is designed to support four Book of Mormon course outcomes:

### Faith in Jesus Christ and Discipleship

Each journey shows Book of Mormon figures choosing to follow God in meaningful situations. The gameplay points players back to discipleship through obedience, repentance, prayer, and coming unto Christ.

### Book of Mormon Doctrine in Context

Every journey is tied to a specific Book of Mormon passage and character. This keeps the doctrine connected to the original scriptural setting instead of reducing the story to a disconnected slogan.

### Scriptural Literacy and Sound Exegesis

Players see scripture references, story context, and principle-based prompts. The goal is to help them notice what the text teaches and how doctrine grows out of the passage itself.

### Responsible Personal Application

Each journey includes reflection and application prompts that invite thoughtful action. The game encourages players to apply true principles from the passage instead of forcing unrelated meanings onto scripture.

## Content Notes

- The game is intended to be adventurous and respectful toward the Book of Mormon.
- No official Star Wars characters, logos, or copyrighted art assets are required.
- Scripture references should remain accurate and should not invent verses.
- Progress is stored locally in the browser with `localStorage`.

## Data Files

- `src/data/missions.js`
- `src/data/bossAttacks.js`
- `src/data/missionBosses.js`
- `src/data/scriptureFocus.js`

These files provide the mission narrative, mini-boss encounters, doctrine-focused rewards, and final boss encounter data for the UI layer.

## Hybrid Scripture Content Workflow

The recommended content model for this project is hybrid:

- The shipped app stays fully static and uses local curated data.
- Scripture references, summaries, prompts, and approved excerpts live in local files.
- During development, you can use a scripture MCP server or scripture API to gather accurate verse text and study content.
- After reviewing the results, add the approved content into local data files so the deployed app does not depend on live agent tooling.

Suggested authoring loop:

1. Use MCP/API tools to fetch a passage or conference excerpt.
2. Review the wording and choose the exact excerpt to display.
3. Save the approved result into `src/data/scriptureFocus.js`.
4. Deploy normally with `npm run build`.

Import helper:

```bash
npm run import:scripture -- --all
npm run import:scripture -- --id brass-plates-mission --write
```

## Future Improvements

- Add sound effects and more polished animation timing
- Add stronger mission map transitions
- Add replay tracking and optional score summaries
- Add more active mini-game mechanics inside journeys
- Add stronger accessibility testing and keyboard support refinements

## Development Notes

This project is intentionally designed to stay simple for the first version:

- No backend
- No authentication
- No database
- No paid assets
- No external runtime APIs
