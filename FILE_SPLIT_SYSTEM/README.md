# 文件拆分处理系统

系统目录：`FILE_SPLIT_SYSTEM/`  
规则版本：`1.1.0`  
默认模式：`fast_production`  
状态：规则库已建立；Illustrator 自动化与真实样本处理须在实际环境中验证。

## 1. 适用范围

本系统处理两类“保留原稿外观、拆分并重新组织”的任务：

- `WEB_MANUAL`：原说明书 → 一个多页 `型号_WELCOME GUIDE.pdf`；不是 HTML 网站。
- `PACKAGING_DISPLAY`：原包装图档 → 一张 `型号_包装效果图.png`；是包装面的平面拆分组合，不是三维渲染。

仓库现有 `DATABASE/` 继续服务于原说明书制作。本系统与其隔离，不读取、修改或套用其中的模板、翻译和排版流程。

## 2. 执行模式

- `fast_production`：普通文件处理的默认模式，以尽快得到正确成品为目标。一次只读分析，最多一次对象结构 probe，一次 Illustrator 主 JSX，一次最终输出，只检查最终文件。
- `diagnostic_development`：仅在用户明确要求开发、排错或验证新脚本时启用，允许额外探测和详细审计。普通任务不得自动进入此模式。

默认参数见 `config/settings.json`，完整生产约束见 `rules/07_Fast_Production.md`。达到 10 分钟预算时，不再增加新探测、渲染或审计步骤，立即报告当前阶段与原因。

## 3. 权威来源与读取顺序

`rules/` 是处理行为的唯一权威来源；`prompts/` 只编排执行顺序。执行任务时按以下顺序读取：

1. 本文件与 `config/settings.json`。
2. `rules/01_File_Classification.md`。
3. 分类对应的 `rules/02_Web_Manual.md` 或 `rules/03_Packaging_Display.md`。
4. `rules/04_Color_And_Export.md`、`rules/05_Illustrator_Execution.md`、`rules/06_QA.md`。
5. 默认模式必须读取 `rules/07_Fast_Production.md`；明确进入诊断模式时记录用户原始要求和原因。

规则冲突优先级：用户对本次文件的明确指示 > 本系统规则 > 示例观察 > 工具默认值。用户未明确指定模式时始终使用 `fast_production`。

## 4. 核心生产流程

1. 30 秒内完成一次只读预检并确定逻辑页面或包装面边界；仅在结构无法直接确认时允许一次 probe。
2. 建立工作副本，复用稳定脚本；只打开一次 Illustrator 处理副本。
3. 只运行一份主 JSX，在同一脚本内完成删除、群组、画板建立、平移、转曲和最终保存/导出。
4. 说明书保留三个指定章节删除、空白页删除、0 mm 画板间距和多页矢量 PDF 规则。
5. 包装保留 10 mm 面间距、`2286C` 专色和 300 ppi 白背景单张 PNG 规则。
6. 只对最终文件执行 QA：PDF 检查页数、逐页尺寸、矢量状态和一张 72 ppi 联系表；PNG 检查实际像素、背景、裁切、颜色外观和面间距。

禁止 `cropped_pages`、逐页导出后重组、逐页 Illustrator 调用、逐页高清 PNG、中间渲染、生产用 Python 渲染管线、每文件多套 probe/审计脚本，以及鼠标、键盘或窗口激活模拟。

## 5. 自动路由

系统为每个输入独立确定 `source`、`reference` 或其他角色，再综合文件名、文字与章节、页面布局、矢量对象、页面框、刀模、折翼、粘口、尺寸/工艺标注及 UV 副稿证据分类。扩展名不能单独决定类型。

- 连续阅读页面、多语言正文、语言页码、使用步骤、安全说明、封面等证据指向 `WEB_MANUAL`。
- 刀模展开、多个盒面、折线、折翼、粘口、印刷工艺标注、UV 副稿等证据指向 `PACKAGING_DISPLAY`。
- 混合内容、型号冲突或边界不明时，仅将受影响文件设为 `needs_review`；不得自动升级到诊断模式。

## 6. 后台运行与安全

“尽量后台运行”表示减少窗口激活、弹窗和输入设备占用，不代表同一交互桌面上的 Illustrator 保证永不显示或抢焦点。发现用户正在编辑未保存文档时，不得反复切换活动文档；脚本不得关闭其他文档或强制退出 Illustrator。需要真正零前台影响时，应使用独立虚拟机、第二台电脑或独立 Windows 会话。

只在副本上操作，绝不覆盖原稿。用户原稿、成品、完整日志和真实路径记录默认只留本地，不提交公开仓库。

## 7. 目录与入口

```text
FILE_SPLIT_SYSTEM/
├── README.md
├── CHANGELOG.md
├── config/settings.json
├── templates/job.example.json
├── rules/01_File_Classification.md ... 07_Fast_Production.md
├── prompts/01_Auto_Dispatch.md
├── prompts/02_Web_Manual_Execution.md
├── prompts/03_Packaging_Execution.md
└── examples/Reference_Cases.md
```

自动入口为 `prompts/01_Auto_Dispatch.md`；已确认分支时可直接使用对应执行提示词。任务状态只能使用：`pending`、`classified`、`analyzed`、`processing`、`exported`、`qa_passed`、`needs_review`、`failed`。

