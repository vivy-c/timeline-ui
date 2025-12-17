import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatCompactNumber } from "@/lib/format";
import type { Universe } from "@/types/home";

type UniversesCardProps = {
  universes: Universe[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

export function UniversesCard({
  universes,
  selectedId,
  onSelect,
}: UniversesCardProps) {
  return (
    <aside className="hidden h-full min-h-0 w-[290px] shrink-0 lg:block">
      <Card className="flex h-full flex-col p-5">
        <div className="text-xl font-semibold tracking-tight">Universes</div>

        <div className="mt-4 space-y-2">
          {universes.map((u) => {
            const selected = u.id === selectedId;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => onSelect?.(u.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-1 text-left",
                  "transition-colors",
                  selected ? "bg-white/5" : "hover:bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-semibold",
                    "ring-1",
                    selected
                      ? "bg-cyan-300/15 text-cyan-100 ring-cyan-200/25"
                      : "bg-white/5 text-white/80 ring-white/10",
                  )}
                >
                  #{u.hashtag}
                </span>
                <span className="whitespace-nowrap text-[11px] text-white/40">
                  {formatCompactNumber(u.souls)} souls
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </aside>
  );
}
