#include "shared_utils.jsx"
(function () {
    var manifestPath = $.getenv("FILE_SPLIT_JOB_MANIFEST"), manifest, previousInteraction = app.userInteractionLevel, doc = null;
    var qa = {executor: "manual_splitter", version: "1.4.0", pages: [], errors: [], boundary_frames_detected: 0, boundary_frames_removed: 0, boundary_frames_anomalous: 0, ambiguous_objects: [], partial_sections_removed: [], outline_geometry_failures: 0, unoutlined_text_frames: 0, export_count: 0};
    if (!manifestPath) { throw new Error("FILE_SPLIT_JOB_MANIFEST is not set inside Illustrator"); }
    manifest = FSS.readJson(manifestPath); FSS.writeText(manifest.markers.jsx_started, new Date().toUTCString());
    try {
        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
        doc = app.open(new File(manifest.source.working_copy_path));
        var maps = manifest.manual_page_map, manual = manifest.manual_detection, frames = FSS.discoverPageFrames(doc, manual), candidates = FSS.snapshotOriginalCandidates(doc, frames);
        var assigned = [], i, j, assignment, pageGroups = [], keepMaps = [], keepFrames = [], deletedCandidates = [], sectionKeywords = manual.section_keywords || [];
        qa.boundary_frames_detected = frames.length;
        for (i = 0; i < frames.length; i += 1) { assigned[i] = []; }
        for (i = 0; i < candidates.length; i += 1) { assignment = FSS.assignCandidate(candidates[i], frames, manual.minimum_overlap_ratio); if (assignment.ambiguous) { qa.ambiguous_objects.push({typename: candidates[i].item.typename, bounds: candidates[i].bounds}); } else if (assignment.owner >= 0) { assigned[assignment.owner].push(candidates[i]); } }
        if (qa.ambiguous_objects.length > 0) { throw new Error("ambiguous_cross_page_objects=" + qa.ambiguous_objects.length); }
        for (i = 0; i < frames.length; i += 1) {
            if (maps[i].keep === false) { continue; }
            var headings = [], pageEntries = assigned[i], tf = [], headerBottom = null, headerTop = null, t;
            for (j = 0; j < pageEntries.length; j += 1) { tf = []; FSS.collectTextFrames(pageEntries[j].item, tf); for (t = 0; t < tf.length; t += 1) { if (FSS.matchesKeyword(tf[t].contents, sectionKeywords)) { headings.push(tf[t]); } } }
            if (headings.length > 0) {
                headings.sort(function (a, b) { return FSS.bounds(b)[1] - FSS.bounds(a)[1]; }); headerTop = FSS.bounds(headings[0])[1]; headerBottom = frames[i].bounds[3];
                var removedInSection = 0;
                for (j = pageEntries.length - 1; j >= 0; j -= 1) { var deletionResult = FSS.deleteSection(pageEntries[j].item, headerTop, headerBottom, manual.section_tolerance_pt); removedInSection += deletionResult.removed; if (deletionResult.unsafe) { throw new Error("unsafe_shared_object_in_section page=" + maps[i].logical_page_id); } if (deletionResult.root_removed) { pageEntries.splice(j, 1); } }
                qa.partial_sections_removed.push({logical_page_id: maps[i].logical_page_id, heading_count: headings.length, removed_object_count: removedInSection});
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
            var before = null, after = null, textFrames = [], k; FSS.collectTextFrames(pageGroups[i], textFrames);
            for (k = 0; k < textFrames.length; k += 1) { if (FSS.hasVisibleGlyphs(textFrames[k].contents)) { before = FSS.union(before, FSS.bounds(textFrames[k])); } }
            for (k = textFrames.length - 1; k >= 0; k -= 1) { if (FSS.hasVisibleGlyphs(textFrames[k].contents)) { after = FSS.union(after, FSS.bounds(textFrames[k].createOutline())); } else { textFrames[k].remove(); } }
            var tolerance = FSS.tolerance(manual.page_width_pt || manual.page_width_pt, manual.page_height_pt), stats;
            if (FSS.geometryChanged(before, after, tolerance)) { qa.outline_geometry_failures += 1; }
            stats = FSS.visibleStats(pageGroups[i], target);
            if (stats.count < 1 || stats.area < manual.minimum_visible_area_pt2 || stats.artboard_intersection < manual.minimum_visible_area_pt2) { throw new Error("blank_or_off_artboard_page=" + keepMaps[i].logical_page_id); }
            qa.pages.push({logical_page_id: keepMaps[i].logical_page_id, visible_object_count: stats.count, visible_bounds_area: stats.area, artboard_intersection_area: stats.artboard_intersection, fonts_used: fontResult.used, multi_font_frames: fontResult.multi_font_frames, before_text_union: before, after_outline_union: after});
        }
        FSS.removeEmptyGroups(doc);
        if (qa.outline_geometry_failures > 0 || doc.textFrames.length > 0) { qa.unoutlined_text_frames = doc.textFrames.length; throw new Error("outline_gate_failure"); }
        var pdfOptions = new PDFSaveOptions(); pdfOptions.preserveEditability = false; pdfOptions.generateThumbnails = false; pdfOptions.optimization = true; pdfOptions.viewAfterSaving = false; try { pdfOptions.saveMultipleArtboards = true; pdfOptions.artboardRange = "1-" + pageGroups.length; } catch (ignoreArtboardRange) {}
        var exportStarted = new Date().getTime(); doc.saveAs(new File(manifest.output.temporary_path), pdfOptions); qa.export_elapsed_seconds = (new Date().getTime() - exportStarted) / 1000; qa.export_count = 1;
        FSS.writeQa(manifest, qa); FSS.writeText(manifest.markers.jsx_completed, new Date().toUTCString());
    } catch (error) { qa.errors.push({message: error.message, line: error.line || null}); try { FSS.writeQa(manifest, qa); } catch (ignoreQa) {} throw error; }
    finally { app.userInteractionLevel = previousInteraction; }
}());
