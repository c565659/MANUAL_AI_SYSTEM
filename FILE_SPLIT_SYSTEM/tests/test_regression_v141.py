import unittest

from executors.lib.document_lifecycle import close_owned_document
from executors.lib.font_geometry import OutlineMetrics, compare_outline_metrics, significant_geometry_change
from executors.lib.manual_geometry import SectionHeading, build_section_intervals, classify_unassigned_text


class OutlineRegressionTests(unittest.TestCase):
    def setUp(self):
        self.reference = OutlineMetrics((10, 90, 70, 30), (9.9, 90.1, 70.1, 29.9), 42)

    def test_area_text_box_and_glyph_bounds_naturally_differ(self):
        self.assertTrue(significant_geometry_change((0, 100, 100, 0), self.reference.visible_bounds, 1.0))

    def test_outline_to_outline_comparison_passes_unchanged_text(self):
        actual = OutlineMetrics((10.01, 90.01, 70.01, 30.01), (9.91, 90.11, 70.11, 29.91), 42)
        self.assertEqual(compare_outline_metrics(self.reference, actual), (True, []))

    def test_real_outline_shift_fails(self):
        actual = OutlineMetrics((13, 90, 73, 30), (12.9, 90.1, 73.1, 29.9), 42)
        passed, reasons = compare_outline_metrics(self.reference, actual)
        self.assertFalse(passed)
        self.assertIn("outline_shift", reasons)

    def test_real_outline_scale_fails(self):
        actual = OutlineMetrics((10, 90, 82, 18), (9.9, 90.1, 82.1, 17.9), 42)
        passed, reasons = compare_outline_metrics(self.reference, actual)
        self.assertFalse(passed)
        self.assertTrue({"outline_width_scale", "outline_height_scale"}.issubset(reasons))


class UnassignedTextRegressionTests(unittest.TestCase):
    PAGES = [(0, 100, 100, 0), (100, 100, 200, 0)]

    def test_empty_text_frame_is_deleted(self):
        self.assertEqual(classify_unassigned_text(" \n", (10, 20, 20, 10), self.PAGES, [True, True])["reason"], "empty_text_frame")

    def test_retained_page_text_is_reassigned(self):
        result = classify_unassigned_text("instructions", (10, 20, 20, 10), self.PAGES, [True, True])
        self.assertEqual((result["action"], result["page"]), ("assign", 0))

    def test_external_auxiliary_text_is_deleted(self):
        result = classify_unassigned_text("registration mark", (250, 20, 270, 10), self.PAGES, [True, True])
        self.assertEqual((result["action"], result["reason"]), ("delete", "outside_all_page_frames_auxiliary"))

    def test_hidden_external_text_fails_closed(self):
        result = classify_unassigned_text("possibly valid", (250, 20, 270, 10), self.PAGES, [True, True], hidden=True)
        self.assertEqual(result["action"], "fail")

    def test_ambiguous_text_fails_closed(self):
        result = classify_unassigned_text("shared", (90, 80, 110, 20), self.PAGES, [True, True])
        self.assertEqual(result["reason"], "ambiguous_page_ownership")


class SectionIntervalRegressionTests(unittest.TestCase):
    def test_multiple_target_sections_create_multiple_intervals(self):
        headings = [
            SectionHeading("CUSTOMER SERVICE", 90, "H2"),
            SectionHeading("MAINTENANCE", 70, "H2"),
            SectionHeading("WARRANTY CERTIFICATE", 50, "H2"),
            SectionHeading("SPECIFICATIONS", 30, "H2"),
        ]
        intervals = build_section_intervals(headings, ["CUSTOMER SERVICE", "WARRANTY CERTIFICATE"], 5)
        self.assertEqual([(row["start"], row["end"]) for row in intervals], [(90.0, 70.0), (50.0, 30.0)])

    def test_valid_peer_heading_stops_deletion_before_page_bottom(self):
        headings = [SectionHeading("CUSTOMER SERVICE", 80, "H2"), SectionHeading("TROUBLESHOOTING", 45, "H2")]
        interval = build_section_intervals(headings, ["CUSTOMER SERVICE"], 5)[0]
        self.assertEqual((interval["end"], interval["next_section_title"]), (45.0, "TROUBLESHOOTING"))

    def test_without_next_peer_uses_content_bottom(self):
        headings = [SectionHeading("CUSTOMER SERVICE", 80, "H2"), SectionHeading("body label", 50, "BODY")]
        self.assertEqual(build_section_intervals(headings, ["CUSTOMER SERVICE"], 7)[0]["end"], 7.0)


class DocumentLifecycleRegressionTests(unittest.TestCase):
    class FakeDocument:
        def __init__(self):
            self.closed = False

        def close(self, save):
            self.closed = not save

    def test_success_closes_only_executor_document(self):
        owned, user = self.FakeDocument(), self.FakeDocument()
        self.assertTrue(close_owned_document(owned, True))
        self.assertFalse(close_owned_document(user, False))
        self.assertTrue(owned.closed)
        self.assertFalse(user.closed)

    def test_failure_cleanup_does_not_close_user_document(self):
        user = self.FakeDocument()
        try:
            raise RuntimeError("executor failure")
        except RuntimeError:
            self.assertFalse(close_owned_document(user, False))
        self.assertFalse(user.closed)


if __name__ == "__main__":
    unittest.main()
