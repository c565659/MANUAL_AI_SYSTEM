# 07 快速生产模式

fast_production 是默认模式，硬预算为 600 秒。目标是用已验证的参数化稳定脚本完成一次生产调用；它不是脚本开发或自动试错模式。

## 1. job_id、状态文件与执行锁

job_id 由以下规范化值组成并计算确定性哈希：

1. 原稿完整路径；
2. 原稿 SHA-256；
3. 输出完整路径；
4. rule_version。

状态文件至少记录：job_id、started_at、deadline_at、finished_at、elapsed_seconds、mode、probe_count、illustrator_invocation_count、export_count、retry_count、current_stage、final_status、failure_reason，以及 illustrator_elapsed_seconds、export_elapsed_seconds、qa_elapsed_seconds。

started_at 与 deadline_at 在首次创建任务时由脚本写入。状态更新与计数递增必须在执行锁内原子完成；已有 job_id 必须读取原状态，不得新建同义状态文件绕过计数。

## 2. 固定执行链

1. 30 秒只读预检，生成 job_id、状态文件和锁。
2. 结构明确时不 probe；必要时最多一次稳定 probe。
3. 调用前验证脚本支持和全部软件限制。
4. 只打开一次工作副本，只调用一次 Illustrator 主 JSX。
5. 主脚本完成对象处理和唯一一次最终导出。
6. 只对最终成品执行 final_only QA。

任何阶段发现当前系统时间 >= deadline_at，必须立即停止生产并写入 needs_review 或 failed、finished_at 和 failure_reason。

## 3. 硬计数限制

- probe_count <= 1；
- illustrator_invocation_count <= 1；
- retry_count = 0；
- export_count <= 1；
- elapsed_seconds <= 600。

计数器必须在对应外部调用之前递增，防止崩溃后把已发起调用误记为未运行。Illustrator 主脚本失败后禁止自动修脚本、自动重试或继续导出。

同一失败 job_id 不因用户说“继续”“完成”“导出文件”等普通指令而清零。只有用户明确说“允许进入 diagnostic_development 并允许重试”时，才可用独立诊断输出路径和 mode 创建新的诊断 job_id；不得篡改原生产状态。

## 4. WEB_MANUAL 生产禁令

禁止完整总稿 Symbol/副本、SymbolItem、PlacedItem、完整总稿共享 Form XObject、页面级完整总稿剪切蒙版、仅视觉隐藏页面外对象、逐页裁切 PDF 回导、逐页栅格化和截图分页。页面必须按 rules/08_Real_Object_Splitting.md 做真实对象拆分，并按 rules/09_Font_Safety.md 在转曲前完成字体门禁。

## 5. 通用生产禁令

禁止 cropped_pages、逐页/逐面 Illustrator 调用、逐页/逐面输出后重组、中间渲染、逐页高清 PNG、生产用 Python 生成管线、多套临时 probe/审计脚本、运行时修改 JSX，以及鼠标、键盘或窗口激活模拟。

稳定脚本支持范围不覆盖当前文件、字体身份不明、边界不明或坐标超限时，在主脚本前设 needs_review。不得进入 Illustrator 后现场修补。

## 6. 实测时间

全部时间由脚本使用系统时间记录：

`elapsed_seconds = finished_at - started_at`

Illustrator、保存/导出和 QA 各自记录开始、结束与差值。模型不得估算、回填或改写时间。最终报告直接读取状态文件。

## 7. 模式边界

diagnostic_development 只有在用户明确授权进入该模式并允许重试时启用。它必须保留原生产任务的失败记录、使用新 job_id，并继续保护原稿、用户未保存文档和明确输出路径。
