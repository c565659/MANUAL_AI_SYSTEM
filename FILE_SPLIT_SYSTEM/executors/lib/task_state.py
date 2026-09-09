from __future__ import annotations

import hashlib
import json
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


SCHEMA_VERSION = "1.3.0"
CONTINUATION_WORDS = {"继续", "完成", "导出文件", "再试一次", "允许诊断"}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def canonical_path(value: str) -> str:
    return os.path.normcase(os.path.abspath(os.path.expandvars(value)))


def root_key(source_sha256: str, requested_output: str) -> str:
    raw = (source_sha256.lower() + "\n" + canonical_path(requested_output)).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


def make_root_task_id(source_sha256: str, requested_output: str) -> str:
    return "root-" + root_key(source_sha256, requested_output)[:24]


def make_job_id(root_task_id: str, child_index: int) -> str:
    return f"{root_task_id}-job-{child_index:03d}"


def atomic_write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix=path.name + ".", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
            json.dump(payload, stream, ensure_ascii=False, indent=2, sort_keys=True)
            stream.write("\n")
        os.replace(temp_name, path)
    finally:
        if os.path.exists(temp_name):
            os.unlink(temp_name)


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8-sig") as stream:
        return json.load(stream)


def new_root_task(source_path: str, source_sha256: str, requested_output: str) -> dict[str, Any]:
    now = utc_now()
    return {
        "schema_version": SCHEMA_VERSION,
        "rule_version": SCHEMA_VERSION,
        "root_task_id": make_root_task_id(source_sha256, requested_output),
        "source_path": canonical_path(source_path),
        "source_sha256": source_sha256.lower(),
        "requested_output": canonical_path(requested_output),
        "root_started_at": now,
        "root_finished_at": None,
        "root_elapsed_seconds": 0.0,
        "cumulative_codex_elapsed_seconds": 0.0,
        "cumulative_preflight_seconds": 0.0,
        "cumulative_illustrator_seconds": 0.0,
        "cumulative_export_seconds": 0.0,
        "cumulative_qa_seconds": 0.0,
        "child_job_count": 0,
        "total_connection_attempts": 0,
        "total_jsx_started_count": 0,
        "total_logic_retries": 0,
        "final_status": "pending",
    }


def same_root(root: dict[str, Any], source_sha256: str, requested_output: str) -> bool:
    return (
        root.get("source_sha256", "").lower() == source_sha256.lower()
        and canonical_path(root.get("requested_output", "")) == canonical_path(requested_output)
    )


def create_child_job(root: dict[str, Any], mode: str = "fast_production") -> dict[str, Any]:
    root["child_job_count"] = int(root.get("child_job_count", 0)) + 1
    return {
        "schema_version": SCHEMA_VERSION,
        "rule_version": SCHEMA_VERSION,
        "job_id": make_job_id(root["root_task_id"], root["child_job_count"]),
        "parent_root_task_id": root["root_task_id"],
        "mode": mode,
        "started_at": utc_now(),
        "finished_at": None,
        "elapsed_seconds": 0.0,
        "preflight_elapsed_seconds": 0.0,
        "illustrator_elapsed_seconds": 0.0,
        "export_elapsed_seconds": 0.0,
        "qa_elapsed_seconds": 0.0,
        "illustrator_connection_attempts": 0,
        "illustrator_connection_failures": 0,
        "jsx_started_count": 0,
        "jsx_completed_count": 0,
        "jsx_logic_failures": 0,
        "logic_retry_count": 0,
        "export_count": 0,
        "current_stage": "pending",
        "final_status": "pending",
        "failure_stage": None,
        "failure_reason": None,
    }


def add_elapsed(root: dict[str, Any], job: dict[str, Any], bucket: str, seconds: float) -> None:
    seconds = max(0.0, float(seconds))
    job[bucket + "_elapsed_seconds"] = float(job.get(bucket + "_elapsed_seconds", 0.0)) + seconds
    root_key_name = "cumulative_" + bucket + "_seconds"
    root[root_key_name] = float(root.get(root_key_name, 0.0)) + seconds


def apply_runner_counts(root: dict[str, Any], job: dict[str, Any]) -> None:
    root["total_connection_attempts"] = int(root.get("total_connection_attempts", 0)) + int(job.get("illustrator_connection_attempts", 0))
    root["total_jsx_started_count"] = int(root.get("total_jsx_started_count", 0)) + int(job.get("jsx_started_count", 0))
    root["total_logic_retries"] = int(root.get("total_logic_retries", 0)) + int(job.get("logic_retry_count", 0))


def budget_decision(elapsed_seconds: float, stage: str, stable_jsx_running: bool = False, saving: bool = False) -> str:
    elapsed_seconds = float(elapsed_seconds)
    if elapsed_seconds >= 900:
        return "wait_for_save_then_stop" if saving else "stop_sla_exceeded"
    if elapsed_seconds >= 600:
        if stable_jsx_running:
            return "finish_current_atomic_operation"
        return "stop_target_exceeded"
    return "continue"
