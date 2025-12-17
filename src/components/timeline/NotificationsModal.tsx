import { useEffect, useState } from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { NotificationItem } from "@/types/notifications";

type NotificationsModalProps = {
  open: boolean;
};

const EXIT_ANIMATION_MS = 200;

export function NotificationsModal({ open }: NotificationsModalProps) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [mounted, setMounted] = useState(open);
  const [animationState, setAnimationState] = useState<
    "entering" | "open" | "exiting"
  >(open ? "open" : "exiting");

  useEffect(() => {
    if (open) {
      setMounted(true);
      setAnimationState("entering");
      const raf = window.requestAnimationFrame(() => {
        setAnimationState("open");
      });
      return () => window.cancelAnimationFrame(raf);
    }

    if (!mounted) return;
    setAnimationState("exiting");
    const timeout = window.setTimeout(
      () => setMounted(false),
      EXIT_ANIMATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/notifications");
        const data = (await res.json()) as { items: NotificationItem[] };
        if (!cancelled) setItems(data.items ?? []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <Card
      id="notifications-modal"
      role="dialog"
      aria-labelledby="notifications-title"
      className={cn(
        "absolute right-0 top-full mt-4 z-[60]",
        "w-[min(92vw,26rem)]",
        "h-[calc(100vh-6rem)]",
        "overflow-hidden",
        "rounded-[44px] !bg-black",
        "transition-[transform,opacity] duration-200 ease-out",
        animationState === "open"
          ? "translate-x-0 opacity-100"
          : animationState === "entering"
            ? "pointer-events-none translate-x-12 opacity-0"
            : "pointer-events-none -translate-x-12 opacity-0",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="px-8 pb-6 pt-8">
          <h2
            id="notifications-title"
            className="text-2xl font-extrabold tracking-tight"
          >
            Notifications
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {loading ? (
            <div className="px-2 py-6 text-sm text-white/50">Loading…</div>
          ) : items.length ? (
            <div className="space-y-3">
              {items.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "relative flex items-start gap-3 rounded-3xl p-4",
                    "bg-white/5 ring-1 ring-white/10",
                    "hover:bg-white/10",
                  )}
                >
                  {n.unread ? (
                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
                  ) : null}

                  <Avatar
                    src={n.actor.avatarUrl}
                    alt={n.actor.name}
                    size={40}
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-white/85">
                      {n.actor.name}
                    </div>
                    <div className="mt-0.5 text-sm text-white/60">
                      {n.message}
                    </div>
                  </div>
                  <div className="shrink-0 pt-0.5 text-xs text-white/40">
                    {n.timeLabel}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-2 py-8 text-sm text-white/55">
              No notifications yet.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
