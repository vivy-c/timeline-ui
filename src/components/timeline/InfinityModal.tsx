import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";

import { IconClose, IconGhost } from "./icons";

type InfinityModalProps = {
  open: boolean;
  onClose: () => void;
};

const plans = [
  {
    label: "12 months",
    price: "Rp 65,000",
    sub: "Keep 46%",
    perMonth: "Rp 5,416.67/mo",
    highlight: "glow",
  },
  {
    label: "1 month",
    price: "Rp 10,000",
    sub: "",
    perMonth: "Rp 10,000.00/mo",
  },
  {
    label: "3 months",
    price: "Rp 20,000",
    sub: "Keep 33%",
    perMonth: "Rp 6,666.67/mo",
    badge: "Most Popular",
  },
  {
    label: "6 months",
    price: "Rp 35,000",
    sub: "Keep 42%",
    perMonth: "Rp 5,833.33/mo",
  },
  {
    label: "∞ lifetime",
    price: "Rp 174,572",
    sub: "No subscription",
    badge: "Best Value",
  },
];

export function InfinityModal({ open, onClose }: InfinityModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div
        className={cn(
          "relative w-full max-w-3xl overflow-hidden rounded-[32px]",
          "bg-gradient-to-b from-black/95 to-black",
          "shadow-[0_40px_140px_rgba(0,0,0,0.75)] ring-1 ring-white/10",
        )}
      >
        <div className="absolute left-4 top-4 z-10">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="relative px-8 pt-7 pb-6">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 ring-1 ring-white/10 shadow-[0_0_22px_rgba(0,0,0,0.35)]">
              <Avatar alt="Recent purchaser" size={26} />
              <span className="text-xs font-semibold text-white/80">
                just purchased
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="text-2xl font-extrabold tracking-tight text-white">
              BOO
            </div>
            <div className="text-xl font-extrabold tracking-tight text-cyan-300">
              INFINITY
            </div>
            <div className="mt-3 text-sm text-white/75">
              Find your best match faster.
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <div className="rounded-full bg-cyan-300/20 px-5 py-1.5 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-200/30 shadow-[0_10px_30px_rgba(34,211,238,0.22)]">
              Here&apos;s Why 4,559,417+ Souls Upgraded to Infinity
            </div>
          </div>

          <div className="mt-6 grid place-items-center">
            <div className="grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-black to-cyan-900/30 ring-1 ring-cyan-300/30 shadow-[0_0_32px_rgba(34,211,238,0.22)]">
              <IconGhost className="h-20 w-20 text-cyan-200" />
            </div>
          </div>

          <div className="mt-7 text-center">
            <div className="text-xl font-extrabold text-white">Ninja Mode</div>
            <div className="mt-2 text-sm text-white/70">
              Mask your location with Spirit Realm, conceal your message read status, and hide your profile views.
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-white/10">
              <div className="h-full w-10 rounded-full bg-cyan-300" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {plans.map((plan) => (
              <div
                key={plan.label}
                className={cn(
                  "flex h-full flex-col items-center justify-between rounded-3xl px-3.5 py-4 text-center",
                  "bg-black/70 ring-1 ring-white/8",
                  plan.highlight === "glow"
                    ? "shadow-[0_0_32px_rgba(34,211,238,0.38)] ring-cyan-200/40"
                    : "shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
                )}
              >
                {plan.badge ? (
                  <div className="mb-2 rounded-full bg-cyan-300/20 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-200">
                    {plan.badge}
                  </div>
                ) : (
                  <div className="mb-4 h-2" />
                )}
                <div className="text-sm font-semibold text-white/85">
                  {plan.label}
                </div>
                <div className="mt-2 text-base font-extrabold text-white">
                  {plan.price}
                </div>
                {plan.sub ? (
                  <div className="mt-1 text-[11px] font-semibold text-cyan-200">
                    {plan.sub}
                  </div>
                ) : (
                  <div className="mt-1 h-4" />
                )}
                <div className="mt-2 text-[11px] text-white/60">
                  {plan.perMonth}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              className="rounded-full bg-black/60 px-6 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-white ring-1 ring-white/15 transition hover:bg-black/50"
            >
              Compare
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>What&apos;s Included</span>
              <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                <span>Free</span>
                <span className="text-cyan-200">Boo Infinity</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-cyan-300 px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-black shadow-[0_18px_70px_rgba(34,211,238,0.3)] transition hover:bg-cyan-200"
            >
              Continue
            </button>
            <button
              type="button"
              className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
