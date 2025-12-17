import { useEffect, useMemo, useState } from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { clamp01, formatCountdown } from "@/lib/format";
import type { Promo, QuestionCard as QuestionCardType } from "@/types/home";

import { IconGhost, IconHeart, IconMessage, IconShare } from "./icons";

type RightColumnProps = {
  promo: Promo;
  relatedPosts: QuestionCardType[];
};

export function RightColumn({ promo, relatedPosts }: RightColumnProps) {
  return (
    <aside className="hidden h-full min-h-0 w-[420px] shrink-0 2xl:block">
      <div className="space-y-6">
        <PromoCard promo={promo} />
        <RelatedPosts cards={relatedPosts} />
      </div>
    </aside>
  );
}

function PromoCard({ promo }: { promo: Promo }) {
  const endsAt = useMemo(() => new Date(promo.countdownEndsAt).getTime(), [promo]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = endsAt - now;
  const countdown = formatCountdown(remaining);
  const progress = clamp01(promo.progress);

  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute -left-14 top-10 -rotate-45 bg-cyan-300 px-20 py-2 text-sm font-black uppercase tracking-wide text-black shadow-[0_18px_60px_rgba(34,211,238,0.2)]">
        {promo.ribbonLabel}
      </div>

      <div className="flex items-start justify-end">
        <div className="text-3xl font-extrabold tracking-tight text-cyan-200">
          {countdown}
        </div>
      </div>

      <div className="mt-6 grid place-items-center">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-black/70 ring-1 ring-white/10">
          <IconGhost className="h-16 w-16 text-white" />
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="text-xl font-semibold tracking-tight">{promo.title}</div>
        <div className="mt-2 text-sm text-white/60">{promo.subtitle}</div>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="h-3 w-44 rounded-full bg-white/10 ring-1 ring-white/10">
          <div
            className="h-full rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 ring-1 ring-white/10">
          <Avatar src={promo.purchaseToast.avatarUrl} alt="" size={26} />
          <span className="text-sm font-semibold text-white/80">
            {promo.purchaseToast.text}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          "mt-5 w-full rounded-2xl bg-cyan-300 px-4 py-4 text-center",
          "text-sm font-extrabold uppercase tracking-[0.18em] text-black",
          "shadow-[0_24px_90px_rgba(34,211,238,0.22)]",
          "transition-colors hover:bg-cyan-200",
        )}
      >
        {promo.ctaLabel}
      </button>
    </Card>
  );
}

function RelatedPosts({ cards }: { cards: QuestionCardType[] }) {
  return (
    <div>
      <div className="px-1 text-xl font-semibold tracking-tight">Related Posts</div>
      <div className="mt-4 space-y-4">
        {cards.map((card) => (
          <Card key={card.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white/65">
                  {card.label}
                </div>
                <div className="mt-2 text-xl font-semibold leading-snug tracking-tight">
                  {card.question}
                </div>
              </div>
              <div className="shrink-0 pt-1 text-xs text-white/40">
                {card.dateLabel}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <IconHeart className="h-5 w-5" />
                <span className="text-sm">{card.stats.likes}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconMessage className="h-5 w-5" />
                <span className="text-sm">{card.stats.comments}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconShare className="h-5 w-5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
