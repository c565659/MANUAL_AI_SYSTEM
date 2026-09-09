/* FILE_SPLIT_SYSTEM 1.3.0 shared ExtendScript utilities (ES3 compatible). */
var FSS = {};

FSS.readText = function (path) {
    var file = new File(path);
    if (!file.exists) { throw new Error("File not found: " + path); }
    file.encoding = "UTF-8";
    if (!file.open("r")) { throw new Error("Cannot open: " + path); }
    var value = file.read();
    file.close();
    return value;
};

FSS.writeText = function (path, value) {
    var file = new File(path);
    file.encoding = "UTF-8";
    if (!file.open("w")) { throw new Error("Cannot write marker: " + path); }
    file.write(value);
    file.close();
};

FSS.readJson = function (path) {
    return eval("(" + FSS.readText(path) + ")");
};

FSS.bounds = function (item) {
    try { return item.visibleBounds; } catch (ignoreVisible) {}
    try { return item.geometricBounds; } catch (ignoreGeometric) {}
    return null;
};

FSS.center = function (bounds) {
    return [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2];
};

FSS.contains = function (outer, point) {
    return point[0] >= outer[0] && point[0] <= outer[2] && point[1] <= outer[1] && point[1] >= outer[3];
};

FSS.overlapArea = function (a, b) {
    var width = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0]));
    var height = Math.max(0, Math.min(a[1], b[1]) - Math.max(a[3], b[3]));
    return width * height;
};

FSS.pageIndexFor = function (item, maps) {
    var bounds = FSS.bounds(item);
    if (!bounds) { return -1; }
    var point = FSS.center(bounds);
    var best = -1;
    var bestArea = 0;
    var index;
    for (index = 0; index < maps.length; index += 1) {
        if (FSS.contains(maps[index].source_bounds, point)) { return index; }
        var area = FSS.overlapArea(bounds, maps[index].source_bounds);
        if (area > bestArea) { bestArea = area; best = index; }
    }
    return best;
};

FSS.topLevelCandidates = function (doc, maps) {
    var result = [];
    var index;
    if (doc.pageItems.length === 1 && doc.pageItems[0].typename === "GroupItem") {
        var master = doc.pageItems[0];
        var childMatches = 0;
        for (index = 0; index < master.groupItems.length; index += 1) {
            if (FSS.pageIndexFor(master.groupItems[index], maps) >= 0) { childMatches += 1; }
        }
        if (childMatches >= maps.length && master.groupItems.length > 1) {
            for (index = master.groupItems.length - 1; index >= 0; index -= 1) { result.push(master.groupItems[index]); }
            return result;
        }
    }
    for (index = doc.pageItems.length - 1; index >= 0; index -= 1) {
        if (doc.pageItems[index].parent === doc) { result.push(doc.pageItems[index]); }
    }
    return result;
};

FSS.removeEmptyGroups = function (doc) {
    var changed = true;
    var index;
    while (changed) {
        changed = false;
        for (index = doc.groupItems.length - 1; index >= 0; index -= 1) {
            if (doc.groupItems[index].pageItems.length === 0) {
                doc.groupItems[index].remove();
                changed = true;
            }
        }
    }
};

FSS.hasVisibleGlyphs = function (value) {
    if (!value) { return false; }
    return value.replace(/[\s\u200B\u200C\u200D\uFEFF]/g, "") !== "";
};

FSS.union = function (current, bounds) {
    if (!bounds) { return current; }
    if (!current) { return [bounds[0], bounds[1], bounds[2], bounds[3]]; }
    return [Math.min(current[0], bounds[0]), Math.max(current[1], bounds[1]), Math.max(current[2], bounds[2]), Math.min(current[3], bounds[3])];
};

FSS.tolerance = function (width, height) {
    var absolute = 0.25 * 72 / 25.4;
    var relative = Math.min(Math.abs(width), Math.abs(height)) * 0.002;
    return Math.max(absolute, relative);
};

FSS.geometryChanged = function (before, after, tolerance) {
    if (!before && !after) { return false; }
    if (!before || !after) { return true; }
    var index;
    for (index = 0; index < 4; index += 1) {
        if (Math.abs(before[index] - after[index]) > tolerance) { return true; }
    }
    return false;
};

FSS.containsString = function (values, wanted) {
    var index;
    for (index = 0; index < values.length; index += 1) {
        if (String(values[index]).toLowerCase() === String(wanted).toLowerCase()) { return true; }
    }
    return false;
};

FSS.checkLiveTextFonts = function (group, fontCheck) {
    var result = {used: [], missing: [], unresolved: []};
    var index;
    for (index = 0; index < group.textFrames.length; index += 1) {
        var frame = group.textFrames[index];
        if (!FSS.hasVisibleGlyphs(frame.contents)) { continue; }
        try {
            var name = frame.textRange.characterAttributes.textFont.name;
            app.textFonts.getByName(name);
            if (!FSS.containsString(result.used, name)) { result.used.push(name); }
            if (fontCheck.declared_postscript_names.length > 0 && !FSS.containsString(fontCheck.declared_postscript_names, name)) {
                result.unresolved.push(name);
            }
        } catch (fontError) {
            result.missing.push(frame.name || ("text-frame-" + index));
        }
    }
    return result;
};

FSS.writeQa = function (manifest, payload) {
    FSS.writeText(manifest.qa_output_path, JSON.stringify(payload, null, 2));
};
