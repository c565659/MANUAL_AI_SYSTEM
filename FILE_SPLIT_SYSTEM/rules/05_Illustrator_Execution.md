# 05 Illustrator 执行规则

本文件是 Illustrator 执行边界的权威规则；普通任务同时受 rules/07_Fast_Production.md 约束。

## 1. 工具边界与预检

正式对象编辑、删除、群组、画板、转曲、保存和导出必须在 Illustrator 中完成。外部工具只允许只读分析、哈希和最终 QA；不得重新生成、裁切、组装或修改正式文件。

30 秒预检必须核对输入、型号、工作副本、输出路径、字体、链接、色样、页面/包装面边界、稳定脚本支持及软件限制。结构不足时最多一次 probe；仍不明确即 needs_review。

WEB_MANUAL 调用主脚本前必须一次性计算：

- pageCount 与 pageWidth；
- stripWidth = pageCount × pageWidth；
- startX = -stripWidth / 2；
- artboardLeft = startX + pageIndex × pageWidth；
- 所有画板的最终坐标和 Illustrator 允许范围。

坐标超限必须在调用 Illustrator 前停止。不得先从 0 向右建立，失败后再临时居中、缩放、换行或修改间距。

## 2. 稳定脚本支持范围

fast_production 只复用参数化稳定 JSX，不为型号现场开发。稳定脚本至少支持：一个顶层 GroupItem、多个顶层对象、包装总群组内多个页面群组、已有页面级群组、多语言、不同页数和尺寸、正负或跨原点坐标、中文/空格路径及不同磁盘。

对象结构超出支持范围时在预检停止并设 needs_review；不得进入 Illustrator 后修改 JSX 再重试。

## 3. 会话安全与操作顺序

只操作哈希已记录的工作副本。主 JSX 保存 app.userInteractionLevel，设为 UserInteractionLevel.DONTDISPLAYALERTS，并在 finally 恢复；不得关闭其他文档、覆盖未保存工作或强制退出 Illustrator。禁止鼠标、键盘、窗口激活和前台页面切换模拟。

WEB_MANUAL 必须依次执行：

1. 打开工作副本并识别保留页面对象；
2. 在任何 createOutline() 前完成字体安全检查；
3. 按 rules/08_Real_Object_Splitting.md 建立真实页面群组与画板；
4. 只转曲保留页面文字并验证几何；
5. 清理无效对象与资源；
6. 在计数器允许时执行唯一一次最终保存；
7. 写入完成时间和实测分段耗时。

## 4. 机械执行限制

状态文件与执行锁是调用前置条件。每次 probe、Illustrator 主脚本、retry 和 export 都必须先原子检查并递增对应计数；超限时拒绝调用。

- time_budget_minutes = 10；
- max_probe_runs = 1；
- max_illustrator_invocations = 1；
- max_retries = 0；
- max_exports = 1。

主脚本失败后不得在生产过程中修改脚本、自动重试或继续导出。同一 job_id 的普通“继续”“完成”“导出文件”等指令不得重置计数。只有用户明确允许 diagnostic_development 并允许重试时，才能创建新的诊断任务。

字体、链接、色样、对象编辑性、边界、坐标或软件限制触发风险时设 needs_review；不得替换字体、缩放、换行画板、降低清晰度或改变交付格式。
