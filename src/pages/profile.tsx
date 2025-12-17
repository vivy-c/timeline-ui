import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useState } from "react";

import { LeftRail } from "@/components/timeline/LeftRail";
import { TopBar } from "@/components/timeline/TopBar";
import { IconChevronRight } from "@/components/timeline/icons";
import { cn } from "@/lib/cn";
import { getMockHomePayload } from "@/server/mock/home";
import type { HomePayload } from "@/types/home";

type ProfilePageProps = {
  initial: HomePayload;
};

const lifestyleItems = [
  "Exercise",
  "Education Level",
  "Drinking",
  "Smoking",
  "Kids",
  "Religion",
  "Ethnicity",
];

export default function ProfilePage({ initial }: ProfilePageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <Head>
        <title>BOO • Profile</title>
        <meta
          name="description"
          content="Profile setup page inspired by Boo."
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

            <section className="flex-1 min-h-0 overflow-y-auto rounded-[36px] bg-black/60 px-8 py-10 ring-1 ring-white/5 shadow-[0_28px_90px_rgba(0,0,0,0.75)]">
              <div className="max-w-4xl">
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Lifestyle
                </h1>

                <div className="mt-8 divide-y divide-white/10">
                  {lifestyleItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between py-5 text-lg font-semibold text-white"
                    >
                      <span>{item}</span>
                      <IconChevronRight className="h-5 w-5 text-white/70" />
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    className={cn(
                      "rounded-full bg-cyan-300 px-8 py-3 text-sm font-extrabold uppercase",
                      "tracking-[0.18em] text-black shadow-[0_20px_70px_rgba(34,211,238,0.28)]",
                      "transition-colors hover:bg-cyan-200",
                    )}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async () => {
  return { props: { initial: getMockHomePayload() } };
};
