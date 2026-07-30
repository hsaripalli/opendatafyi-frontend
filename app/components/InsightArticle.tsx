import type { InsightArticle as InsightArticleData } from "../../content/insights/types";
import { LineChart } from "./LineChart";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function chartScale(value: number) {
  const roughStep = value / 5;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const step =
    (normalized <= 1
      ? 1
      : normalized <= 2
        ? 2
        : normalized <= 4
          ? 4
          : normalized <= 5
            ? 5
            : 10) * magnitude;
  const maximum = Math.ceil(value / step) * step;
  const ticks = Array.from(
    { length: Math.round(maximum / step) + 1 },
    (_, index) => index * step,
  );

  return { maximum, ticks };
}

function axisLabel(value: number) {
  return value >= 1000 ? `${value / 1000}k` : String(value);
}

function BarChart({
  block,
}: {
  block: Extract<InsightArticleData["blocks"][number], { type: "bar-chart" }>;
}) {
  const maximum = Math.max(...block.items.map((item) => item.value), 1);

  return (
    <figure className="insight-figure">
      <figcaption className={block.hideTitle ? "is-titleless" : undefined}>
        <div>
          <p className="figure-label">Chart</p>
          {!block.hideTitle && <h2>{block.title}</h2>}
          <p>{block.description}</p>
        </div>
        {block.unit && <span>{block.unit}</span>}
      </figcaption>
      <div className="bar-chart">
        {block.items.map((item) => (
          <div className="bar-row" key={item.label}>
            <span className="bar-label">{item.label}</span>
            <div className="bar-track" aria-hidden="true">
              <i
                className={item.highlight ? "is-highlighted" : undefined}
                style={{ width: `${(item.value / maximum) * 100}%` }}
              />
            </div>
            <strong>{item.display}</strong>
          </div>
        ))}
      </div>
      <p className="figure-note">{block.note ?? "Source details are listed below."}</p>
    </figure>
  );
}

function StackedBarChart({
  block,
}: {
  block: Extract<
    InsightArticleData["blocks"][number],
    { type: "stacked-bar-chart" }
  >;
}) {
  const { maximum, ticks } = chartScale(
    Math.max(...block.items.map((item) => item.total)),
  );

  return (
    <figure className="insight-figure">
      <figcaption className={block.hideTitle ? "is-titleless" : undefined}>
        <div>
          <p className="figure-label">Chart</p>
          {!block.hideTitle && <h2>{block.title}</h2>}
          <p>{block.description}</p>
        </div>
        <span>{block.unit}</span>
      </figcaption>
      <div className="chart-legend" aria-label="Chart legend">
        {block.series.map((series) => (
          <span key={series.key}>
            <i className={`tone-${series.tone}`} />
            {series.label}
          </span>
        ))}
      </div>
      <div className="vertical-chart">
        <div className="vertical-plot">
          <div className="vertical-grid" aria-hidden="true">
            {ticks.map((tick) => (
              <i
                key={tick}
                style={{ bottom: `${(tick / maximum) * 100}%` }}
              >
                <span>{axisLabel(tick)}</span>
              </i>
            ))}
          </div>
          <div
            className="vertical-columns stacked-columns"
            style={{
              gridTemplateColumns: `repeat(${block.items.length}, minmax(0, 1fr))`,
            }}
          >
            {block.items.map((item) => (
              <div className="vertical-category" key={item.label}>
                <div
                  className="stacked-column"
                  style={{ height: `${(item.total / maximum) * 100}%` }}
                >
                  <strong>{item.totalDisplay}</strong>
                  {block.series.map((series) => (
                    <i
                      className={`tone-${series.tone}`}
                      key={series.key}
                      style={{
                        height: `${((item.values[series.key] ?? 0) / item.total) * 100}%`,
                      }}
                      title={`${series.label}: ${(item.values[series.key] ?? 0).toLocaleString("en-CA")} ${block.unit}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="vertical-labels"
          style={{
            gridTemplateColumns: `repeat(${block.items.length}, minmax(0, 1fr))`,
          }}
        >
          {block.items.map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
      </div>
      <details className="chart-data-table">
        <summary>View chart data</summary>
        <div>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                {block.series.map((series) => (
                  <th key={series.key}>{series.label}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {block.items.map((item) => (
                <tr key={item.label}>
                  <td>{item.label}</td>
                  {block.series.map((series) => (
                    <td key={series.key}>
                      {(item.values[series.key] ?? 0).toLocaleString("en-CA")}
                    </td>
                  ))}
                  <td>{item.totalDisplay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="figure-note">{block.note ?? "Source details are listed below."}</p>
    </figure>
  );
}

function GroupedBarChart({
  block,
}: {
  block: Extract<
    InsightArticleData["blocks"][number],
    { type: "grouped-bar-chart" }
  >;
}) {
  const { maximum, ticks } = chartScale(
    Math.max(
      ...block.items.flatMap((item) =>
        block.series.map((series) => item.values[series.key] ?? 0),
      ),
      1,
    ),
  );

  return (
    <figure className="insight-figure">
      <figcaption className={block.hideTitle ? "is-titleless" : undefined}>
        <div>
          <p className="figure-label">Chart</p>
          {!block.hideTitle && <h2>{block.title}</h2>}
          <p>{block.description}</p>
        </div>
        <span>{block.unit}</span>
      </figcaption>
      <div className="chart-legend" aria-label="Chart legend">
        {block.series.map((series) => (
          <span key={series.key}>
            <i className={`tone-${series.tone}`} />
            {series.label}
          </span>
        ))}
      </div>
      <div className="vertical-chart grouped-vertical-chart">
        <div className="vertical-plot">
          <div className="vertical-grid" aria-hidden="true">
            {ticks.map((tick) => (
              <i
                key={tick}
                style={{ bottom: `${(tick / maximum) * 100}%` }}
              >
                <span>{axisLabel(tick)}</span>
              </i>
            ))}
          </div>
          <div
            className="vertical-columns grouped-columns"
            style={{
              gridTemplateColumns: `repeat(${block.items.length}, minmax(0, 1fr))`,
            }}
          >
            {block.items.map((item) => (
              <div className="vertical-category" key={item.label}>
                <div className="paired-columns">
                  {block.series.map((series) => (
                    <div
                      className={`paired-column tone-${series.tone}`}
                      key={series.key}
                      style={{
                        height: `${((item.values[series.key] ?? 0) / maximum) * 100}%`,
                      }}
                    >
                      <strong>{item.displays[series.key]}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="vertical-labels grouped-labels"
          style={{
            gridTemplateColumns: `repeat(${block.items.length}, minmax(0, 1fr))`,
          }}
        >
          {block.items.map((item) => (
            <span key={item.label}>
              <strong>{item.label}</strong>
              {item.annotation && <small>{item.annotation}</small>}
            </span>
          ))}
        </div>
      </div>
      <p className="figure-note">{block.note ?? "Source details are listed below."}</p>
    </figure>
  );
}

export function InsightArticle({ article }: { article: InsightArticleData }) {
  return (
    <article className="insight-article">
      <header className="article-hero">
        <a className="article-back" href="/insights">
          ← All insights
        </a>
        <p className="section-kicker">{article.kicker}</p>
        <h1>{article.title}</h1>
        <p className="article-dek">{article.dek}</p>
        <div className="article-meta">
          <span>{article.category}</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingMinutes} min read</span>
        </div>
      </header>

      <div className="article-body">
        {article.blocks.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={index}>{block.text}</p>;
          }

          if (block.type === "heading") {
            return <h2 key={index}>{block.text}</h2>;
          }

          if (block.type === "note") {
            return (
              <p className="article-small-note" key={index}>
                {block.text}
              </p>
            );
          }

          if (block.type === "callout") {
            return (
              <aside className="article-callout" key={index}>
                <span>{block.label}</span>
                <p>{block.text}</p>
              </aside>
            );
          }

          if (block.type === "stat-grid") {
            return (
              <div className="article-stat-grid" key={index}>
                {block.items.map((item) => (
                  <div key={`${item.value}-${item.label}`}>
                    <strong>
                      {item.value}
                      {item.unit && <> <em>{item.unit}</em></>}
                    </strong>
                    <span>{item.label}</span>
                    {item.note && <small>{item.note}</small>}
                  </div>
                ))}
              </div>
            );
          }

          if (block.type === "bar-chart") {
            return <BarChart block={block} key={index} />;
          }

          if (block.type === "stacked-bar-chart") {
            return <StackedBarChart block={block} key={index} />;
          }

          if (block.type === "grouped-bar-chart") {
            return <GroupedBarChart block={block} key={index} />;
          }

          return (
            <LineChart
              title={block.title}
              hideTitle={block.hideTitle}
              description={block.description}
              unit={block.unit}
              items={block.items}
              event={block.event}
              note={block.note}
              key={index}
            />
          );
        })}
      </div>

      <section className="article-notes">
        <div>
          <p className="section-kicker">Methodology</p>
          <p>{article.methodology}</p>
          {article.credit && <p className="article-credit">{article.credit}</p>}
        </div>
        <div>
          <p className="section-kicker">Sources</p>
          <ol>
            {article.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
                <span>
                  {source.publisher} · Accessed {formatDate(source.accessed)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <div className="article-end-nav">
        <a href="/insights">← All insights</a>
      </div>
    </article>
  );
}
