#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

SYSTEM_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(SYSTEM_ROOT))
from executors.lib.task_state import atomic_write_json, create_child_job, load_json, make_root_task_id, new_root_task, same_root


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def reserve_output(target: Path) -> dict:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    temp = target.with_name(target.stem + ".pending-" + stamp + target.suffix)
    backup = target.with_name(target.stem + ".backup-" + stamp + target.suffix) if target.exists() else None
    return {"requested_path": str(target.resolve()), "temporary_path": str(temp.resolve()), "backup_path": str(backup.resolve()) if backup else None, "conflict": target.exists()}


def executor_status(task_type: str) -> dict:
    manifest = json.loads((SYSTEM_ROOT / "executors" / "manifest.json").read_text(encoding="utf-8"))
    for executor in manifest["executors"]:
        if task_type in executor["supported_task_type"]:
            return executor
    raise ValueError("No executor declares support for " + task_type)


def build(args: argparse.Namespace) -> tuple[dict, dict]:
    preflight_started = time.perf_counter()
    source = args.input.resolve()
    output = args.output.resolve()
    source_hash = sha256_file(source)
    state_dir = args.state_dir.resolve()
    root_path = state_dir / (make_root_task_id(source_hash, str(output)) + ".json")
    if root_path.exists():
        root = load_json(root_path)
        if not same_root(root, source_hash, str(output)):
            raise RuntimeError("Existing root task does not match source SHA-256 and output path")
    else:
        root = new_root_task(str(source), source_hash, str(output))
    if args.task_type == "WEB_MANUAL" and not args.page_map:
        raise ValueError("WEB_MANUAL requires an explicit logical page map")
    if args.task_type == "WEB_MANUAL" and not args.font_report:
        raise ValueError("WEB_MANUAL requires a PDF font report")
    if args.task_type == "PACKAGING_DISPLAY" and not args.face_map:
        raise ValueError("PACKAGING_DISPLAY requires an explicit packaging face map")
    args.working_copy.parent.mkdir(parents=True, exist_ok=True)
    if source.resolve() == args.working_copy.resolve():
        raise ValueError("Working copy must not be the original input")
    if not args.working_copy.exists():
        shutil.copy2(source, args.working_copy)
    job = create_child_job(root, args.mode)
    executor = executor_status(args.task_type)
    status = "pending"
    if args.mode == "fast_production" and executor["validation_status"] != "verified":
        status = "system_not_ready"
        job["failure_reason"] = "fast_production requires a verified executor"
    job.update({
        "task_type": args.task_type,
        "model": args.model,
        "source": {"path": str(source), "sha256": source_hash, "working_copy_path": str(args.working_copy.resolve())},
        "output": reserve_output(output),
        "executor_name": executor["executor_name"],
        "executor_version": executor["executor_version"],
        "manual_page_map": json.loads(args.page_map.read_text(encoding="utf-8")) if args.page_map else [],
        "packaging_face_map": json.loads(args.face_map.read_text(encoding="utf-8")) if args.face_map else [],
        "deletions": [],
        "font_check": json.loads(args.font_report.read_text(encoding="utf-8")) if args.font_report else {"declared_postscript_names": [], "allow_substitution": False},
        "qa_output_path": str(args.qa_output.resolve()),
        "current_stage": "preflight_complete",
        "final_status": status
    })
    if args.task_type == "WEB_MANUAL":
        declared = job["font_check"].get("normalized_postscript_names", job["font_check"].get("declared_fonts", job["font_check"].get("declared_postscript_names", [])))
        job["font_check"] = {
            "declared_postscript_names": sorted(set(declared)),
            "raw_pdf_font_resource_count": job["font_check"].get("raw_pdf_font_resource_count"),
            "normalized_font_count": len(set(declared)),
            "allow_substitution": False,
        }
        page_map = job["manual_page_map"]
        first = page_map[0]
        source_bounds = first.get("source_bounds") or []
        width = abs(float(source_bounds[2]) - float(source_bounds[0])) if len(source_bounds) == 4 else float(first["size_mm"]["width"]) * 72 / 25.4
        height = abs(float(source_bounds[1]) - float(source_bounds[3])) if len(source_bounds) == 4 else float(first["size_mm"]["height"]) * 72 / 25.4
        job["manual_detection"] = {
            "expected_logical_pages": len(page_map),
            "expected_kept_pages": sum(item.get("keep", True) for item in page_map),
            "page_width_pt": width,
            "page_height_pt": height,
            "boundary_tolerance_pt": max(0.75, min(width, height) * 0.003),
            "minimum_overlap_ratio": 0.02,
            "minimum_visible_area_pt2": max(4.0, width * height * 0.0001),
            "section_tolerance_pt": 1.5,
            "section_keywords": [
                "CUSTOMER SERVICE", "SERVICE CLIENT", "SERVICE À LA CLIENTÈLE",
                "خدمة العملاء", "WARRANTY CERTIFICATE", "WARRANTY TERMS CONDITIONS",
                "CERTIFICAT DE GARANTIE", "CONDITIONS DE GARANTIE", "شهادة الضمان", "شروط الضمان"
            ],
            "coordinate_authority": "illustrator_page_frames",
            "pdf_coordinates_are_auxiliary": True,
        }
    preflight_elapsed = time.perf_counter() - preflight_started
    job["preflight_elapsed_seconds"] = preflight_elapsed
    root["cumulative_preflight_seconds"] = float(root.get("cumulative_preflight_seconds", 0.0)) + preflight_elapsed
    root["final_status"] = status
    state_dir.mkdir(parents=True, exist_ok=True)
    atomic_write_json(root_path, root)
    atomic_write_json(state_dir / (job["job_id"] + ".json"), job)
    return root, job


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--working-copy", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--qa-output", required=True, type=Path)
    parser.add_argument("--state-dir", required=True, type=Path)
    parser.add_argument("--task-type", required=True, choices=("WEB_MANUAL", "PACKAGING_DISPLAY"))
    parser.add_argument("--model", required=True)
    parser.add_argument("--mode", default="fast_production", choices=("fast_production", "development_validation"))
    parser.add_argument("--page-map", type=Path)
    parser.add_argument("--face-map", type=Path)
    parser.add_argument("--font-report", type=Path)
    args = parser.parse_args()
    root, job = build(args)
    print(json.dumps({"root_task_id": root["root_task_id"], "job_id": job["job_id"], "final_status": job["final_status"]}, ensure_ascii=False))
    return 2 if job["final_status"] == "system_not_ready" else 0


if __name__ == "__main__":
    raise SystemExit(main())
