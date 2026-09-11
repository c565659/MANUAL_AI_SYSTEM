import unittest

from executors.lib.task_state import budget_decision


class TimeBudgetTests(unittest.TestCase):
    def test_target_allows_running_stable_executor_to_finish_atomic_operation(self):
        self.assertEqual(budget_decision(600, "illustrator", stable_jsx_running=True), "finish_current_atomic_operation")


    def test_target_stops_new_phase(self):
        self.assertEqual(budget_decision(600, "analysis"), "stop_target_exceeded")


    def test_hard_limit_never_starts_new_phase(self):
        self.assertEqual(budget_decision(900, "qa"), "stop_sla_exceeded")
        self.assertEqual(budget_decision(901, "save", saving=True), "wait_for_save_then_stop")
