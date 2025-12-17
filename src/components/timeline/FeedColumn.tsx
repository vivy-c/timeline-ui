import { useMemo, useState, type ReactNode } from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

import type { FeedPost, FeedTab, QuestionCard as QuestionCardType } from "@/types/home";
import {
  IconArrowLeft,
  IconBookmark,
  IconGif,
  IconHeart,
  IconImage,
  IconMessage,
  IconMore,
  IconSend,
  IconShare,
} from "./icons";

type FeedColumnProps = {
  questionOfDay: QuestionCardType;
  tab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  tabLoading?: boolean;
  posts: FeedPost[];
};

export function FeedColumn({
  questionOfDay,
  posts,
  tab,
  onTabChange,
  tabLoading,
}: FeedColumnProps) {
  const [comment, setComment] = useState("");
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());

  const effectiveStats = useMemo(() => {
    const result = new Map<string, FeedPost["stats"]>();
    for (const post of posts) {
      const liked = likedIds.has(post.id);
      result.set(post.id, {
        ...post.stats,
        likes: post.stats.likes + (liked ? 1 : 0),
      });
    }
    return result;
  }, [posts, likedIds]);

  return (
    <section className="w-full max-w-[660px] flex-1">
      <div className="flex items-center justify-between">
        <IconButton
          aria-label="Back"
          className="h-10 w-10 bg-white/5"
          variant="soft"
        >
          <IconArrowLeft className="h-5 w-5" />
        </IconButton>

        <div className="rounded-full bg-cyan-300/20 px-4 py-1.5 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-200/20">
          #questions
        </div>

        <div className="h-10 w-10" aria-hidden />
      </div>

      <QuestionCard card={questionOfDay} className="mt-4" />

      <ComposerCard
        value={comment}
        onChange={setComment}
        className="mt-5"
      />

      <div className="mt-5 flex items-center justify-center gap-2">
        <TabPill
          active={tab === "best"}
          onClick={() => onTabChange("best")}
        >
          best
        </TabPill>
        <TabPill
          active={tab === "new"}
          onClick={() => onTabChange("new")}
        >
          new
        </TabPill>
        {tabLoading ? (
          <span className="ml-2 text-xs text-white/40">Loading…</span>
        ) : null}
      </div>

      <div className="mt-5 space-y-5">
        {posts.map((post) => {
          const stats = effectiveStats.get(post.id) ?? post.stats;
          const liked = likedIds.has(post.id);
          return (
            <PostCard
              key={post.id}
              post={post}
              liked={liked}
              stats={stats}
              onToggleLike={() => {
                setLikedIds((prev) => {
                  const next = new Set(prev);
                  if (next.has(post.id)) next.delete(post.id);
                  else next.add(post.id);
                  return next;
                });
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

function QuestionCard({
  card,
  className,
}: {
  card: QuestionCardType;
  className?: string;
}) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white/70">{card.label}</div>
          <div className="mt-2 text-2xl font-semibold leading-snug tracking-tight">
            {card.question}
          </div>
        </div>
        <div className="shrink-0 pt-1 text-xs text-white/40">{card.dateLabel}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/55">
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
            <span className="text-sm">{card.stats.shares || ""}</span>
          </span>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-white/35 hover:text-white/60"
        >
          Comment
        </button>
      </div>
    </Card>
  );
}

function ComposerCard({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="text-sm font-semibold text-white/60">Comment</div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-white/60">
          <IconButton aria-label="Add image" className="h-9 w-9">
            <IconImage className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Add GIF" className="h-9 w-9">
            <IconGif className="h-5 w-5" />
          </IconButton>
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a comment..."
          className={cn(
            "h-11 flex-1 rounded-2xl bg-white/5 px-4 text-sm text-white/80",
            "placeholder:text-white/35 ring-1 ring-white/10",
            "focus:outline-none focus:ring-2 focus:ring-cyan-300/60",
          )}
        />

        <IconButton
          aria-label="Send"
          className={cn(
            "h-11 w-11 bg-white/5 text-white/70 ring-1 ring-white/10",
            "hover:bg-cyan-300/15 hover:text-cyan-100 hover:ring-cyan-200/30",
          )}
        >
          <IconSend className="h-5 w-5" />
        </IconButton>
      </div>
    </Card>
  );
}

function TabPill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-wide",
        "ring-1 transition-colors",
        active
          ? "bg-cyan-300 text-black ring-cyan-200/40 shadow-[0_0_22px_rgba(34,211,238,0.22)]"
          : "bg-white/5 text-white/75 ring-white/10 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function PostCard({
  post,
  liked,
  stats,
  onToggleLike,
}: {
  post: FeedPost;
  liked: boolean;
  stats: FeedPost["stats"];
  onToggleLike: () => void;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar src={post.user.avatarUrl} alt={post.user.name} size={44} />
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-semibold">{post.user.name}</span>
                {post.user.verified ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-300 text-[11px] font-black text-black">
                    ✓
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {post.badges.map((b) => (
                  <Badge key={b.id} badge={b} />
                ))}
              </div>
            </div>

            {post.awardLabel ? (
              <div className="mt-2 text-xs text-white/40">
                <span className="mr-2">🏆</span>
                {post.awardLabel}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-white/40">{post.timeAgoLabel}</div>
          <IconButton aria-label="More" variant="ghost" className="h-9 w-9">
            <IconMore className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      <div className="mt-4 text-sm leading-relaxed text-white/85">
        {post.body}
      </div>

      {post.imageUrl ? (
        <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt=""
            className="h-[240px] w-full object-cover"
          />
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/55">
          <button
            type="button"
            onClick={onToggleLike}
            className={cn(
              "inline-flex items-center gap-1.5 transition-colors",
              liked ? "text-rose-200" : "hover:text-white",
            )}
            aria-pressed={liked}
          >
            <IconHeart className="h-5 w-5" />
            <span className="text-sm">{stats.likes}</span>
          </button>

          <span className="inline-flex items-center gap-1.5">
            <IconMessage className="h-5 w-5" />
            <span className="text-sm">{stats.comments}</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <IconShare className="h-5 w-5" />
          </span>

          <span className="inline-flex items-center gap-1.5">
            <IconBookmark className="h-5 w-5" />
          </span>
        </div>

        <button
          type="button"
          className="text-sm font-semibold text-white/35 hover:text-white/60"
        >
          Reply
        </button>
      </div>
    </Card>
  );
}
