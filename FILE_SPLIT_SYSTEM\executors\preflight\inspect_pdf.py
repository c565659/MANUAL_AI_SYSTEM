#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


def inspect_pdf(path: Path) -> dict:
    result = {"path": str(path.resolve()), "page_count": None, "pages": [], "errors": []}
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(path))
        result["page_count"] = len(reader.pages)
        for index, page in enumerate(reader.pages):
            box = page.mediabox
            result["pages"].append({
                "index": index,
                "width_pt": float(box.width),
                "height_pt": float(box.height),
                "has_text": bool((page.extract_text() or "").strip())
            })
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
