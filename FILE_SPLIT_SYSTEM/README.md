# 文件拆分处理系统

系统目录：`FILE_SPLIT_SYSTEM/`  
规则版本：`1.0.0`  
状态：规则库已建立；Illustrator 自动化与真实样本处理尚未在本次环境验证。

## 1. 适用范围

本系统处理两类“保留原稿外观、拆分并重新组织”的任务：

- `WEB_MANUAL`：原说明书 → 一个多页 `型号_WELCOME GUIDE.pdf`。这里的“网页版说明书”不是 HTML 网站。
- `PACKAGING_DISPLAY`：原包装图档 → 一张 `型号_包装效果图.png`。这里的“包装效果图”是包装面的平面拆分组合，不是三维渲染。

仓库现有 `DATABASE/` 继续服务于原说明书制作。本系统与其隔离，不继承翻译、重新排版、字体调整、固定模板尺寸或可编辑文字交付要求。拆分任务必须以当前原稿的尺寸、内容、颜色和外观为准，不读取或套用原制作模板。

## 2. 权威来源与读取顺序

`rules/` 是处理行为的唯一权威来源；`prompts/` 只编排执行顺序并引用规则，不复制或改写标准。执行任务时按以下顺序读取：

1. 本文件。
2. `rules/01_File_Classification.md`。
3. 分类对应的分支规则：`rules/02_Web_Manual.md` 或 `rules/03_Packaging_Display.md`。
4. `rules/04_Color_And_Export.md`、`rules/05_Illustrator_Execution.md`、`rules/06_QA.md`。
5. `config/settings.json` 与本次任务记录。

规则冲突时，优先级为：用户对本次文件的明确指示 > 本系统规则 > 示例观察 > 工具默认值。若用户指定用途与内容明显矛盾，记录具体矛盾并请求确认，不静默改路由。

## 3. 自动路由

输入可以是单个文件或一批文件。系统为每个文件独立确定 `source`、`reference` 或其他角色，再综合文件名、文字与章节、页面布局、矢量对象、页面框、刀模、折翼、粘口、尺寸/工艺标注及 UV 副稿证据分类。扩展名不能单独决定类型。

- 连续阅读页面、多语言正文、语言页码、使用步骤、安全说明、封面等证据指向 `WEB_MANUAL`。
- 刀模展开、多个盒面、折线、折翼、粘口、印刷工艺标注、UV 副稿等证据指向 `PACKAGING_DISPLAY`。
- 混合内容、型号冲突或边界不明时，仅将受影响文件设为 `needs_review`；其余明确文件继续处理。

分类结果必须写入任务记录，包括输入文件、文件角色、类型、型号、判断依据、不确定项和后续分支。

## 4. 目录

```text
FILE_SPLIT_SYSTEM/
├── README.md
├── CHANGELOG.md
├── config/settings.json
├── templates/job.example.json
├── rules/
│   ├── 01_File_Classification.md
│   ├── 02_Web_Manual.md
│   ├── 03_Packaging_Display.md
│   ├── 04_Color_And_Export.md
│   ├── 05_Illustrator_Execution.md
│   └── 06_QA.md
├── prompts/
│   ├── 01_Auto_Dispatch.md
│   ├── 02_Web_Manual_Execution.md
│   └── 03_Packaging_Execution.md
└── examples/Reference_Cases.md
```

## 5. 运行数据与安全

- 对原稿副本操作，绝不覆盖原稿。
- 用户原稿、成品、完整日志和含真实用户路径的任务记录默认只留在本地，不提交至公开仓库。
- 同名输入放入不同任务目录；成品仍使用规则规定的文件名。
- 正式对象编辑、群组、画板、转曲和导出必须在 Adobe Illustrator 中完成；OCR、预览和外部工具只用于只读分析及 QA。
- 没有真实样本或本机验证时，结果必须标为“未验证”，不得虚构通过。

## 6. 使用入口

自动处理从 `prompts/01_Auto_Dispatch.md` 启动；已确认是说明书或包装时，可分别从 `prompts/02_Web_Manual_Execution.md` 或 `prompts/03_Packaging_Execution.md` 启动。任务记录以 `templates/job.example.json` 为结构参考，状态只能使用：`pending`、`classified`、`analyzed`、`processing`、`exported`、`qa_passed`、`needs_review`、`failed`。

