import { cn } from "@/lib/cn";
import type { UserBadge } from "@/types/home";

const variantClasses: Record<UserBadge["variant"], string> = {
  cyan: "bg-cyan-300/20 text-cyan-200 ring-cyan-200/20",
  pink: "bg-rose-400/20 text-rose-200 ring-rose-200/20",
  amber: "bg-amber-300/20 text-amber-200 ring-amber-200/20",
  slate: "bg-white/10 text-white/80 ring-white/10",
};

export function Badge({ badge }: { badge: UserBadge }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        "ring-1",
        variantClasses[badge.variant],
      )}
    >
      {badge.label}
    </span>
  );
}

