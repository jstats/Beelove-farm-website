import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Smartphone } from "lucide-react";
import { NAV_LINKS, wa, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

function isAnchorLink(to: string): boolean {
  return to.startsWith("http") || to.endsWith(".html");
}


export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenGroup(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-umber/10">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <Link
          to="/"
          className="font-display text-2xl text-umber tracking-tight hover:text-amber transition-colors inline-flex items-center gap-2"
        >
          <img
            src="/images/beelove-logo.png"
            alt="BeeLove Farm logo"
            width={40}
            height={40}
            className="size-10 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span>BeeLove Farm</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <div className="pb-2 border-b border-umber/10">
            <a
              href="/#mobile-app"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full bg-[#164936] text-[#A3E7C1] font-bold text-sm py-2.5 rounded-xl shadow-sm"
            >
              <Smartphone className="size-4 text-honey" />
              <span>BeeLove Farmer App v1.2</span>
            </a>
          </div>
          {NAV_LINKS.map((item) =>
            item.children ? (
              <DesktopDropdown
                key={item.label}
                item={item}
                isOpen={openGroup === item.label}
                onToggle={() =>
                  setOpenGroup((g) => (g === item.label ? null : item.label))
                }
                onClose={() => setOpenGroup(null)}
              />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-umber/80 hover:text-amber transition-colors"
                activeProps={{ className: "text-amber" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="/#mobile-app"
            className="inline-flex items-center gap-1.5 bg-[#164936] text-[#A3E7C1] text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-full ring-1 ring-[#164936] hover:bg-[#1E5D45] transition-all shadow-sm"
          >
            <Smartphone className="size-3.5 text-honey" />
            <span>App v1.2</span>
          </a>
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
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 text-umber"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden border-t border-umber/10 overflow-hidden transition-[max-height] duration-300",
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-1 text-sm font-medium">
          <div className="pb-2 border-b border-umber/10">
            <a
              href="/#mobile-app"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full bg-[#164936] text-[#A3E7C1] font-bold text-sm py-2.5 rounded-xl shadow-sm"
            >
              <Smartphone className="size-4 text-honey" />
              <span>BeeLove Farmer App v1.2</span>
            </a>
          </div>
          {NAV_LINKS.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-umber/5 last:border-0 py-1">
                <button
                  onClick={() =>
                    setMobileExpanded((g) => (g === item.label ? null : item.label))
                  }
                  className="w-full flex items-center justify-between py-2 text-umber/85 hover:text-amber"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      mobileExpanded === item.label && "rotate-180"
                    )}
                  />
                </button>
                {mobileExpanded === item.label && (
                  <div className="pl-3 pb-2 flex flex-col gap-1">
                    {item.children.map((c) =>
                      isAnchorLink(c.to) ? (
                        <a
                          key={c.to}
                          href={c.to}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileExpanded(null);
                          }}
                          className="py-1.5 text-[13px] text-umber/70 hover:text-amber"
                        >
                          {c.label}
                        </a>
                      ) : (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileExpanded(null);
                          }}
                          className="py-1.5 text-[13px] text-umber/70 hover:text-amber"
                        >
                          {c.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-umber/85 hover:text-amber border-b border-umber/5 last:border-0"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

function DesktopDropdown({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Open on hover (desktop pattern), close on mouse leave
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => !isOpen && onToggle()}
      onMouseLeave={() => isOpen && onClose()}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 text-umber/80 hover:text-amber transition-colors",
          isOpen && "text-amber"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && item.children && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[320px]"
          role="menu"
        >
          <div className="bg-cream rounded-2xl ring-1 ring-umber/10 shadow-[0_12px_40px_-12px_rgba(61,40,23,0.25)] p-2 overflow-hidden">
            {item.children.map((c) =>
              isAnchorLink(c.to) ? (
                <a
                  key={c.to}
                  href={c.to}
                  onClick={onClose}
                  role="menuitem"
                  className="block px-4 py-3 rounded-xl hover:bg-olive/10 transition-colors group/item"
                >
                  <div className="text-sm font-semibold text-umber group-hover/item:text-olive transition-colors">
                    {c.label}
                  </div>
                  <div className="text-xs text-umber/65 mt-0.5 leading-snug">
                    {c.desc}
                  </div>
                </a>
              ) : (
                <Link
                  key={c.to}
                  to={c.to}
                  onClick={onClose}
                  role="menuitem"
                  className="block px-4 py-3 rounded-xl hover:bg-olive/10 transition-colors group/item"
                  activeProps={{ className: "bg-olive/10" }}
                >
                  <div className="text-sm font-semibold text-umber group-hover/item:text-olive transition-colors">
                    {c.label}
                  </div>
                  <div className="text-xs text-umber/65 mt-0.5 leading-snug">
                    {c.desc}
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
