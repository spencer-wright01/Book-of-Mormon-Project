# The Path Back

The Path Back is a kid-friendly React + Vite adventure game inspired by Book of Mormon stories and space-fantasy hero journeys. Players become "Master [Name]," complete six scripture missions, earn power-ups tied to gospel principles, and prepare to face Darth Korvax, the Keeper of Doubt.

## Project Purpose

This project was designed as a Book of Mormon course project and a playable experience for children. The goal is to help players engage with scripture stories in a way that feels adventurous, memorable, and reverent. The game uses missions, reflection prompts, and a final battle to reinforce principles like faith, repentance, prayer, revelation, courage, covenant loyalty, and coming unto Jesus Christ.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS if included in the app shell
- Local component state
- `localStorage` for player progress persistence

## Core Features

- Home screen with new game, continue, and project information flow
- Player setup with name entry and lightsaber color selection
- Six sequential scripture missions based on Book of Mormon passages
- Mission journeys with story scenes and choice-based learning
- Power-up challenge questions tied to doctrine and application
- Inventory/progress tracking for earned and charged power-ups
- Final boss battle against Darth Korvax with health bars and attack prompts
- Victory screen with learned principles and reflection
- Local progress saving with reset support
- Static build output for AWS Amplify Hosting

## Game Structure

The initial app is intended to include these screens:

- Home
- Player Setup
- Mission Map
- Mission Journey
- Power-Up Challenge
- Inventory
- Final Boss
- Victory Screen
- About This Project

The mission and boss content lives in local data files so the app can stay simple in v1 without a backend, database, or external API calls.

## Scripts

Expected package scripts:

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build in `dist`
- `npm run preview` previews the built app locally
- `npm run lint` optionally runs linting if configured in the repo

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

Create a production build with:

```bash
npm run build
```

Vite will output the static site to:

```text
dist
```

You can preview the production build with:

```bash
npm run preview
```

## AWS Amplify Deployment

This app is intended to deploy as a static site through AWS Amplify Hosting.

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

## Course Project Connection

The game is designed to support four Book of Mormon course outcomes:

### 1. Faith in Jesus Christ and Discipleship

Each mission shows Book of Mormon figures choosing to follow God in hard situations. The gameplay points players back to discipleship through obedience, repentance, prayer, courage, revelation, and coming unto Christ.

### 2. Book of Mormon Doctrine in Context

Every mission is tied to a specific Book of Mormon passage and character. This keeps the doctrine connected to the original scriptural setting instead of reducing the story to a disconnected slogan.

### 3. Scriptural Literacy and Sound Exegesis

Players see scripture references, story context, and principle-based questions. The goal is to help them notice what the text teaches and how doctrine grows out of the passage itself.

### 4. Responsible Personal Application

Each mission includes reflection and application prompts that invite thoughtful action. The game encourages players to apply true principles from the passage instead of forcing unrelated meanings onto scripture.

## Content Notes

- The game is intended to be adventurous but respectful toward the Book of Mormon.
- No official Star Wars characters, logos, or copyrighted art assets are required.
- Scripture references should remain accurate and should not invent verses.
- Progress is stored locally in the browser with `localStorage`.

## Data Files

The initial content layer is expected to use local modules such as:

- `src/data/missions.js`
- `src/data/bossAttacks.js`
- `src/data/scriptureFocus.js`

These files provide the mission narrative, challenge questions, doctrine-focused rewards, and final boss encounter data for the UI layer.

## Hybrid Scripture Content Workflow

The recommended content model for this project is hybrid:

- The shipped app stays fully static and uses local curated data.
- Scripture references, summaries, prompts, and approved excerpts live in local files.
- During development, you can use a scripture MCP server or scripture API to gather accurate verse text and study content.
- After reviewing the results, copy the approved content into local data files so the deployed app does not depend on live agent tooling.

Right now the app is set up for that pattern:

- `src/data/missions.js` stores mission structure and gameplay.
- `src/data/scriptureFocus.js` stores the local scripture teaching layer for each mission.
- Each scripture focus entry includes a `mcpQueryHint` field that can be used later when pulling content from your scripture toolchain.
- The UI currently renders local summaries and teaching points, which is safer than shipping unreviewed live pulls.

Suggested authoring loop:

1. Use your MCP/API tools to fetch a passage or conference excerpt.
2. Review the wording and choose the exact excerpt you want to display.
3. Save the approved result into `src/data/scriptureFocus.js`.
4. Deploy normally with `npm run build`.

There is also a local import helper for authoring:

```bash
npm run import:scripture -- --all
npm run import:scripture -- --id brass-plates-mission --write
```

How the import helper works:

- It reads `src/data/scriptureFocus.js`
- It fetches content from the Open Scripture API REST base URL `https://openscriptureapi.org/api/scriptures/v1/lds/en`
- If an entry has an explicit verse-based `excerptReference`, it imports verse text
- If an entry only has a chapter-level reference, it imports official chapter summary text
- Without `--write`, it only previews results

## Future Improvements

Possible future enhancements after v1:

- Add sound effects and more polished animation timing
- Add richer mission map visuals and transitions
- Add replay tracking and optional score summaries
- Add more scripture missions or branching choices
- Add stronger accessibility testing and keyboard support refinements

## Development Notes

This project is intentionally designed to stay simple for the first version:

- No backend
- No authentication
- No database
- No paid assets
- No external APIs

That makes it easier to run, modify, teach from, and deploy as a static site.
