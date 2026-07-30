# Insights publishing system

Insights is a static editorial section of opendata.fyi. It uses the main site's
existing design language and publishes only reviewed narrative, derived values,
and presentation-ready chart series. It has no runtime database, upload system,
or public data-processing backend.

Treat this document as the default specification whenever a new Insight is
requested. A story-specific instruction from the publisher overrides it.

## Public frontend

```text
frontend/
  app/
    components/
      InsightArticle.tsx
      SiteHeader.tsx
      SiteFooter.tsx
    insights/
      page.tsx
      [slug]/page.tsx
  content/
    insights/
      articles/
        article-template.ts
      index.ts
      types.ts
```

- `app/insights/page.tsx` is the Insights landing page.
- `app/insights/[slug]/page.tsx` produces static article routes.
- `content/insights/articles/` contains one typed file per story.
- `InsightArticle.tsx` renders approved text, stats, charts, methodology, and
  sources with a consistent visual system.
- Only articles with `status: "published"` appear on the site. Drafts are
  excluded from the index and static route list.

## Private analysis

Keep an `analysis/` directory locally, or use a separate private repository.
Both public repositories explicitly ignore `/analysis/`.

```text
analysis/
  shared/
  projects/
    YYYY-MM-story-slug/
      brief.md
      sources.yml
      src/
      notebooks/
      data/
        raw/
        interim/
      output/
        figures/
        publish-packet.json
      qa.md
```

The private side may fetch public datasets, cache files, run notebooks, and
keep detailed working notes. Its only handoff to the frontend is a reviewed
publish packet containing final values, display labels, methodology, caveats,
source URLs, and access dates.

Raw source files, notebooks, exploratory figures, intermediate tables, API
responses, and analysis code must remain private. The public article may
hard-code the reviewed numbers required to render its statistics and charts.
Those numbers are the publication output, not the source dataset.

## Publishing workflow

1. Start a dated project folder under private `analysis/projects/`.
2. Record the question and source manifest before analysis.
3. Fetch or query data locally and preserve the repeatable calculation in
   `src/`.
4. Run data checks and record important caveats in `qa.md`.
5. Export a small `publish-packet.json` containing only derived values.
6. Duplicate `content/insights/articles/article-template.ts`.
7. Transfer the approved values and narrative into the article file.
8. Check every displayed number against the private calculation and confirm
   units, rounding, time windows, and comparison bases.
9. Keep the article as `draft` through editorial, visual, responsive, and
   number review.
10. Add it to `content/insights/index.ts`, change it to `published`, and run
    `npm run build`.
11. Confirm that the index and article routes are statically generated and
    that no file from `analysis/` is present in the frontend or build output.

Never import the private analysis directory into the frontend. This keeps the
publish boundary visible and prevents raw data from entering the deployment by
accident.

## Insights index

The Insights route is a direct story index:

- begin the story list immediately below the site header;
- do not add a landing-page hero, "Latest insights" heading, or explanatory
  subtitle;
- number stories sequentially with a red, two-digit label such as `01`;
- place the number above the story title, not in a separate left-hand column;
- show the linked title, one concise summary, publication date, and reading
  time;
- make the title the only story link;
- do not add "Visual story", "Read story", or similar duplicate labels;
- do not draw a divider below the final story card.

Keep Insights after FAQ in the main navigation, separated from the preceding
links by the existing vertical rule.

## Article layout

Insights extends the current editorial-modern system:

- white paper background, near-black type, fine grey rules, and the existing
  opendata.fyi red only for emphasis;
- large, tightly tracked headlines and restrained body typography;
- monospace labels for dates, units, chart labels, and source metadata;
- generous whitespace and a consistent left-hand editorial spine;
- direct labels and displayed values instead of decorative chart elements;
- one highlighted series or finding per chart whenever possible;
- methodology and official sources as permanent parts of every article.

Within the article body:

- narrative paragraphs, statistic grids, chart frames, and their dark
  horizontal rules share the same left edge and a `920px` maximum width;
- section headings may extend to the wider `1040px` article container;
- use fluid viewport widths and preserve comfortable gutters at tablet and
  phone sizes;
- include "← All insights" above the article and again after the notes and
  sources;
- place the headline statistics before any unit-definition note;
- render each statistic value first, then its label, then its period;
- keep units such as `PJ` visibly separated from the number and set smaller
  than the numeric value.

For energy stories, the standard short unit note is:

> Unit note: A joule (J) is the standard unit of energy.<br />
> Driving a gasoline car for one kilometre uses roughly 2–4 million joules of
> fuel energy, depending on the vehicle and driving conditions.<br />
> One petajoule (PJ) equals 1,000 TJ or 10¹⁵ J.

Do not add extra unit disclaimers unless they are needed to prevent a likely
misreading.

## Editorial style

- Use a direct, declarative headline that states the central finding.
- Keep the deck to the two most important quantified findings.
- Prefer a precise supported value over a vague phrase. For example, use
  "supplied 103.7% of the net increase" rather than "supplied more than the
  entire net increase."
- Make section headings carry the argument; do not repeat the same claim as a
  chart title immediately below.
- Keep explanatory paragraphs compact and avoid restating every visible value.
- Distinguish association from attribution whenever the data cannot establish
  causality.
- Use plain language and explain technical distinctions only when they affect
  interpretation.

## Charts

- Prefer bars for annual composition and comparisons. Use stacked bars when the
  total and its composition both matter.
- Use grouped bars for exports versus imports and retain a zero baseline.
- Use a line for a monthly time series. Do not add an area fill when the
  vertical axis is truncated.
- Keep the small red `Chart` label, description, unit, legend, chart, data
  table, and source note.
- Hide a visible chart title when the preceding section heading already
  provides the finding. Preserve the internal title for accessible labels.
- Use red for the primary series or finding. Keep secondary annotations, such
  as net balances, in a muted colour.
- Directly label values when they remain legible. On narrow screens, hide
  crowded labels rather than forcing the plot wider.
- Every chart must fit the viewport on phones and tablets. The chart itself
  must never require horizontal scrolling.
- Keep the expandable data table for readers who need exact values; the table
  may scroll within its own container when necessary.
- Every figure must include a concise note describing the relevant calculation,
  definition, or limitation.

Use the existing typed chart components. Add a new chart type only when the
current bar, stacked-bar, grouped-bar, or line components cannot communicate
the finding clearly.

## Methodology and attribution

Write methodology in neutral, reproducible language. Do not say "we
downloaded." State:

- the source table or API;
- the observation frequency and period;
- how values were aggregated;
- which categories and measures were used;
- validation or cross-checks performed;
- comparison windows and formulas;
- unit conversions, rounding, seasonal-adjustment status, and revision risk.

Place the tool credit on its own line below the methodology. Use:

`Built with the opendata.fyi MCP server.`

Source entries must use the official dataset or publisher page whenever
available and include the dataset title, publisher, direct URL, and access
date. Add a separate authoritative source for material external facts such as
an infrastructure service date.

## Article contract

Every published article must include:

- a specific, finding-led title and concise quantified summary;
- publication date and reading time;
- neutral, reproducible methodology;
- units, time period, geography, and rounding rules;
- limitations that materially affect interpretation;
- official dataset title, publisher, URL, and access date;
- accessible chart descriptions and presentation-ready display values;
- responsive charts that fit phone and tablet viewports;
- a successful production build.

Numbers and chart series included in article files are public. Raw source rows,
credentials, cached downloads, notebooks, and private analysis logic are not.
