import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useState, type ReactNode, type SVGProps } from "react";

import { LeftRail } from "@/components/timeline/LeftRail";
import { TopBar } from "@/components/timeline/TopBar";
import {
  IconChevronRight,
  IconCoin,
  IconExternalLink,
  IconLightning,
  IconUser,
} from "@/components/timeline/icons";
import { cn } from "@/lib/cn";
import { getMockHomePayload } from "@/server/mock/home";
import type { HomePayload } from "@/types/home";

type SettingsPageProps = {
  initial: HomePayload;
};

type SettingsLinkItem = {
  title: string;
  description?: string;
  icon?: (props: SVGProps<SVGSVGElement>) => ReactNode;
  href?: string;
  external?: boolean;
  toggle?: false;
};

type SettingsToggleItem = {
  title: string;
  toggle: true;
};

type SettingsItem = SettingsLinkItem | SettingsToggleItem;

const profileSection: { title: string; items: SettingsItem[] } = {
  title: "Profile",
  items: [
    {
      title: "Manage Profile",
      description: "Manage your profile settings.",
      icon: IconUser,
      href: "#",
    },
  ],
};

const usageSection: { title: string; items: SettingsItem[] } = {
  title: "How you use Boo",
  items: [
    { title: "Power Ups", icon: IconLightning, href: "#" },
    { title: "My Coins", icon: IconCoin, href: "#" },
  ],
};

const generalSection: { title: string; items: SettingsItem[] } = {
  title: "General",
  items: [
    { title: "Use Metric System", toggle: true },
    { title: "My Account", href: "#" },
    { title: "Cookie Settings", href: "#", external: true },
    { title: "Cookie Policy", href: "#", external: true },
    { title: "Take Survey", href: "#", external: true },
    { title: "FAQ", href: "#", external: true },
    { title: "Safety Tips", href: "#", external: true },
    { title: "Privacy Policy", href: "#", external: true },
    { title: "Terms and Conditions", href: "#", external: true },
  ],
};

function isToggleItem(item: SettingsItem): item is SettingsToggleItem {
  return "toggle" in item && item.toggle === true;
}

export default function SettingsPage({ initial }: SettingsPageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [metricEnabled, setMetricEnabled] = useState(false);

  const sections = [profileSection, usageSection, generalSection];

  return (
    <>
      <Head>
        <title>BOO • Settings</title>
        <meta
          name="description"
          content="Profile settings page inspired by Boo."
        />
      </Head>

      <div className="relative h-screen overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(34,211,238,0.14),transparent_60%),radial-gradient(60%_50%_at_80%_30%,rgba(167,139,250,0.12),transparent_60%),radial-gradient(60%_60%_at_10%_40%,rgba(251,113,133,0.08),transparent_65%)]",
          )}
          aria-hidden
        />

        <div className="relative flex h-full min-h-0 flex-col">
          <TopBar
            viewer={initial.viewer}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
          />

          <main className="relative mx-auto flex w-full max-w-[1600px] flex-1 min-h-0 gap-6 overflow-hidden px-4 py-6">
            <LeftRail collapsed={sidebarCollapsed} activeLabel="Profile" />

            <section className="flex-1 min-h-0 overflow-y-auto pb-16 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="w-full max-w-[760px] mr-auto">
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Settings
                </h1>

                <div className="mt-8 space-y-8">
                  {sections.map((section) => (
                    <div
                      key={section.title}
                      className={cn(
                        "rounded-[32px] bg-black/75 p-7 backdrop-blur-xl",
                        "ring-1 ring-white/8",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),_0_0_42px_rgba(0,0,0,0.82),_0_0_26px_rgba(34,211,238,0.08)]",
                      )}
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/75">
                        {section.title}
                      </div>

                      <div className="mt-5 divide-y divide-white/8">
                        {section.items.map((item) => {
                          if (isToggleItem(item)) {
                            return (
                              <div
                                key={item.title}
                                className="flex items-center justify-between py-4 text-base font-medium text-white"
                              >
                                <span>{item.title}</span>
                                <button
                                  type="button"
                                  aria-pressed={metricEnabled}
                                  onClick={() =>
                                    setMetricEnabled((prev) => !prev)
                                  }
                                  className={cn(
                                    "flex h-7 w-12 items-center rounded-full px-1 transition-colors",
                                    metricEnabled
                                      ? "bg-cyan-300/80 ring-1 ring-cyan-200/60"
                                      : "bg-white/10 ring-1 ring-white/15",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "h-5 w-5 rounded-full bg-black transition-transform",
                                      metricEnabled
                                        ? "translate-x-5 shadow-[0_0_0_2px_rgba(34,211,238,0.65)]"
                                        : "translate-x-0 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]",
                                    )}
                                  />
                                </button>
                              </div>
                            );
                          }

                          const linkItem = item as SettingsLinkItem;
                          return (
                            <div
                              key={item.title}
                              className="flex items-center justify-between gap-4 py-4"
                            >
                              <div className="flex items-center gap-3">
                                {linkItem.icon ? (
                                  <linkItem.icon className="h-4 w-4 text-white/70" />
                                ) : null}
                                <div>
                                  <div className="text-base font-medium text-white">
                                    {linkItem.title}
                                  </div>
                                  {linkItem.description ? (
                                    <div className="text-sm text-white/55">
                                      {linkItem.description}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {linkItem.external ? (
                                <IconExternalLink className="h-4 w-4 text-white/60" />
                              ) : (
                                <IconChevronRight className="h-4 w-4 text-white/60" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SettingsPageProps> = async () => {
  return { props: { initial: getMockHomePayload() } };
};
