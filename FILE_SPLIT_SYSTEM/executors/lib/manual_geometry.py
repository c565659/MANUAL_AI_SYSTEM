from __future__ import annotations

from dataclasses import dataclass
from math import cos, radians, sin
from typing import Iterable, Sequence
import re


Bounds = tuple[float, float, float, float]


def normalize_bounds(value: Sequence[float]) -> Bounds:
    x1, y1, x2, y2 = map(float, value)
    return min(x1, x2), max(y1, y2), max(x1, x2), min(y1, y2)


def area(value: Sequence[float]) -> float:
    left, top, right, bottom = normalize_bounds(value)
    return max(0.0, right - left) * max(0.0, top - bottom)


def overlap_area(a: Sequence[float], b: Sequence[float]) -> float:
    al, at, ar, ab = normalize_bounds(a)
    bl, bt, br, bb = normalize_bounds(b)
    return max(0.0, min(ar, br) - max(al, bl)) * max(0.0, min(at, bt) - max(ab, bb))


def center(value: Sequence[float]) -> tuple[float, float]:
    left, top, right, bottom = normalize_bounds(value)
    return (left + right) / 2.0, (top + bottom) / 2.0


def contains(value: Sequence[float], point: Sequence[float], tolerance: float = 0.0) -> bool:
    left, top, right, bottom = normalize_bounds(value)
    return left - tolerance <= point[0] <= right + tolerance and bottom - tolerance <= point[1] <= top + tolerance


def assign_page(item: Sequence[float], pages: Iterable[Sequence[float]], minimum_overlap_ratio: float = 0.02) -> tuple[int | None, bool]:
    page_list = [normalize_bounds(page) for page in pages]
    item_bounds = normalize_bounds(item)
    point = center(item_bounds)
    center_matches = [i for i, page in enumerate(page_list) if contains(page, point)]
    overlaps = [overlap_area(item_bounds, page) for page in page_list]
    positive = [i for i, value in enumerate(overlaps) if value > 0]
    if len(center_matches) == 1:
        return center_matches[0], False
    if len(positive) > 1 and sorted((overlaps[i] for i in positive), reverse=True)[1] / max(area(item_bounds), 1e-9) >= minimum_overlap_ratio:
        return None, True
    if not overlaps or max(overlaps) / max(area(item_bounds), 1e-9) < minimum_overlap_ratio:
        return None, False
    return overlaps.index(max(overlaps)), False


def page_is_blank(texts: Iterable[str], visible_graphic_area: float = 0.0) -> bool:
    content = " ".join(texts).strip()
    content = re.sub(r"^[\s\-–—]*\d+[\s\-–—]*$", "", content)
    return not content.strip() and float(visible_graphic_area) <= 1.0


def section_page_kind(texts: Iterable[str], keywords: Iterable[str]) -> str:
    normalized = lambda value: re.sub(r"[^\w]+", " ", value.upper()).strip()
    target = [normalized(value) for value in keywords]
    rows = [normalized(value) for value in texts if normalized(value)]
    hits = [row for row in rows if any(word in row for word in target)]
    if not hits:
        return "retain"
    return "whole_target" if len(hits) == len(rows) else "mixed_target"


def boundary_candidate(bounds: Sequence[float], page_width: float, page_height: float, *, filled: bool, stroked: bool, clipping: bool, tolerance: float) -> bool:
    normalized = normalize_bounds(bounds)
    return (not clipping and abs((normalized[2] - normalized[0]) - page_width) <= tolerance and abs((normalized[1] - normalized[3]) - page_height) <= tolerance)


@dataclass(frozen=True)
class PdfToIllustratorTransform:
    media_box: Bounds
    crop_box: Bounds
    illustrator_frame: Bounds
    rotation: int = 0

    def point(self, x: float, y: float) -> tuple[float, float]:
        ml, mt, mr, mb = normalize_bounds(self.media_box)
        cl, ct, cr, cb = normalize_bounds(self.crop_box)
        fl, ft, fr, fb = normalize_bounds(self.illustrator_frame)
        width, height = cr - cl, ct - cb
        u, v = (x - cl) / width, (y - cb) / height
        angle = self.rotation % 360
        if angle == 90:
            u, v = v, 1.0 - u
        elif angle == 180:
            u, v = 1.0 - u, 1.0 - v
        elif angle == 270:
            u, v = 1.0 - v, u
        elif angle != 0:
            theta = radians(angle)
            u, v = u * cos(theta) - v * sin(theta), u * sin(theta) + v * cos(theta)
        return fl + u * (fr - fl), ft - v * (ft - fb)


def is_boundary_candidate(bounds: Sequence[float], page_width: float, page_height: float, *, filled: bool, stroked: bool, tolerance: float) -> bool:
    left, top, right, bottom = normalize_bounds(bounds)
    return (not filled and stroked and abs((right - left) - page_width) <= tolerance and abs((top - bottom) - page_height) <= tolerance)


def page_is_effectively_blank(objects: Iterable[dict], minimum_area: float = 4.0) -> bool:
    meaningful = 0
    for obj in objects:
        if obj.get("boundary") or obj.get("hidden"):
            continue
        text = "".join(str(obj.get("text", "")).split())
        if obj.get("page_number_only") or (text.isdigit() and len(text) <= 4):
            continue
        if text or float(obj.get("area", 0.0)) >= minimum_area:
            meaningful += 1
    return meaningful == 0
