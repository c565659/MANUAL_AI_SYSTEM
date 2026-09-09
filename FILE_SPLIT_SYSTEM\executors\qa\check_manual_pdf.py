#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from output_promotion import promote_output


def check(manifest: dict) -> dict:
    path = Path(manifest["output"]["temporary_path"])
    result = {"path": str(path.resolve()), "checks": {}, "errors": [], "qa_passed": False}
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(path))
        kept = [item for item in manifest["manual_page_map"] if item.get("keep", True)]
        result["checks"]["page_count"] = len(reader.pages) == len(kept)
        sizes_ok = True
        fonts = set()
        oversized_forms = []
        for index, page in enumerate(reader.pages):
            target = kept[index]["target_artboard"]
            expected_width = abs(float(target[2]) - float(target[0]))
            expected_height = abs(float(target[1]) - float(target[3]))
            sizes_ok = sizes_ok and abs(float(page.mediabox.width) - expected_width) <= 1 and abs(float(page.mediabox.height) - expected_height) <= 1
            resources = page.get("/Resources") or {}
            for font_ref in (resources.get("/Font") or {}).values():
                font = font_ref.get_object()
                fonts.add(str(font.get("/BaseFont", "")))
            for name, ref in (resources.get("/XObject") or {}).items():
                obj = ref.get_object()
                if obj.get("/Subtype") == "/Form":
                    bbox = obj.get("/BBox")
                    if bbox and abs(float(bbox[2]) - float(bbox[0])) > expected_width * 1.05:
                        oversized_forms.append({"page": index + 1, "name": str(name)})
        result["checks"]["page_sizes"] = sizes_ok
        result["checks"]["unoutlined_fonts_zero"] = len(fonts) == 0
        result["checks"]["oversized_shared_form_xobjects_zero"] = len(oversized_forms) == 0
        result["details"] = {"fonts": sorted(fonts), "oversized_forms": oversized_forms}
        jsx_qa = json.loads(Path(manifest["qa_output_path"]).read_text(encoding="utf-8"))
        result["checks"]["jsx_geometry"] = jsx_qa.get("outline_geometry_failures", 1) == 0
        result["checks"]["single_export"] = jsx_qa.get("export_count") == 1
        result["qa_passed"] = all(result["checks"].values())
    except Exception as exc:
        result["errors"].append(str(exc))
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--promote", action="store_true")
    args = parser.parse_args()
    manifest = json.loads(args.manifest.read_text(encoding="utf-8-sig"))
    result = check(manifest)
    if result["qa_passed"] and args.promote:
        result["promotion"] = promote_output(manifest["source"]["path"], manifest["output"]["temporary_path"], manifest["output"]["requested_path"], manifest["output"].get("backup_path"))
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["qa_passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
