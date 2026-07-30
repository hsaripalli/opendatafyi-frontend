import { articleTemplate } from "./articles/article-template";
import { canadaEnergyBalance } from "./articles/canada-energy-balance";
import type { InsightArticle } from "./types";

export const allInsights: InsightArticle[] = [
  canadaEnergyBalance,
  articleTemplate,
];

export const publishedInsights = allInsights
  .filter((article) => article.status === "published")
  .sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );

export function getPublishedInsight(slug: string) {
  return publishedInsights.find((article) => article.slug === slug);
}
