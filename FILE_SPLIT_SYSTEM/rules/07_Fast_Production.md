# 07 快速生产模式

`fast_production` 是默认模式，只能调用 `executors/manifest.json` 中
`validation_status=verified` 的参数化执行器。缺失或未验证时返回
`system_not_ready`，不得把系统未就绪写成原稿 `source_needs_review`。

## 1. 根任务与子 job

`root_task_id` 由原稿 SHA-256 和请求输出路径确定。同一原稿哈希和输出路径的“继续”、
“完成”、“导出文件”、“再试一次”、“允许诊断”或新 `job_id` 都必须沿用原根任务。
只有用户明确要求建立全新根任务并清除累计时间时才可新建。

根任务累计 Codex、预检、Illustrator、导出和 QA 时间，以及 child job、连接、JSX 开始和
逻辑重试总数。每个子 job 必须写 `parent_root_task_id`，并分别统计
`illustrator_connection_attempts`、`illustrator_connection_failures`、
`jsx_started_count`、`jsx_completed_count`、`jsx_logic_failures` 和
`export_count`。最终报告同时显示当前 job 与根任务累计耗时。

## 2. 时间机制

- `production_target_seconds=600`：目标，不是无条件中断点。
- `production_hard_limit_seconds=900`：根任务硬限制。
- `preflight_target_seconds=60`，输出冲突必须在前 30 秒识别。
- `illustrator_connection_timeout_seconds=30`。
- 连接失败可等待 5 秒重试一次；`max_logic_retries=0`。

达到 600 秒时，如果仍在分析、写代码、修补或尚未启动稳定执行器，立即停止；不得启动
probe、修正、诊断或重试。已经在正常推进的 verified 主 JSX 可以完成当前原子处理和
保存。达到 900 秒后不得启动任何新阶段、子 job 或 Illustrator 调用；正在保存时不得
杀死 Illustrator，只等待保存调用返回并记录 `sla_exceeded`。

## 3. 连接与逻辑失败

正式调用前运行安装、进程、COM、同用户会话、权限级别、阻塞对话框与
`DoJavaScriptFile` 健康检查。COM 在 JSX 标记前失败属于
`environment_unavailable`，不增加 JSX 开始数、逻辑失败数或逻辑重试数。JSX 第一条
可执行语句写 `jsx_started`；之后失败属于 `production_failed`，普通生产不得修改
或重试执行器，应转入单独的维护流程。

## 4. 固定链与禁令

预检生成 manifest 和工作副本，runner 调用唯一稳定 JSX，JSX 完成对象编辑与一次导出，
QA 只检查临时最终结果；通过后才备份同名旧文件并安全替换。原稿永不覆盖。

禁止完整总稿 Symbol/副本/PlacedItem/共享 Form XObject 分页、页面级完整总稿剪切、
隐藏代替删除、逐页导出重组、Python 修改正式文件、整页栅格化、型号专用 JSX、临时
probe/补丁/V2/V3/FINAL 执行器、鼠标键盘自动化、AppActivate，以及关闭用户文档或
强制退出 Illustrator。

## 5. 最终状态

- 执行器未验证：`system_not_ready`
- Illustrator/COM 不可用：`environment_unavailable`
- 原稿页面或字体无法确认：`source_needs_review`
- JSX 已开始后的逻辑错误：`production_failed`
- 根任务累计超时：`sla_exceeded`
- 最终 QA 全部通过：`qa_passed`

`development_validation` 不得伪装成生产任务，也必须沿用并显示根任务累计总时间。
