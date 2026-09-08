# PACKAGING_DISPLAY 执行提示词

```text
处理已分类为 PACKAGING_DISPLAY 的包装图档，输出单张 {model}_包装效果图.png。默认且必须使用 fast_production，除非用户明确要求开发、排错或验证新脚本。

读取 `FILE_SPLIT_SYSTEM/README.md`、`config/settings.json`、`rules/01_File_Classification.md`、`rules/03_Packaging_Display.md`、`rules/04_Color_And_Export.md`、`rules/05_Illustrator_Execution.md`、`rules/06_QA.md`、`rules/07_Fast_Production.md`；不得读取、套用或修改 `DATABASE/`。

在 30 秒内一次只读分析确定正式主稿、UV/刀模副稿、所有包装面真实边界、尺寸、方向、相邻关系、跨面对象和 2286C 专色定义，并建立工作副本。结构不足时最多执行一次稳定对象 probe；仍不明确则 needs_review。

只打开一次 Illustrator 处理副本，只执行一份主 JSX。脚本必须在同一次运行中：
1. 删除 UV 副稿、独立刀模副稿、工艺辅助内容、无信息折翼和粘口，保留所有有信息的包装面及跨面内容。
2. 为每个保留面建立同尺寸、有描边且保持原背景的底板并独立群组；绿色面复用已核实的 2286C 专色与色调，禁止近似替换。
3. 删除原刀模线和折线，保留有效图形与新底板描边。
4. 各面只平移，不缩放、旋转或镜像；按外边缘保持横纵 10 mm 净间距。
5. 建立完整包含全部面及描边的画板，一次导出 300 ppi、包装面外白背景的 PNG；RGB 转换只在导出阶段发生。

脚本保存原 userInteractionLevel，设置 DONTDISPLAYALERTS，并在 finally 恢复；不关闭其他文档、不强制退出 Illustrator。禁止鼠标、键盘、窗口激活模拟、逐面调用、cropped_pages、分面导出后重组、中间渲染和生产用 Python 管线。

最终 QA 只检查最终 PNG 的实际像素、白色外部背景、裁切、颜色外观和面间距。不得生成额外分面图或中间审计渲染。

超过 10 分钟立即停止增加新探测或审计步骤，报告当前阶段和原因。最终报告模式、probe 次数、Illustrator 主脚本调用次数、输出像素、输出路径及状态。
```

