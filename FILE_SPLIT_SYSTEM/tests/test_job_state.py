import tempfile
import unittest
import argparse
import json
from pathlib import Path

from executors.lib.task_state import create_child_job, make_root_task_id, new_root_task, same_root
from executors.preflight.build_job_manifest import build


SHA = "a" * 64


class JobStateTests(unittest.TestCase):
    def test_same_source_and_output_reuses_root(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp_path = Path(directory)
            output = tmp_path / "结果 文件.pdf"
            root = new_root_task(str(tmp_path / "输入.ai"), SHA, str(output))
            self.assertTrue(same_root(root, SHA.upper(), str(output)))
            first = create_child_job(root)
            second = create_child_job(root)
            self.assertEqual(first["parent_root_task_id"], root["root_task_id"])
            self.assertEqual(second["parent_root_task_id"], root["root_task_id"])
            self.assertNotEqual(first["job_id"], second["job_id"])
            self.assertEqual(root["child_job_count"], 2)


    def test_root_id_is_deterministic(self):
        with tempfile.TemporaryDirectory() as directory:
            output = str(Path(directory) / "out.pdf")
            self.assertEqual(make_root_task_id(SHA, output), make_root_task_id(SHA, output))


    def test_connection_and_jsx_counts_are_independent(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp_path = Path(directory)
            root = new_root_task(str(tmp_path / "in.ai"), SHA, str(tmp_path / "out.pdf"))
            job = create_child_job(root)
            job["illustrator_connection_attempts"] += 1
            job["illustrator_connection_failures"] += 1
            self.assertEqual(job["jsx_started_count"], 0)
            self.assertEqual(job["jsx_logic_failures"], 0)
            self.assertEqual(job["logic_retry_count"], 0)

    def test_preflight_reuses_root_and_detects_output_conflict(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            source = base / "中文 input.ai"
            source.write_bytes(b"fixture")
            output = base / "result.pdf"
            output.write_bytes(b"old")
            page_map = base / "pages.json"
            page_map.write_text(json.dumps([{"logical_page_id": "p1", "source_bounds": [0, 100, 100, 0], "target_artboard": [0, 100, 100, 0], "keep": True}]), encoding="utf-8")
            font_report = base / "fonts.json"
            font_report.write_text(json.dumps({"declared_fonts": ["ArialMT"]}), encoding="utf-8")
            def args(copy_name):
                return argparse.Namespace(input=source, working_copy=base / copy_name, output=output, qa_output=base / "qa.json", state_dir=base / "state", task_type="WEB_MANUAL", model="TEST", mode="fast_production", page_map=page_map, face_map=None, font_report=font_report)
            first_root, first_job = build(args("copy one.ai"))
            second_root, second_job = build(args("copy two.ai"))
            self.assertEqual(first_root["root_task_id"], second_root["root_task_id"])
            self.assertEqual(second_root["child_job_count"], 2)
            self.assertTrue(first_job["output"]["conflict"])
            self.assertEqual(first_job["final_status"], "system_not_ready")
            self.assertTrue((base / "copy one.ai").exists())
