#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


def _box(box) -> dict:
    return {"left": float(box.left), "bottom": float(box.bottom), "right": float(box.right), "top": float(box.top), "width_pt": float(box.width), "height_pt": float(box.height)}


def _normal_font_name(value: str) -> str:
    value = value.lstrip("/")
    return value.split("+", 1)[1] if "+" in value and len(value.split("+", 1)[0]) == 6 else value


def inspect_pdf(path: Path) -> dict:
    result = {"path": str(path.resolve()), "page_count": None, "pages": [], "raw_pdf_font_resources": [], "normalized_postscript_names": [], "errors": []}
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(path))
        result["page_count"] = len(reader.pages)
        for index, page in enumerate(reader.pages):
            raw_fonts = []
            resources = page.get("/Resources") or {}
            for ref in (resources.get("/Font") or {}).values():
                font = ref.get_object(); raw = str(font.get("/BaseFont", "")); raw_fonts.append(raw)
                result["raw_pdf_font_resources"].append(raw)
            result["pages"].append({
                "index": index,
                "media_box": _box(page.mediabox),
                "crop_box": _box(page.cropbox),
                "rotation": int(page.get("/Rotate", 0) or 0) % 360,
                "has_text": bool((page.extract_text() or "").strip())
                ,"raw_font_resources": raw_fonts
            })
        result["raw_pdf_font_resource_count"] = len(result["raw_pdf_font_resources"])
        result["normalized_postscript_names"] = sorted({_normal_font_name(name) for name in result["raw_pdf_font_resources"] if name})
        result["normalized_font_count"] = len(result["normalized_postscript_names"])
    except Exception as exc:
        result["errors"].append(str(exc))
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    args = parser.parse_args()
    print(json.dumps(inspect_pdf(args.input), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
