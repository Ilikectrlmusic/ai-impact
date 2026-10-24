// Source observations checked on 2026-10-24. See DATA_SOURCES.md for sources and sampling.
const months = [
  "2022-11",
  "2022-12",
  "2023-01",
  "2023-02",
  "2023-03",
  "2023-04",
  "2023-05",
  "2023-06",
  "2023-07",
  "2023-08",
  "2023-09",
  "2023-10",
  "2023-11",
  "2023-12",
  "2024-01",
  "2024-02",
  "2024-03",
  "2024-04",
  "2024-05",
  "2024-06",
  "2024-07",
  "2024-08",
  "2024-09",
  "2024-10",
  "2024-11",
  "2024-12",
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
  "2026-01",
  "2026-02",
  "2026-03",
  "2026-04",
  "2026-05",
  "2026-06",
  "2026-07",
  "2026-08",
  "2026-09"
];

const quarters = [
  "2022 Q4",
  "2023 Q1",
  "2023 Q2",
  "2023 Q3",
  "2023 Q4",
  "2024 Q1",
  "2024 Q2",
  "2024 Q3",
  "2024 Q4",
  "2025 Q1",
  "2025 Q2",
  "2025 Q3",
  "2025 Q4",
  "2026 Q1",
  "2026 Q2"
];

const raw = {
  "openings": [
    6.4,
    6.6,
    6.2,
    6.0,
    5.9,
    6.0,
    5.7,
    5.6,
    5.3,
    5.6,
    5.6,
    5.2,
    5.2,
    5.2,
    5.1,
    5.1,
    5.0,
    4.6,
    4.7,
    4.5,
    4.5,
    4.6,
    4.2,
    4.5,
    4.6,
    4.4,
    4.5,
    4.4,
    4.2,
    4.3,
    4.4,
    4.3,
    4.3,
    4.2,
    4.3,
    4.3,
    4.1,
    4.0,
    4.4,
    4.2,
    4.2,
    4.6,
    4.5,
    4.3,
    4.4,
    4.3,
    null
  ],
  "hires": [
    4.0,
    4.0,
    4.1,
    3.9,
    3.8,
    3.8,
    3.9,
    3.8,
    3.6,
    3.7,
    3.7,
    3.7,
    3.5,
    3.6,
    3.6,
    3.6,
    3.5,
    3.5,
    3.5,
    3.3,
    3.4,
    3.3,
    3.4,
    3.3,
    3.3,
    3.3,
    3.3,
    3.3,
    3.4,
    3.4,
    3.4,
    3.4,
    3.3,
    3.2,
    3.3,
    3.3,
    3.2,
    3.3,
    3.4,
    3.1,
    3.5,
    3.3,
    3.3,
    3.4,
    3.2,
    3.3,
    null
  ],
  "unemployment": [
    3.6,
    3.5,
    3.5,
    3.6,
    3.5,
    3.4,
    3.6,
    3.6,
    3.5,
    3.7,
    3.7,
    3.9,
    3.7,
    3.8,
    3.7,
    3.9,
    3.9,
    3.9,
    3.9,
    4.1,
    4.2,
    4.2,
    4.1,
    4.1,
    4.2,
    4.1,
    4.0,
    4.2,
    4.2,
    4.2,
    4.3,
    4.1,
    4.3,
    4.3,
    4.4,
    null,
    4.5,
    4.4,
    4.3,
    4.4,
    4.3,
    4.3,
    4.3,
    4.2,
    4.1,
    4.1,
    4.2
  ],
  "layoffs": [
    1.0,
    1.0,
    1.1,
    1.0,
    1.2,
    1.1,
    1.0,
    1.1,
    1.1,
    1.1,
    1.0,
    1.0,
    1.0,
    1.1,
    1.0,
    1.1,
    1.0,
    1.0,
    1.1,
    0.9,
    1.1,
    1.1,
    1.1,
    1.0,
    1.2,
    1.1,
    1.1,
    1.2,
    1.0,
    1.1,
    1.1,
    1.2,
    1.1,
    1.2,
    1.1,
    1.2,
    1.0,
    1.1,
    1.0,
    1.1,
    1.2,
    1.0,
    1.1,
    1.1,
    1.1,
    1.0,
    null
  ],
  "gradUnemployment": [
    4.05,
    4.004,
    4.335,
    4.391,
    4.918,
    4.514,
    4.658,
    5.274,
    4.787,
    5.661,
    4.894,
    5.772,
    5.57,
    5.607,
    5.698
  ],
  "gradUnderemployment": [
    38.305,
    39.314,
    40.106,
    40.118,
    40.388,
    40.724,
    40.694,
    40.408,
    38.624,
    41.313,
    41.479,
    41.796,
    42.259,
    41.469,
    41.95
  ]
};

const seriesMeta = [
  {
    "key": "openings",
    "code": "JTSJOR",
    "source": "FRED",
    "color": "var(--teal)",
    "date": "2026-08"
  },
  {
    "key": "hires",
    "code": "JTSHIR",
    "source": "FRED",
    "color": "var(--orange)",
    "date": "2026-08"
  },
  {
    "key": "unemployment",
    "code": "UNRATE",
    "source": "FRED",
    "color": "var(--blue)",
    "date": "2026-09"
  },
  {
    "key": "layoffs",
    "code": "JTSLDR",
    "source": "FRED",
    "color": "var(--pink)",
    "date": "2026-08"
  }
];

const graduateSeriesMeta = [
  {
    "key": "gradUnemployment",
    "code": "RECENT COLLEGE GRADS",
    "source": "NEW YORK FED",
    "color": "var(--violet)",
    "date": "2026 Q2",
    "group": "graduate",
    "axis": "left"
  },
  {
    "key": "gradUnderemployment",
    "code": "RECENT COLLEGE GRADS",
    "source": "NEW YORK FED",
    "color": "var(--gold)",
    "date": "2026 Q2",
    "group": "graduate",
    "axis": "right"
  }
];

const allSeriesMeta = [...seriesMeta, ...graduateSeriesMeta];

const copy = {
  "zh": {
    "eyebrow": "数据观察 · 2022.11—2026.09",
    "title": "AI 时代的<br><em>美国就业脉搏</em>",
    "dek": "招聘放缓、裁员率仍低，近期大学毕业生的就业压力高于生成式 AI 兴起之初。",
    "overviewTitle": "四项总体指标",
    "overviewHint": "移动鼠标或触摸图表，查看每月数据",
    "graduateOverviewTitle": "近期大学毕业生就业状况",
    "graduateOverviewHint": "季度末读数；左右坐标轴采用不同量程",
    "unit": "单位：百分比（%）",
    "source": "来源：U.S. Bureau of Labor Statistics / FRED",
    "graduateUnit": "单位：百分比（%）· 季度末读数",
    "graduateSource": "来源：Federal Reserve Bank of New York",
    "readingKicker": "从数字到信号",
    "detailsTitle": "拆开每一条曲线",
    "footerText": "美国劳动力市场数据观察",
    "footerNote": "JOLTS 为月度季调数据；近期毕业生指标为纽约联储季度末读数。",
    "openings": "职位空缺率",
    "hires": "雇佣率",
    "unemployment": "总体失业率",
    "layoffs": "裁员与解雇率",
    "gradUnemployment": "近期毕业生失业率",
    "gradUnderemployment": "近期毕业生就业不足率",
    "latest": "最新",
    "noData": "无数据",
    "sinceBaseline": "较起点",
    "overviewAria": "四项美国就业总体指标对比折线图",
    "graduateOverviewAria": "美国近期大学毕业生失业率与就业不足率折线图",
    "readingText": "<li><strong>招聘入口收窄。</strong>2026 年 8 月职位空缺率为 4.3%、雇佣率为 3.3%，较 2022 年 11 月分别下降 2.1 和 0.7 个百分点，企业新增用人需求与招聘活动均低于起点。</li><li><strong>裁员仍低，失业率温和上行。</strong>8 月裁员与解雇率为 1.0%，与起点持平；9 月总体失业率为 4.2%，较起点上升 0.6 个百分点。这些指标更接近招聘放缓的图景，未显示裁员率持续抬升。</li><li><strong>近期毕业生压力高于起点。</strong>截至 2026 年第二季度，季度末失业率约为 5.7%（2022 年末约 4%），就业不足率约为 42.0%（起点为 38.3%）；相较上一季度，两项指标均小幅上升。</li><li><strong>就业不足不等于失业。</strong>纽约联储的近期毕业生指 22–27 岁、已离校且拥有本科及以上学历的人群；就业不足率衡量已就业者中从事通常不要求本科学历工作的比例，不包含失业者。</li><li><strong>趋势不能单独证明 AI 的因果作用。</strong>利率、经济周期和疫情后招聘正常化同样影响劳动力需求；不同指标发布进度不同，毕业生曲线为季度末读数，总体失业率在 2025 年 10 月存在数据缺口。</li>",
    "notes": {
      "openings": "职位空缺数占就业人数与职位空缺数之和的比例；月度、季节调整。",
      "hires": "当月雇佣人数占就业人数的比例；月度、季节调整。",
      "unemployment": "劳动力人口中的失业者比例（U-3）；月度、季节调整。",
      "layoffs": "当月裁员与解雇人数占就业人数的比例；月度、季节调整。",
      "gradUnemployment": "纽约联储近期大学毕业生失业率；取每年 3、6、9、12 月读数。",
      "gradUnderemployment": "已就业近期毕业生中，从事通常不要求本科学历工作的比例；季度末读数。"
    }
  },
  "en": {
    "eyebrow": "DATA OBSERVATION · NOV 2022—SEP 2026",
    "title": "America’s jobs pulse<br><em>in the age of AI</em>",
    "dek": "Hiring has slowed and layoffs remain low, while recent graduates face more pressure than at the start of the generative AI boom.",
    "overviewTitle": "Four economy-wide indicators",
    "overviewHint": "Hover or touch the chart to inspect monthly values",
    "graduateOverviewTitle": "Recent college graduate outcomes",
    "graduateOverviewHint": "Quarter-end readings; left and right axes use different scales",
    "unit": "Unit: percent (%)",
    "source": "Source: U.S. Bureau of Labor Statistics / FRED",
    "graduateUnit": "Unit: percent (%) · quarter-end readings",
    "graduateSource": "Source: Federal Reserve Bank of New York",
    "readingKicker": "FROM NUMBERS TO SIGNAL",
    "detailsTitle": "Inside each curve",
    "footerText": "U.S. labor market data observation",
    "footerNote": "JOLTS is monthly and seasonally adjusted; graduate figures are New York Fed quarter-end readings.",
    "openings": "Job openings rate",
    "hires": "Hires rate",
    "unemployment": "Overall unemployment rate",
    "layoffs": "Layoffs & discharges rate",
    "gradUnemployment": "Recent graduate unemployment",
    "gradUnderemployment": "Recent graduate underemployment",
    "latest": "Latest",
    "noData": "No data",
    "sinceBaseline": "vs baseline",
    "overviewAria": "Comparison chart of four economy-wide U.S. employment indicators",
    "graduateOverviewAria": "U.S. recent college graduate unemployment and underemployment rates",
    "readingText": "<li><strong>The hiring gate has narrowed.</strong>In August 2026, openings were 4.3% and hires 3.3%, down 2.1 and 0.7 percentage points respectively from November 2022. Both labor demand and hiring activity remain below the baseline.</li><li><strong>Layoffs remain low as unemployment edges up.</strong>August layoffs and discharges were 1.0%, unchanged from the baseline. September unemployment was 4.2%, up 0.6 percentage points. The indicators are consistent with slower hiring, without a sustained rise in the layoff rate.</li><li><strong>Recent graduates face more pressure than at the baseline.</strong>At the end of Q2 2026, unemployment was about 5.7% (about 4% at the end of 2022), and underemployment about 42.0% (38.3% at the baseline). Both quarter-end readings rose slightly from Q1.</li><li><strong>Underemployment is different from unemployment.</strong>The New York Fed defines recent graduates as out-of-school degree holders aged 22–27. Underemployment measures the share of employed graduates in jobs that typically do not require a bachelor’s degree; it excludes the unemployed.</li><li><strong>These trends alone do not establish an AI effect.</strong>Interest rates, the economic cycle and post-pandemic hiring normalization also affect demand. Release schedules differ; graduate charts use quarter-end readings, and overall unemployment has a missing observation for October 2025.</li>",
    "notes": {
      "openings": "Job openings as a share of employment plus openings; monthly, seasonally adjusted.",
      "hires": "Monthly hires as a share of employment; seasonally adjusted.",
      "unemployment": "Unemployed people as a share of the labor force (U-3); monthly, seasonally adjusted.",
      "layoffs": "Monthly layoffs and discharges as a share of employment; seasonally adjusted.",
      "gradUnemployment": "New York Fed recent-graduate unemployment; March, June, September and December readings.",
      "gradUnderemployment": "Employed recent graduates in jobs that typically do not require a degree; quarter-end readings."
    }
  }
};

let lang = localStorage.getItem("employment-lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
let hiddenSeries = new Set();
let hiddenGraduateSeries = new Set();
const tooltip = document.getElementById("tooltip");

function latestValue(values) { for (let i=values.length-1;i>=0;i--) if (values[i] != null) return values[i]; return null; }
function changePercent(key) {
  const start = raw[key][0], end = latestValue(raw[key]);
  return ((end - start) / start) * 100;
}
function formatChange(key) {
  const value = changePercent(key);
  if (Math.abs(value) < .05) return "0.0%";
  return `${value > 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}%`;
}
function currentTheme() { return document.documentElement.dataset.theme; }
function initTheme() {
  const saved = localStorage.getItem("employment-theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  updateThemeLabel();
}
function updateThemeLabel() {
  const dark = currentTheme() === "dark";
  document.getElementById("themeToggle").setAttribute("aria-label", lang === "zh" ? (dark ? "切换至亮色模式" : "切换至暗色模式") : (dark ? "Switch to light mode" : "Switch to dark mode"));
}

function applyLanguage() {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = lang === "zh" ? "AI 时代的美国就业脉搏" : "America’s Jobs Pulse in the Age of AI";
  document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = copy[lang][el.dataset.i18n]; });
  const spans = document.querySelectorAll("#langToggle span");
  spans[0].classList.toggle("lang-active", lang === "zh"); spans[1].classList.toggle("lang-active", lang === "en");
  document.getElementById("langToggle").setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换至中文");
  document.getElementById("overviewChart").setAttribute("aria-label", copy[lang].overviewAria);
  document.getElementById("graduateOverviewChart").setAttribute("aria-label", copy[lang].graduateOverviewAria);
  tooltip.classList.remove("is-visible");
  updateThemeLabel(); renderAll();
}

function renderLegend(containerId, metaList, hiddenSet, chartId, chartOptions) {
  const container = document.getElementById(containerId);
  container.innerHTML = metaList.map(s => `<button class="legend-item ${hiddenSet.has(s.key)?"is-muted":""}" style="--series-color:${s.color}" data-key="${s.key}" type="button" aria-pressed="${!hiddenSet.has(s.key)}"><span class="legend-check" aria-hidden="true"><i></i></span><span class="legend-name">${copy[lang][s.key]}</span><strong>${formatChange(s.key)}</strong></button>`).join("");
  container.querySelectorAll(".legend-item").forEach(btn => btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    hiddenSet.has(key) ? hiddenSet.delete(key) : hiddenSet.add(key);
    renderLegend(containerId, metaList, hiddenSet, chartId, chartOptions);
    renderChart(document.getElementById(chartId), metaList.filter(s => !hiddenSet.has(s.key)), chartOptions);
  }));
}

function buildCards() {
  document.getElementById("detailGrid").innerHTML = allSeriesMeta.map((s,i) => `
    <article class="chart-card" style="--series-color:${s.color}">
      <div class="card-head"><div><div class="card-title"><i></i><h3>${copy[lang][s.key]}</h3></div><div class="series-code">${s.source} · ${s.code}</div></div>
      <div class="card-stat"><strong>${latestValue(raw[s.key]).toFixed(1)}%</strong><span>${copy[lang].latest} · ${s.date}</span><span class="card-change">${copy[lang].sinceBaseline} <b>${formatChange(s.key)}</b></span></div></div>
      <div class="chart mini-chart" id="chart-${s.key}" role="img" aria-label="${copy[lang][s.key]}"></div>
      <p class="card-note">${copy[lang].notes[s.key]}</p>
    </article>`).join("");
}

function svgEl(name, attrs={}) { const el=document.createElementNS("http://www.w3.org/2000/svg",name); Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v)); return el; }
function niceRange(meta) {
  const vals = raw[meta.key].filter(v=>v!=null), min=Math.min(...vals), max=Math.max(...vals), pad=Math.max((max-min)*.28,.15);
  return { yMin: Math.max(0, Math.floor((min-pad)*10)/10), yMax: Math.ceil((max+pad)*10)/10 };
}
function axisLabel(value) {
  if (value.includes("Q")) return value;
  const [y,mo]=value.split("-");
  return lang === "zh" ? `${y}.${mo}` : new Date(+y,+mo-1,1).toLocaleDateString("en-US",{month:"short",year:"2-digit"});
}

function renderChart(container, metaList, opts={}) {
  if (!container) return;
  container.innerHTML = "";
  const labels = opts.labels || months;
  const width = Math.max(container.clientWidth, 300), height = Math.max(container.clientHeight, 220);
  const mobile = width < 520, margin = {top:18,right:opts.dual?(mobile?38:48):(mobile?12:24),bottom:34,left:mobile?36:44};
  const iw=width-margin.left-margin.right, ih=height-margin.top-margin.bottom;
  const yMin=opts.yMin, yMax=opts.yMax;
  const x=i=>margin.left+(i/(labels.length-1))*iw;
  const y=v=>margin.top+(1-(v-yMin)/(yMax-yMin))*ih;
  const yFor=(meta,v)=>opts.dual && meta.axis==="right" ? margin.top+(1-(v-opts.right.yMin)/(opts.right.yMax-opts.right.yMin))*ih : y(v);
  const svg=svgEl("svg",{viewBox:`0 0 ${width} ${height}`,"aria-hidden":"true"});
  const defs=svgEl("defs"); svg.appendChild(defs);
  for(let t=0;t<=4;t++) {
    const yy=margin.top+(t/4)*ih, val=yMax-(t/4)*(yMax-yMin);
    svg.appendChild(svgEl("line",{x1:margin.left,y1:yy,x2:width-margin.right,y2:yy,class:"grid-line"}));
    const tx=svgEl("text",{x:margin.left-8,y:yy+3,"text-anchor":"end"}); tx.textContent=val.toFixed(yMax-yMin<=1?1:(Number.isInteger(val)?0:1)); svg.appendChild(tx);
    if(opts.dual){ const rightVal=opts.right.yMax-(t/4)*(opts.right.yMax-opts.right.yMin), rx=svgEl("text",{x:width-margin.right+8,y:yy+3,"text-anchor":"start",class:"axis-right"}); rx.textContent=rightVal.toFixed(1); svg.appendChild(rx); }
  }
  const tickStep = opts.tickStep || (labels.length>20?(mobile?12:6):(mobile?4:2));
  const guard = labels.length>20?(mobile?6:4):(mobile?3:2);
  labels.forEach((m,i)=>{ const periodic=i%tickStep===0 && i<labels.length-1-guard; if(periodic || i===labels.length-1){ const tx=svgEl("text",{x:x(i),y:height-8,"text-anchor":i===0?"start":(i===labels.length-1?"end":"middle")}); tx.textContent=axisLabel(m); svg.appendChild(tx); }});
  const dotGroups=[];
  metaList.forEach((meta,si)=>{
    const vals=raw[meta.key], segments=[], bridges=[]; let segment=[];
    vals.forEach((v,i)=>{
      if(v==null){ if(segment.length){ segments.push(segment); segment=[]; } return; }
      if(!segment.length && i>0){ let previous=i-1; while(previous>=0 && vals[previous]==null) previous--; if(previous>=0 && i-previous>1) bridges.push([[previous,vals[previous]],[i,v]]); }
      segment.push([i,v]);
    });
    if(segment.length) segments.push(segment);
    segments.forEach((points,pi)=>{
      const d=points.map(([i,v],j)=>`${j?"L":"M"}${x(i).toFixed(2)},${yFor(meta,v).toFixed(2)}`).join(" ");
      if(!opts.large){ const baseline=opts.dual && meta.axis==="right"?yFor(meta,opts.right.yMin):y(yMin); const area=d+` L${x(points.at(-1)[0])},${baseline} L${x(points[0][0])},${baseline} Z`; const p=svgEl("path",{d:area,class:"series-area",fill:meta.color}); svg.appendChild(p); }
      const p=svgEl("path",{d,class:"series-line",style:`--series-color:${meta.color}`}); svg.appendChild(p);
    });
    bridges.forEach(points=>{ const d=points.map(([i,v],j)=>`${j?"L":"M"}${x(i).toFixed(2)},${yFor(meta,v).toFixed(2)}`).join(" "); svg.appendChild(svgEl("path",{d,class:"series-line series-gap",style:`--series-color:${meta.color}`})); });
    const g=svgEl("g"); vals.forEach((v,i)=>{ if(v!=null) g.appendChild(svgEl("circle",{cx:x(i),cy:yFor(meta,v),r:4,class:"series-dot",style:`--series-color:${meta.color}`,"data-i":i})); }); svg.appendChild(g); dotGroups.push(g);
  });
  const hover=svgEl("line",{y1:margin.top,y2:margin.top+ih,class:"hover-line",visibility:"hidden"}); svg.appendChild(hover);
  const hit=svgEl("rect",{x:margin.left,y:margin.top,width:iw,height:ih,class:"chart-hit"}); svg.appendChild(hit);
  function move(e){
    const rect=svg.getBoundingClientRect(), cx=(e.clientX-rect.left)*(width/rect.width), i=Math.max(0,Math.min(labels.length-1,Math.round(((cx-margin.left)/iw)*(labels.length-1))));
    hover.setAttribute("x1",x(i)); hover.setAttribute("x2",x(i)); hover.setAttribute("visibility","visible");
    dotGroups.forEach(g=>g.querySelectorAll("circle").forEach(c=>c.style.opacity=+c.dataset.i===i?1:0));
    const rows=metaList.map(s=>{const v=raw[s.key][i];return `<div class="tooltip-row"><span><i class="tooltip-swatch" style="--c:${s.color}"></i>${copy[lang][s.key]}</span><strong>${v==null?"—":v.toFixed(1)+"%"}</strong></div>`}).join("");
    tooltip.innerHTML=`<div class="tooltip-date">${axisLabel(labels[i])}</div>${rows}`; tooltip.classList.add("is-visible");
    let left=e.clientX+12, top=e.clientY; const tw=tooltip.offsetWidth; if(left+tw>innerWidth-8) left=e.clientX-tw-12; tooltip.style.left=`${left}px`; tooltip.style.top=`${Math.max(50,Math.min(innerHeight-50,top))}px`;
  }
  function leave(){ hover.setAttribute("visibility","hidden"); dotGroups.forEach(g=>g.querySelectorAll("circle").forEach(c=>c.style.opacity=0)); tooltip.classList.remove("is-visible"); }
  hit.addEventListener("pointermove",move); hit.addEventListener("pointerdown",move); hit.addEventListener("pointerleave",leave);
  container.appendChild(svg);
}

function renderAll() {
  const economyOptions={labels:months,yMin:0,yMax:7,large:true};
  const graduateOptions={labels:quarters,yMin:3.5,yMax:6.2,right:{yMin:37.5,yMax:43},large:true,dual:true,tickStep:2};
  renderLegend("mainLegend",seriesMeta,hiddenSeries,"overviewChart",economyOptions);
  renderLegend("graduateLegend",graduateSeriesMeta,hiddenGraduateSeries,"graduateOverviewChart",graduateOptions);
  buildCards();
  renderChart(document.getElementById("overviewChart"),seriesMeta.filter(s=>!hiddenSeries.has(s.key)),economyOptions);
  renderChart(document.getElementById("graduateOverviewChart"),graduateSeriesMeta.filter(s=>!hiddenGraduateSeries.has(s.key)),graduateOptions);
  allSeriesMeta.forEach(s=>{ const r=niceRange(s); renderChart(document.getElementById(`chart-${s.key}`),[s],{...r,labels:s.group==="graduate"?quarters:months}); });
}

document.getElementById("langToggle").addEventListener("click",()=>{ lang=lang==="zh"?"en":"zh"; localStorage.setItem("employment-lang",lang); applyLanguage(); });
document.getElementById("themeToggle").addEventListener("click",()=>{ const next=currentTheme()==="dark"?"light":"dark"; document.documentElement.dataset.theme=next; localStorage.setItem("employment-theme",next); updateThemeLabel(); });
let resizeTimer; addEventListener("resize",()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(renderAll,120); });
initTheme(); applyLanguage();
