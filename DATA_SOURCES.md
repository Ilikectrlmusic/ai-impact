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

## 企业页：2022 Q4—2026 Q2

核查日期：2026-10-24；最新共同观察期为 2026 Q2。源数据完整观察值表来自 FRED / 美国经济分析局（BEA），原始精度快照见 [`data/business-source.csv`](data/business-source.csv)。企业页静态数据在 `business.js`，两页共用 `charts.js`。金额为十亿美元、季节调整年率（SAAR）；页面换算为万亿美元。年率不是单个季度的实际利润，也不是利润增长率。

| 输入序列 | 定义 | 2022 Q4 | 2026 Q2 |
| --- | --- | ---: | ---: |
| [A445RC1Q027SBEA](https://fred.stlouisfed.org/data/A445RC1Q027SBEA) | 境内企业税前利润，含 IVA、CCAdj | 2944.134 | 4163.045 |
| [A463RC1Q027SBEA](https://fred.stlouisfed.org/data/A463RC1Q027SBEA) | 境内非金融企业税前利润，含 IVA、CCAdj | 2374.546 | 3176.820 |
| [A587RC1Q027SBEA](https://fred.stlouisfed.org/data/A587RC1Q027SBEA) | 境内金融企业税前利润，含 IVA、CCAdj | 569.588 | 986.225 |
| [A455RC1Q027SBEA](https://fred.stlouisfed.org/data/A455RC1Q027SBEA) | 非金融企业名义增加值 | 13709.660 | 16860.501 |
| [GDP](https://fred.stlouisfed.org/data/GDP) | 名义 GDP | 26774.117 | 32563.030 |
| [GDPDEF](https://fred.stlouisfed.org/data/GDPDEF) | GDP 平减指数（2017 = 100） | 120.211 | 133.411 |

选用“境内”而非含境外利润的国民口径，使金融、非金融和 GDP 比较的地域范围一致。利润为当前生产利润，含存货估价调整（IVA）与资本消耗调整（CCAdj），不是上市公司财报净利润。金融与非金融序列之和应等于境内利润（允许源数据舍入差）。

六项指标与计算方法：

1. 境内企业利润：A445 / 1000，单位万亿美元。
2. 价格调整后利润指数：`(A445_t / GDPDEF_t) / (A445_2022Q4 / GDPDEF_2022Q4) × 100`。GDP 平减指数仅作广义价格调整近似，不是 BEA 官方“实际利润”序列，也不是各行业专属利润平减指数。
3. 非金融企业利润：A463 / 1000，单位万亿美元。
4. 金融企业利润：A587 / 1000，单位万亿美元。
5. 非金融利润份额：A463 / A455 × 100。分母为同一部门的增加值，不是销售收入，因此不能称为销售利润率。
6. 境内利润 / GDP：A445 / GDP × 100，不是企业销售净利率。

总览图将相关序列统一为 2022 Q4 = 100；卡片显示原单位。金额和指数的“较起点”用相对百分比；份额的“较起点”用百分点。全程保留输入精度，最终显示时舍入。非金融部门对利润增量的贡献为 `(3176.820 − 2374.546) / (4163.045 − 2944.134) = 65.8%`。

ChatGPT 于 2022-11-30 发布；2022 Q4 是包含发布后首月的季度参照，不能当作严格的发布前对照。季度数据及宏观行业划分无法识别 AI 的因果效应、采用 AI 的企业收益或企业层面的分布。这里比较的是发布以来的宏观盈利变化。
