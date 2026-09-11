import unittest

from executors.lib.font_geometry import has_visible_glyphs, significant_geometry_change, tolerance_points, union_bounds


class FontGeometryTests(unittest.TestCase):
    def test_invisible_text_is_filtered(self):
        for text in ("", " ", "  \t\r\n", "\n", "\u200b", None):
            with self.subTest(text=text):
                self.assertFalse(has_visible_glyphs(text))

    def test_visible_text_in_multiple_languages_and_weights(self):
        for text in ("Point text", "Area text", "line one\nline two", "Gras", "العربية", "Français"):
            with self.subTest(text=text):
                self.assertTrue(has_visible_glyphs(text))

    def test_page_level_union_and_reasonable_tolerance(self):
        before = union_bounds([[10, 90, 40, 70], [50, 60, 90, 20]])
        after = union_bounds([[10.2, 89.9, 40.1, 70], [50, 60.1, 90, 20]])
        tolerance = tolerance_points(595, 842)
        self.assertEqual(before, (10.0, 90.0, 90.0, 20.0))
        self.assertFalse(significant_geometry_change(before, after, tolerance))
        self.assertTrue(significant_geometry_change(before, [20, 90, 100, 20], tolerance))

    def test_already_outlined_page_with_no_live_text_is_not_failure(self):
        self.assertFalse(significant_geometry_change(None, None, tolerance_points(100, 150)))
