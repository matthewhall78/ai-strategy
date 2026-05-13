# metrics.md — Enhancement Metrics & Retrospective Requirements

This file specifies the metrics system for tracking website enhancement efficiency, quality gates, and continuous improvement.

## Metrics Data Structure

**Location:** `metrics/metrics-data.js`

The metrics system stores enhancement records with:

- **Metadata:** Title, type (from fixed taxonomy), merged date, baseline commit, current commit
- **Efficiency values:** Files changed, insertions, deletions, churn per file (baseline/current)
- **Quality gates:** Pass/fail status for 6 validation gates
- **Retrospective:** Record of what slowed work down and how process improved
- **Interpretation:** One-sentence efficiency comparison

**Schema Requirements:**

- Keep `schemaVersion` and increment only on structural changes
- Preserve backward compatibility for older records when adding new fields
- Put optional future metrics into new fields without removing existing required fields

## Fixed Metrics Categories (Immutable Taxonomy)

All enhancement records must use exactly one of these five category values for the `type` field. This fixed set prevents category sprawl and enables deterministic baseline selection.

### 1. Page Content & Integration

- **When to use:** Adding new pages, new content sections, integrating external content blocks, page creation workflows
- **Effort:** Low–Medium | **Uncertainty:** Low
- **Examples:** New page creation, content block integration, site map expansion
- **Baseline rule:** Use most recent "Page Content & Integration" enhancement, or current if none exists

### 2. Layout & Responsive Architecture

- **When to use:** Full-page redesigns, grid restructuring, scroll behavior overhauls, breakpoint changes, major DOM reorganization
- **Effort:** High | **Uncertainty:** Medium
- **Examples:** Fixed-canvas-to-scroll refactors, multi-column-to-single-column changes, responsive layout fixes
- **Baseline rule:** Use most recent "Layout & Responsive Architecture" enhancement, or current if none exists

### 3. Navigation & Information Architecture

- **When to use:** Nav bar redesigns, menu structure changes, category systems, filtering systems, discoverability patterns, information hierarchy
- **Effort:** Medium–High | **Uncertainty:** Medium
- **Examples:** Nav restructure, dropdown implementation, category filtering, breadcrumb changes
- **Baseline rule:** Use most recent "Navigation & Information Architecture" enhancement, or current if none exists

### 4. Interactive Features & Dashboards

- **When to use:** Charting, data visualization, interactive controls, tooltips, dynamic behavior, event handlers, animations
- **Effort:** Medium | **Uncertainty:** High
- **Examples:** Trend charts, dashboards, interactive toggles, animated transitions
- **Baseline rule:** Use most recent "Interactive Features & Dashboards" enhancement, or current if none exists

### 5. Process & Governance

- **When to use:** Workflow guardrails, validation rules, documentation, quality gates, instruction updates, process templates
- **Effort:** Low–Medium | **Uncertainty:** Low
- **Examples:** Pre-push gates, validation rules, instruction documentation, process improvements
- **Baseline rule:** Use most recent "Process & Governance" enhancement, or current if none exists

**Category Selection Rule:** When choosing a category, match it against the primary work being done. If work spans multiple categories, assign to the dominant category (e.g., if mostly a new page but includes minor nav updates, use "Page Content & Integration"). Escalate ambiguity to the user before logging.

## Retrospective Record (Required for Every Enhancement)

For every enhancement, provide this short 4-line record in the final handoff message:

1. **What slowed us down?** — Identify one specific constraint, edge case, or process gap that added time.
2. **What process/file is being improved?** — Name the artifact (e.g., `.github/copilot-instructions.md`, `skills.md`).
3. **Exact rule added or changed.** — Quote the new or modified rule verbatim.
4. **How this prevents repeat issues.** — Explain the preventive mechanism.

**No enhancement is complete until this record is provided.**

## Efficiency Scorecard (Required for Every Enhancement)

For every enhancement, provide this scorecard in the final handoff message to track whether changes are becoming faster and leaner:

1. **Baseline commit ID** — Commit hash of the previous comparable enhancement (same category), or current if none exists.
2. **Current commit ID** — Commit hash of this enhancement.
3. **Files changed** — Baseline vs current (e.g., "5 files" vs "8 files").
4. **Insertions and deletions** — Baseline vs current (e.g., "120 insertions, 15 deletions" vs "85 insertions, 42 deletions").
5. **Churn per file** — Calculate as $(insertions + deletions) / files$ for baseline and current. Report both values and trend.
6. **Quality gates pass/fail summary** — Report status of all 6 gates: (1) nav-link-presence, (2) nav-href-resolution, (3) rename-cleanup, (4) canonical-sync, (5) browser-interaction-test, (6) docs-link-health.
7. **One-sentence interpretation** — E.g., "Faster and leaner due to parallel file edits and template reuse" or "Slower due to new nav validation complexity".

**No enhancement is complete until this scorecard is provided.**

## Metrics Logging (Required After Merge)

After merge, append one enhancement record to `metrics/metrics-data.js` with:

1. **Metadata:** title, type (from fixed taxonomy), mergedAt (YYYY-MM-DD), baselineCommitId, currentCommitId
2. **Efficiency values:** filesChanged, insertions, deletions, churnPerFile (baseline and current)
3. **Quality gates:** Pass/fail status for all 6 gates
4. **Retrospective:** slowdown, processFile, ruleChanged, prevention (from the 4-line record)
5. **Interpretation:** one-sentence efficiency comparison

If no comparable baseline exists for the category, log an explicit initial baseline snapshot by setting baseline commit and baseline metrics to the current commit and current metrics for that first record.

**Baseline Selection Logic:**

- For each enhancement, identify its `type` category (one of the five fixed categories)
- Search `metrics-data.js` for the most recent prior enhancement with the same `type`
- Use that prior enhancement's metrics as the baseline for comparison
- If no prior enhancement of the same type exists, use the current enhancement as its own baseline (initial snapshot)

**Example Record:**

```json
{
  "id": "enh-2026-05-07-dashboard-category-ledger",
  "title": "Aggregate dashboard ledger by category",
  "type": "Interactive Features & Dashboards",
  "mergedAt": "2026-05-07",
  "baselineCommitId": "enh-2026-05-05-dashboard-trend-chart",
  "currentCommitId": "484a52c",
  "baseline": {
    "filesChanged": 1,
    "insertions": 220,
    "deletions": 45,
    "churnPerFile": 265
  },
  "current": {
    "filesChanged": 1,
    "insertions": 190,
    "deletions": 50,
    "churnPerFile": 240
  },
  "qualityGates": {
    "nav-link-presence": "pass",
    "nav-href-resolution": "pass",
    "rename-cleanup": "pass",
    "canonical-sync": "pass",
    "browser-interaction-test": "pass",
    "docs-link-health": "pass"
  },
  "retrospective": {
    "slowdown": "Manual calculation of per-category aggregations was error-prone",
    "processFile": ".github/copilot-instructions.md",
    "ruleChanged": "Added Dashboard Aggregation Validation Rule: 'Exactly five category rows, one per fixed category'",
    "prevention": "Hard-coded fixedCategories array prevents mis-counting or missing categories"
  },
  "interpretation": "Leaner due to fixed-category bucketing simplifying aggregation logic"
}
```

## Dashboard Aggregation Validation Rule

When dashboard tables or bars are aggregated by the fixed taxonomy, validate that exactly five category rows render and each fixed category appears once. This prevents duplicate categories, missing categories, or off-by-one errors in aggregation logic.

**Validation Checklist:**

- [ ] Render the dashboard in a browser
- [ ] Count the rows in the aggregation table (should be exactly 5)
- [ ] Verify each row corresponds to one of the five fixed categories
- [ ] Verify no category row is missing
- [ ] Verify no category appears twice
- [ ] Record pass/fail status in the handoff

## Quality Gates (6 gates, all required to pass before merge)

1. **nav-link-presence** — Every `.html` file's `.site-nav` block contains all current nav links
2. **nav-href-resolution** — Every local nav `href` target resolves to an existing file in the repo
3. **rename-cleanup** — After rename operations, zero old filename references remain
4. **canonical-sync** — Canonical nav in `snippets/site-nav-snippet.html` matches live nav structure on all pages
5. **browser-interaction-test** — At least one real browser interaction path tested (click, hover, focus, toggle, scroll)
6. **docs-link-health** — Docs external link returns non-404 HTTP status (use `curl -L -s -o /dev/null -w "%{http_code}"`)

All six gates must pass and be reported before claiming an enhancement complete.
