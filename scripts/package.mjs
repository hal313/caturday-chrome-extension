// Zips app/ into package/caturday-<version>.zip for upload to the Chrome Web Store.
//
// The development-only "key" is removed from the packaged manifest: the store
// assigns its own key and rejects uploads whose manifest contains one.

import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import AdmZip from 'adm-zip';

const manifest = JSON.parse(readFileSync('app/manifest.json', 'utf8'));
const { version } = JSON.parse(readFileSync('package.json', 'utf8'));

if (manifest.version !== version) {
  console.error(`Version mismatch: manifest.json is ${manifest.version}, package.json is ${version}`);
  process.exit(1);
}

delete manifest.key;

const zip = new AdmZip();
zip.addLocalFolder('app', '', (path) => !/(^|\/)\.|^manifest\.json$/.test(path));
zip.addFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'));

const output = `package/caturday-${version}.zip`;
rmSync('package', { recursive: true, force: true });
mkdirSync('package');
zip.writeZip(output);

console.log(`Wrote ${output}`);
