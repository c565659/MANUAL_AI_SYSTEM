# 自动识别与分发提示词

将以下提示词复制给具备文件读取能力、且在需要正式编辑时具备本机 Adobe Illustrator 权限的 Codex。替换尖括号参数；可一次提供多个输入文件。

```text
执行“文件拆分处理系统”任务。

参数：
- 输入路径：<一个或多个原稿/参考文件路径>
- 输出目录：<输出目录>
- 可选参考文件：<路径列表；没有则写无>
- 可选用户用途指定：<WEB_MANUAL、PACKAGING_DISPLAY 或未指定>

必须先读取仓库中的：
1. FILE_SPLIT_SYSTEM/README.md
2. FILE_SPLIT_SYSTEM/rules/01_File_Classification.md
3. FILE_SPLIT_SYSTEM/config/settings.json
4. FILE_SPLIT_SYSTEM/rules/04_Color_And_Export.md
5. FILE_SPLIT_SYSTEM/rules/05_Illustrator_Execution.md
6. FILE_SPLIT_SYSTEM/rules/06_QA.md
并根据分类结果读取 FILE_SPLIT_SYSTEM/rules/02_Web_Manual.md 或 FILE_SPLIT_SYSTEM/rules/03_Packaging_Display.md。rules/ 是行为标准的权威来源；不要从提示词或案例推导冲突标准，不要读取或套用 DATABASE/ 的原说明书制作模板。

为每个输入文件独立执行：
1. 计算原稿哈希并识别 source、reference、supporting 或 unknown 角色。参考成品不得再次作为原稿处理。
2. 综合文件名、文字/章节、页面布局、矢量结构、页面框、刀模、折翼、粘口、尺寸/工艺标注和 UV 副稿进行分类，不得只看扩展名。OCR 和预览仅用于分析，不能重建正式内容；无可提取文字不等于空白。
3. 从文件名与正文交叉确认型号，不得把日期、尺寸或电池型号当产品型号。无法确认时不得编造正式输出名。
4. 写入本地任务记录，结构参照 FILE_SPLIT_SYSTEM/templates/job.example.json，并将规则版本固定为当前 settings.json 的 rule_version。
5. 分类为 WEB_MANUAL 时，按 FILE_SPLIT_SYSTEM/prompts/02_Web_Manual_Execution.md 的顺序执行。
6. 分类为 PACKAGING_DISPLAY 时，按 FILE_SPLIT_SYSTEM/prompts/03_Packaging_Execution.md 的顺序执行。

只有出现会影响正确性的具体不确定项才提问，例如型号冲突、同一原稿混合两种内容、逻辑边界不明、字体缺失或 2286C 定义冲突。暂停受影响文件，不阻塞其他明确文件。用户指定与内容明显矛盾时，说明可观察到的具体矛盾后询问。

所有正式 Illustrator 编辑都在原稿副本上执行；不得覆盖原稿、关闭用户其他文档或把用户原稿/成品/完整日志提交到公开仓库。没有本机 Illustrator 权限或没有实际样本时，只完成分析与任务记录，把相关运行及 QA 项明确标为“未验证”，不得宣称已完成自动化或导出。

最终逐文件报告：角色、分类、型号依据、进入的分支、输出路径、状态、不确定项，以及结构检查、视觉检查和本机运行测试的独立结果。
```

