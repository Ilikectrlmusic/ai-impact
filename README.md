# AI Impact / Pulse

纯静态网页：`index.html` 为就业页，`business.html` 为企业页。无需安装依赖或构建。

本地启动：

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

修改 JavaScript 或 CSS 后，发布前更新 HTML 中的资源内容版本号，避免浏览器缓存将新版页面与旧版脚本混用：

```sh
node scripts/update-asset-versions.cjs
node --test tests/*.test.cjs
```

测试会检查版本号、中英文文案完整性、缺失文案回退和企业指标的数据复算。另需用浏览器检查图表、页面导航与手机布局。数据来源、口径和计算公式见 [DATA_SOURCES.md](DATA_SOURCES.md)。
