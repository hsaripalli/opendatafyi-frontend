import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { publishedInsights } from "../../content/insights";

export const metadata: Metadata = {
  title: "Insights — opendata.fyi",
  description:
    "Visual stories, analysis and explainers built from public data and linked to their official sources.",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function InsightsPage() {
  return (
    <main>
      <SiteHeader current="insights" />

      {publishedInsights.length > 0 && (
        <section className="insights-feed" aria-label="Latest insights">
          <div className="insight-card-grid">
            {publishedInsights.map((article, index) => (
              <article className="insight-card" key={article.slug}>
                <div className="insight-card-copy">
                  <p className="insight-card-label">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2>
                    <a href={`/insights/${article.slug}`}>{article.title}</a>
                  </h2>
                  <p>{article.dek}</p>
                </div>
                <div className="insight-card-meta">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.readingMinutes} min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
