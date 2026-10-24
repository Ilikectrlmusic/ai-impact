let lang = localStorage.getItem("employment-lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
const hiddenByChart = new Map(pageConfig.overviews.map(chart => [chart.chartId, new Set()]));
const tooltip = document.getElementById("tooltip");

function latestValue(values) { for (let i=values.length-1;i>=0;i--) if (values[i] != null) return values[i]; return null; }
function changePercent(key) {
  const start = raw[key][0], end = latestValue(raw[key]);
  const meta = allSeriesMeta.find(s => s.key === key);
  return meta.changeUnit === "pp" ? end - start : ((end - start) / start) * 100;
}
function formatChange(key) {
  const value = changePercent(key);
  const meta = allSeriesMeta.find(s => s.key === key);
  const unit = meta.changeUnit === "pp" ? (lang === "zh" ? " 个百分点" : " pp") : "%";
  if (Math.abs(value) < .05) return `0.0${unit}`;
  return `${value > 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}${unit}`;
}
function formatValue(key, value) {
  if (value == null) return "—";
  const meta = allSeriesMeta.find(s => s.key === key);
  return value.toFixed(meta.decimals ?? 1) + (meta.suffix ?? "%");
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
  document.title = pageConfig.documentTitle[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = copy[lang][el.dataset.i18n]; });
  const spans = document.querySelectorAll("#langToggle span");
  spans[0].classList.toggle("lang-active", lang === "zh"); spans[1].classList.toggle("lang-active", lang === "en");
  document.getElementById("langToggle").setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换至中文");
  pageConfig.overviews.forEach(chart => document.getElementById(chart.chartId).setAttribute("aria-label", copy[lang][chart.ariaKey]));
  document.querySelector(".page-nav").setAttribute("aria-label", lang === "zh" ? "主题导航" : "Topics");
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
      <div class="card-stat"><strong>${formatValue(s.key, latestValue(raw[s.key]))}</strong>${copy[lang].units?.[s.key] ? `<span class="card-unit">${copy[lang].units[s.key]}</span>` : ""}<span>${copy[lang].latest} · ${s.date}</span><span class="card-change">${copy[lang].sinceBaseline} <b>${formatChange(s.key)}</b></span></div></div>
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
    const vals=(opts.values || raw)[meta.key], segments=[], bridges=[]; let segment=[];
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
    const rows=metaList.map(s=>{const v=(opts.values || raw)[s.key][i];return `<div class="tooltip-row"><span><i class="tooltip-swatch" style="--c:${s.color}"></i>${copy[lang][s.key]}</span><strong>${opts.values ? (v==null ? "—" : v.toFixed(1)) : formatValue(s.key, v) + (copy[lang].valueSuffix?.[s.key] || "")}</strong></div>`}).join("");
    tooltip.innerHTML=`<div class="tooltip-date">${axisLabel(labels[i])}</div>${rows}`; tooltip.classList.add("is-visible");
    let left=e.clientX+12, top=e.clientY; const tw=tooltip.offsetWidth; if(left+tw>innerWidth-8) left=e.clientX-tw-12; tooltip.style.left=`${left}px`; tooltip.style.top=`${Math.max(50,Math.min(innerHeight-50,top))}px`;
  }
  function leave(){ hover.setAttribute("visibility","hidden"); dotGroups.forEach(g=>g.querySelectorAll("circle").forEach(c=>c.style.opacity=0)); tooltip.classList.remove("is-visible"); }
  hit.addEventListener("pointermove",move); hit.addEventListener("pointerdown",move); hit.addEventListener("pointerleave",leave);
  container.appendChild(svg);
}

function renderAll() {
  pageConfig.overviews.forEach(chart => {
    const meta = chart.keys.map(key => allSeriesMeta.find(s => s.key === key));
    const hidden = hiddenByChart.get(chart.chartId);
    renderLegend(chart.legendId, meta, hidden, chart.chartId, chart.options);
    renderChart(document.getElementById(chart.chartId), meta.filter(s => !hidden.has(s.key)), chart.options);
  });
  buildCards();
  allSeriesMeta.forEach(s => {
    const labels = s.labels || (s.group === "graduate" ? quarters : months);
    renderChart(document.getElementById(`chart-${s.key}`), [s], { ...niceRange(s), labels });
  });
}

document.getElementById("langToggle").addEventListener("click",()=>{ lang=lang==="zh"?"en":"zh"; localStorage.setItem("employment-lang",lang); applyLanguage(); });
document.getElementById("themeToggle").addEventListener("click",()=>{ const next=currentTheme()==="dark"?"light":"dark"; document.documentElement.dataset.theme=next; localStorage.setItem("employment-theme",next); updateThemeLabel(); });
let resizeTimer; addEventListener("resize",()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(renderAll,120); });
initTheme(); applyLanguage();
