/* FILE_SPLIT_SYSTEM 1.4.1 shared ExtendScript utilities. ES3 only. */
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
FSS.geometricBounds = function (item) { var b = null; try { b = item.geometricBounds; } catch (ignoreGeometric) {} return b ? [Math.min(b[0], b[2]), Math.max(b[1], b[3]), Math.max(b[0], b[2]), Math.min(b[1], b[3])] : null; };
FSS.outlineObjectCount = function (item) { var count = 0, i; if (!item) { return 0; } try { if (item.typename === "PathItem" || item.typename === "CompoundPathItem") { count += 1; } } catch (ignoreType) {} try { for (i = 0; i < item.pageItems.length; i += 1) { count += FSS.outlineObjectCount(item.pageItems[i]); } } catch (ignoreChildren) {} return count; };
FSS.outlineMetrics = function (item) { var visible = FSS.bounds(item), geometric = FSS.geometricBounds(item), c; if (!visible || !geometric) { return null; } c = FSS.center(visible); return {visibleBounds: visible, geometricBounds: geometric, center: c, width: FSS.width(visible), height: FSS.height(visible), outline_object_count: FSS.outlineObjectCount(item)}; };
FSS.metricTolerance = function (a, b) { return Math.max(0.05, Math.max(Math.abs(a || 0), Math.abs(b || 0)) * 0.001); };
FSS.compareOutlineMetrics = function (reference, actual) {
    var result = {passed: true, reasons: []}, centerTolerance, edgeTolerance, dx, dy, i;
    if (!reference || !actual || reference.outline_object_count < 1 || actual.outline_object_count < 1) { result.passed = false; result.reasons.push("empty_outline"); return result; }
    centerTolerance = FSS.metricTolerance(Math.max(reference.width, reference.height), Math.max(actual.width, actual.height)); dx = reference.center[0] - actual.center[0]; dy = reference.center[1] - actual.center[1];
    if (Math.sqrt(dx * dx + dy * dy) > centerTolerance) { result.reasons.push("outline_shift"); }
    if (Math.abs(reference.width - actual.width) > FSS.metricTolerance(reference.width, actual.width)) { result.reasons.push("outline_width_scale"); }
    if (Math.abs(reference.height - actual.height) > FSS.metricTolerance(reference.height, actual.height)) { result.reasons.push("outline_height_scale"); }
    if (reference.outline_object_count !== actual.outline_object_count) { result.reasons.push("outline_object_count"); }
    edgeTolerance = Math.max(FSS.metricTolerance(reference.width, actual.width), FSS.metricTolerance(reference.height, actual.height));
    for (i = 0; i < 4; i += 1) { if (Math.abs(reference.geometricBounds[i] - actual.geometricBounds[i]) > edgeTolerance) { result.reasons.push("geometric_bound_" + i); } }
    result.passed = result.reasons.length === 0; return result;
};
FSS.countTextFrames = function (item) { var frames = []; FSS.collectTextFrames(item, frames); return frames.length; };
FSS.isThreadedText = function (frame) { try { if (frame.nextFrame || frame.previousFrame) { return true; } } catch (ignoreThreaded) {} return false; };
FSS.textFrameAccessible = function (frame) { try { var value = frame.contents; return typeof value !== "undefined"; } catch (ignoreRemovedFrame) { return false; } };
FSS.outlineTextFrameVerified = function (frame, pageGroup, artboard) {
    var record = {name: frame.name || "", kind: String(frame.kind), mode: "outline_to_outline", passed: false, reasons: [], reference_outline: null, actual_outline: null, fallback_reason: null}, duplicate = null, referenceOutline = null, actualOutline = null, beforeCount = FSS.countTextFrames(pageGroup), originalBounds = FSS.bounds(frame), originalCenter = originalBounds ? FSS.center(originalBounds) : null, actualCenter, fallbackTolerance;
    if (FSS.isThreadedText(frame)) { record.mode = "safe_fallback"; record.fallback_reason = "threaded_text"; }
    if (record.mode === "outline_to_outline") {
        try { duplicate = frame.duplicate(); referenceOutline = duplicate.createOutline(); record.reference_outline = FSS.outlineMetrics(referenceOutline); }
        catch (copyError) { record.mode = "safe_fallback"; record.fallback_reason = "duplicate_outline_unstable:" + copyError.message; try { if (duplicate) { duplicate.remove(); } } catch (ignoreDuplicate) {} duplicate = null; }
    }
    try {
        actualOutline = frame.createOutline(); record.actual_outline = FSS.outlineMetrics(actualOutline);
        if (record.mode === "outline_to_outline") { var compared = FSS.compareOutlineMetrics(record.reference_outline, record.actual_outline); record.passed = compared.passed; record.reasons = compared.reasons; }
        else {
            if (!record.actual_outline || record.actual_outline.outline_object_count < 1) { record.reasons.push("empty_outline"); }
            if (!record.actual_outline || FSS.overlapArea(record.actual_outline.visibleBounds, artboard) <= 0) { record.reasons.push("outline_outside_page"); }
            if (originalCenter && record.actual_outline) { actualCenter = record.actual_outline.center; fallbackTolerance = Math.max(1, Math.min(FSS.width(artboard), FSS.height(artboard)) * 0.01); if (Math.abs(actualCenter[0] - originalCenter[0]) > fallbackTolerance || Math.abs(actualCenter[1] - originalCenter[1]) > fallbackTolerance) { record.reasons.push("fallback_abnormal_shift"); } }
            record.passed = record.reasons.length === 0;
        }
        if (FSS.countTextFrames(pageGroup) >= beforeCount) { record.reasons.push("original_textframe_remaining"); record.passed = false; }
    } catch (outlineError) { record.reasons.push("create_outline_failed:" + outlineError.message); record.passed = false; }
    try { if (referenceOutline) { referenceOutline.remove(); } else if (duplicate) { duplicate.remove(); } } catch (ignoreReferenceCleanup) { record.reasons.push("temporary_outline_cleanup_failed"); record.passed = false; }
    return record;
};

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
FSS.textSummary = function (value) { value = String(value || "").replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " "); return value.length > 100 ? value.substring(0, 100) : value; };
FSS.textFontNames = function (frame) { var names = [], i, name; try { for (i = 0; i < frame.characters.length; i += 1) { name = frame.characters[i].characterAttributes.textFont.name; if (!FSS.containsString(names, name)) { names.push(name); } } } catch (ignoreFonts) {} return names; };
FSS.safeBoolean = function (object, name) { try { return object[name] === true; } catch (ignoreProperty) { return null; } };
FSS.frameMembership = function (bounds, frames) { var hits = [], i, point; if (!bounds) { return hits; } point = FSS.center(bounds); for (i = 0; i < frames.length; i += 1) { if (FSS.contains(frames[i].bounds, point, 0.1) || FSS.overlapArea(bounds, frames[i].bounds) > 0) { hits.push(i); } } return hits; };
FSS.artboardMembership = function (bounds, artboards) { var hits = [], i, rect, point; if (!bounds || !artboards) { return hits; } point = FSS.center(bounds); for (i = 0; i < artboards.length; i += 1) { rect = artboards[i].artboardRect; if (FSS.contains(rect, point, 0.1) || FSS.overlapArea(bounds, rect) > 0) { hits.push(i); } } return hits; };
FSS.textFrameDiagnostic = function (frame, frames, artboards, reason) {
    var bounds = FSS.bounds(frame), geometric = FSS.geometricBounds(frame), position = null, layerName = null, parentType = null, kind = null, overflow = null, layerVisible = null;
    try { position = [frame.position[0], frame.position[1]]; } catch (ignorePosition) {}
    try { layerName = frame.layer.name; layerVisible = frame.layer.visible; } catch (ignoreLayer) {}
    try { parentType = frame.parent.typename; } catch (ignoreParent) {}
    try { kind = String(frame.kind); } catch (ignoreKind) {}
    try { overflow = frame.kind === TextType.AREATEXT ? frame.overflows === true : false; } catch (ignoreOverflow) {}
    return {content_summary: FSS.textSummary(frame.contents), name: frame.name || "", typename: frame.typename, kind: kind, visibleBounds: bounds, geometricBounds: geometric, position: position, layer_name: layerName, parent_type: parentType, hidden: FSS.safeBoolean(frame, "hidden"), layer_visible: layerVisible, locked: FSS.safeBoolean(frame, "locked"), overflow: overflow, font_names: FSS.textFontNames(frame), has_visible_characters: FSS.hasVisibleGlyphs(frame.contents), original_page_matches: FSS.frameMembership(bounds, frames), retained_artboard_matches: FSS.artboardMembership(bounds, artboards), unassigned_reason: reason};
};
FSS.handleUnassignedCandidate = function (entry, frames, maps, assigned, qa) {
    var hits = FSS.frameMembership(entry.bounds, frames), textFrames = [], i, hasVisibleText = false, hidden = false, layerVisible = true, diagnostic, action;
    FSS.collectTextFrames(entry.item, textFrames); for (i = 0; i < textFrames.length; i += 1) { if (FSS.hasVisibleGlyphs(textFrames[i].contents)) { hasVisibleText = true; try { if (textFrames[i].hidden === true || textFrames[i].layer.visible === false) { hidden = true; } } catch (ignoreChildVisibility) { hidden = true; } } }
    try { hidden = entry.item.hidden === true; } catch (ignoreHidden) {} try { layerVisible = entry.item.layer.visible !== false; } catch (ignoreLayer) {}
    if (entry.item.typename === "TextFrame" && !hasVisibleText) { diagnostic = FSS.textFrameDiagnostic(entry.item, frames, null, "empty_text_frame"); action = "deleted_empty_text"; entry.item.remove(); qa.unassigned_candidates.push({action: action, diagnostic: diagnostic}); return; }
    if (hits.length === 1) { assigned[hits[0]].push(entry); qa.unassigned_candidates.push({action: maps[hits[0]].keep === false ? "assigned_to_discarded_page" : "reassigned_to_retained_page", page: maps[hits[0]].logical_page_id, typename: entry.item.typename, bounds: entry.bounds}); return; }
    if (hits.length === 0 && !hidden && layerVisible) {
        for (i = 0; i < textFrames.length; i += 1) { qa.unassigned_text_frames.push(FSS.textFrameDiagnostic(textFrames[i], frames, null, "outside_all_page_frames_auxiliary")); }
        qa.unassigned_candidates.push({action: "deleted_outside_all_page_frames", typename: entry.item.typename, bounds: entry.bounds, evidence: "no center or geometric intersection with any Illustrator page frame"}); entry.item.remove(); return;
    }
    for (i = 0; i < textFrames.length; i += 1) { qa.unassigned_text_frames.push(FSS.textFrameDiagnostic(textFrames[i], frames, null, hits.length > 1 ? "ambiguous_page_ownership" : "hidden_or_invisible_outside_pages")); }
    throw new Error(hits.length > 1 ? "unassigned_candidate_ambiguous" : "unassigned_candidate_needs_review");
};
FSS.headingDescriptor = function (frame) { var i, attributes, name, size; try { for (i = 0; i < frame.characters.length; i += 1) { if (FSS.hasVisibleGlyphs(frame.characters[i].contents)) { attributes = frame.characters[i].characterAttributes; name = attributes.textFont.name; size = Number(attributes.size); if (!name || !isFinite(size) || size <= 0) { return null; } return {font: name, size: size}; } } } catch (ignoreHeading) {} return null; };
FSS.sameHeadingLevel = function (first, second) { return !!first && !!second && String(first.font).toLowerCase() === String(second.font).toLowerCase() && Math.abs(first.size - second.size) <= 0.5; };
FSS.looksLikeHeading = function (frame) { var value = String(frame.contents || "").replace(/^\s+|\s+$/g, ""); return FSS.hasVisibleGlyphs(value) && value.length <= 120 && value.indexOf("\r") < 0 && value.indexOf("\n") < 0; };
FSS.pageContentBottom = function (entries, frameBounds) { var bottom = frameBounds[1], found = false, i, b; for (i = 0; i < entries.length; i += 1) { b = FSS.bounds(entries[i].item); if (b && FSS.overlapArea(b, frameBounds) > 0) { bottom = Math.min(bottom, Math.max(frameBounds[3], b[3])); found = true; } } return found ? bottom : frameBounds[3]; };
FSS.buildSectionIntervals = function (textFrames, keywords, contentBottom) {
    var rows = [], intervals = [], i, j, frame, descriptor, next, b, target;
    for (i = 0; i < textFrames.length; i += 1) { frame = textFrames[i]; target = FSS.matchesKeyword(frame.contents, keywords); b = FSS.bounds(frame); descriptor = FSS.headingDescriptor(frame); if (target && (!FSS.looksLikeHeading(frame) || !b || !descriptor)) { throw new Error("mixed_section_heading_level_unresolved"); } if (!FSS.looksLikeHeading(frame) || !b || !descriptor) { continue; } rows.push({frame: frame, title: FSS.textSummary(frame.contents), top: b[1], descriptor: descriptor, target: target}); }
    rows.sort(function (a, b2) { return b2.top - a.top; });
    for (i = 0; i < rows.length; i += 1) { if (!rows[i].target) { continue; } next = null; for (j = i + 1; j < rows.length; j += 1) { if (FSS.sameHeadingLevel(rows[i].descriptor, rows[j].descriptor)) { next = rows[j]; break; } } if (!isFinite(rows[i].top) || (next && next.top >= rows[i].top) || (!next && contentBottom >= rows[i].top)) { throw new Error("mixed_section_boundary_unresolved"); } intervals.push({target_title: rows[i].title, start: rows[i].top, end: next ? next.top : contentBottom, next_section_title: next ? next.title : null}); }
    return intervals;
};
FSS.countEntryObjects = function (entries) { var count = 0, i; for (i = 0; i < entries.length; i += 1) { try { count += Math.max(1, entries[i].item.pageItems.length); } catch (ignoreChildren) { count += 1; } } return count; };
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
