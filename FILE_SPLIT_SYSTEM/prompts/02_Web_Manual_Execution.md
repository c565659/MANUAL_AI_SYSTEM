# WEB_MANUAL 执行提示词

```text
处理已分类为 WEB_MANUAL 的原说明书，输出一个多页 {model}_WELCOME GUIDE.pdf。默认且必须使用 fast_production，除非用户明确要求开发、排错或验证新脚本。

读取 `FILE_SPLIT_SYSTEM/README.md`、`config/settings.json`、`rules/01_File_Classification.md`、`rules/02_Web_Manual.md`、`rules/04_Color_And_Export.md`、`rules/05_Illustrator_Execution.md`、`rules/06_QA.md`、`rules/07_Fast_Production.md`；不得读取、套用或修改 `DATABASE/`。

在 30 秒内一次只读分析确定所有逻辑页面的原边界、尺寸、语言、页码和阅读顺序，并建立工作副本。结构不足时最多执行一次稳定对象 probe；仍不明确则 needs_review，不追加探测。

只打开一次 Illustrator 处理副本，只执行一份主 JSX。脚本必须在同一次运行中：
1. 删除所有语言版本的 CUSTOMER SERVICE、WARRANTY CERTIFICATE、WARRANTY TERMS & CONDITIONS，以及标题、正文、表格、填写线和相关图形；同页其他有效正文保持原位。
2. 删除原空白页、处理后空白页及只剩页码/页面外框的页面；保留含 Logo、二维码、正文或有效图形的页面。
3. 每个保留页独立群组，不缩放、不重排、不翻译、不替换字体；按原页面边界定位。
4. 按阅读顺序建立 1..n 单行画板，尺寸等于原页面，间距严格 0 mm，并仅整体平移群组。
5. 将未转曲文字转曲；缺字体时不替换并停止。删除原页面边框、外围尺寸和辅助标记，保留内部有效线条。
6. 将全部画板一次保存为一个多页矢量 PDF，不覆盖原稿。

脚本保存原 userInteractionLevel，设置 DONTDISPLAYALERTS，并在 finally 恢复；不关闭其他文档、不强制退出 Illustrator。禁止鼠标、键盘、窗口激活模拟、逐页调用、cropped_pages、逐页导出后重组、中间渲染和生产用 Python 管线。

最终 QA 只检查 PDF 页数、逐页尺寸和矢量状态，并只生成一张 72 ppi 联系表检查顺序、删除结果、空白页、裁切、丢失和错位；不得逐页生成高清 PNG。

超过 10 分钟立即停止增加新探测或审计步骤，报告当前阶段和原因。最终报告模式、probe 次数、Illustrator 主脚本调用次数、实际页数、输出路径及状态。
```

