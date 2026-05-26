import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, wa } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-umber/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl text-umber tracking-tight hover:text-amber transition-colors"
        >
          Beelove Farm
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium uppercase tracking-wider">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-umber/80 hover:text-amber transition-colors"
              activeProps={{ className: "text-amber" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href={wa("Hello Beelove Farm, I'd like to make an enquiry.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-amber text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full ring-1 ring-amber hover:bg-umber hover:ring-umber transition-colors"
        >
          <span className="size-1.5 rounded-full bg-cream" />
          Order via WhatsApp
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 text-umber"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-umber/10 overflow-hidden transition-[max-height]",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium uppercase tracking-wider">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-umber/80 hover:text-amber"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
