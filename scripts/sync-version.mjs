// Copies the version from package.json into app/manifest.json.
// Runs automatically as part of `npm version`.

import { readFileSync, writeFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const manifestPath = 'app/manifest.json';
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

manifest.version = version;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`Set ${manifestPath} version to ${version}`);
