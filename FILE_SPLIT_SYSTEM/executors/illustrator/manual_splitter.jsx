#include "shared_utils.jsx"
(function () {
    var manifestPath = $.getenv("FILE_SPLIT_JOB_MANIFEST");
    var manifest = FSS.readJson(manifestPath);
    FSS.writeText(manifest.markers.jsx_started, new Date().toUTCString());
    var previousInteraction = app.userInteractionLevel;
    var doc = null;
    var qa = {executor: "manual_splitter", version: "1.3.0", pages: [], errors: [], outline_geometry_failures: 0, unoutlined_text_frames: 0, export_count: 0};
    try {
        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
        doc = app.open(new File(manifest.source.working_copy_path));
        var maps = manifest.manual_page_map;
        var pageGroups = [];
        var index;
        for (index = 0; index < maps.length; index += 1) {
            pageGroups[index] = doc.groupItems.add();
            pageGroups[index].name = "FSS_PAGE_" + maps[index].logical_page_id;
        }
        var candidates = FSS.topLevelCandidates(doc, maps);
        for (index = 0; index < candidates.length; index += 1) {
            var owner = FSS.pageIndexFor(candidates[index], maps);
            if (owner >= 0 && maps[owner].keep !== false) {
                candidates[index].move(pageGroups[owner], ElementPlacement.PLACEATEND);
            } else {
                candidates[index].remove();
            }
        }
        for (index = maps.length - 1; index >= 0; index -= 1) {
            if (maps[index].keep === false) { pageGroups[index].remove(); pageGroups.splice(index, 1); maps.splice(index, 1); }
        }
        while (doc.artboards.length > 1) { doc.artboards[doc.artboards.length - 1].remove(); }
        for (index = 0; index < maps.length; index += 1) {
            var target = maps[index].target_artboard;
            if (index === 0) { doc.artboards[0].artboardRect = target; }
            else { doc.artboards.add(target); }
            var source = maps[index].source_bounds;
            pageGroups[index].translate(target[0] - source[0], target[1] - source[1]);
        }
        var deletionIndex;
        for (deletionIndex = 0; deletionIndex < manifest.deletions.length; deletionIndex += 1) {
            var deletion = manifest.deletions[deletionIndex];
            for (index = doc.pageItems.length - 1; index >= 0; index -= 1) {
                if (FSS.overlapArea(FSS.bounds(doc.pageItems[index]), deletion.bounds) > 0) { doc.pageItems[index].remove(); }
            }
        }
        for (index = 0; index < pageGroups.length; index += 1) {
            var group = pageGroups[index];
            var fontResult = FSS.checkLiveTextFonts(group, manifest.font_check);
            if (fontResult.missing.length > 0 || fontResult.unresolved.length > 0) {
                qa.errors.push({stage: "font_preflight", page: maps[index].logical_page_id, missing: fontResult.missing, unresolved: fontResult.unresolved});
                throw new Error("font_preflight_failure");
            }
            var before = null;
            var visibleTextCount = 0;
            var textIndex;
            for (textIndex = 0; textIndex < group.textFrames.length; textIndex += 1) {
                if (FSS.hasVisibleGlyphs(group.textFrames[textIndex].contents)) {
                    before = FSS.union(before, group.textFrames[textIndex].visibleBounds);
                    visibleTextCount += 1;
                }
            }
            var after = null;
            for (textIndex = group.textFrames.length - 1; textIndex >= 0; textIndex -= 1) {
                var frame = group.textFrames[textIndex];
                if (FSS.hasVisibleGlyphs(frame.contents)) {
                    var outlined = frame.createOutline();
                    after = FSS.union(after, outlined.visibleBounds);
                }
                else { frame.remove(); }
            }
            var art = maps[index].target_artboard;
            var tolerance = FSS.tolerance(art[2] - art[0], art[1] - art[3]);
            var changed = visibleTextCount > 0 && FSS.geometryChanged(before, after, tolerance);
            if (changed) { qa.outline_geometry_failures += 1; }
            qa.pages.push({logical_page_id: maps[index].logical_page_id, visible_text_count: visibleTextCount, fonts_used: fontResult.used, before_text_union: before, after_outline_union: after, tolerance_pt: tolerance, risk_visual_review: changed});
        }
        FSS.removeEmptyGroups(doc);
        for (index = doc.symbols.length - 1; index >= 0; index -= 1) {
            try { doc.symbols[index].remove(); } catch (ignoreUsedSymbol) {}
        }
        if (qa.outline_geometry_failures > 0) { throw new Error("outline_geometry_failure"); }
        var pdfOptions = new PDFSaveOptions();
        pdfOptions.preserveEditability = false;
        pdfOptions.generateThumbnails = false;
        pdfOptions.optimization = true;
        pdfOptions.viewAfterSaving = false;
        var exportStarted = new Date().getTime();
        doc.saveAs(new File(manifest.output.temporary_path), pdfOptions);
        qa.export_elapsed_seconds = (new Date().getTime() - exportStarted) / 1000;
        qa.export_count = 1;
        FSS.writeQa(manifest, qa);
        FSS.writeText(manifest.markers.jsx_completed, new Date().toUTCString());
    } catch (error) {
        qa.errors.push({message: error.message, line: error.line || null});
        try { FSS.writeQa(manifest, qa); } catch (ignoreQa) {}
        throw error;
    } finally {
        app.userInteractionLevel = previousInteraction;
    }
}());
