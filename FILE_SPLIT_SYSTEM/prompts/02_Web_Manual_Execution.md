# WEB_MANUAL 执行提示词

```text
处理一个已分类为 WEB_MANUAL 的原说明书，输出一个多页“网页版说明书”PDF；这不是 HTML 网站。

参数：
- 原稿路径：<原稿路径>
- 输出目录：<输出目录>
- 可选参考文件：<路径列表或无>
- 任务记录路径：<本地任务 JSON 路径>

开始前完整读取：
- FILE_SPLIT_SYSTEM/README.md
- FILE_SPLIT_SYSTEM/rules/01_File_Classification.md
- FILE_SPLIT_SYSTEM/rules/02_Web_Manual.md（本分支行为权威来源）
- FILE_SPLIT_SYSTEM/rules/04_Color_And_Export.md
- FILE_SPLIT_SYSTEM/rules/05_Illustrator_Execution.md
- FILE_SPLIT_SYSTEM/rules/06_QA.md
- FILE_SPLIT_SYSTEM/config/settings.json
不要读取或套用 DATABASE/ 的原制作模板，不翻译、不重新排版、不采用固定模板尺寸。

按顺序执行：
1. 预检：核对型号与文件角色；计算原稿哈希；检查系统、Illustrator 版本、脚本接口、用户未保存文档、字体、链接资源、可编辑性、颜色、输出权限和软件限制。建立原稿副本。
2. 只读分析：不能把 PDF 物理页数当逻辑页数。按页面框、尺寸标注、排列和语言页码记录每个逻辑页的来源边界、实际尺寸、语言、页码、封面/封底角色和阅读顺序。已有多个画板或 PDF 页也要检查。
3. 删除计划：识别 CUSTOMER SERVICE、WARRANTY CERTIFICATE、WARRANTY TERMS & CONDITIONS 的全部语言版本，按章节边界记录拟删除的标题、文字、表格、填写线和相关图形。不能全局删除所有 warranty 文字。
4. Illustrator 编辑：只在副本中删除已确认对象。同页其他有效内容保持原位置，不上移、不补空。删除原空白页和删除后空白页；只剩页码或只有页面外框也删除，但含 Logo、二维码、正文或有效图形的页面保留。
5. 每个保留页建立独立群组。保持内容、字体外观、字号、颜色、图形、实际尺寸、页内相对位置和正文页码；不缩放、不重排、不改文案。
6. 按阅读顺序从左至右单行建立 1..n 画板，各画板尺寸等于对应原页面，间距严格为 0 mm。以原页面边界为基准整体平移群组，不能按内容外接框居中。
7. 完成识别后将未转曲文字转曲。若字体缺失，不替换字体，停止受影响任务并记录。删除原页面边界、外围尺寸和辅助标记，保留表格、箭头和插图内部有效线条。
8. 在 Illustrator 中把全部画板保存为一个 {model}_WELCOME GUIDE.pdf，保留矢量，不做截图 PDF、整页栅格化或超长单页 PDF，不覆盖原稿。
9. 按 FILE_SPLIT_SYSTEM/rules/06_QA.md 逐项记录结构检查、视觉检查和本机运行测试。核对 PDF 页数、逐页毫米尺寸、阅读顺序、删除范围、空白页、群组、转曲、线框和视觉完整性。

遇到边界/型号冲突、缺字体或软件限制时，将状态设为 needs_review 并说明具体问题；不得自行缩小内容、换行画板、替换字体或降低质量。只有全部必需 QA 有证据并通过后才标记 qa_passed。
```

