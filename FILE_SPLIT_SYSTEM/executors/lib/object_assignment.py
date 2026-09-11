from __future__ import annotations

from typing import Sequence

from .manual_geometry import assign_page as assign_page_detailed


def center(bounds: Sequence[float]) -> tuple[float, float]:
    return (float(bounds[0]) + float(bounds[2])) / 2, (float(bounds[1]) + float(bounds[3])) / 2


def contains(bounds: Sequence[float], point: Sequence[float]) -> bool:
    return float(bounds[0]) <= point[0] <= float(bounds[2]) and float(bounds[3]) <= point[1] <= float(bounds[1])


def overlap_area(a: Sequence[float], b: Sequence[float]) -> float:
    width = max(0.0, min(float(a[2]), float(b[2])) - max(float(a[0]), float(b[0])))
    height = max(0.0, min(float(a[1]), float(b[1])) - max(float(a[3]), float(b[3])))
    return width * height


def assign_page(item_bounds: Sequence[float], page_bounds: list[Sequence[float]]) -> int | None:
    owner, ambiguous = assign_page_detailed(item_bounds, page_bounds)
    return None if ambiguous else owner
