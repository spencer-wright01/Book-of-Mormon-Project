import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const scriptureFocusPath = path.resolve(projectRoot, "src/data/scriptureFocus.js");
const baseUrl = "https://openscriptureapi.org/api/scriptures/v1/lds/en";

const bookOfMormonBooks = [
  { names: ["1 nephi", "1nephi"], bookId: "1nephi", volumeId: "bookofmormon", title: "1 Nephi" },
  { names: ["2 nephi", "2nephi"], bookId: "2nephi", volumeId: "bookofmormon", title: "2 Nephi" },
  { names: ["jacob"], bookId: "jacob", volumeId: "bookofmormon", title: "Jacob" },
  { names: ["enos"], bookId: "enos", volumeId: "bookofmormon", title: "Enos" },
  { names: ["jarom"], bookId: "jarom", volumeId: "bookofmormon", title: "Jarom" },
  { names: ["omni"], bookId: "omni", volumeId: "bookofmormon", title: "Omni" },
  { names: ["words of mormon", "wordsofmormon"], bookId: "wordsofmormon", volumeId: "bookofmormon", title: "Words of Mormon" },
  { names: ["mosiah"], bookId: "mosiah", volumeId: "bookofmormon", title: "Mosiah" },
  { names: ["alma"], bookId: "alma", volumeId: "bookofmormon", title: "Alma" },
  { names: ["helaman"], bookId: "helaman", volumeId: "bookofmormon", title: "Helaman" },
  { names: ["3 nephi", "3nephi"], bookId: "3nephi", volumeId: "bookofmormon", title: "3 Nephi" },
  { names: ["4 nephi", "4nephi"], bookId: "4nephi", volumeId: "bookofmormon", title: "4 Nephi" },
  { names: ["mormon"], bookId: "mormon", volumeId: "bookofmormon", title: "Mormon" },
  { names: ["ether"], bookId: "ether", volumeId: "bookofmormon", title: "Ether" },
  { names: ["moroni"], bookId: "moroni", volumeId: "bookofmormon", title: "Moroni" },
];

const bookLookup = new Map(
  bookOfMormonBooks.flatMap((book) => book.names.map((name) => [name, book])),
);

function parseArgs(argv) {
  const args = {
    ids: [],
    write: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--write") {
      args.write = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }

    if (arg === "--all") {
      continue;
    }

    if (arg.startsWith("--id=")) {
      args.ids.push(arg.slice("--id=".length));
      continue;
    }

    if (arg === "--id") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("Expected a value after --id.");
      }
      args.ids.push(next);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function printHelp() {
  console.log(`Import curated scripture excerpts or chapter summaries into src/data/scriptureFocus.js.

Usage:
  npm run import:scripture -- --all
  npm run import:scripture -- --id brass-plates-mission
  npm run import:scripture -- --id brass-plates-mission --id prayer-in-the-wilderness --write

Behavior:
  - If an entry has an explicit excerptReference like "1 Nephi 3:7", the script imports verse text.
  - If an entry only has a chapter-level reference like "Alma 46", the script imports official chapter summary text.
  - If excerptReference is null and the main reference spans broad material like "Mosiah 27; Alma 36", the script imports summaries unless you later set a narrower excerptReference.
  - Without --write, the script previews results and does not edit files.
`);
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function matchBook(segment) {
  const normalized = normalizeWhitespace(segment).toLowerCase();
  const candidates = [...bookLookup.keys()].sort((left, right) => right.length - left.length);

  for (const candidate of candidates) {
    if (normalized === candidate || normalized.startsWith(`${candidate} `)) {
      return bookLookup.get(candidate);
    }
  }

  return null;
}

function parseVerseRanges(rawVerses) {
  return rawVerses
    .split(",")
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean)
    .map((part) => {
      const match = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
      if (!match) {
        throw new Error(`Unsupported verse range: ${part}`);
      }

      const start = Number.parseInt(match[1], 10);
      const end = Number.parseInt(match[2] || match[1], 10);

      return { start, end };
    });
}

function parseReference(reference) {
  const parts = reference
    .split(";")
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean);

  if (parts.length === 0) {
    throw new Error("Reference was empty.");
  }

  let currentBook = null;

  return parts.map((part) => {
    const matchedBook = matchBook(part);
    let remainder = part;

    if (matchedBook) {
      currentBook = matchedBook;
      const bookMatch = remainder.match(/^((?:\d\s*)?[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(.*)$/);
      if (!bookMatch) {
        throw new Error(`Could not parse chapter data from segment: ${part}`);
      }
      remainder = bookMatch[2];
    } else if (!currentBook) {
      throw new Error(`Could not resolve a Book of Mormon book in segment: ${part}`);
    }

    const chapterMatch = remainder.match(/^(\d+)(?:\s*-\s*(\d+))?(?::(.+))?$/);
    if (!chapterMatch) {
      throw new Error(`Unsupported reference segment: ${part}`);
    }

    const chapterStart = Number.parseInt(chapterMatch[1], 10);
    const chapterEnd = Number.parseInt(chapterMatch[2] || chapterMatch[1], 10);
    const verseRanges = chapterMatch[3] ? parseVerseRanges(chapterMatch[3]) : [];

    return {
      book: currentBook,
      chapterStart,
      chapterEnd,
      verseRanges,
    };
  });
}

async function fetchChapter(volumeId, bookId, chapterNumber) {
  const url = `${baseUrl}/volume/${volumeId}/${bookId}/${chapterNumber}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open Scripture API returned ${response.status} for ${url}`);
  }

  return response.json();
}

function collectVerseText(chapterResponse, verseRanges) {
  const verses = chapterResponse?.chapter?.verses ?? [];
  const lines = [];

  for (const range of verseRanges) {
    for (let verseNumber = range.start; verseNumber <= range.end; verseNumber += 1) {
      const verse = verses[verseNumber - 1];
      if (!verse?.text) {
        throw new Error(
          `Verse ${chapterResponse.chapter.bookTitle} ${chapterResponse.chapter.number}:${verseNumber} was not found.`,
        );
      }

      lines.push(`${verseNumber}. ${verse.text}`);
    }
  }

  return lines.join("\n");
}

function buildImportedExcerpt(reference, segments, chapterResponses) {
  const blocks = [];
  let usedChapterSummary = false;

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const chapterEntries = chapterResponses[index];

    if (segment.verseRanges.length > 0) {
      if (chapterEntries.length !== 1) {
        throw new Error(`Verse ranges must belong to a single chapter for ${reference}.`);
      }

      const chapterResponse = chapterEntries[0];
      const verseText = collectVerseText(chapterResponse, segment.verseRanges);
      blocks.push(`${chapterResponse.chapter.bookTitle} ${chapterResponse.chapter.number}\n${verseText}`);
      continue;
    }

    usedChapterSummary = true;
    for (const chapterResponse of chapterEntries) {
      blocks.push(
        `${chapterResponse.chapter.bookTitle} ${chapterResponse.chapter.number} Summary\n${chapterResponse.chapter.summary}`,
      );
    }
  }

  return {
    excerpt: blocks.join("\n\n"),
    excerptStatus: usedChapterSummary ? "sourced-chapter-summary" : "sourced-verse-excerpt",
  };
}

function formatValue(value, indentLevel = 0) {
  const indent = "  ".repeat(indentLevel);
  const nextIndent = "  ".repeat(indentLevel + 1);

  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const items = value.map((item) => `${nextIndent}${formatValue(item, indentLevel + 1)}`);
    return `[\n${items.join(",\n")}\n${indent}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return "{}";
    }

    const props = entries.map(
      ([key, nestedValue]) => `${nextIndent}${JSON.stringify(key)}: ${formatValue(nestedValue, indentLevel + 1)}`,
    );
    return `{\n${props.join(",\n")}\n${indent}}`;
  }

  return JSON.stringify(value);
}

function toModuleSource(focusEntries) {
  return `export const scriptureFocus = ${formatValue(focusEntries, 0)};\n\nexport default scriptureFocus;\n`;
}

async function loadScriptureFocus() {
  const moduleUrl = `${pathToFileURL(scriptureFocusPath).href}?t=${Date.now()}`;
  const imported = await import(moduleUrl);
  return imported.scriptureFocus ?? imported.default;
}

async function importEntry(entry) {
  const chosenReference = entry.excerptReference || entry.mcpQueryHint || entry.reference;
  if (!chosenReference) {
    throw new Error(`No reference was available for ${entry.id}.`);
  }

  const parsedSegments = parseReference(chosenReference);
  const chapterResponses = [];

  for (const segment of parsedSegments) {
    const fetchedChapters = [];

    for (let chapterNumber = segment.chapterStart; chapterNumber <= segment.chapterEnd; chapterNumber += 1) {
      fetchedChapters.push(await fetchChapter(segment.book.volumeId, segment.book.bookId, chapterNumber));
    }

    chapterResponses.push(fetchedChapters);
  }

  const importedExcerpt = buildImportedExcerpt(chosenReference, parsedSegments, chapterResponses);

  return {
    ...entry,
    excerptReference: chosenReference,
    excerptSource: "Open Scripture API",
    excerptImportedAt: new Date().toISOString(),
    ...importedExcerpt,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const scriptureFocus = await loadScriptureFocus();
  const selectedIds = args.ids.length > 0 ? new Set(args.ids) : null;
  const nextFocus = { ...scriptureFocus };
  const results = [];

  for (const [id, entry] of Object.entries(scriptureFocus)) {
    if (selectedIds && !selectedIds.has(id)) {
      continue;
    }

    const updatedEntry = await importEntry(entry);
    nextFocus[id] = updatedEntry;
    results.push({
      id,
      excerptReference: updatedEntry.excerptReference,
      excerptStatus: updatedEntry.excerptStatus,
      excerptPreview: updatedEntry.excerpt.slice(0, 180),
    });
  }

  if (results.length === 0) {
    console.log("No scripture focus entries matched the requested ids.");
    return;
  }

  console.log(JSON.stringify(results, null, 2));

  if (!args.write) {
    console.log("\nPreview only. Re-run with --write to update src/data/scriptureFocus.js.");
    return;
  }

  const fileContents = toModuleSource(nextFocus);
  await fs.writeFile(scriptureFocusPath, fileContents, "utf8");
  console.log(`\nUpdated ${path.relative(projectRoot, scriptureFocusPath)}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
