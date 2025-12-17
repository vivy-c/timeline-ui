import type { NextApiRequest, NextApiResponse } from "next";

import { getMockUniverses } from "@/server/mock/home";
import type { Universe } from "@/types/home";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Universe[]>,
) {
  res.status(200).json(getMockUniverses());
}

