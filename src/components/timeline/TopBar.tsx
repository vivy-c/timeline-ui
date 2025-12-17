import { useState } from "react";

import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import type { HomePayload } from "@/types/home";

import { NotificationsModal } from "./NotificationsModal";
import {
  IconBell,
  IconChevronDown,
  IconHamburger,
  IconSearch,
} from "./icons";

type TopBarProps = {
  viewer: HomePayload["viewer"];
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export function TopBar({
  viewer,
  sidebarCollapsed,
  onToggleSidebar,
}: TopBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3">
          <IconButton
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-controls="primary-sidebar"
            aria-pressed={sidebarCollapsed}
            variant="ghost"
            className="h-10 w-10"
            onClick={onToggleSidebar}
          >
            <IconHamburger className="h-5 w-5" />
          </IconButton>

          <div className="flex items-center gap-3">
            <div className="text-xl font-extrabold tracking-tight">BOO</div>
          </div>

          <div className="relative hidden flex-1 md:block">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
              placeholder="Search"
              className={cn(
                "h-11 w-full rounded-full bg-white/5 pl-12 pr-4",
                "ring-1 ring-white/10",
                "text-sm text-white placeholder:text-white/45",
                "focus:outline-none focus:ring-2 focus:ring-cyan-300/60",
              )}
            />
          </div>

          <div className="relative ml-auto flex items-center gap-3">
            <IconButton
              aria-label="Notifications"
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
              aria-controls="notifications-modal"
              variant="ghost"
              className={cn(
                "h-10 w-10 bg-transparent hover:bg-transparent",
                notificationsOpen ? "!text-cyan-300 hover:!text-cyan-200" : null,
              )}
              onClick={() => setNotificationsOpen((v) => !v)}
            >
              <IconBell className="h-5 w-5" filled={notificationsOpen} />
            </IconButton>

            <div className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-2 ring-1 ring-white/10 sm:flex">
              <span className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-200 to-yellow-500 shadow-[0_0_18px_rgba(250,204,21,0.35)]" />
              <span className="text-sm font-semibold">{viewer.coinBalance}</span>
            </div>

            <button
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-full bg-white/5 p-1.5 pr-3",
                "ring-1 ring-white/10 transition-colors hover:bg-white/10",
              )}
            >
              <div className="relative">
                <Avatar
                  src={viewer.avatarUrl}
                  alt={viewer.displayName}
                  size={32}
                />
                <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-black ring-1 ring-white/10">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-300 text-[10px] font-extrabold text-black">
                    {viewer.streakLabel}
                  </span>
                </span>
              </div>
              <span className="hidden text-sm font-semibold md:block">
                {viewer.displayName}
              </span>
              <IconChevronDown className="hidden h-4 w-4 text-white/60 md:block" />
            </button>

            <NotificationsModal open={notificationsOpen} />
          </div>
        </div>
      </header>
    </>
  );
}
