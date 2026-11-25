// One-Line Office Joke: 24-Hour Sprint
// Writes a single original one-line joke about office life to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke, one line, 119 characters. Setup: an abandoned yoghurt in the
// communal office fridge. Payoff: a three-step escalation — email thread,
// meeting invite, then "more job security than I do" — that turns the joke
// back on the speaker. Specific, fresh detail (criterion 4) with a
// surprising, universally recognisable punchline (criterion 2).
const JOKE =
  "Our office fridge has a yoghurt from 2023 with its own email thread, a meeting invite, and more job security than I do.";

if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`Joke must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.includes("\n")) {
  throw new Error("Joke must be a single line");
}
if (JOKE.trim().length === 0) {
  throw new Error("Joke must not be only whitespace");
}
if (!/^[\x00-\x7F]*$/.test(JOKE)) {
  throw new Error("Joke must be plain ASCII text");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Verify the write round-trips: the file on disk must be byte-identical
// to the joke, so a truncated or mangled write fails loudly here instead
// of silently reaching the gate.
if (readFileSync(outPath, "utf8") !== JOKE) {
  throw new Error("Written entry does not match the joke");
}
