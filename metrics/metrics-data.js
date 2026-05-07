window.__METRICS_DATA = {
  schemaVersion: "1.0.0",
  updatedAt: "2026-05-07",
  qualityGateOrder: [
    "nav-link-presence",
    "nav-href-resolution",
    "rename-cleanup",
    "canonical-sync",
    "retrospective-update",
    "efficiency-scorecard"
  ],
  enhancements: [
    {
      id: "enh-2026-05-05-coding-agent",
      title: "Integrate Coding Agent page",
      type: "Page Content & Integration",
      mergedAt: "2026-05-05",
      baselineCommitId: "231fc45",
      currentCommitId: "4e11206",
      baseline: {
        filesChanged: 4,
        insertions: 192,
        deletions: 0,
        churnPerFile: 48.0
      },
      current: {
        filesChanged: 14,
        insertions: 622,
        deletions: 1,
        churnPerFile: 44.5
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "Manual nav propagation across many pages increased risk of inconsistencies.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added required nav validation checks and fallback tooling guidance.",
        prevention: "Standardized checks now detect nav mismatches and broken links before commit."
      },
      interpretation: "Slightly faster than baseline by churn/file despite wider page integration scope."
    },
    {
      id: "enh-2026-05-05-continuous-improvement-page",
      title: "Add Continuous Improvement workflow page",
      type: "Page Content & Integration",
      mergedAt: "2026-05-05",
      baselineCommitId: "4e11206",
      currentCommitId: "67a6193",
      baseline: {
        filesChanged: 14,
        insertions: 622,
        deletions: 1,
        churnPerFile: 44.5
      },
      current: {
        filesChanged: 16,
        insertions: 355,
        deletions: 1,
        churnPerFile: 22.25
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "A nav insertion variant was missed on one page and required a follow-up correction.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added required update step for general-ghcp-resources-links.html in new-page sequence.",
        prevention: "Improves discoverability and reduces missed integration touchpoints."
      },
      interpretation: "Faster than baseline with materially lower churn per file and clean quality gate pass."
    },
    {
      id: "enh-2026-05-05-modernization-guide",
      title: "Integrate Modernization Getting Started guide",
      type: "Page Content & Integration",
      mergedAt: "2026-05-05",
      baselineCommitId: "4e11206",
      currentCommitId: "b8b7f3f",
      baseline: {
        filesChanged: 14,
        insertions: 622,
        deletions: 1,
        churnPerFile: 44.5
      },
      current: {
        filesChanged: 17,
        insertions: 426,
        deletions: 0,
        churnPerFile: 25.06
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "Scripted nav insertion initially missed active-link variants on one page.",
        processFile: ".github/skills.md",
        ruleChanged: "Added scripted-nav rule to handle both normal and active-link variants.",
        prevention: "Reduces manual rework and improves first-pass consistency in multi-page nav updates."
      },
      interpretation: "Faster than baseline despite broader scope; churn per file improved by 43.7 percent."
    },
    {
      id: "enh-2026-05-05-dashboard-trend-chart",
      title: "Enhance metrics dashboard trend chart",
      type: "Interactive Features & Dashboards",
      mergedAt: "2026-05-05",
      baselineCommitId: "4c4f0ff",
      currentCommitId: "c27fb24",
      baseline: {
        filesChanged: 2,
        insertions: 507,
        deletions: 0,
        churnPerFile: 253.5
      },
      current: {
        filesChanged: 2,
        insertions: 441,
        deletions: 0,
        churnPerFile: 220.5
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "The first large patch missed the exact script context and had to be reapplied with a tighter local anchor.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added a validation rule requiring a parse check and one browser interaction check for interactive charts, dashboards, or controls.",
        prevention: "Ensures interactive dashboard changes are validated at the behavior layer before commit, not only by static parse checks."
      },
      interpretation: "Faster than the baseline dashboard build because the enhancement stayed localized while adding richer interaction and comparison signals."
    },
    {
      id: "enh-2026-05-05-nav-rail-standardization",
      title: "Standardize site navigation rail contract",
      type: "Navigation & Information Architecture",
      mergedAt: "2026-05-05",
      baselineCommitId: "1024291",
      currentCommitId: "1024291",
      baseline: {
        filesChanged: 17,
        insertions: 770,
        deletions: 337,
        churnPerFile: 65.12
      },
      current: {
        filesChanged: 17,
        insertions: 770,
        deletions: 337,
        churnPerFile: 65.12
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "First visual pass showed wrapped multi-row navigation, requiring a second pass to enforce single-row overflow behavior.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added explicit requirements for .site-nav-track and nav-* classes, and enforced single-row nav rail behavior with horizontal overflow.",
        prevention: "Locks nav updates to one canonical structure and interaction pattern so pages cannot drift into inconsistent wrappers or wrapped rails."
      },
      interpretation: "Initial baseline snapshot recorded because no comparable prior nav-rail baseline existed; this entry seeds future trend comparisons."
    },
    {
      id: "enh-2026-05-05-nav-redesign-dropdown-filters",
      title: "Navigation redesign: Home/Topics/Metrics/Docs with category filtering",
      type: "Navigation & Information Architecture",
      mergedAt: "2026-05-05",
      baselineCommitId: "bc7213b",
      currentCommitId: "bc7213b",
      baseline: {
        filesChanged: 18,
        insertions: 1342,
        deletions: 265,
        churnPerFile: 89.3
      },
      current: {
        filesChanged: 18,
        insertions: 1342,
        deletions: 265,
        churnPerFile: 89.3
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "Manual dropdown CSS and category metadata addition across all 14 content pages required careful batching to stay efficient.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added requirement to batch-update CSS and metadata across multiple files using multi_replace_string_in_file for efficiency. Added category tagging standard: pattern, operating-model, worked-example, quickstart, reference-tool.",
        prevention: "Future nav redesigns can reuse batch-update patterns and category tagging conventions to minimize per-file iteration and human error."
      },
      interpretation: "Initial baseline snapshot recorded for this navigation redesign; impact data (improved discoverability, 5-category filter support) seeds future nav-improvement comparisons."
    },
    {
      id: "enh-2026-05-05-new-page-workflow-guardrail",
      title: "Complete new-page workflow and add pre-push guardrail",
      type: "Process & Governance",
      mergedAt: "2026-05-05",
      baselineCommitId: "b873bbb",
      currentCommitId: "fde4df9",
      baseline: {
        filesChanged: 1,
        insertions: 607,
        deletions: 0,
        churnPerFile: 607.0
      },
      current: {
        filesChanged: 5,
        insertions: 30,
        deletions: 0,
        churnPerFile: 6.0
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "The new page was created and functional before discovery/documentation wiring was completed, causing follow-up work.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added a required New Page Pre-Push Gate with explicit checks for index card, resources table entry, README listing, kebab-case naming, and rename cleanup.",
        prevention: "Forces a deterministic checklist before push so page creation cannot ship without discoverability and documentation integration."
      },
      interpretation: "Faster and cleaner than baseline by drastically reducing churn per file while completing workflow integration and adding a durable guardrail."
    },
    {
      id: "enh-2026-05-06-shared-problems-infographic",
      title: "Integrate Shared Problems Infographic page",
      type: "Page Content & Integration",
      mergedAt: "2026-05-06",
      baselineCommitId: "270f532",
      currentCommitId: "270f532",
      baseline: {
        filesChanged: 19,
        insertions: 1117,
        deletions: 2,
        churnPerFile: 58.78
      },
      current: {
        filesChanged: 19,
        insertions: 1117,
        deletions: 2,
        churnPerFile: 58.78
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "None; systematic pre-push gate workflow prevented surprises.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "No new rule needed; existing pre-push gate execution was systematic and complete.",
        prevention: "Adhering to established process gates (index card check, resources link, README, nav link count, parse validation, browser test, external link health) ensured zero rework."
      },
      interpretation: "Initial baseline snapshot recorded because no directly comparable baseline existed; this seeds future new-page comparisons for this workflow pattern."
    },
    {
      id: "enh-2026-05-07-agentic-ladder-scroll-refactor",
      title: "Refactor Agentic Maturity Ladder into progressive scroll layout",
      type: "Layout & Responsive Architecture",
      mergedAt: "2026-05-07",
      baselineCommitId: "b67d4b2",
      currentCommitId: "b67d4b2",
      baseline: {
        filesChanged: 2,
        insertions: 507,
        deletions: 365,
        churnPerFile: 436.0
      },
      current: {
        filesChanged: 2,
        insertions: 507,
        deletions: 365,
        churnPerFile: 436.0
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "Scroll behavior verification took extra time because fixed-canvas layout assumptions did not map cleanly to long-page interaction testing.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added a validation rule requiring top/mid/bottom scroll checks after any full-page layout refactor.",
        prevention: "Forces explicit long-page checks so clipping or non-scrollable states are caught before completion claims."
      },
      interpretation: "Initial baseline snapshot recorded because no directly comparable prior refactor baseline existed; this establishes a baseline for future layout refactor trend analysis."
    },
    {
      id: "enh-2026-05-07-dashboard-category-ledger",
      title: "Aggregate dashboard ledger by fixed metrics categories",
      type: "Interactive Features & Dashboards",
      mergedAt: "2026-05-07",
      baselineCommitId: "c27fb24",
      currentCommitId: "484a52c",
      baseline: {
        filesChanged: 2,
        insertions: 441,
        deletions: 0,
        churnPerFile: 220.5
      },
      current: {
        filesChanged: 2,
        insertions: 63,
        deletions: 31,
        churnPerFile: 47.0
      },
      qualityGates: {
        "nav-link-presence": "pass",
        "nav-href-resolution": "pass",
        "rename-cleanup": "pass",
        "canonical-sync": "pass",
        "retrospective-update": "pass",
        "efficiency-scorecard": "pass"
      },
      retrospective: {
        slowdown: "Commit-level ledger output obscured category-level trends and required a structural aggregation pass for clearer storytelling.",
        processFile: ".github/copilot-instructions.md",
        ruleChanged: "Added a dashboard aggregation validation rule requiring exactly five category rows with one row per fixed taxonomy category.",
        prevention: "Prevents regressions where category dashboards drift from the canonical taxonomy or silently omit categories."
      },
      interpretation: "Faster than the prior dashboard enhancement baseline with substantially lower churn per file while improving decision-ready category visibility."
    }
  ]
};
