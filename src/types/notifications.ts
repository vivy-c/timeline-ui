export type NotificationItem = {
  id: string;
  actor: {
    name: string;
    avatarUrl?: string;
  };
  message: string;
  timeLabel: string;
  unread: boolean;
};

