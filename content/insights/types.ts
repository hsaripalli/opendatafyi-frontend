export type InsightSource = {
  title: string;
  publisher: string;
  url: string;
  accessed: string;
};

export type ChartTone = "red" | "ink" | "slate" | "blue" | "sand" | "mist";

export type ChartSeries = {
  key: string;
  label: string;
  tone: ChartTone;
};

export type InsightBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "note";
      text: string;
    }
  | {
      type: "callout";
      label: string;
      text: string;
    }
  | {
      type: "stat-grid";
      items: Array<{
        value: string;
        unit?: string;
        label: string;
        note?: string;
      }>;
    }
  | {
      type: "bar-chart";
      title: string;
      hideTitle?: boolean;
      description: string;
      unit?: string;
      note?: string;
      items: Array<{
        label: string;
        value: number;
        display: string;
        highlight?: boolean;
      }>;
    }
  | {
      type: "stacked-bar-chart";
      title: string;
      hideTitle?: boolean;
      description: string;
      unit: string;
      note?: string;
      series: ChartSeries[];
      items: Array<{
        label: string;
        total: number;
        totalDisplay: string;
        values: Record<string, number>;
      }>;
    }
  | {
      type: "grouped-bar-chart";
      title: string;
      hideTitle?: boolean;
      description: string;
      unit: string;
      note?: string;
      series: ChartSeries[];
      items: Array<{
        label: string;
        values: Record<string, number>;
        displays: Record<string, string>;
        annotation?: string;
      }>;
    }
  | {
      type: "line-chart";
      title: string;
      hideTitle?: boolean;
      description: string;
      unit: string;
      note?: string;
      items: Array<{
        label: string;
        value: number;
        display?: string;
      }>;
      event?: {
        at: string;
        label: string;
      };
    };

export type InsightArticle = {
  slug: string;
  status: "draft" | "published";
  category: "Visual story" | "Data note" | "Explainer";
  kicker: string;
  title: string;
  dek: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  methodology: string;
  credit?: string;
  blocks: InsightBlock[];
  sources: InsightSource[];
};
