import type { InsightArticle } from "../types";

/*
 * Publishing template
 * -------------------
 * 1. Duplicate this file and replace every placeholder.
 * 2. Add the article to content/insights/index.ts.
 * 3. Keep status as "draft" while reviewing the numbers and source notes.
 * 4. Change status to "published" only when the publish packet is approved.
 *
 * Draft articles are excluded from the Insights index and static routes.
 */
export const articleTemplate: InsightArticle = {
  slug: "replace-with-article-slug",
  status: "draft",
  category: "Visual story",
  kicker: "Topic · Geography · Time period",
  title: "A clear, specific finding belongs here.",
  dek: "One or two sentences that explain what was measured, why it matters, and the scope of the analysis.",
  socialImage: "/insights/replace-with-article-slug-og.png",
  publishedAt: "2026-07-30",
  readingMinutes: 6,
  methodology:
    "Describe the source tables, filters, calculations, exclusions, units, and rounding rules in plain language.",
  blocks: [
    {
      type: "paragraph",
      text: "Open with the question and the most important context. Do not make the reader interpret a chart before they know why it matters.",
    },
    {
      type: "stat-grid",
      items: [
        { value: "00", label: "Primary finding", note: "Unit and time period" },
        { value: "00%", label: "Comparison finding", note: "State the baseline" },
        { value: "YYYY", label: "Reference year" },
      ],
    },
    {
      type: "heading",
      text: "Use section headings to advance the argument.",
    },
    {
      type: "bar-chart",
      title: "Write the chart title as a finding",
      description: "Explain the measure, geography, and date range.",
      unit: "Unit",
      items: [
        { label: "Category A", value: 72, display: "72", highlight: true },
        { label: "Category B", value: 54, display: "54" },
        { label: "Category C", value: 31, display: "31" },
      ],
      note: "Values in this draft template are placeholders and are never published.",
    },
    {
      type: "callout",
      label: "What to keep in mind",
      text: "State the limitation that most affects how this result should be interpreted.",
    },
  ],
  sources: [
    {
      title: "Replace with the official dataset title",
      publisher: "Replace with the data publisher",
      url: "https://open.canada.ca/",
      accessed: "2026-07-30",
    },
  ],
};
