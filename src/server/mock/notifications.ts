import type { NotificationItem } from "@/types/notifications";

export function getMockNotifications(): NotificationItem[] {
  return [
    {
      id: "n1",
      actor: { name: "Phoebe", avatarUrl: "/avatars/phoebe.svg" },
      message: "Phoebe liked your answer on Question of the Day.",
      timeLabel: "2m",
      unread: true,
    },
    {
      id: "n2",
      actor: { name: "Kostas", avatarUrl: "/avatars/kostas.svg" },
      message: "Kostas replied: “Y'all getting dates and relationships?!”",
      timeLabel: "1h",
      unread: true,
    },
    {
      id: "n3",
      actor: { name: "Boo" },
      message: "New Question of the Day is live. Share your take!",
      timeLabel: "5h",
      unread: false,
    },
    {
      id: "n4",
      actor: { name: "Boo" },
      message: "50% OFF sale ends soon. Don’t miss it.",
      timeLabel: "1d",
      unread: false,
    },
  ];
}

