import type { NextApiRequest, NextApiResponse } from "next";

import { getMockNotifications } from "@/server/mock/notifications";
import type { NotificationItem } from "@/types/notifications";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ items: NotificationItem[] }>,
) {
  res.status(200).json({ items: getMockNotifications() });
}

