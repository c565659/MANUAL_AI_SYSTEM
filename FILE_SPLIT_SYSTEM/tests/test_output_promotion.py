import tempfile
import unittest
from pathlib import Path

from executors.qa.output_promotion import promote_output


class OutputPromotionTests(unittest.TestCase):
    def test_existing_result_is_backed_up_before_promotion(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            source = base / "source.ai"
            target = base / "result.pdf"
            temporary = base / "result.pending.pdf"
            backup = base / "result.backup.pdf"
            source.write_text("source", encoding="utf-8")
            target.write_text("old", encoding="utf-8")
            temporary.write_text("new", encoding="utf-8")
            result = promote_output(str(source), str(temporary), str(target), str(backup))
            self.assertEqual(target.read_text(encoding="utf-8"), "new")
            self.assertEqual(backup.read_text(encoding="utf-8"), "old")
            self.assertEqual(result["backup_output_path"], str(backup.resolve()))

    def test_original_cannot_be_overwritten(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            source = base / "source.ai"
            temporary = base / "pending.ai"
            source.write_text("source", encoding="utf-8")
            temporary.write_text("new", encoding="utf-8")
            with self.assertRaises(ValueError):
                promote_output(str(source), str(temporary), str(source), None)
