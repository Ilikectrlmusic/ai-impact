const months = [];
for (let y = 2022, m = 11; y < 2026 || (y === 2026 && m <= 8);) {
  months.push(`${y}-${String(m).padStart(2, "0")}`);
  m++; if (m === 13) { m = 1; y++; }
}

const raw = {
  openings: [6.4,6.6,6.2,6.0,5.9,6.0,5.7,5.6,5.3,5.6,5.6,5.2,5.2,5.2,5.1,5.1,5.0,4.6,4.7,4.5,4.5,4.6,4.2,4.5,4.6,4.4,4.5,4.4,4.2,4.3,4.4,4.3,4.3,4.2,4.3,4.3,4.1,4.0,4.4,4.2,4.2,4.6,4.5,4.3,4.4,null],
  hires: [4.0,4.0,4.1,3.9,3.8,3.8,3.9,3.8,3.6,3.7,3.7,3.7,3.5,3.6,3.6,3.6,3.5,3.5,3.5,3.3,3.4,3.3,3.4,3.3,3.3,3.3,3.3,3.3,3.4,3.4,3.4,3.4,3.3,3.2,3.3,3.3,3.2,3.3,3.4,3.1,3.5,3.3,3.3,3.4,3.2,null],
  unemployment: [3.6,3.5,3.5,3.6,3.5,3.4,3.6,3.6,3.5,3.7,3.7,3.9,3.7,3.8,3.7,3.9,3.9,3.9,3.9,4.1,4.2,4.2,4.1,4.1,4.2,4.1,4.0,4.2,4.2,4.2,4.3,4.1,4.3,4.3,4.4,null,4.5,4.4,4.3,4.4,4.3,4.3,4.3,4.2,4.1,4.1],
  layoffs: [1.0,1.0,1.1,1.0,1.2,1.1,1.0,1.1,1.1,1.1,1.0,1.0,1.0,1.1,1.0,1.1,1.0,1.0,1.1,0.9,1.1,1.1,1.1,1.0,1.2,1.1,1.1,1.2,1.0,1.1,1.1,1.2,1.1,1.2,1.1,1.2,1.0,1.1,1.0,1.1,1.2,1.0,1.1,1.1,1.0,null]
};

const seriesMeta = [
  { key: "openings", code: "JTSJOR", color: "var(--teal)", end: "4.4%", date: "2026-07" },
  { key: "hires", code: "JTSHIR", color: "var(--orange)", end: "3.2%", date: "2026-07" },
  { key: "unemployment", code: "UNRATE", color: "var(--blue)", end: "4.1%", date: "2026-08" },
  { key: "layoffs", code: "JTSLDR", color: "var(--pink)", end: "1.0%", date: "2026-07" }
];

const copy = {
  zh: {
    eyebrow:"数据观察 · 2022.11—2026.08", title:"AI 时代的<br><em>美国就业脉搏</em>", dek:"生成式 AI 爆发之后，美国企业在“大量裁人”，还是在“减少招人”？四条劳动力市场曲线给出了一幅更细腻的图景。", thesisLabel:"核心观察", thesis:"招聘需求显著降温，裁员率却几乎没有变化。", overviewTitle:"四项指标总览", overviewHint:"移动鼠标或触摸图表，查看每月数据", unit:"单位：百分比（%）", source:"来源：U.S. Bureau of Labor Statistics / FRED", readingKicker:"从数字到信号", readingText:"从 2022 年 11 月至今，职位空缺率和雇佣率分别下降约 <strong>2.0</strong> 与 <strong>0.8</strong> 个百分点；失业率温和上升，而裁员率仍稳定在低位。企业更像是关小了入口，而非大规模打开出口。", detailsTitle:"拆开每一条曲线", caveatTitle:"相关，不等于因果", caveatText:"这些数据与“企业先减少招聘，而非立即大规模裁员”的机制相容，但不能单独证明 AI 是变化的原因。利率上升、疫情后招聘热潮正常化及经济周期同样会影响劳动力需求。", footerText:"美国劳动力市场数据观察", footerNote:"JOLTS 指标为 Total Nonfarm、月度、季节调整；失业率为 U-3。",
    openings:"职位空缺率", hires:"雇佣率", unemployment:"失业率", layoffs:"裁员与解雇率", latest:"最新", noData:"无数据", overviewAria:"四项美国就业指标对比折线图",
    notes:{openings:"企业未满足的劳动力需求显著回落；较起点下降 2.0 个百分点。",hires:"人员流入速度持续走低；较起点下降 0.8 个百分点。",unemployment:"失业率缓慢上行，但未出现衰退式飙升。2025 年 10 月无调查数据。",layoffs:"长期维持在 1.0% 左右，未呈现趋势性上升。"}
  },
  en: {
    eyebrow:"DATA OBSERVATION · NOV 2022—AUG 2026", title:"America’s jobs pulse<br><em>in the age of AI</em>", dek:"Since the generative AI boom, have U.S. companies been cutting workers—or simply hiring fewer? Four labor-market curves reveal a more nuanced picture.", thesisLabel:"CORE SIGNAL", thesis:"Hiring demand cooled sharply. Layoffs barely moved.", overviewTitle:"Four indicators, one view", overviewHint:"Hover or touch the chart to inspect monthly values", unit:"Unit: percent (%)", source:"Source: U.S. Bureau of Labor Statistics / FRED", readingKicker:"FROM NUMBERS TO SIGNAL", readingText:"Since November 2022, job openings and hires rates have fallen by roughly <strong>2.0</strong> and <strong>0.8</strong> percentage points. Unemployment rose gradually, while layoffs stayed low. Companies appear to be narrowing the entrance—not widening the exit.", detailsTitle:"Inside each curve", caveatTitle:"Correlation is not causation", caveatText:"The data are consistent with firms reducing hiring before making large-scale layoffs, but they do not prove AI caused the shift. Higher interest rates, post-pandemic normalization and the economic cycle also affect labor demand.", footerText:"U.S. labor market data observation", footerNote:"JOLTS: Total Nonfarm, monthly, seasonally adjusted. Unemployment: U-3.",
    openings:"Job openings rate", hires:"Hires rate", unemployment:"Unemployment rate", layoffs:"Layoffs & discharges rate", latest:"Latest", noData:"No data", overviewAria:"Comparison chart of four U.S. employment indicators",
    notes:{openings:"Unmet labor demand fell sharply—down 2.0 percentage points from the baseline.",hires:"The pace of worker inflows slowed—down 0.8 percentage points from the baseline.",unemployment:"Unemployment drifted upward without a recession-style spike. No survey data for Oct 2025.",layoffs:"The rate remained near 1.0%, showing no sustained upward trend."}
  }
};

let lang = localStorage.getItem("employment-lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
let hiddenSeries = new Set();
const charts = [];
const tooltip = document.getElementById("tooltip");

function latestValue(values) { for (let i=values.length-1;i>=0;i--) if (values[i] != null) return values[i]; return null; }
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
  tooltip.classList.remove("is-visible");
  updateThemeLabel(); renderAll();
}

function renderLegend() {
  document.getElementById("mainLegend").innerHTML = seriesMeta.map(s => `<button class="legend-item ${hiddenSeries.has(s.key)?"is-muted":""}" style="--series-color:${s.color}" data-key="${s.key}" type="button" aria-pressed="${!hiddenSeries.has(s.key)}">${copy[lang][s.key]}</button>`).join("");
  document.querySelectorAll(".legend-item").forEach(btn => btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    hiddenSeries.has(key) ? hiddenSeries.delete(key) : hiddenSeries.add(key);
    renderLegend(); renderChart(document.getElementById("overviewChart"), seriesMeta.filter(s => !hiddenSeries.has(s.key)), {yMin:0,yMax:7,large:true});
  }));
}

function buildCards() {
  document.getElementById("detailGrid").innerHTML = seriesMeta.map((s,i) => `
    <article class="chart-card" style="--series-color:${s.color}">
      <div class="card-head"><div><div class="card-title"><i></i><h3>${copy[lang][s.key]}</h3></div><div class="series-code">FRED · ${s.code}</div></div>
      <div class="card-stat"><strong>${s.end}</strong><span>${copy[lang].latest} · ${s.date}</span></div></div>
      <div class="chart mini-chart" id="chart-${s.key}" role="img" aria-label="${copy[lang][s.key]}"></div>
      <p class="card-note">${copy[lang].notes[s.key]}</p>
    </article>`).join("");
}

function svgEl(name, attrs={}) { const el=document.createElementNS("http://www.w3.org/2000/svg",name); Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v)); return el; }
function niceRange(meta) {
  const vals = raw[meta.key].filter(v=>v!=null), min=Math.min(...vals), max=Math.max(...vals), pad=Math.max((max-min)*.28,.15);
  return { yMin: Math.max(0, Math.floor((min-pad)*10)/10), yMax: Math.ceil((max+pad)*10)/10 };
}
function monthLabel(m) { const [y,mo]=m.split("-"); return lang === "zh" ? `${y}.${mo}` : new Date(+y,+mo-1,1).toLocaleDateString("en-US",{month:"short",year:"2-digit"}); }

function renderChart(container, metaList, opts={}) {
  if (!container) return;
  container.innerHTML = "";
  const width = Math.max(container.clientWidth, 300), height = Math.max(container.clientHeight, 220);
  const mobile = width < 520, margin = {top:18,right:mobile?12:24,bottom:34,left:mobile?36:44};
  const iw=width-margin.left-margin.right, ih=height-margin.top-margin.bottom;
  const yMin=opts.yMin, yMax=opts.yMax;
  const x=i=>margin.left+(i/(months.length-1))*iw, y=v=>margin.top+(1-(v-yMin)/(yMax-yMin))*ih;
  const svg=svgEl("svg",{viewBox:`0 0 ${width} ${height}`,"aria-hidden":"true"});
  const defs=svgEl("defs"); svg.appendChild(defs);
  for(let t=0;t<=4;t++) { const yy=margin.top+(t/4)*ih, val=yMax-(t/4)*(yMax-yMin); svg.appendChild(svgEl("line",{x1:margin.left,y1:yy,x2:width-margin.right,y2:yy,class:"grid-line"})); const tx=svgEl("text",{x:margin.left-8,y:yy+3,"text-anchor":"end"}); tx.textContent=val.toFixed(yMax-yMin<=1?1:(Number.isInteger(val)?0:1)); svg.appendChild(tx); }
  const tickStep = mobile ? 12 : 6;
  months.forEach((m,i)=>{ const periodic=i%tickStep===0 && i<months.length-1-(mobile?6:4); if(periodic || i===months.length-1){ const tx=svgEl("text",{x:x(i),y:height-8,"text-anchor":i===0?"start":(i===months.length-1?"end":"middle")}); tx.textContent=monthLabel(m); svg.appendChild(tx); }});
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
      const d=points.map(([i,v],j)=>`${j?"L":"M"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
      if(!opts.large){ const area=d+` L${x(points.at(-1)[0])},${y(yMin)} L${x(points[0][0])},${y(yMin)} Z`; const p=svgEl("path",{d:area,class:"series-area",fill:meta.color}); svg.appendChild(p); }
      const p=svgEl("path",{d,class:"series-line",style:`--series-color:${meta.color}`}); svg.appendChild(p);
    });
    bridges.forEach(points=>{ const d=points.map(([i,v],j)=>`${j?"L":"M"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" "); svg.appendChild(svgEl("path",{d,class:"series-line series-gap",style:`--series-color:${meta.color}`})); });
    const g=svgEl("g"); vals.forEach((v,i)=>{ if(v!=null) g.appendChild(svgEl("circle",{cx:x(i),cy:y(v),r:4,class:"series-dot",style:`--series-color:${meta.color}`,"data-i":i})); }); svg.appendChild(g); dotGroups.push(g);
  });
  const hover=svgEl("line",{y1:margin.top,y2:margin.top+ih,class:"hover-line",visibility:"hidden"}); svg.appendChild(hover);
  const hit=svgEl("rect",{x:margin.left,y:margin.top,width:iw,height:ih,class:"chart-hit"}); svg.appendChild(hit);
  function move(e){
    const rect=svg.getBoundingClientRect(), cx=(e.clientX-rect.left)*(width/rect.width), i=Math.max(0,Math.min(months.length-1,Math.round(((cx-margin.left)/iw)*(months.length-1))));
    hover.setAttribute("x1",x(i)); hover.setAttribute("x2",x(i)); hover.setAttribute("visibility","visible");
    dotGroups.forEach(g=>g.querySelectorAll("circle").forEach(c=>c.style.opacity=+c.dataset.i===i?1:0));
    const rows=metaList.map(s=>{const v=raw[s.key][i];return `<div class="tooltip-row"><span><i class="tooltip-swatch" style="--c:${s.color}"></i>${copy[lang][s.key]}</span><strong>${v==null?"—":v.toFixed(1)+"%"}</strong></div>`}).join("");
    tooltip.innerHTML=`<div class="tooltip-date">${monthLabel(months[i])}</div>${rows}`; tooltip.classList.add("is-visible");
    let left=e.clientX+12, top=e.clientY; const tw=tooltip.offsetWidth; if(left+tw>innerWidth-8) left=e.clientX-tw-12; tooltip.style.left=`${left}px`; tooltip.style.top=`${Math.max(50,Math.min(innerHeight-50,top))}px`;
  }
  function leave(){ hover.setAttribute("visibility","hidden"); dotGroups.forEach(g=>g.querySelectorAll("circle").forEach(c=>c.style.opacity=0)); tooltip.classList.remove("is-visible"); }
  hit.addEventListener("pointermove",move); hit.addEventListener("pointerdown",move); hit.addEventListener("pointerleave",leave);
  container.appendChild(svg);
}

function renderAll() {
  renderLegend(); buildCards();
  renderChart(document.getElementById("overviewChart"),seriesMeta.filter(s=>!hiddenSeries.has(s.key)),{yMin:0,yMax:7,large:true});
  seriesMeta.forEach(s=>{ const r=niceRange(s); renderChart(document.getElementById(`chart-${s.key}`),[s],r); });
}

document.getElementById("langToggle").addEventListener("click",()=>{ lang=lang==="zh"?"en":"zh"; localStorage.setItem("employment-lang",lang); applyLanguage(); });
document.getElementById("themeToggle").addEventListener("click",()=>{ const next=currentTheme()==="dark"?"light":"dark"; document.documentElement.dataset.theme=next; localStorage.setItem("employment-theme",next); updateThemeLabel(); });
let resizeTimer; addEventListener("resize",()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(renderAll,120); });
initTheme(); applyLanguage();
