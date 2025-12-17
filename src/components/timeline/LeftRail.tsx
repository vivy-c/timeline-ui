import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

import { cn } from "@/lib/cn";

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
  href?: string;
};

const items: NavItem[] = [
  { label: "Home", icon: IconPlanet, href: "/" },
  { label: "Match", icon: IconHeart, href: "#" },
  { label: "Messages", icon: IconMessage, href: "#" },
  { label: "Profile", icon: IconUser, href: "/profile" },
  { label: "Personality Database", icon: IconBook, href: "#" },
  { label: "Personality Tests", icon: IconClipboard, href: "#" },
  { label: "Resources", icon: IconCompass, href: "#" },
];

type LeftRailProps = {
  collapsed: boolean;
  activeLabel?: string;
};

export function LeftRail({ collapsed, activeLabel = "Home" }: LeftRailProps) {
  return (
    <aside
      id="primary-sidebar"
      className={cn(
        "hidden h-full min-h-0 shrink-0 xl:block",
        "transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-[230px]",
      )}
    >
      <div className="flex h-full min-h-0 flex-col justify-between">
        <nav className="mt-2 space-y-1">
          {items.map((item) => {
            const active = item.label === activeLabel;
            return (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                aria-label={item.label}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center rounded-xl py-2.5",
                  "text-sm font-semibold",
                  collapsed ? "justify-center px-2" : "gap-3 px-3",
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
                <span className={cn("truncate", collapsed && "hidden")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="pb-8">
          <div
            className={cn(
              "flex gap-2",
              collapsed
                ? "flex-col items-center justify-center px-0"
                : "flex-row items-center px-3",
            )}
          >
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
                collapsed && "hidden",
              )}
            >
              English
            </button>
          </div>

          {collapsed ? null : (
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
          )}
        </div>
      </div>
    </aside>
  );
}
