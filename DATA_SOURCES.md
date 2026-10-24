# 图表数据来源

核查日期：2026-10-24。数据作为静态快照保存在 `app.js`，不是实时接口。

| 指标 | 官方来源 | 最新观察期 | 最新值 |
| --- | --- | --- | --- |
| 职位空缺率 | [FRED / BLS JTSJOR](https://fred.stlouisfed.org/data/JTSJOR) | 2026-08 | 4.3% |
| 雇佣率 | [FRED / BLS JTSHIR](https://fred.stlouisfed.org/data/JTSHIR) | 2026-08 | 3.3% |
| 总体失业率 | [FRED / BLS UNRATE](https://fred.stlouisfed.org/data/UNRATE) | 2026-09 | 4.2% |
| 裁员与解雇率 | [FRED / BLS JTSLDR](https://fred.stlouisfed.org/data/JTSLDR) | 2026-08 | 1.0% |
| 近期毕业生失业率 | [纽约联储 CSV](https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/college-labor-unemployment-data.csv) | 2026-06（Q2 末） | 5.698% |
| 近期毕业生就业不足率 | [纽约联储 CSV](https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/college-labor-underemployment-data.csv) | 2026-06（Q2 末） | 41.950% |

- 月度序列从 2022-11 开始，使用 FRED 完整观察值表核对，包括历史修订值；JOLTS 为 Total Nonfarm、季节调整，UNRATE 为季调 U-3。
- 月度共用时间轴截至 2026-09；尚未发布的 9 月 JOLTS 读数保留为 `null`，不外推。2025-10 的 UNRATE 缺失值也保留为 `null`。
- 毕业生序列取纽约联储 CSV 中 `Recent graduates` 列每年 3、6、9、12 月读数，从 2022-12 开始；这是季度末抽样，不是季度平均值。保留来源精度，页面显示一位小数。
- 卡片最新值根据序列自动计算；图例和卡片的“较起点”为相对百分比变化，结论中的变化量使用百分点。
- [纽约联储方法与定义](https://www.newyorkfed.org/research/college-labor-market)：近期毕业生为 22–27 岁、已离校、本科及以上学历人群；就业不足率的分母为已就业者。

后续更新时，重新下载完整观察值表和两个 CSV，检查历史修订、各序列最新日期和缺失值，并同步更新结论、中英文文案、时间轴和本记录。不要用预测值补齐未发布月份，也不要将季度末读数称作季度均值。

## 企业页：AI 产业链、美国整体与效率

核查日期：2026-10-24；观察窗口至 2026 Q2。保留 AI 产业链与美国整体利润对比、实际产出 / 工时 / 生产率走势，以及三张指标卡片。公司样本使用默认收起的原生 details / summary，支持点击和键盘展开。

招聘率、零售与运输仓储序列及其结论已从企业页和企业数据快照中移除。就业页仍使用其独立的原有数据。

企业页每个季度点采用近一年窗口。美国整体近四季平均利润增长 30.4%，价格调整后增长 17.3%；与旧版单季端点的 41.4% 口径不同。起点窗口包含 ChatGPT 发布前数据，不是严格的实验前后划分。

### AI 产业链公司：固定四家，全球 GAAP 经营利润

选样覆盖芯片 / 加速计算（NVIDIA）与三大云平台（Microsoft、Alphabet、Amazon），不是按事后增幅挑选的股票组合，也不覆盖全部 AI 产业链。选择 GAAP 经营利润，减少证券估值损益及税率变化对比较的干扰，但并不剔除所有一次性会计影响。公司整体业务均包含非 AI 项目；公开财报不能把这些利润全部归因为 AI。未将未上市公司或无法取得可比 GAAP 财报的公司并入。

来源为 SEC Company Facts 的 `us-gaap:OperatingIncomeLoss`（USD）及对应 10-K / 10-Q，仅使用截至 2026-10-24 已披露的事实，保留当时可用的历史修订。源观察与申报 accession / EDGAR 链接保存在 [`data/ai-company-quarterly.csv`](data/ai-company-quarterly.csv)，其中也保留微软 2021 下半年的两个财季，供 2022 财年第四季减法勾稽；推算季度行额外保存年报原值和起始日。TTM 复算结果在 [`data/ai-company-ttm.csv`](data/ai-company-ttm.csv)。

| 公司 | SEC Company Facts | 起点 TTM（十亿美元） | 最新 TTM（十亿美元） | 最新财季结束 |
| --- | --- | ---: | ---: | --- |
| NVIDIA | [CIK 1045810](https://data.sec.gov/api/xbrl/companyfacts/CIK0001045810.json) | 4.224 | 197.579 | 2026-07-26 |
| Microsoft | [CIK 789019](https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json) | 82.815 | 155.237 | 2026-06-30 |
| Alphabet | [CIK 1652044](https://data.sec.gov/api/xbrl/companyfacts/CIK0001652044.json) | 74.842 | 147.628 | 2026-06-30 |
| Amazon | [CIK 1018724](https://data.sec.gov/api/xbrl/companyfacts/CIK0001018724.json) | 12.248 | 93.712 | 2026-06-30 |
| 合计 | 四家经营利润求和 | 174.129 | 594.156 | 各自财季，见上 |

- TTM = 四个相邻、不重叠的财季经营利润之和；不将 YTD 累计值误当作单季值。未直接披露的第四财季，用全年经营利润减前三季得到。
- NVIDIA 财季通常较自然季度滞后约一个月，按最近自然季末归组；2022 Q4 起点是截至 2023-01-29 的财年，2026 Q2 组包含截至 2026-07-26 的财季。其余三家起点截至 2022-12-31，最新截至 2026-06-30。页面明确标出该时差，不伪装为完全一致的自然季度。
- 样本使用合计美元利润增长，不是个股增幅的等权平均。合计从 174.129 增至 594.156 十亿美元，增长 **241.216%**；应同时查看四家公司，尤其 NVIDIA、Amazon 的低基数效应。
- 这是全球公司经营利润，**美国整体**是境内公司制企业税前利润，后者还包含样本在美活动。不能将两者相减，不能据此得到“剔除 AI 后的美国利润”或样本对美国利润增量的贡献。

### 美国整体与生产率

经济原始序列见 `data/business-source.csv`，列为 series、date、value、source_url。所有输入为季度序列，date 表示季度首日；范围为 2022 Q1 至 2026 Q2，足以计算 2022 Q4 起的近四季窗口。

| 序列 | 定义 | 原始单位 |
| --- | --- | --- |
| [A445RC1Q027SBEA](https://fred.stlouisfed.org/data/A445RC1Q027SBEA) | BEA 境内公司制企业税前利润，含 IVA / CCAdj | 十亿美元，季调年率 |
| [GDPDEF](https://fred.stlouisfed.org/data/GDPDEF) | BEA GDP 平减指数 | 2017 = 100，季调 |
| [OPHNFB](https://fred.stlouisfed.org/data/OPHNFB) | BLS 非农商业部门每小时实际产出 | 2017 = 100，季调 |
| [OUTNFB](https://fred.stlouisfed.org/data/OUTNFB) | BLS 非农商业部门实际产出 | 2017 = 100，季调 |
| [HOANBS](https://fred.stlouisfed.org/data/HOANBS) | BLS 非农商业部门总工时 | 2017 = 100，季调 |

| 展示指标 | 起点窗口 | 最新窗口 | 相对变化 |
| --- | ---: | ---: | ---: |
| 美国整体利润（万亿美元，平均年率） | 2.91287025 | 3.79914625 | +30.426% |
| 价格调整后的整体利润（起点 = 100） | 100 | 117.320824 | +17.321% |
| 每小时实际产出（原始指数，四季均值） | 109.7515 | 119.46125 | +8.847% |
| 实际产出（原始指数，四季均值） | 114.429 | 126.32125 | +10.393% |
| 总工时（原始指数，四季均值） | 104.26225 | 105.742 | +1.419% |

- 近四季含本季及前三季；起点是 2022 全年，最新为 2025 Q3—2026 Q2。公司 TTM 为四季之和，宏观季调年率则取四季均值，不能混用。
- 价格调整利润：逐季计算 A445 / GDPDEF，取近四季均值，再除以起点窗口均值乘 100。这是广义价格调整近似，不是官方实际利润序列。
- 总览图均归一为各自起点 = 100；卡片保留原单位。“较起点”为相对百分比变化。
- 平均比率不严格等于均值之比，不对 BLS 生产率与产出 / 工时的四季平均值强行配平。
- 利润覆盖境内公司制企业，生产率覆盖非农商业部门；只能观察宏观同期变化，不能当成同一批企业的因果实验。AI 的份额还需企业层面采用时间、成本和产出等数据及合适对照。

运行 `node --test tests/*.test.cjs` 可复核财季连续性、年报勾稽、滚动窗口、页面数字、资源版本和文案完整性。

### 微观 AI 提效研究

补充引用 Erik Brynjolfsson、Danielle Li、Lindsey Raymond 的 [Generative AI at Work，NBER Working Paper 31161](https://www.nber.org/papers/w31161)，DOI: 10.3386/w31161。已核对该页 2023-11 修订的工作论文摘要：5,179 名客服人员，分阶段引入 AI 助手后，每小时解决问题数平均提高 14%，留任率改善。页面明确写明是 **2023 年工作论文版本**，没有把该摘要数值冒充为后续发表版本或本网站的宏观估计。NBER 页面另列 2025 年 QJE 发表版（DOI: 10.1093/qje/qjae044）；本站采用已直接核验的工作论文摘要口径。

此研究用于说明岗位层面的 AI 提效机制具有微观证据，并不用于将 2022—2026 的利润和生产率走势归因于 AI，也不支持把效率提高等同于岗位替代。
