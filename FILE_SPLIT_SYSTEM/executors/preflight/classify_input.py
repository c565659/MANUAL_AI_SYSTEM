#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

PACKAGING_TERMS = ("packaging", "package", "包装", "刀模", "uv", "dieline")
MANUAL_TERMS = ("manual", "guide", "说明书", "welcome", "instruction")


def classify(path: Path) -> dict:
    name = path.name.lower()
    packaging = [term for term in PACKAGING_TERMS if term in name]
    manual = [term for term in MANUAL_TERMS if term in name]
    if packaging and not manual:
        result = "PACKAGING_DISPLAY"
    elif manual and not packaging:
        result = "WEB_MANUAL"
    else:
        result = "source_needs_review"
    return {
        "classification": result,
        "extension": path.suffix.lower(),
        "evidence_for": packaging if result == "PACKAGING_DISPLAY" else manual,
        "content_and_structure_checked": False,
        "note": "Filename evidence is only a first pass; build_job_manifest requires explicit structural bounds."
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input")
    args = parser.parse_args()
    print(json.dumps(classify(Path(args.input)), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
