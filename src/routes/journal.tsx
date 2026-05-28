import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { getJournalPosts, type JournalPost } from "@/lib/journal.functions";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Field Journal — Beelove Farm" },
      {
        name: "description",
        content:
          "Stories, field notes and research from Beelove Farm — beekeeping, climate adaptation, and sustainable agriculture.",
      },
      { property: "og:title", content: "Field Journal — Beelove Farm" },
      {
        property: "og:description",
        content:
          "Writing from the apiary: hive design, drought, bee migration, and lessons from farmers worldwide.",
      },
    ],
  }),
  component: JournalPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function JournalPage() {
  const fetchPosts = useServerFn(getJournalPosts);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["journal-posts"],
    queryFn: () => fetchPosts(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const posts: JournalPost[] = data?.posts ?? [];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-olive text-cream p-10 md:p-16 ring-1 ring-umber/10">
          <span className="inline-block px-3 py-1 rounded-full border border-honey/40 text-honey text-[11px] font-medium uppercase tracking-[0.18em] mb-6">
            Field Journal · Since 2023
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] max-w-3xl mb-5">
            Notes from the apiary, the pond, and the road.
          </h1>
          <p className="text-base md:text-lg text-cream/85 max-w-2xl">
            A working archive of our writing on bees, climate, and the
            farmers we learn from. Originally published on our long-running
            blog at{" "}
            <a
              href="https://beeloveapiaries.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-honey/60 hover:text-honey"
            >
              beeloveapiaries.wordpress.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        {isLoading && (
          <div className="grid md:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden animate-pulse"
              >
                <div className="aspect-[16/10] bg-umber/10" />
                <div className="p-8 space-y-3">
                  <div className="h-4 w-1/3 bg-umber/10 rounded" />
                  <div className="h-6 w-3/4 bg-umber/10 rounded" />
                  <div className="h-4 w-full bg-umber/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-card ring-1 ring-umber/10 rounded-[24px] p-10 text-center">
            <p className="text-umber/75">
              We couldn't load the journal right now. You can read all our
              posts directly at{" "}
              <a
                href="https://beeloveapiaries.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber underline"
              >
                beeloveapiaries.wordpress.com
              </a>
              .
            </p>
          </div>
        )}

        {!isLoading && !isError && posts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((p, idx) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden flex flex-col hover:ring-amber/40 transition-all ${
                  idx === 0 ? "md:col-span-2" : ""
                }`}
              >
                {p.image && (
                  <div
                    className={`overflow-hidden ${
                      idx === 0 ? "aspect-[21/9]" : "aspect-[16/10]"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-olive font-semibold mb-3">
                    <span>{formatDate(p.date)}</span>
                    {p.categories[0] && (
                      <>
                        <span className="size-1 rounded-full bg-olive/40" />
                        <span>{p.categories[0]}</span>
                      </>
                    )}
                  </div>
                  <h2
                    className={`font-display leading-tight mb-3 ${
                      idx === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {p.title}
                  </h2>
                  <p className="text-sm text-umber/75 leading-relaxed line-clamp-3 mb-5">
                    {stripHtml(p.excerpt)}
                  </p>
                  <span className="mt-auto text-xs uppercase tracking-widest text-amber group-hover:text-umber transition-colors">
                    Read the post →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="bg-card ring-1 ring-umber/10 rounded-[24px] p-10 text-center">
            <p className="text-umber/75">
              No posts yet. Check back soon — we're returning to writing
              this season.
            </p>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
