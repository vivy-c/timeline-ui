import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useCallback, useState } from "react";

import { FeedColumn } from "@/components/timeline/FeedColumn";
import { InfinityModal } from "@/components/timeline/InfinityModal";
import { LeftRail } from "@/components/timeline/LeftRail";
import { RightColumn } from "@/components/timeline/RightColumn";
import { TopBar } from "@/components/timeline/TopBar";
import { UniversesCard } from "@/components/timeline/UniversesCard";
import { cn } from "@/lib/cn";
import { getMockHomePayload } from "@/server/mock/home";
import type { FeedTab, HomePayload } from "@/types/home";

type HomePageProps = {
  initial: HomePayload;
};

export default function HomePage({ initial }: HomePageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUniverseId, setSelectedUniverseId] = useState(
    initial.universes[0]?.id,
  );
  const [tab, setTab] = useState<FeedTab>(initial.feed.defaultTab);
  const [posts, setPosts] = useState(initial.feed.posts);
  const [tabLoading, setTabLoading] = useState(false);
  const [showInfinity, setShowInfinity] = useState(true);

  const handleTabChange = useCallback(
    async (next: FeedTab) => {
      setTab(next);
      setTabLoading(true);
      try {
        const res = await fetch(`/api/feed?tab=${next}`);
        const data = (await res.json()) as { tab: FeedTab; posts: HomePayload["feed"]["posts"] };
        setPosts(data.posts);
      } finally {
        setTabLoading(false);
      }
    },
    [setPosts],
  );

  return (
    <>
      <Head>
        <title>BOO • Home</title>
        <meta
          name="description"
          content="Mock timeline UI (Pages Router) built with Next.js + TailwindCSS."
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
            <LeftRail collapsed={sidebarCollapsed} activeLabel="Home" />
            <UniversesCard
              universes={initial.universes}
              selectedId={selectedUniverseId}
              onSelect={setSelectedUniverseId}
            />
            <FeedColumn
              questionOfDay={initial.questionOfDay}
              tab={tab}
              tabLoading={tabLoading}
              onTabChange={handleTabChange}
              posts={posts}
            />
            <RightColumn
              promo={initial.promo}
              relatedPosts={initial.relatedPosts}
            />
          </main>

          <InfinityModal open={showInfinity} onClose={() => setShowInfinity(false)} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  return { props: { initial: getMockHomePayload() } };
};
