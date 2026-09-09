from __future__ import annotations

import re
from typing import Iterable, Sequence

MM_TO_PT = 72.0 / 25.4


def has_visible_glyphs(text: str | None) -> bool:
    if not text:
        return False
    return re.sub(r"[\s\u200b\u200c\u200d\ufeff]", "", text, flags=re.UNICODE) != ""


def union_bounds(bounds: Iterable[Sequence[float]]) -> tuple[float, float, float, float] | None:
    rows = [tuple(map(float, row)) for row in bounds if row is not None and len(row) == 4]
    if not rows:
        return None
    return min(x[0] for x in rows), max(x[1] for x in rows), max(x[2] for x in rows), min(x[3] for x in rows)


def tolerance_points(page_width_pt: float, page_height_pt: float) -> float:
    absolute = 0.25 * MM_TO_PT
    relative = min(abs(float(page_width_pt)), abs(float(page_height_pt))) * 0.002
    return max(absolute, relative)


def significant_geometry_change(before: Sequence[float] | None, after: Sequence[float] | None, tolerance_pt: float) -> bool:
    if before is None and after is None:
        return False
    if before is None or after is None:
        return True
    return any(abs(float(a) - float(b)) > float(tolerance_pt) for a, b in zip(before, after))
