import type { NextApiRequest, NextApiResponse } from "next";

import { getMockFeedPosts } from "@/server/mock/home";
import type { FeedPost, FeedTab } from "@/types/home";

function parseTab(value: unknown): FeedTab {
  return value === "new" ? "new" : "best";
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ tab: FeedTab; posts: FeedPost[] }>,
) {
  const tab = parseTab(req.query.tab);
  const posts = getMockFeedPosts();

  const sorted =
    tab === "new"
      ? [...posts].reverse()
      : [...posts].sort((a, b) => b.stats.likes - a.stats.likes);

  res.status(200).json({ tab, posts: sorted });
}

