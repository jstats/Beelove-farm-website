import { cn } from "@/lib/utils";

type Tone = "amber" | "honey" | "umber" | "teal" | "cream";

const TONES: Record<Tone, string> = {
  amber: "bg-amber/15 text-amber",
  honey: "bg-honey/20 text-umber",
  umber: "bg-umber/10 text-umber",
  teal: "bg-teal/10 text-teal",
  cream: "bg-cream text-umber/60 ring-1 ring-umber/10",
};

export function Placeholder({
  label,
  tone = "umber",
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "w-full h-full grid place-items-center text-center px-4",
        TONES[tone],
        className
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}
