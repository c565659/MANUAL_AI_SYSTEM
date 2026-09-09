# 自动识别与分发提示词

```text
执行 FILE_SPLIT_SYSTEM 生产任务。

输入：<输入文件>
输出目录：<输出目录>
模式：fast_production

读取 main 分支当前规则，自动分类并调用 executors/manifest.json 中状态为
validated 的稳定执行器。不得修改执行器、生成型号专用 JSX 或临时开发脚本。
报告当前子 job 实测耗时、同一 root_task_id 的真实累计耗时和最终结果。
```

详细约束由 `README.md`、`config/settings.json`、`rules/`、
`schemas/root_task.schema.json` 和 `schemas/job.schema.json` 提供，用户无需重复粘贴规则。

若没有适用的 `validated` 执行器，必须返回 `system_not_ready`。Illustrator/COM
不可用返回 `environment_unavailable`；原稿本身存在无法确认的页面或字体问题返回
`source_needs_review`；已启动 JSX 后的逻辑失败返回 `production_failed`；根任务累计
达到硬限制返回 `sla_exceeded`；只有最终文件全部通过才返回 `qa_passed`。
