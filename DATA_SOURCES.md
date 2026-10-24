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
