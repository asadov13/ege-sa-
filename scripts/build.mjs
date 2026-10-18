import { mkdir, readdir, copyFile, cp, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const target = path.join(root, '_site');
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && /\.(html|css|js)$/.test(entry.name)) {
    await copyFile(path.join(root, entry.name), path.join(target, entry.name));
  }
}
await cp(path.join(root, 'assets'), path.join(target, 'assets'), { recursive: true });
await writeFile(path.join(target, '.nojekyll'), '');
console.log('Static site prepared in _site');
