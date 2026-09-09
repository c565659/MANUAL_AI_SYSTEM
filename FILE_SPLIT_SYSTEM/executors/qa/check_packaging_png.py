#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from output_promotion import promote_output


def expected_pixels(manifest: dict) -> tuple[int, int]:
    faces = [face for face in manifest["packaging_face_map"] if face.get("keep", True)]
    width_mm = sum(float(face["size_mm"]["width"]) for face in faces) + max(0, len(faces) - 1) * 10
    height_mm = max(float(face["size_mm"]["height"]) for face in faces)
    return round(width_mm / 25.4 * 300), round(height_mm / 25.4 * 300)


def check(manifest: dict) -> dict:
    path = Path(manifest["output"]["temporary_path"])
    result = {"path": str(path.resolve()), "checks": {}, "errors": [], "qa_passed": False}
    try:
        from PIL import Image
        with Image.open(path) as image:
            expected = expected_pixels(manifest)
            result["checks"]["pixel_size_300ppi"] = abs(image.width - expected[0]) <= 3 and abs(image.height - expected[1]) <= 3
            rgb = image.convert("RGB")
            corners = [rgb.getpixel((0, 0)), rgb.getpixel((rgb.width - 1, 0)), rgb.getpixel((0, rgb.height - 1)), rgb.getpixel((rgb.width - 1, rgb.height - 1))]
            result["checks"]["white_background"] = all(min(pixel) >= 248 for pixel in corners)
            result["details"] = {"actual_pixels": [image.width, image.height], "expected_pixels": list(expected), "corners": corners}
        jsx_qa = json.loads(Path(manifest["qa_output_path"]).read_text(encoding="utf-8"))
        result["checks"]["single_export"] = jsx_qa.get("export_count") == 1
        result["checks"]["face_count"] = len(jsx_qa.get("faces", [])) == len([face for face in manifest["packaging_face_map"] if face.get("keep", True)])
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
