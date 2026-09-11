/* FILE_SPLIT_SYSTEM 1.4.0 shared ExtendScript utilities. ES3 only. */
var FSS = {};

FSS.readText = function (path) {
    var file = new File(path);
    if (!file.exists) { throw new Error("File not found: " + path); }
    file.encoding = "UTF-8";
    if (!file.open("r")) { throw new Error("Cannot open: " + path); }
    var value = file.read(); file.close(); return value;
};
FSS.writeText = function (path, value) {
    var file = new File(path); file.encoding = "UTF-8";
    if (!file.open("w")) { throw new Error("Cannot write: " + path); }
    file.write(value); file.close();
};
FSS.readJson = function (path) { return eval("(" + FSS.readText(path) + ")"); };
FSS.quote = function (value) { return '"' + String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + '"'; };
FSS.stringify = function (value, indent, level) {
    var pad = "", nextPad = "", i, parts = [], key; indent = indent || ""; level = level || 0;
    for (i = 0; i < level; i += 1) { pad += indent; } nextPad = pad + indent;
    if (value === null) { return "null"; }
    if (typeof value === "string") { return FSS.quote(value); }
    if (typeof value === "number") { return isFinite(value) ? String(value) : "null"; }
    if (typeof value === "boolean") { return value ? "true" : "false"; }
    if (value instanceof Array) { for (i = 0; i < value.length; i += 1) { parts.push(FSS.stringify(value[i], indent, level + 1)); } return parts.length && indent ? "[\n" + nextPad + parts.join(",\n" + nextPad) + "\n" + pad + "]" : "[" + parts.join(",") + "]"; }
    if (typeof value === "object") { for (key in value) { if (value.hasOwnProperty(key) && typeof value[key] !== "undefined" && typeof value[key] !== "function") { parts.push(FSS.quote(key) + (indent ? ": " : ":") + FSS.stringify(value[key], indent, level + 1)); } } return parts.length && indent ? "{\n" + nextPad + parts.join(",\n" + nextPad) + "\n" + pad + "}" : "{" + parts.join(",") + "}"; }
    return "null";
};
FSS.writeQa = function (manifest, payload) { FSS.writeText(manifest.qa_output_path, FSS.stringify(payload, "  ", 0)); };

FSS.bounds = function (item) { var b = null; try { b = item.visibleBounds; } catch (ignoreVisible) {} if (!b) { try { b = item.geometricBounds; } catch (ignoreGeometric) {} } return b ? [Math.min(b[0], b[2]), Math.max(b[1], b[3]), Math.max(b[0], b[2]), Math.min(b[1], b[3])] : null; };
FSS.width = function (b) { return Math.abs(b[2] - b[0]); };
FSS.height = function (b) { return Math.abs(b[1] - b[3]); };
FSS.area = function (b) { return b ? FSS.width(b) * FSS.height(b) : 0; };
FSS.center = function (b) { return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]; };
FSS.contains = function (outer, p, tolerance) { tolerance = tolerance || 0; return p[0] >= outer[0] - tolerance && p[0] <= outer[2] + tolerance && p[1] <= outer[1] + tolerance && p[1] >= outer[3] - tolerance; };
FSS.overlapArea = function (a, b) { return Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[1], b[1]) - Math.max(a[3], b[3])); };
FSS.union = function (a, b) { if (!b) { return a; } if (!a) { return [b[0], b[1], b[2], b[3]]; } return [Math.min(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2]), Math.min(a[3], b[3])]; };
FSS.hasVisibleGlyphs = function (value) { return !!value && value.replace(/[\s\u200B\u200C\u200D\uFEFF]/g, "") !== ""; };
FSS.normalText = function (value) { return String(value || "").toUpperCase().replace(/[\r\n\t\-_:：／\\&.,()]+/g, " ").replace(/\s+/g, " "); };
FSS.matchesKeyword = function (text, keywords) { var n = FSS.normalText(text), i; for (i = 0; i < keywords.length; i += 1) { if (n.indexOf(FSS.normalText(keywords[i])) >= 0) { return true; } } return false; };
FSS.containsString = function (values, wanted) { var i; for (i = 0; i < values.length; i += 1) { if (String(values[i]).toLowerCase() === String(wanted).toLowerCase()) { return true; } } return false; };
FSS.tolerance = function (width, height) { return Math.max(0.25 * 72 / 25.4, Math.min(Math.abs(width), Math.abs(height)) * 0.002); };
FSS.geometryChanged = function (before, after, tolerance) { var i; if (!before && !after) { return false; } if (!before || !after) { return true; } for (i = 0; i < 4; i += 1) { if (Math.abs(before[i] - after[i]) > tolerance) { return true; } } return false; };
FSS.itemMatrix = function (item) { try { return [item.matrix.mValueA, item.matrix.mValueB, item.matrix.mValueC, item.matrix.mValueD, item.matrix.mValueTX, item.matrix.mValueTY]; } catch (ignoreMatrix) { return null; } };

FSS.isBoundaryPath = function (item, width, height, tolerance) { var b; if (!item || item.typename !== "PathItem" || item.closed !== true || item.clipping === true) { return false; } try { b = item.geometricBounds; b = [Math.min(b[0], b[2]), Math.max(b[1], b[3]), Math.max(b[0], b[2]), Math.min(b[1], b[3])]; } catch (ignoreGeometric) { b = FSS.bounds(item); } if (!b) { return false; } return Math.abs(FSS.width(b) - width) <= tolerance && Math.abs(FSS.height(b) - height) <= tolerance; };
FSS.boundaryStyleScore = function (item) { var score = 0; try { if (item.filled !== true) { score += 1; } if (item.stroked === true) { score += 2; } } catch (ignoreStyle) {} return score; };
FSS.discoverPageFrames = function (doc, manual) {
    var result = [], i, item, tolerance = manual.boundary_tolerance_pt || FSS.tolerance(manual.page_width_pt, manual.page_height_pt);
    for (i = 0; i < doc.pathItems.length; i += 1) { item = doc.pathItems[i]; if (FSS.isBoundaryPath(item, manual.page_width_pt, manual.page_height_pt, tolerance)) { result.push({item: item, bounds: FSS.bounds(item), style_score: FSS.boundaryStyleScore(item)}); } }
    if (result.length > manual.expected_logical_pages) { result.sort(function (a, b) { return b.style_score - a.style_score; }); result = result.slice(0, manual.expected_logical_pages); }
    result.sort(function (a, b) { var rowTolerance = manual.page_height_pt * 0.25; if (Math.abs(a.bounds[1] - b.bounds[1]) > rowTolerance) { return b.bounds[1] - a.bounds[1]; } return a.bounds[0] - b.bounds[0]; });
    if (result.length !== manual.expected_logical_pages) { throw new Error("page_boundary_count_mismatch expected=" + manual.expected_logical_pages + " actual=" + result.length); }
    return result;
};

FSS.snapshotOriginalCandidates = function (doc, frames) {
    var result = [], frameItems = [], i, k; for (i = 0; i < frames.length; i += 1) { frameItems.push(frames[i].item); }
    function isFrame(item) { var j; for (j = 0; j < frameItems.length; j += 1) { if (item === frameItems[j]) { return true; } } return false; }
    function visit(item) { var b = FSS.bounds(item), j, hits = 0; if (!b || isFrame(item)) { return; } for (j = 0; j < frames.length; j += 1) { if (FSS.overlapArea(b, frames[j].bounds) > 0) { hits += 1; } } if (item.typename === "GroupItem" && hits > 1 && item.clipped !== true) { for (j = 0; j < item.pageItems.length; j += 1) { if (item.pageItems[j].parent === item) { visit(item.pageItems[j]); } } } else { result.push({item: item, bounds: b, parent_type: item.parent ? item.parent.typename : null, layer_name: item.layer ? item.layer.name : null, clipped: item.typename === "GroupItem" && item.clipped === true, matrix: FSS.itemMatrix(item)}); } }
    for (i = 0; i < doc.layers.length; i += 1) { for (k = 0; k < doc.layers[i].pageItems.length; k += 1) { if (doc.layers[i].pageItems[k].parent === doc.layers[i]) { visit(doc.layers[i].pageItems[k]); } } }
    return result;
};
FSS.assignCandidate = function (entry, frames, minimumRatio) {
    var p = FSS.center(entry.bounds), overlaps = [], centered = [], i, positive = [], best = -1, second = -1, owner = -1; minimumRatio = minimumRatio || 0.02;
    for (i = 0; i < frames.length; i += 1) { overlaps[i] = FSS.overlapArea(entry.bounds, frames[i].bounds); if (FSS.contains(frames[i].bounds, p, 0.1)) { centered.push(i); } if (overlaps[i] > 0) { positive.push(i); } if (best < 0 || overlaps[i] > overlaps[best]) { second = best; best = i; } else if (second < 0 || overlaps[i] > overlaps[second]) { second = i; } }
    if (centered.length === 1) { owner = centered[0]; }
    else if (positive.length > 1 && second >= 0 && overlaps[second] / Math.max(FSS.area(entry.bounds), 0.001) >= minimumRatio) { return {owner: -1, ambiguous: true, overlaps: overlaps}; }
    else if (best >= 0 && overlaps[best] / Math.max(FSS.area(entry.bounds), 0.001) >= minimumRatio) { owner = best; }
    return {owner: owner, ambiguous: false, overlaps: overlaps};
};

FSS.collectTextFrames = function (item, out) { var i; if (item.typename === "TextFrame") { out.push(item); return; } if (item.typename === "GroupItem") { for (i = 0; i < item.pageItems.length; i += 1) { FSS.collectTextFrames(item.pageItems[i], out); } } };
FSS.deleteSection = function (item, sectionTop, sectionBottom, tolerance) {
    var b = FSS.bounds(item), i, result = {removed: 0, unsafe: 0, root_removed: false}, childResult;
    if (!b || b[3] > sectionTop + tolerance || b[1] < sectionBottom - tolerance) { return result; }
    if (b[1] <= sectionTop + tolerance && b[3] >= sectionBottom - tolerance) { item.remove(); result.removed = 1; result.root_removed = true; return result; }
    if (item.typename === "GroupItem" && item.clipped !== true) {
        for (i = item.pageItems.length - 1; i >= 0; i -= 1) { childResult = FSS.deleteSection(item.pageItems[i], sectionTop, sectionBottom, tolerance); result.removed += childResult.removed; result.unsafe += childResult.unsafe; }
        return result;
    }
    result.unsafe = 1; return result;
};
FSS.fontSafety = function (group, fontCheck) {
    var frames = [], result = {used: [], missing: [], substituted: [], multi_font_frames: [], overset: [], hidden: []}, i, j, frame, names, name; FSS.collectTextFrames(group, frames);
    for (i = 0; i < frames.length; i += 1) { frame = frames[i]; if (!FSS.hasVisibleGlyphs(frame.contents)) { continue; } try { if (frame.hidden === true || frame.layer.visible === false) { result.hidden.push(frame.name || ("text-frame-" + i)); } } catch (ignoreHidden) {} try { if (frame.kind === TextType.AREATEXT && frame.overflows === true) { result.overset.push(frame.name || ("text-frame-" + i)); } } catch (ignoreOverset) {} names = [];
        for (j = 0; j < frame.characters.length; j += 1) { try { name = frame.characters[j].characterAttributes.textFont.name; app.textFonts.getByName(name); if (!FSS.containsString(names, name)) { names.push(name); } if (!FSS.containsString(result.used, name)) { result.used.push(name); } } catch (fontError) { result.missing.push((frame.name || ("text-frame-" + i)) + ":character-" + j); } }
        if (names.length > 1) { result.multi_font_frames.push({frame: frame.name || ("text-frame-" + i), fonts: names}); } for (j = 0; j < names.length; j += 1) { if (fontCheck.declared_postscript_names.length > 0 && !FSS.containsString(fontCheck.declared_postscript_names, names[j])) { result.substituted.push(names[j]); } }
    } return result;
};
FSS.visibleStats = function (group, artboard) { var count = 0, all = null, i, item, b; for (i = 0; i < group.pageItems.length; i += 1) { item = group.pageItems[i]; try { if (item.hidden === true) { continue; } } catch (ignoreHidden) {} b = FSS.bounds(item); if (b && FSS.area(b) > 0.05) { count += 1; all = FSS.union(all, b); } } return {count: count, bounds: all, area: FSS.area(all), artboard_intersection: all ? FSS.overlapArea(all, artboard) : 0}; };
FSS.removeEmptyGroups = function (doc) { var changed = true, i; while (changed) { changed = false; for (i = doc.groupItems.length - 1; i >= 0; i -= 1) { if (doc.groupItems[i].pageItems.length === 0) { doc.groupItems[i].remove(); changed = true; } } } };
