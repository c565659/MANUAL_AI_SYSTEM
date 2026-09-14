#include "shared_utils.jsx"
(function () {
    var manifestPath = $.getenv("FILE_SPLIT_JOB_MANIFEST"), manifest, previousInteraction = app.userInteractionLevel, doc = null, ownsDocument = false, caughtError = null;
    var qa = {executor: "manual_splitter", version: "1.4.1", pages: [], errors: [], boundary_frames_detected: 0, boundary_frames_removed: 0, boundary_frames_anomalous: 0, ambiguous_objects: [], unassigned_candidates: [], unassigned_text_frames: [], residual_text_frames: [], partial_sections_removed: [], outline_validations: [], outline_geometry_failures: 0, unoutlined_text_frames: 0, export_count: 0, executor_document_closed: false};
    if (!manifestPath) { throw new Error("FILE_SPLIT_JOB_MANIFEST is not set inside Illustrator"); }
    manifest = FSS.readJson(manifestPath); FSS.writeText(manifest.markers.jsx_started, new Date().toUTCString());
    try {
        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
        doc = app.open(new File(manifest.source.working_copy_path)); ownsDocument = true;
        var maps = manifest.manual_page_map, manual = manifest.manual_detection, frames = FSS.discoverPageFrames(doc, manual), candidates = FSS.snapshotOriginalCandidates(doc, frames);
        var assigned = [], i, j, assignment, pageGroups = [], keepMaps = [], keepFrames = [], sectionKeywords = manual.section_keywords || [];
        qa.boundary_frames_detected = frames.length;
        for (i = 0; i < frames.length; i += 1) { assigned[i] = []; }
        for (i = 0; i < candidates.length; i += 1) {
            assignment = FSS.assignCandidate(candidates[i], frames, manual.minimum_overlap_ratio);
            if (assignment.ambiguous) { qa.ambiguous_objects.push({typename: candidates[i].item.typename, bounds: candidates[i].bounds}); }
            else if (assignment.owner >= 0) { assigned[assignment.owner].push(candidates[i]); }
            else { FSS.handleUnassignedCandidate(candidates[i], frames, maps, assigned, qa); }
        }
        if (qa.ambiguous_objects.length > 0) { throw new Error("ambiguous_cross_page_objects=" + qa.ambiguous_objects.length); }
        for (i = 0; i < frames.length; i += 1) {
            if (maps[i].keep === false) { continue; }
            var pageEntries = assigned[i], textFrames = [], intervals, interval, removedInSection, retainedBefore, retainedAfter, deletionResult, s;
            for (j = 0; j < pageEntries.length; j += 1) { FSS.collectTextFrames(pageEntries[j].item, textFrames); }
            intervals = FSS.buildSectionIntervals(textFrames, sectionKeywords, FSS.pageContentBottom(pageEntries, frames[i].bounds));
            for (s = 0; s < intervals.length; s += 1) {
                interval = intervals[s]; removedInSection = 0; retainedBefore = FSS.countEntryObjects(pageEntries);
                for (j = pageEntries.length - 1; j >= 0; j -= 1) {
                    deletionResult = FSS.deleteSection(pageEntries[j].item, interval.start, interval.end, manual.section_tolerance_pt); removedInSection += deletionResult.removed;
                    if (deletionResult.unsafe) { qa.partial_sections_removed.push({logical_page_id: maps[i].logical_page_id, target_title: interval.target_title, start: interval.start, end: interval.end, next_section_title: interval.next_section_title, removed_object_count: removedInSection, retained_object_count: FSS.countEntryObjects(pageEntries), cross_region_shared_object: true}); throw new Error("unsafe_shared_object_in_section page=" + maps[i].logical_page_id); }
                    if (deletionResult.root_removed) { pageEntries.splice(j, 1); }
                }
                retainedAfter = FSS.countEntryObjects(pageEntries);
                qa.partial_sections_removed.push({logical_page_id: maps[i].logical_page_id, target_title: interval.target_title, start: interval.start, end: interval.end, next_section_title: interval.next_section_title, removed_object_count: removedInSection, retained_object_count: retainedAfter, retained_object_delta: retainedBefore - retainedAfter, cross_region_shared_object: false});
            }
        }
        for (i = 0; i < frames.length; i += 1) { try { frames[i].item.remove(); qa.boundary_frames_removed += 1; } catch (frameError) { qa.boundary_frames_anomalous += 1; } }
        if (qa.boundary_frames_removed !== frames.length || qa.boundary_frames_anomalous !== 0) { throw new Error("boundary_frame_removal_failure"); }
        for (i = 0; i < frames.length; i += 1) {
            if (maps[i].keep === false) { for (j = 0; j < assigned[i].length; j += 1) { try { assigned[i][j].item.remove(); } catch (ignoreWholePage) {} } continue; }
            var group = doc.groupItems.add(); group.name = "FSS_PAGE_" + maps[i].logical_page_id;
            for (j = assigned[i].length - 1; j >= 0; j -= 1) { assigned[i][j].item.move(group, ElementPlacement.PLACEATBEGINNING); }
            pageGroups.push(group); keepMaps.push(maps[i]); keepFrames.push(frames[i]);
        }
        if (pageGroups.length !== manual.expected_kept_pages) { throw new Error("kept_page_count_mismatch expected=" + manual.expected_kept_pages + " actual=" + pageGroups.length); }
        while (doc.artboards.length > 1) { doc.artboards[doc.artboards.length - 1].remove(); }
        var stripWidth = manual.page_width_pt * pageGroups.length, stripLeft = -stripWidth / 2, target;
        for (i = 0; i < pageGroups.length; i += 1) {
            target = [stripLeft + i * manual.page_width_pt, manual.page_height_pt / 2, stripLeft + (i + 1) * manual.page_width_pt, -manual.page_height_pt / 2];
            if (i === 0) { doc.artboards[0].artboardRect = target; } else { doc.artboards.add(target); }
            pageGroups[i].translate(target[0] - keepFrames[i].bounds[0], target[1] - keepFrames[i].bounds[1]);
            var fontResult = FSS.fontSafety(pageGroups[i], manifest.font_check);
            if (fontResult.missing.length || fontResult.substituted.length || fontResult.overset.length || fontResult.hidden.length) { qa.errors.push({stage: "font_preflight", page: keepMaps[i].logical_page_id, result: fontResult}); throw new Error("font_preflight_failure page=" + keepMaps[i].logical_page_id); }
            var liveText = [], outlineRecord; FSS.collectTextFrames(pageGroups[i], liveText);
            for (j = liveText.length - 1; j >= 0; j -= 1) {
                if (!FSS.textFrameAccessible(liveText[j])) { qa.outline_validations.push({logical_page_id: keepMaps[i].logical_page_id, mode: "safe_fallback", passed: true, fallback_reason: "thread_peer_removed_by_prior_createOutline", reasons: []}); continue; }
                if (FSS.hasVisibleGlyphs(liveText[j].contents)) { outlineRecord = FSS.outlineTextFrameVerified(liveText[j], pageGroups[i], target); outlineRecord.logical_page_id = keepMaps[i].logical_page_id; qa.outline_validations.push(outlineRecord); if (!outlineRecord.passed) { qa.outline_geometry_failures += 1; } }
                else { qa.unassigned_text_frames.push(FSS.textFrameDiagnostic(liveText[j], frames, doc.artboards, "empty_text_frame_removed_before_outline")); liveText[j].remove(); }
            }
            var stats = FSS.visibleStats(pageGroups[i], target);
            if (stats.count < 1 || stats.area < manual.minimum_visible_area_pt2 || stats.artboard_intersection < manual.minimum_visible_area_pt2) { throw new Error("blank_or_off_artboard_page=" + keepMaps[i].logical_page_id); }
            qa.pages.push({logical_page_id: keepMaps[i].logical_page_id, visible_object_count: stats.count, visible_bounds_area: stats.area, artboard_intersection_area: stats.artboard_intersection, fonts_used: fontResult.used, multi_font_frames: fontResult.multi_font_frames});
        }
        FSS.removeEmptyGroups(doc);
        qa.unoutlined_text_frames = doc.textFrames.length;
        for (i = 0; i < doc.textFrames.length; i += 1) { qa.residual_text_frames.push(FSS.textFrameDiagnostic(doc.textFrames[i], frames, doc.artboards, "createOutline_did_not_remove_or_frame_was_not_processed")); }
        if (qa.outline_geometry_failures > 0 || qa.unoutlined_text_frames > 0) { throw new Error("outline_gate_failure"); }
        var pdfOptions = new PDFSaveOptions(); pdfOptions.preserveEditability = false; pdfOptions.generateThumbnails = false; pdfOptions.optimization = true; pdfOptions.viewAfterSaving = false; try { pdfOptions.saveMultipleArtboards = true; pdfOptions.artboardRange = "1-" + pageGroups.length; } catch (ignoreArtboardRange) {}
        var exportStarted = new Date().getTime(); doc.saveAs(new File(manifest.output.temporary_path), pdfOptions); qa.export_elapsed_seconds = (new Date().getTime() - exportStarted) / 1000; qa.export_count = 1;
        FSS.writeQa(manifest, qa);
    } catch (error) { caughtError = error; qa.errors.push({message: error.message, line: error.line || null}); try { FSS.writeQa(manifest, qa); } catch (ignoreQa) {} }
    finally {
        try { if (ownsDocument && doc) { doc.close(SaveOptions.DONOTSAVECHANGES); qa.executor_document_closed = true; } } catch (closeError) { qa.errors.push({stage: "document_close", message: closeError.message}); if (!caughtError) { caughtError = closeError; } }
        app.userInteractionLevel = previousInteraction;
        try { FSS.writeQa(manifest, qa); } catch (ignoreFinalQa) {}
    }
    if (caughtError) { throw caughtError; }
    FSS.writeText(manifest.markers.jsx_completed, new Date().toUTCString());
}());
