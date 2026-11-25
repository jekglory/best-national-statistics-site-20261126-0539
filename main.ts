// NSO Almera — the national statistics site for the Republic of Almera.
// Runs on Node 22 with the standard library only. The site itself is the
// plain static files in app/ (HTML, CSS, ES modules, one CSV): no build step,
// no network request, served with app/ at the server root.
//
// This program hands the site in. It copies app/ and screenshots/ from this
// directory into /output (or $MAKEFUN_OUTPUT_DIR outside the grader) and
// writes /output/dossier.json with the kit's vendored library, so the judge
// reads the same dossier the scorer rebuilds. vendor/makefun-frontend.ts is
// the kit's copy, unchanged.
//
// Run it locally like this:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the site locally with `node serve.ts`, then open http://localhost:8080.

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate's caps, as named constants: the dossier text cap shapes the bytes,
// the rest refuse an entry the scorer would refuse (too many screenshots or
// one too large; app/ past its file or byte caps).
const TEXT_MAX_BYTES = 163840;
const SHOT_MAX = 4;
const SHOT_MAX_BYTES = 262144;
const APP_MAX_FILES = 993;
const APP_MAX_BYTES = 16777216;

fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(path.join(repoRoot, 'app'), path.join(outputDir, 'app'), { recursive: true });
fs.mkdirSync(path.join(outputDir, 'screenshots'), { recursive: true });
if (fs.existsSync(path.join(repoRoot, 'screenshots'))) {
  fs.cpSync(path.join(repoRoot, 'screenshots'), path.join(outputDir, 'screenshots'), { recursive: true });
}

const dossier = buildDossier(outputDir, {
  text_max_bytes: TEXT_MAX_BYTES,
  screenshots: { max: SHOT_MAX, max_bytes: SHOT_MAX_BYTES },
  app_max_files: APP_MAX_FILES,
  app_max_bytes: APP_MAX_BYTES,
});
fs.writeFileSync(path.join(outputDir, 'dossier.json'), dossier);
console.log(`wrote ${outputDir}/dossier.json (${dossier.length} bytes)`);
