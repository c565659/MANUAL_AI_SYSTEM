import unittest

from executors.lib.manual_geometry import PdfToIllustratorTransform, assign_page, boundary_candidate, normalize_bounds, overlap_area, page_is_blank, section_page_kind


class ManualGeometryV140Tests(unittest.TestCase):
    def test_pdf_y_axis_is_flipped_into_illustrator_frame(self):
        tx = PdfToIllustratorTransform((0, 200, 100, 0), (0, 200, 100, 0), (10, 50, 110, -150))
        self.assertEqual(tx.point(0, 0), (10, 50))
        self.assertEqual(tx.point(100, 200), (110, -150))

    def test_crop_box_offset_is_removed(self):
        tx = PdfToIllustratorTransform((0, 300, 200, 0), (20, 250, 120, 50), (0, 100, 100, -100))
        self.assertEqual(tx.point(20, 50), (0, 100))

    def test_rotated_page(self):
        tx = PdfToIllustratorTransform((0, 200, 100, 0), (0, 200, 100, 0), (0, 100, 100, -100), 90)
        self.assertEqual(tx.point(0, 0), (0, -100))

    def test_object_near_boundary_uses_center(self):
        self.assertEqual(assign_page((98, 90, 101, 10), [(0, 100, 100, 0), (100, 100, 200, 0)])[0], 0)

    def test_cross_page_object_is_ambiguous(self):
        self.assertEqual(assign_page((80, 80, 120, 20), [(0, 100, 100, 0), (100, 100, 200, 0)]), (None, True))

    def test_outside_object_is_unassigned(self):
        self.assertEqual(assign_page((300, 10, 310, 0), [(0, 100, 100, 0)]), (None, False))

    def test_reversed_bounds_are_normalized(self):
        self.assertEqual(normalize_bounds((100, 0, 0, 100)), (0.0, 100.0, 100.0, 0.0))

    def test_overlap_is_coordinate_direction_independent(self):
        self.assertEqual(overlap_area((0, 0, 10, 10), (5, 10, 15, 0)), 50)

    def test_blank_page(self):
        self.assertTrue(page_is_blank([], 0))

    def test_page_number_only_is_blank(self):
        self.assertTrue(page_is_blank(["- 27 -"], 0))

    def test_customer_service_only_page(self):
        self.assertEqual(section_page_kind(["CUSTOMER SERVICE"], ["customer service"]), "whole_target")

    def test_customer_service_mixed_page(self):
        self.assertEqual(section_page_kind(["MAINTENANCE", "CUSTOMER SERVICE"], ["customer service"]), "mixed_target")

    def test_design_inner_frame_is_not_page_boundary(self):
        self.assertFalse(boundary_candidate((5, 95, 95, 5), 100, 100, filled=False, stroked=True, clipping=False, tolerance=1))
        self.assertTrue(boundary_candidate((0, 100, 100, 0), 100, 100, filled=False, stroked=True, clipping=False, tolerance=1))
        self.assertTrue(boundary_candidate((0, 100, 100, 0), 100, 100, filled=True, stroked=False, clipping=False, tolerance=1))


class ExtendScriptContractV140Tests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        from pathlib import Path
        root = Path(__file__).resolve().parents[1]
        cls.manual = (root / "executors/illustrator/manual_splitter.jsx").read_text(encoding="utf-8")
        cls.shared = (root / "executors/illustrator/shared_utils.jsx").read_text(encoding="utf-8")

    def test_layer_parent_objects_are_snapshotted(self):
        self.assertIn("doc.layers", self.shared)
        self.assertIn("parent === doc.layers[i]", self.shared)

    def test_snapshot_precedes_new_page_group(self):
        self.assertLess(self.manual.index("snapshotOriginalCandidates"), self.manual.index("doc.groupItems.add"))

    def test_new_page_groups_cannot_reenter_snapshot(self):
        self.assertEqual(self.manual.count("snapshotOriginalCandidates"), 1)

    def test_nested_groups_are_recursive(self):
        self.assertIn("visit(item.pageItems[j])", self.shared)

    def test_clipping_group_is_kept_atomic(self):
        self.assertIn("item.clipped !== true", self.shared)

    def test_multiple_fonts_are_inspected_by_character(self):
        self.assertIn("frame.characters.length", self.shared)
        self.assertIn("multi_font_frames", self.shared)

    def test_no_native_json_stringify_dependency(self):
        self.assertNotIn("JSON.stringify", self.shared + self.manual)
        self.assertIn("FSS.stringify", self.shared)

    def test_boundary_frame_uses_exact_geometric_size_and_style_score(self):
        self.assertIn("item.geometricBounds", self.shared)
        self.assertIn("boundaryStyleScore", self.shared)
        self.assertIn("page_boundary_count_mismatch", self.shared)

    def test_blank_page_export_gate(self):
        self.assertIn("blank_or_off_artboard_page", self.manual)

    def test_whole_target_page_and_mixed_section_paths_exist(self):
        self.assertIn("maps[i].keep === false", self.manual)
        self.assertIn("partial_sections_removed", self.manual)

    def test_shared_mixed_section_object_fails_closed(self):
        self.assertIn("unsafe_shared_object_in_section", self.manual)

    def test_single_export_call(self):
        self.assertEqual(self.manual.count("doc.saveAs("), 1)
if __name__ == "__main__":
    unittest.main()
