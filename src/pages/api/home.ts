import type { NextApiRequest, NextApiResponse } from "next";

import { getMockHomePayload } from "@/server/mock/home";
import type { HomePayload } from "@/types/home";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HomePayload>,
) {
  res.status(200).json(getMockHomePayload());
}

