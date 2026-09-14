# Prompt Library

## WEB_MANUAL production

Run the verified `manual_splitter` in `fast_production`. Perform one preflight, one Illustrator main JSX invocation, one export, and one final QA. Stop with `system_not_ready` if the manifest is not verified.

## Executor regression

Run a bounded `development_validation` job after static tests. Supply a logical page map and normalized PDF font report as auxiliary evidence. Require Illustrator-frame page discovery, zero ambiguous cross-page objects, zero empty retained pages, expected mixed-section removals, zero live text after outline, and one export.
