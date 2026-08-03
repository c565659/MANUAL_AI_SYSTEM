# List Formatting

## Permanent Rule: Hanging Indent for Multi-line Lists

### Scope

This rule applies to all list formats in manuals, including:

- Numbered lists: `1.`, `2.`, `3.`
- Alphabetic lists: `A.`, `B.`, `C.`
- Bullet lists: `•`
- Symbol lists: `✓`, `➜`, and similar markers

### Required Behavior

When a list item wraps onto a second or later line, every continuation line must align vertically with the first character of the list item's body text.

Correct:

```text
2. Press and hold the Power Button for
   three seconds to turn on the camera.
```

Incorrect:

```text
2. Press and hold the Power Button for
three seconds to turn on the camera.
```

Incorrect:

```text
2. Press and hold the Power Button for
    three seconds to turn on the camera.
```

### Illustrator Implementation

Use Paragraph settings to create a hanging indent by combining:

- Left Indent
- First Line Indent

Do not use any of the following to simulate alignment:

- Spaces
- Tabs
- Manual line breaks for alignment
- Manually moving individual text lines

### Production Requirement

This is a permanent typography rule for all manual projects.

It must be applied consistently across the entire document, including translated versions and later text revisions.
