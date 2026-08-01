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

  const canonicalPath = `/insights/${article.slug}`;
  const socialImages = article.socialImage
    ? [
        {
          url: article.socialImage,
          width: 1200,
          height: 627,
          alt: article.title,
        },
      ]
    : undefined;

  return {
    title: `${article.title} — opendata.fyi`,
    description: article.dek,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: article.title,
      description: article.dek,
      url: canonicalPath,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: socialImages,
    },
    twitter: {
      card: article.socialImage ? "summary_large_image" : "summary",
      title: article.title,
      description: article.dek,
      images: article.socialImage ? [article.socialImage] : undefined,
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
