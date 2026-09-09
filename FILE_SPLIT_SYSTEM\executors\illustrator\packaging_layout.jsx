#include "shared_utils.jsx"
(function () {
    var manifest = FSS.readJson($.getenv("FILE_SPLIT_JOB_MANIFEST"));
    FSS.writeText(manifest.markers.jsx_started, new Date().toUTCString());
    var previousInteraction = app.userInteractionLevel;
    var qa = {executor: "packaging_layout", version: "1.3.0", faces: [], errors: [], export_count: 0};
    try {
        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
        var doc = app.open(new File(manifest.source.working_copy_path));
        var maps = manifest.packaging_face_map;
        if (manifest.color_check.green_spot.required === true) {
            var swatch = doc.swatches.getByName("2286C");
            if (!swatch || swatch.color.typename !== "SpotColor") { throw new Error("2286C spot swatch is missing or is not a SpotColor"); }
        }
        var groups = [];
        var candidates = FSS.topLevelCandidates(doc, maps);
        var index;
        for (index = 0; index < maps.length; index += 1) {
            groups[index] = doc.groupItems.add();
            groups[index].name = "FSS_FACE_" + maps[index].face_id;
        }
        for (index = 0; index < candidates.length; index += 1) {
            var owner = FSS.pageIndexFor(candidates[index], maps);
            if (owner >= 0 && maps[owner].keep !== false) { candidates[index].move(groups[owner], ElementPlacement.PLACEATEND); }
            else { candidates[index].remove(); }
        }
        var cursorX = 0;
        var gap = 10 * 72 / 25.4;
        var maxHeight = 0;
        for (index = 0; index < maps.length; index += 1) {
            var map = maps[index];
            if (map.keep === false) { groups[index].remove(); continue; }
            var width = map.size_mm.width * 72 / 25.4;
            var height = map.size_mm.height * 72 / 25.4;
            var rect = groups[index].pathItems.rectangle(0, 0, width, height);
            rect.move(groups[index], ElementPlacement.PLACEATBEGINNING);
            rect.filled = true;
            rect.fillColor = doc.swatches.getByName(map.background_swatch).color;
            rect.stroked = true;
            rect.strokeColor = doc.swatches.getByName(map.border_swatch || map.background_swatch).color;
            if (map.border_width_pt !== null && map.border_width_pt !== undefined) { rect.strokeWidth = map.border_width_pt; }
            var source = map.source_bounds;
            groups[index].translate(cursorX - source[0], -source[1]);
            qa.faces.push({face_id: map.face_id, width_pt: width, height_pt: height, target_left_pt: cursorX});
            cursorX += width + gap;
            maxHeight = Math.max(maxHeight, height);
        }
        FSS.removeEmptyGroups(doc);
        while (doc.artboards.length > 1) { doc.artboards[doc.artboards.length - 1].remove(); }
        doc.artboards[0].artboardRect = [0, 0, Math.max(0, cursorX - gap), -maxHeight];
        var options = new ExportOptionsPNG24();
        options.antiAliasing = true;
        options.artBoardClipping = true;
        options.transparency = false;
        options.horizontalScale = 300 / 72 * 100;
        options.verticalScale = 300 / 72 * 100;
        var exportStarted = new Date().getTime();
        doc.exportFile(new File(manifest.output.temporary_path), ExportType.PNG24, options);
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
