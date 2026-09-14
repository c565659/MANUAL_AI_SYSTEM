# WEB_MANUAL 执行提示词

```text
处理已分类为 WEB_MANUAL 的原说明书，输出一个多页 {model}_WELCOME GUIDE.pdf。默认使用 fast_production；仅在执行器修复和有边界回归时使用 development_validation。

PDF 预检坐标只提供文字、章节、MediaBox/CropBox、旋转和预计页数信息。必须由 Illustrator 内部重复页面边界框建立页面锚点，先快照 Layer 顶层原对象，再进行归属、混排章节删除、边界框删除、字体检查、移动、转曲和一次导出。

读取 README.md、config/settings.json、rules/01_File_Classification.md、rules/02_Web_Manual.md、rules/04_Color_And_Export.md、rules/05_Illustrator_Execution.md、rules/06_QA.md、rules/07_Fast_Production.md、rules/08_Real_Object_Splitting.md、rules/09_Font_Safety.md；不得读取、套用或修改 DATABASE/。

只读预检必须：
1. 记录原 PDF 声明字体及嵌入、子集和 Unicode 映射状态。
2. 确定逻辑页面边界、尺寸、语言、页码和阅读顺序。
3. 生成 job_id、状态文件与执行锁。
4. 预计算 pageCount、pageWidth、stripWidth、startX 和全部画板坐标并验证 Illustrator 坐标范围。
5. 验证参数化稳定脚本支持当前对象结构。任一项不明确即 needs_review，不调用 Illustrator。

只允许一次 Illustrator 主脚本。脚本必须在同一次调用中：
1. 删除所有语言版本的 CUSTOMER SERVICE、WARRANTY CERTIFICATE、WARRANTY TERMS & CONDITIONS 及其标题、正文、表格、填写线和相关图形；保留同页其他正文原位。
2. 删除原空白页、处理后空白页及只剩页码/页面外框的页面。
3. 按 rules/08_Real_Object_Splitting.md 移动每页真实对象并建立独立群组。禁止完整总稿 Symbol/副本、PlacedItem、完整总稿共享 Form XObject和页面级完整总稿剪切蒙版分页。
4. 按预计算的居中单排坐标建立 1..n 画板，间距严格 0 mm；页面群组只整体平移，不缩放、旋转、重排或重新居中。
5. 在任何 createOutline() 前按 rules/09_Font_Safety.md 检查 Illustrator 实际 PostScript 字体、字体可用性、替代/缺失字体和警告。任一风险即 needs_review，禁止转曲和导出。通过后只转曲保留页文字并验证每个 TextFrame 转曲前后几何。
6. 删除无效页对象、页面外框、页面外辅助标记、空群组、未使用 Symbol、脚本创建的未使用资源和全部目标画板外无效对象。
7. 只保存目标画板一次，设置 preserveEditability=false、generateThumbnails=false、optimization=true、viewAfterSaving=false；不覆盖原稿。

最终 QA 必须检查页数、尺寸、矢量状态、每页真实内容边界、完整总稿 Symbol/剪切组、共享 Form XObject、画板外对象、字体结果和运行计数。只生成一张 72 ppi 联系表；最多对 3 个字体风险页做原稿/成品定向视觉对比，OPF-504A 回归必须包含英语 EN11。QA 工具只读，不得修改、裁切、组装或重新生成正式 PDF。

达到 600 秒立即停止。禁止运行时改 JSX、自动重试或继续导出。最终报告状态文件中脚本测得的真实墙钟、Illustrator、PDF 保存与 QA 耗时，以及 probe、Illustrator、retry、export 次数、实际页数、输出路径和状态；不得填写估计时间。
```
