# 自动识别与分发提示词

```text
执行“文件拆分处理系统”任务。

参数：
- 输入路径：<一个或多个原稿/参考文件路径>
- 输出目录：<输出目录>
- 可选参考文件：<路径列表或无>
- 可选用户用途指定：<WEB_MANUAL、PACKAGING_DISPLAY 或未指定>
- 执行模式：<默认 fast_production；仅当用户明确要求开发、排错或验证新脚本时可填 diagnostic_development>

开始前读取 FILE_SPLIT_SYSTEM/README.md、config/settings.json、rules/01_File_Classification.md、rules/04_Color_And_Export.md、rules/05_Illustrator_Execution.md、rules/06_QA.md、rules/07_Fast_Production.md，并按分类读取 rules/02_Web_Manual.md 或 rules/03_Packaging_Display.md。不得读取、套用或修改 DATABASE/。

用户未明确要求诊断时必须使用 fast_production，普通任务不得自动进入 diagnostic_development。为每个输入独立完成角色、分类和型号判断；扩展名不能单独决定类型。

fast_production 固定流程：
1. 在 30 秒内完成一次只读预检并确定逻辑页面或包装面边界，计算原稿哈希并建立工作副本。
2. 结构已明确时禁止 probe；确有必要时最多一次对象结构探测，复用稳定脚本。
3. 只打开一次 Illustrator 处理副本，只运行一份主 JSX，在同一脚本中完成删除、群组、画板建立、整体平移、转曲和最终保存/导出。
4. 主脚本将 userInteractionLevel 设为 DONTDISPLAYALERTS，并在 finally 恢复；不关闭其他文档、不强制退出 Illustrator。
5. 每个任务只执行一次最终 PDF 或 PNG 输出，并只对最终文件按 rules/06_QA.md 验收。

禁止逐页 Illustrator 调用、cropped_pages、逐页导出后重组、中间渲染、逐页高清 PNG、生产用 Python 渲染管线、多套临时 probe/审计脚本，以及鼠标、键盘或窗口激活模拟。

“尽量后台运行”只表示减少窗口激活、弹窗和输入设备占用，不承诺同一桌面的 Illustrator 绝不显示或抢焦点。发现用户有未保存 Illustrator 文档时不得反复切换活动文档。真正零前台影响需使用独立虚拟机、第二台电脑或独立 Windows 会话。

从预检开始计时；超过 10 分钟立即停止增加新探测或审计步骤，报告当前阶段和原因，不自动切换诊断模式。

分类为 WEB_MANUAL 时执行 prompts/02_Web_Manual_Execution.md；分类为 PACKAGING_DISPLAY 时执行 prompts/03_Packaging_Execution.md。最终逐文件报告角色、分类、型号依据、模式、probe 次数、Illustrator 主脚本调用次数、输出路径、最终 QA 和状态。
```

