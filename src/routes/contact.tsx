import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa, WA_NUMBER, EMAIL, INSTAGRAM } from "@/lib/site";
import { MessageCircle, Mail, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Beelove Farm" },
      {
        name: "description",
        content:
          "Get in touch with Beelove Farm — WhatsApp, email, and farm visit details. Serving customers worldwide.",
      },
      { property: "og:title", content: "Contact Beelove Farm" },
      {
        property: "og:description",
        content: "Reach Beelove Farm via WhatsApp, email or visit our farm.",
      },
      { property: "og:url", content: "https://beelovefarm.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://beelovefarm.lovable.app/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Beelove Farm",
          description:
            "Climate-smart beekeeping and aquaculture — raw honey, hives, beekeeping equipment, fingerlings, Azolla feed and farmer training.",
          url: "https://beelovefarm.lovable.app/contact",
          telephone: "+254729396897",
          address: { "@type": "PostalAddress", addressLocality: "Kiunduani", addressCountry: "KE" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { q: "Do you ship internationally?", a: "Yes — we ship honey and small equipment worldwide via courier. Live fingerlings are available for pickup at our farm or regional delivery; please WhatsApp us to coordinate." },
            { q: "What is the minimum order for fingerlings?", a: "Minimum order is 100 fingerlings. We recommend starting with at least 200 for a productive harvest cycle. Larger orders (500+) attract a discount — ask us for bulk pricing." },
            { q: "How do I pay for orders?", a: "We accept M-Pesa (Till or send money), bank transfer, and cash on collection. Payment details are shared via WhatsApp when you confirm your order." },
            { q: "Can I visit the farm before buying?", a: "Absolutely — visits are welcome by appointment. WhatsApp us to arrange a convenient time. It's also a great way to see the hives and ask questions in person." },
            { q: "Do you offer after-sale support for beekeeping?", a: "Yes. All equipment buyers and training graduates are added to our alumni WhatsApp group where our team answers questions, shares seasonal tips, and alerts the group to pest outbreaks." },
            { q: "Are your honey jars labelled for resale?", a: "Our standard jars carry the Beelove Farm label. If you're a reseller and want unbranded or white-label jars, WhatsApp us to discuss wholesale arrangements." },
          ].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
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
            <div className="font-display text-2xl mb-1">Kiunduani, Kenya</div>
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
              (M-Pesa Till), and organise pickup or worldwide delivery.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK ORDERS */}
      <section className="bg-honey/20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">Quick Orders</span>
            <h2 className="font-display text-3xl md:text-4xl mt-2 mb-3">What Would You Like to Order?</h2>
            <p className="text-sm text-umber/70">Tap to open a pre-filled WhatsApp message — just hit send.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🍯", label: "Order Raw Honey", msg: "Hello Beelove Farm, I'd like to order raw honey. Please share availability and pricing." },
              { emoji: "🐟", label: "Order Fingerlings", msg: "Hello Beelove Farm, I'd like to order catfish fingerlings. Please share availability and current pricing." },
              { emoji: "🪵", label: "Order Equipment", msg: "Hello Beelove Farm, I'd like to order beekeeping equipment. Please share your current stock and prices." },
              { emoji: "🎓", label: "Book a Training", msg: "Hello Beelove Farm, I'd like to book a training program. Please share the upcoming schedule." },
            ].map((q) => (
              <a
                key={q.label}
                href={wa(q.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card ring-1 ring-umber/10 rounded-[20px] p-6 text-center hover:-translate-y-0.5 hover:ring-amber transition-all"
              >
                <span className="text-4xl block mb-3">{q.emoji}</span>
                <span className="text-sm font-semibold">{q.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">❓ FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { q: "Do you ship internationally?", a: "Yes — we ship honey and small equipment worldwide via courier. Live fingerlings are available for pickup at our farm or regional delivery; please WhatsApp us to coordinate." },
              { q: "What is the minimum order for fingerlings?", a: "Minimum order is 100 fingerlings. We recommend starting with at least 200 for a productive harvest cycle. Larger orders (500+) attract a discount — ask us for bulk pricing." },
              { q: "How do I pay for orders?", a: "We accept M-Pesa (Till or send money), bank transfer, and cash on collection. Payment details are shared via WhatsApp when you confirm your order." },
              { q: "Can I visit the farm before buying?", a: "Absolutely — visits are welcome by appointment. WhatsApp us to arrange a convenient time. It's also a great way to see the hives and ask questions in person." },
              { q: "Do you offer after-sale support for beekeeping?", a: "Yes. All equipment buyers and training graduates are added to our alumni WhatsApp group where our team answers questions, shares seasonal tips, and alerts the group to pest outbreaks." },
              { q: "Are your honey jars labelled for resale?", a: "Our standard jars carry the Beelove Farm label. If you're a reseller and want unbranded or white-label jars, WhatsApp us to discuss wholesale arrangements." },
            ].map((f) => (
              <div key={f.q} className="bg-card ring-1 ring-umber/10 rounded-[20px] p-6">
                <strong className="block font-display text-lg mb-2">{f.q}</strong>
                <p className="text-sm text-umber/75 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber text-cream py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-3">Still Have Questions?</h2>
          <p className="text-cream/90 mb-6">We reply fast — usually within a few hours on WhatsApp.</p>
          <a
            href={wa("Hello Beelove Farm, I'd like to make an enquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-cream text-umber text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-honey transition-colors"
          >
            💬 Chat with Us Now
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
