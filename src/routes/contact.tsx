import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa, WA_NUMBER, EMAIL, INSTAGRAM } from "@/lib/site";
import { MessageCircle, Mail, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Beelove Farm — Makueni County, Kenya" },
      {
        name: "description",
        content:
          "Get in touch with Beelove Farm — WhatsApp, email, and farm visit details. Based in Makueni County, Kenya.",
      },
      { property: "og:title", content: "Contact Beelove Farm" },
      {
        property: "og:description",
        content: "Reach Beelove Farm via WhatsApp, email or visit us in Makueni.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-12 rounded-[28px] bg-umber text-cream p-10 md:p-14 ring-1 ring-black/5">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
              Get in touch
            </span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">
              Let's talk honey,<br />
              <span className="italic text-honey">fish, or training.</span>
            </h1>
            <p className="max-w-2xl text-cream/85">
              We respond fastest on WhatsApp. For orders, training bookings,
              partnerships or media — reach out below.
            </p>
          </div>

          <a
            href={wa("Hello Beelove Farm, I'd like to get in touch.")}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-6 bg-amber text-cream rounded-[24px] p-8 ring-1 ring-black/5 hover:bg-honey hover:text-umber transition-colors group"
          >
            <MessageCircle className="size-8 mb-4" />
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80 mb-1">
              WhatsApp · Fastest
            </div>
            <div className="font-display text-3xl mb-1">+254 729 396 897</div>
            <div className="text-sm opacity-80">Tap to start a chat →</div>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="md:col-span-6 bg-card ring-1 ring-umber/10 rounded-[24px] p-8 hover:-translate-y-0.5 transition-transform"
          >
            <Mail className="size-8 mb-4 text-amber" />
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-umber/60 mb-1">
              Email
            </div>
            <div className="font-display text-2xl text-umber mb-1 break-all">
              {EMAIL}
            </div>
            <div className="text-sm text-umber/70">For quotes, invoices & partnerships</div>
          </a>

          <a
            href={`https://instagram.com/${INSTAGRAM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-6 bg-honey/40 rounded-[24px] p-8 ring-1 ring-umber/10 hover:-translate-y-0.5 transition-transform"
          >
            <Instagram className="size-8 mb-4 text-umber" />
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-umber/60 mb-1">
              Instagram
            </div>
            <div className="font-display text-2xl text-umber mb-1">
              @{INSTAGRAM}
            </div>
            <div className="text-sm text-umber/70">Behind the scenes from the farm</div>
          </a>

          <div className="md:col-span-6 bg-teal text-cream rounded-[24px] p-8 ring-1 ring-black/5">
            <MapPin className="size-8 mb-4" />
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/70 mb-1">
              Visit the farm
            </div>
            <div className="font-display text-2xl mb-1">Makueni County, Kenya</div>
            <div className="text-sm text-cream/85">
              Farm tours by appointment — WhatsApp us first to schedule.
            </div>
          </div>

          <div className="md:col-span-12 bg-card ring-1 ring-umber/10 rounded-[24px] p-8 md:p-10">
            <h2 className="font-display text-3xl mb-3">Why WhatsApp?</h2>
            <p className="text-sm text-umber/75 max-w-3xl">
              All Beelove orders, training bookings and fingerling deliveries are
              coordinated on WhatsApp ({WA_NUMBER}). It's how we confirm
              availability in real time, share product photos, arrange payment
              (M-Pesa Till), and organise pickup or delivery from Makueni.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
