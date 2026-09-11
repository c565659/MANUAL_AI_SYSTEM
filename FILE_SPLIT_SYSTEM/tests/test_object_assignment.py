import unittest

from executors.lib.object_assignment import assign_page


class ObjectAssignmentTests(unittest.TestCase):
    def test_assigns_positive_negative_and_origin_crossing_bounds(self):
        pages = [[-200, 100, 0, -100], [0, 100, 200, -100]]
        self.assertEqual(assign_page([-150, 50, -20, -50], pages), 0)
        self.assertEqual(assign_page([20, 50, 150, -50], pages), 1)


    def test_overlap_fallback_and_outside_rejection(self):
        pages = [[0, 100, 100, 0], [100, 100, 200, 0]]
        self.assertEqual(assign_page([90, 120, 130, 80], pages), 1)
        self.assertIsNone(assign_page([300, 100, 310, 90], pages))
