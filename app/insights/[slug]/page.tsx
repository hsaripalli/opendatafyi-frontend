import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticle } from "../../components/InsightArticle";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import {
  getPublishedInsight,
  publishedInsights,
} from "../../../content/insights";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedInsights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedInsight(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} — opendata.fyi`,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPublishedInsight(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <SiteHeader current="insights" />
      <InsightArticle article={article} />
      <SiteFooter />
    </main>
  );
}
