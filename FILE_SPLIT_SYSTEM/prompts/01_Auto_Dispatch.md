# 自动识别与分发提示词

```text
执行“文件拆分处理系统”任务。

参数：
- 输入路径：<一个或多个原稿/参考文件路径>
- 输出目录：<输出目录>
- 可选参考文件：<路径列表或无>
- 可选用户用途指定：<WEB_MANUAL、PACKAGING_DISPLAY 或未指定>
- 执行模式：<默认 fast_production；仅当用户明确允许 diagnostic_development 并允许重试时可填 diagnostic_development>

开始前读取 FILE_SPLIT_SYSTEM/README.md、config/settings.json、rules/01_File_Classification.md、rules/04_Color_And_Export.md、rules/05_Illustrator_Execution.md、rules/06_QA.md、rules/07_Fast_Production.md，并按分类读取 rules/02_Web_Manual.md 或 rules/03_Packaging_Display.md。WEB_MANUAL 还必须读取 rules/08_Real_Object_Splitting.md 与 rules/09_Font_Safety.md。不得读取、套用或修改 DATABASE/。

用户未明确要求诊断时必须使用 fast_production。为每个输入独立完成角色、分类和型号判断；扩展名不能单独决定类型。

fast_production 固定流程：
1. 30 秒内完成一次只读预检，计算原稿 SHA-256，以原稿完整路径、哈希、输出路径和 rule_version 生成 job_id，并原子创建持久状态文件和执行锁。
2. 结构明确时禁止 probe；确有必要时最多一次稳定对象 probe。
3. 调用 Illustrator 前验证稳定脚本支持对象结构、页面数量、页面尺寸和坐标范围。只打开一次处理副本，只运行一份主 JSX。
4. WEB_MANUAL 必须移动每页真实对象，禁止完整总稿 Symbol/副本和页面级完整总稿剪切蒙版；任何 createOutline() 前必须通过字体安全检查。
5. 每个任务只允许一次最终导出，并只对最终文件执行 QA。状态文件必须机械拒绝超过一次 probe、一次 Illustrator 主脚本、零自动重试、一次导出或 600 秒预算的操作。

禁止逐页/逐面 Illustrator 调用、cropped_pages、逐页导出后重组、中间渲染、逐页高清 PNG、生产用 Python 生成/裁切/组装正式文件、多套临时 probe/审计脚本，以及鼠标、键盘或窗口激活模拟。

达到 600 秒立即停止生产并记录当前阶段和原因；不得运行时修补脚本、自动重试、继续导出或自动切换诊断模式。同一失败 job_id 不因“继续”“完成”“导出文件”等普通指令重置。只有用户明确说“允许进入 diagnostic_development 并允许重试”时，才可创建新的诊断 job_id。

分类为 WEB_MANUAL 时执行 prompts/02_Web_Manual_Execution.md；分类为 PACKAGING_DISPLAY 时执行 prompts/03_Packaging_Execution.md。最终逐文件报告角色、分类、型号依据、模式、probe/Illustrator/retry/export 次数、脚本记录的真实墙钟耗时、Illustrator 执行耗时、保存/导出耗时、QA 耗时、输出路径、最终 QA 和状态。禁止模型估算耗时。
```
