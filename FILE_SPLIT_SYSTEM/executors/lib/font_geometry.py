from __future__ import annotations

import re
from dataclasses import dataclass
from math import hypot
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


@dataclass(frozen=True)
class OutlineMetrics:
    visible_bounds: tuple[float, float, float, float]
    geometric_bounds: tuple[float, float, float, float]
    path_count: int

    @property
    def center(self) -> tuple[float, float]:
        left, top, right, bottom = self.visible_bounds
        return (left + right) / 2.0, (top + bottom) / 2.0

    @property
    def width(self) -> float:
        return abs(self.visible_bounds[2] - self.visible_bounds[0])

    @property
    def height(self) -> float:
        return abs(self.visible_bounds[1] - self.visible_bounds[3])


def outline_tolerance(reference_size: float, actual_size: float, *, absolute_pt: float = 0.05, relative_ratio: float = 0.001) -> float:
    """Use a small absolute floor and a scale-aware relative allowance."""
    return max(float(absolute_pt), max(abs(float(reference_size)), abs(float(actual_size))) * float(relative_ratio))


def compare_outline_metrics(reference: OutlineMetrics | None, actual: OutlineMetrics | None) -> tuple[bool, list[str]]:
    """Compare two outline results; TextFrame bounds are deliberately not accepted."""
    reasons: list[str] = []
    if reference is None or actual is None:
        return False, ["empty_outline"]
    if reference.path_count <= 0 or actual.path_count <= 0:
        reasons.append("empty_outline")
    center_tolerance = outline_tolerance(max(reference.width, reference.height), max(actual.width, actual.height))
    if hypot(reference.center[0] - actual.center[0], reference.center[1] - actual.center[1]) > center_tolerance:
        reasons.append("outline_shift")
    if abs(reference.width - actual.width) > outline_tolerance(reference.width, actual.width):
        reasons.append("outline_width_scale")
    if abs(reference.height - actual.height) > outline_tolerance(reference.height, actual.height):
        reasons.append("outline_height_scale")
    if reference.path_count != actual.path_count:
        reasons.append("outline_path_count")
    edge_tolerance = max(
        outline_tolerance(reference.width, actual.width),
        outline_tolerance(reference.height, actual.height),
    )
    for label, first, second in (
        ("geometric_left", reference.geometric_bounds[0], actual.geometric_bounds[0]),
        ("geometric_top", reference.geometric_bounds[1], actual.geometric_bounds[1]),
        ("geometric_right", reference.geometric_bounds[2], actual.geometric_bounds[2]),
        ("geometric_bottom", reference.geometric_bounds[3], actual.geometric_bounds[3]),
    ):
        if abs(first - second) > edge_tolerance:
            reasons.append(label)
    return not reasons, reasons
