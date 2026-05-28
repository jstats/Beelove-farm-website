import { Link } from "@tanstack/react-router";
import { EMAIL, INSTAGRAM, wa } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-umber text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2 max-w-sm">
          <div className="font-display text-3xl text-cream mb-4">Beelove Farm</div>
          <p className="text-sm leading-relaxed mb-6">
            Climate-smart beekeeping and aquaculture — premium honey,
            healthy fingerlings, and the training to farm well, delivered
            worldwide.
          </p>
          <a
            href={wa("Hello Beelove Farm, I'd like to make an enquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber text-cream px-5 py-3 rounded-full text-sm font-semibold hover:bg-honey hover:text-umber transition-colors"
          >
            Chat with our farm lead
          </a>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-cream mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-amber">About</Link></li>
            <li><Link to="/shop/beekeeping" className="hover:text-amber">Shop Beekeeping</Link></li>
            <li><Link to="/shop/fish" className="hover:text-amber">Shop Fish Products</Link></li>
            <li><Link to="/training/beekeeping" className="hover:text-amber">Beekeeping Training</Link></li>
            <li><Link to="/training/fish" className="hover:text-amber">Fish Farming Training</Link></li>
            <li><Link to="/journal" className="hover:text-amber">Field Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-cream mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Kiunduani, Kenya · Shipping worldwide</li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-amber break-all">
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber"
              >
                @{INSTAGRAM}
              </a>
            </li>
            <li>
              <a
                href={wa("Hello Beelove Farm, I'd like to make an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber"
              >
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/50">
          <span>© {new Date().getFullYear()} Beelove Farm</span>
          <span>Serving farmers worldwide</span>
        </div>
      </div>
    </footer>
  );
}
