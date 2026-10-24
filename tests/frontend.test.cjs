const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
for (const [htmlFile, dataFile] of [['index.html', 'app.js'], ['business.html', 'business.js']]) {
  test(`${htmlFile}: all published assets use their actual content version`, () => {
    const assets = [...read(htmlFile).matchAll(/\b(?:src|href)="([\w-]+\.(?:js|css))(?:\?v=([\w-]+))?"/g)];
    assert.equal(assets.length, 3);
    for (const [, file, version] of assets) {
      assert.equal(version, createHash('sha256').update(read(file)).digest('hex').slice(0, 12), `Run node scripts/update-asset-versions.cjs after changing ${file}`);
    }
  });
  test(`${htmlFile}: both languages cover all static and dynamic labels`, () => {
    const { copy, allSeriesMeta, pageConfig } = vm.runInNewContext(read(dataFile) + '\n({copy, allSeriesMeta, pageConfig});');
    const keys = [...read(htmlFile).matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
    for (const language of ['zh', 'en']) {
      for (const key of [...keys, ...allSeriesMeta.map(s => s.key), ...pageConfig.overviews.map(c => c.ariaKey), 'latest', 'sinceBaseline']) {
        assert.equal(typeof copy[language][key], 'string', `${language}.${key} missing`);
        assert.ok(!copy[language][key].includes('undefined'), `${language}.${key} contains undefined`);
      }
      for (const series of allSeriesMeta.filter(s => s.card !== false)) {
        assert.equal(typeof copy[language].notes[series.key], 'string');
      }
    }
  });
}
test('missing translations keep the original HTML or fall back to Chinese', () => {
  const renderer = read('charts.js').split('document.getElementById("langToggle").addEventListener')[0];
  const result = vm.runInNewContext(renderer + '\n[translated("known"), translated("missing", "<strong>Original text</strong>"), translated("missing")];', {
    localStorage: { getItem: () => 'en' }, navigator: { language: 'en-US' },
    document: { getElementById: () => ({}) }, pageConfig: { overviews: [] },
    copy: { en: {}, zh: { known: '已有文案' } }
  });
  assert.deepEqual(Array.from(result), ['已有文案', '<strong>Original text</strong>', '']);
});
