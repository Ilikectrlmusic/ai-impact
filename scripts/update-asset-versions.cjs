// Run after changing JS or CSS so published pages request matching asset versions.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
for (const page of ['index.html', 'business.html']) {
  const file = path.join(root, page);
  const html = fs.readFileSync(file, 'utf8');
  const updated = html.replace(/\b(src|href)="([\w-]+\.(?:js|css))(?:\?v=[\w-]+)?"/g, (_, attribute, asset) => {
    const hash = createHash('sha256').update(fs.readFileSync(path.join(root, asset))).digest('hex').slice(0, 12);
    return `${attribute}="${asset}?v=${hash}"`;
  });
  if (updated !== html) fs.writeFileSync(file, updated);
}
