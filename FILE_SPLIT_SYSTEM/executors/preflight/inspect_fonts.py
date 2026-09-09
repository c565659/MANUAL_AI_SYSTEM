#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

SUBSET = re.compile(r"^[A-Z]{6}\+")


def inspect_fonts(path: Path) -> dict:
    result = {"path": str(path.resolve()), "declared_fonts": [], "errors": []}
    try:
        from pypdf import PdfReader
        names = set()
        for page in PdfReader(str(path)).pages:
            resources = page.get("/Resources") or {}
            fonts = resources.get("/Font") or {}
            for ref in fonts.values():
                font = ref.get_object()
                raw = str(font.get("/BaseFont", "")).lstrip("/")
                names.add(SUBSET.sub("", raw))
        result["declared_fonts"] = sorted(name for name in names if name)
    except Exception as exc:
        result["errors"].append(str(exc))
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    args = parser.parse_args()
    print(json.dumps(inspect_fonts(args.input), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
