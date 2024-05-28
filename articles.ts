export interface Article {
  title: string;
  slug: string;
  docUrl: string;
  whatsAppUrl?: string;
  publishedAt: string;
  cta?: {
    url: string;
    text: string;
  };
}

export const articles: Article[] = [
  {
    title: "Index",
    slug: "",
    docUrl:
      "https://docs.google.com/document/d/1X8DR9dKz8hsXjMWUEbg26xcLjHv7bFb0yqZW9oyspdU/edit?usp=sharing",
    publishedAt: "28th May, 2024",
    cta: {
      url: "https://forms.gle/YMWC2FzpTSvT6ryp8",
      text: "Join The Progress Project",
    },
  },
];
