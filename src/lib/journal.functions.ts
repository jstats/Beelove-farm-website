import { createServerFn } from "@tanstack/react-start";

export type JournalPost = {
  id: number;
  date: string;
  title: string;
  excerpt: string; // HTML, brief
  url: string;
  image: string | null;
  categories: string[];
  author: string;
};

type RawPost = {
  ID: number;
  date: string;
  title: string;
  excerpt: string;
  URL: string;
  featured_image: string | null;
  categories?: Record<string, { name: string }>;
  author?: { name?: string };
};

const ENDPOINT =
  "https://public-api.wordpress.com/rest/v1.1/sites/beeloveapiaries.wordpress.com/posts/?number=20&fields=ID,date,title,excerpt,URL,featured_image,categories,author";

export const getJournalPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: JournalPost[] }> => {
    try {
      const res = await fetch(ENDPOINT, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return { posts: [] };
      const data = (await res.json()) as { posts?: RawPost[] };
      const posts: JournalPost[] = (data.posts ?? []).map((p) => ({
        id: p.ID,
        date: p.date,
        title: p.title,
        excerpt: p.excerpt,
        url: p.URL,
        image: p.featured_image || null,
        categories: p.categories ? Object.values(p.categories).map((c) => c.name) : [],
        author: p.author?.name || "Beelove Farm",
      }));
      return { posts };
    } catch {
      return { posts: [] };
    }
  }
);
