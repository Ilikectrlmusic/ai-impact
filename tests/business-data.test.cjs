const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const page = vm.runInNewContext(read('business.js') + '\n({ raw, quarters, allSeriesMeta, overviewValues, pageConfig });');
function csv(file) {
  const [header, ...lines] = read(file).trim().split(/\r?\n/).map(line => line.split(','));
  return lines.map(fields => {
    assert.equal(fields.length, header.length, `Unexpected CSV fields in ${file}`);
    return Object.fromEntries(header.map((name, i) => [name, fields[i]]));
  });
}
const economicRows = csv('data/business-source.csv');
const quarters = csv('data/ai-company-quarterly.csv');
const ttm = csv('data/ai-company-ttm.csv');
const companies = ['NVDA', 'MSFT', 'GOOGL', 'AMZN'];
const mean = values => values.reduce((sum, v) => sum + v, 0) / values.length;
const relative = values => (values.at(-1) / values[0] - 1) * 100;
function near(actual, expected) {
  assert.ok(Number.isFinite(actual) && Math.abs(actual - expected) <= Math.max(1, Math.abs(expected)) * 1e-10, `${actual} != ${expected}`);
}
function observation(series, date) {
  const rows = economicRows.filter(r => r.series === series && r.date === date);
  assert.equal(rows.length, 1, `${series} at ${date} must have one source observation`);
  return Number(rows[0].value);
}
function quarterDate(index) { return `${Math.floor(index / 4)}-${String(index % 4 * 3 + 1).padStart(2, '0')}-01`; }
function quarterWindow(label) {
  const [year, q] = label.split(' Q').map(Number);
  const index = year * 4 + q - 1;
  return Array.from({ length: 4 }, (_, i) => quarterDate(index - 3 + i));
}
function monthlyWindow(label) {
  const [year, q] = label.split(' Q').map(Number);
  const end = year * 12 + q * 3 - 1;
  return Array.from({ length: 12 }, (_, i) => {
    const index = end - 11 + i;
    return `${Math.floor(index / 12)}-${String(index % 12 + 1).padStart(2, '0')}-01`;
  });
}
test('SEC profits use four consecutive fiscal quarters and reconcile inferred Q4 to filed annual totals', () => {
  for (const ticker of companies) {
    const companyQuarters = quarters.filter(r => r.ticker === ticker).sort((a, b) => a.fiscal_end.localeCompare(b.fiscal_end));
    assert.equal(companyQuarters.filter(r => r.mapped_quarter >= "2022 Q1").length, 18);
    for (let i = 1; i < companyQuarters.length; i++) {
      assert.equal(Date.parse(companyQuarters[i].fiscal_start) - Date.parse(companyQuarters[i - 1].fiscal_end), 86400000);
    }
    for (const quarter of companyQuarters) {
      assert.match(quarter.source_url, /^https:\/\/www.sec.gov\/Archives\/edgar\/data\//);
      if (quarter.method === 'fiscal year minus first three quarters') {
        const fiscalYear = companyQuarters.filter(r => r.fiscal_start >= quarter.annual_report_start && r.fiscal_end <= quarter.fiscal_end);
        assert.equal(fiscalYear.length, 4);
        near(fiscalYear.reduce((sum, r) => sum + Number(r.operating_income_usd), 0), Number(quarter.annual_report_value_usd));
      }
    }
    for (const point of ttm.filter(r => r.ticker === ticker)) {
      const window = companyQuarters.filter(r => r.fiscal_start >= point.fiscal_start && r.fiscal_end <= point.fiscal_end);
      assert.equal(window.length, 4);
      near(Number(point.ttm_operating_income_billion_usd), window.reduce((sum, r) => sum + Number(r.operating_income_usd), 0) / 1e9);
    }
  }
});
test('every chart point reconciles to independently stored company or economic observations', () => {
  const real = [];
  for (const [i, label] of page.quarters.entries()) {
    const points = ttm.filter(r => r.mapped_quarter === label);
    assert.equal(points.length, 4);
    near(page.raw.aiProfit[i], points.reduce((sum, r) => sum + Number(r.ttm_operating_income_billion_usd), 0));
    const dates = quarterWindow(label);
    for (const [key, source, divisor] of [
      ['usProfit', 'A445RC1Q027SBEA', 1000], ['retailProfit', 'N415RC1Q027SBEA', 1],
      ['transportProfit', 'N417RC1Q027SBEA', 1], ['productivity', 'OPHNFB', 1], ['output', 'OUTNFB', 1], ['hours', 'HOANBS', 1]
    ]) near(page.raw[key][i], mean(dates.map(d => observation(source, d))) / divisor);
    for (const [key, source] of [['hires', 'JTSHIR'], ['retailHires', 'JTS4400HIR']]) {
      near(page.raw[key][i], mean(monthlyWindow(label).map(d => observation(source, d))));
    }
    real.push(mean(dates.map(d => observation('A445RC1Q027SBEA', d) / observation('GDPDEF', d))));
    near(page.raw.usRealProfit[i], real[i] / real[0] * 100);
  }
});
test('headline numbers round correctly and plotted index ranges do not clip any source points', () => {
  for (const [key, expected] of Object.entries({ aiProfit: 241.2, usProfit: 30.4, usRealProfit: 17.3, hires: -21.4, productivity: 8.8, retailProfit: 7.3, retailHires: -23.1, transportProfit: -24.5, output: 10.4, hours: 1.4 })) {
    assert.equal(Number(relative(page.raw[key]).toFixed(1)), expected, key);
  }
  for (const chart of page.pageConfig.overviews) {
    for (const key of chart.keys) {
      const points = page.overviewValues[key];
      near(points[0], 100);
      assert.equal(points.length, 15);
      assert.ok(points.every(value => value >= chart.options.yMin && value <= chart.options.yMax), `${key} exceeds axis range`);
    }
  }
  assert.equal(page.allSeriesMeta.filter(s => s.card !== false).length, 6);
});
