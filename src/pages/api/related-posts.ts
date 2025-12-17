import type { NextApiRequest, NextApiResponse } from "next";

import { getMockRelatedPosts } from "@/server/mock/home";
import type { QuestionCard } from "@/types/home";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<QuestionCard[]>,
) {
  res.status(200).json(getMockRelatedPosts());
}

