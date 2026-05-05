window.__METRICS_DATA = {
  schemaVersion: "1.0.0",
  updatedAt: "2026-05-05",
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
      type: "new-page",
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
      type: "new-page",
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
      type: "new-page",
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
    }
  ]
};
