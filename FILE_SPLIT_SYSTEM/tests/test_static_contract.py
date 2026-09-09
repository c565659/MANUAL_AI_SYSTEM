import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class StaticContractTests(unittest.TestCase):
    def test_all_json_versions_and_settings_parse(self):
        settings = json.loads((ROOT / "config/settings.json").read_text(encoding="utf-8"))
        self.assertEqual(settings["schema_version"], "1.3.0")
        self.assertEqual(settings["rule_version"], "1.3.0")
        self.assertEqual(settings["execution"]["production_target_seconds"], 600)
        self.assertEqual(settings["execution"]["production_hard_limit_seconds"], 900)
        for path in ROOT.rglob("*.json"):
            payload = json.loads(path.read_text(encoding="utf-8"))
            if "schema_version" in payload:
                self.assertEqual(payload["schema_version"], "1.3.0", str(path))

    def test_manifest_blocks_fast_production_until_real_validation(self):
        manifest = json.loads((ROOT / "executors/manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(len(manifest["executors"]), 2)
        self.assertTrue(all(item["validation_status"] == "implemented_unverified" for item in manifest["executors"]))

    def test_jsx_uses_extend_script_compatible_subset_and_forbids_whole_source_pagination(self):
        sources = "\n".join(path.read_text(encoding="utf-8") for path in (ROOT / "executors/illustrator").glob("*.jsx"))
        self.assertNotIn("let ", sources)
        self.assertNotIn("const ", sources)
        self.assertNotIn("=>", sources)
        manual = (ROOT / "executors/illustrator/manual_splitter.jsx").read_text(encoding="utf-8")
        self.assertNotIn("SymbolItem", manual)
        self.assertNotIn("PlacedItem", manual)
        self.assertIn("createOutline()", manual)
        self.assertNotIn("whole_source", manual.lower())

    def test_markdown_references_exist(self):
        missing = []
        token = re.compile(r"(?:rules|prompts|config|executors|schemas)/[A-Za-z0-9_./-]+\.(?:md|json|jsx|ps1|py)")
        for path in ROOT.rglob("*.md"):
            for relative in token.findall(path.read_text(encoding="utf-8")):
                if not (ROOT / relative).exists():
                    missing.append((path.name, relative))
        self.assertFalse(missing, str(missing))

    def test_packaging_business_rules_remain(self):
        settings = json.loads((ROOT / "config/settings.json").read_text(encoding="utf-8"))
        self.assertEqual(settings["packaging"]["face_gap_mm"], 10)
        self.assertEqual(settings["packaging"]["resolution_ppi"], 300)
        self.assertEqual(settings["packaging"]["background"], "white")
        self.assertEqual(settings["color"]["green_spot_name"], "2286C")
        packaging_rule = (ROOT / "rules/03_Packaging_Display.md").read_text(encoding="utf-8")
        color_rule = (ROOT / "rules/04_Color_And_Export.md").read_text(encoding="utf-8")
        self.assertIn("10 mm", packaging_rule)
        self.assertIn("300 ppi", packaging_rule)
        self.assertIn("2286C", color_rule)
