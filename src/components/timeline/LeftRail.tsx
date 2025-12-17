import { cn } from "@/lib/cn";
import type { ReactNode, SVGProps } from "react";

import {
  IconApple,
  IconBook,
  IconClipboard,
  IconCompass,
  IconHeart,
  IconMessage,
  IconPlanet,
  IconPlayStore,
  IconUser,
} from "./icons";

type NavItem = {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  active?: boolean;
};

const items: NavItem[] = [
  { label: "Home", icon: IconPlanet, active: true },
  { label: "Match", icon: IconHeart },
  { label: "Messages", icon: IconMessage },
  { label: "Profile", icon: IconUser },
  { label: "Personality Database", icon: IconBook },
  { label: "Personality Tests", icon: IconClipboard },
  { label: "Resources", icon: IconCompass },
];

export function LeftRail() {
  return (
    <aside className="hidden w-[230px] shrink-0 xl:block">
      <div className="sticky top-[86px] flex h-[calc(100vh-86px)] flex-col justify-between">
        <nav className="mt-2 space-y-1">
          {items.map((item) => {
            const active = Boolean(item.active);
            return (
              <a
                key={item.label}
                href="#"
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5",
                  "text-sm font-semibold",
                  active
                    ? "text-cyan-200"
                    : "text-white/80 hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full ring-1",
                    active
                      ? "bg-cyan-300/10 text-cyan-200 ring-cyan-200/20 shadow-[0_0_18px_rgba(34,211,238,0.15)]"
                      : "bg-white/5 text-white/70 ring-white/10 group-hover:text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="pb-8">
          <div className="flex items-center gap-2 px-3">
            <button
              type="button"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full bg-white/5",
                "text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white",
              )}
              aria-label="Get it on Google Play"
            >
              <IconPlayStore className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full bg-white/5",
                "text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white",
              )}
              aria-label="Download on the App Store"
            >
              <IconApple className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={cn(
                "ml-auto rounded-full bg-white/5 px-3 py-2 text-xs font-semibold",
                "text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white",
              )}
            >
              English
            </button>
          </div>

          <div className="mt-6 px-3 text-xs text-white/40">
            <div>We stand for love.</div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              <a href="#" className="hover:text-white/70">
                Terms
              </a>
              <a href="#" className="hover:text-white/70">
                Privacy
              </a>
              <a href="#" className="hover:text-white/70">
                FAQ
              </a>
              <a href="#" className="hover:text-white/70">
                Safety Tips
              </a>
            </div>
            <div className="mt-3">© {new Date().getFullYear()} Boo</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
