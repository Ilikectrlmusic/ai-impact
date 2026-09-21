const months = [];
for (let y = 2022, m = 11; y < 2026 || (y === 2026 && m <= 8);) {
  months.push(`${y}-${String(m).padStart(2, "0")}`);
  m++; if (m === 13) { m = 1; y++; }
}
const quarters = ["2022 Q4","2023 Q1","2023 Q2","2023 Q3","2023 Q4","2024 Q1","2024 Q2","2024 Q3","2024 Q4","2025 Q1","2025 Q2","2025 Q3","2025 Q4","2026 Q1","2026 Q2"];

const raw = {
  openings: [6.4,6.6,6.2,6.0,5.9,6.0,5.7,5.6,5.3,5.6,5.6,5.2,5.2,5.2,5.1,5.1,5.0,4.6,4.7,4.5,4.5,4.6,4.2,4.5,4.6,4.4,4.5,4.4,4.2,4.3,4.4,4.3,4.3,4.2,4.3,4.3,4.1,4.0,4.4,4.2,4.2,4.6,4.5,4.3,4.4,null],
  hires: [4.0,4.0,4.1,3.9,3.8,3.8,3.9,3.8,3.6,3.7,3.7,3.7,3.5,3.6,3.6,3.6,3.5,3.5,3.5,3.3,3.4,3.3,3.4,3.3,3.3,3.3,3.3,3.3,3.4,3.4,3.4,3.4,3.3,3.2,3.3,3.3,3.2,3.3,3.4,3.1,3.5,3.3,3.3,3.4,3.2,null],
  unemployment: [3.6,3.5,3.5,3.6,3.5,3.4,3.6,3.6,3.5,3.7,3.7,3.9,3.7,3.8,3.7,3.9,3.9,3.9,3.9,4.1,4.2,4.2,4.1,4.1,4.2,4.1,4.0,4.2,4.2,4.2,4.3,4.1,4.3,4.3,4.4,null,4.5,4.4,4.3,4.4,4.3,4.3,4.3,4.2,4.1,4.1],
  layoffs: [1.0,1.0,1.1,1.0,1.2,1.1,1.0,1.1,1.1,1.1,1.0,1.0,1.0,1.1,1.0,1.1,1.0,1.0,1.1,0.9,1.1,1.1,1.1,1.0,1.2,1.1,1.1,1.2,1.0,1.1,1.1,1.2,1.1,1.2,1.1,1.2,1.0,1.1,1.0,1.1,1.2,1.0,1.1,1.1,1.0,null],
  gradUnemployment: [4.0,4.0,4.3,4.4,4.9,4.5,4.7,5.3,4.8,5.7,4.9,5.8,5.6,5.6,5.7],
  gradUnderemployment: [38.3,39.3,40.1,40.1,40.4,40.7,40.7,40.4,38.6,41.3,41.5,41.8,42.3,41.5,42.0]
};

const seriesMeta = [
  { key: "openings", code: "JTSJOR", source: "FRED", color: "var(--teal)", end: "4.4%", date: "2026-07" },
  { key: "hires", code: "JTSHIR", source: "FRED", color: "var(--orange)", end: "3.2%", date: "2026-07" },
  { key: "unemployment", code: "UNRATE", source: "FRED", color: "var(--blue)", end: "4.1%", date: "2026-08" },
  { key: "layoffs", code: "JTSLDR", source: "FRED", color: "var(--pink)", end: "1.0%", date: "2026-07" }
];
const graduateSeriesMeta = [
  { key: "gradUnemployment", code: "RECENT COLLEGE GRADS", source: "NEW YORK FED", color: "var(--violet)", end: "5.7%", date: "2026 Q2", group: "graduate", axis: "left" },
  { key: "gradUnderemployment", code: "RECENT COLLEGE GRADS", source: "NEW YORK FED", color: "var(--gold)", end: "42.0%", date: "2026 Q2", group: "graduate", axis: "right" }
];
const allSeriesMeta = [...seriesMeta, ...graduateSeriesMeta];

const copy = {
  zh: {
    eyebrow:"数据观察 · 2022.11—2026.08", title:"AI 时代的<br><em>美国就业脉搏</em>", dek:"生成式 AI 爆发之后，美国企业在“大量裁人”，还是在“减少招人”？六条劳动力市场曲线把总体降温与年轻毕业生的压力放在同一幅图景中。", thesisLabel:"核心观察", thesis:"招聘入口收窄、裁员率仍低，但近期大学毕业生承受的就业压力明显上升。", overviewTitle:"四项总体指标", overviewHint:"移动鼠标或触摸图表，查看每月数据", graduateOverviewTitle:"近期大学毕业生就业状况", graduateOverviewHint:"季度末读数；左右坐标轴采用不同量程", unit:"单位：百分比（%）", source:"来源：U.S. Bureau of Labor Statistics / FRED", graduateUnit:"单位：百分比（%）· 季度末读数", graduateSource:"来源：Federal Reserve Bank of New York", readingKicker:"从数字到信号", readingText:"总体市场更像是<strong>少招人</strong>而非大规模裁人：职位空缺率和雇佣率显著下降，裁员率仍在低位。与此同时，近期大学毕业生失业率从 <strong>4.0%</strong> 升至 <strong>5.7%</strong>，就业不足率从 <strong>38.3%</strong> 升至 <strong>42.0%</strong>——劳动力市场的入口压力在年轻高学历群体中更为突出。", detailsTitle:"拆开每一条曲线", caveatTitle:"压力集中，不代表因果已确认", caveatText:"六项数据共同显示招聘放缓与近期大学毕业生处境恶化，但不能单独证明 AI 是原因。纽约联储的就业不足率只统计已经就业、但从事通常不要求本科学历工作的近期毕业生，并不包含失业者；利率、经济周期和疫情后正常化同样影响这些指标。", footerText:"美国劳动力市场数据观察", footerNote:"JOLTS 为月度季调数据；近期毕业生指标为纽约联储季度末读数。",
    openings:"职位空缺率", hires:"雇佣率", unemployment:"总体失业率", layoffs:"裁员与解雇率", gradUnemployment:"近期毕业生失业率", gradUnderemployment:"近期毕业生就业不足率", latest:"最新", noData:"无数据", sinceBaseline:"较起点", overviewAria:"四项美国就业总体指标对比折线图", graduateOverviewAria:"美国近期大学毕业生失业率与就业不足率折线图",
    notes:{openings:"企业未满足的劳动力需求显著回落；较起点下降 2.0 个百分点。",hires:"人员流入速度持续走低；较起点下降 0.8 个百分点。",unemployment:"总体失业率缓慢上行，但未出现衰退式飙升。2025 年 10 月无调查数据。",layoffs:"长期维持在 1.0% 左右，未呈现趋势性上升。",gradUnemployment:"22–27 岁、已离校且拥有本科及以上学历人群的失业率，较 2022 Q4 上升 1.7 个百分点。",gradUnderemployment:"在已就业的近期大学毕业生中，从事通常不要求本科学历工作的比例升至 42.0%。"}
  },
  en: {
    eyebrow:"DATA OBSERVATION · NOV 2022—AUG 2026", title:"America’s jobs pulse<br><em>in the age of AI</em>", dek:"Since the generative AI boom, have U.S. companies been cutting workers—or simply hiring fewer? Six labor-market curves connect the broad slowdown with pressure on young graduates.", thesisLabel:"CORE SIGNAL", thesis:"The hiring gate narrowed and layoffs stayed low—yet recent graduates face markedly greater pressure.", overviewTitle:"Four economy-wide indicators", overviewHint:"Hover or touch the chart to inspect monthly values", graduateOverviewTitle:"Recent college graduate outcomes", graduateOverviewHint:"Quarter-end readings; left and right axes use different scales", unit:"Unit: percent (%)", source:"Source: U.S. Bureau of Labor Statistics / FRED", graduateUnit:"Unit: percent (%) · quarter-end readings", graduateSource:"Source: Federal Reserve Bank of New York", readingKicker:"FROM NUMBERS TO SIGNAL", readingText:"The broad market looks more like <strong>less hiring</strong> than mass firing: openings and hires fell sharply while layoffs stayed low. At the same time, recent-graduate unemployment rose from <strong>4.0%</strong> to <strong>5.7%</strong>, and underemployment from <strong>38.3%</strong> to <strong>42.0%</strong>—suggesting sharper entry pressure for young degree holders.", detailsTitle:"Inside each curve", caveatTitle:"Concentrated pressure is not proven causation", caveatText:"Together, the six indicators show slower hiring and worsening outcomes for recent graduates, but they do not prove AI caused either trend. The New York Fed underemployment rate covers employed graduates working in jobs that typically do not require a bachelor’s degree; it excludes the unemployed. Interest rates, the economic cycle and post-pandemic normalization also matter.", footerText:"U.S. labor market data observation", footerNote:"JOLTS is monthly and seasonally adjusted; recent-graduate figures are New York Fed quarter-end readings.",
    openings:"Job openings rate", hires:"Hires rate", unemployment:"Overall unemployment rate", layoffs:"Layoffs & discharges rate", gradUnemployment:"Recent graduate unemployment", gradUnderemployment:"Recent graduate underemployment", latest:"Latest", noData:"No data", sinceBaseline:"vs baseline", overviewAria:"Comparison chart of four economy-wide U.S. employment indicators", graduateOverviewAria:"U.S. recent college graduate unemployment and underemployment rates",
    notes:{openings:"Unmet labor demand fell sharply—down 2.0 percentage points from the baseline.",hires:"The pace of worker inflows slowed—down 0.8 percentage points from the baseline.",unemployment:"Overall unemployment drifted upward without a recession-style spike. No survey data for Oct 2025.",layoffs:"The rate remained near 1.0%, showing no sustained upward trend.",gradUnemployment:"Unemployment among out-of-school bachelor’s degree holders aged 22–27 rose 1.7 percentage points from Q4 2022.",gradUnderemployment:"Among employed recent graduates, the share in jobs that typically do not require a degree reached 42.0%."}
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
      <div class="card-stat"><strong>${s.end}</strong><span>${copy[lang].latest} · ${s.date}</span><span class="card-change">${copy[lang].sinceBaseline} <b>${formatChange(s.key)}</b></span></div></div>
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
