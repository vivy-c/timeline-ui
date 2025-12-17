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
    <aside className="hidden w-[290px] shrink-0 lg:block">
      <div className="sticky top-[86px]">
        <Card className="p-5">
          <div className="text-xl font-semibold tracking-tight">Universes</div>

          <div className="mt-4 max-h-[calc(100vh-190px)] space-y-2 overflow-auto pr-1">
            {universes.map((u) => {
              const selected = u.id === selectedId;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => onSelect?.(u.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-1.5 text-left",
                    "transition-colors",
                    selected ? "bg-white/5" : "hover:bg-white/5",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold",
                      "ring-1",
                      selected
                        ? "bg-cyan-300/15 text-cyan-100 ring-cyan-200/25"
                        : "bg-white/5 text-white/80 ring-white/10",
                    )}
                  >
                    #{u.hashtag}
                  </span>
                  <span className="whitespace-nowrap text-xs text-white/40">
                    {formatCompactNumber(u.souls)} souls
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </aside>
  );
}

