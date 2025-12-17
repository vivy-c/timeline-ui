export type Universe = {
  id: string;
  hashtag: string;
  souls: number;
};

export type FeedTab = "best" | "new";

export type QuestionCard = {
  id: string;
  label: string;
  question: string;
  dateLabel: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
};

export type UserBadge = {
  id: string;
  label: string;
  variant: "cyan" | "pink" | "amber" | "slate";
};

export type FeedUser = {
  name: string;
  avatarUrl?: string;
  verified?: boolean;
};

export type FeedPost = {
  id: string;
  user: FeedUser;
  timeAgoLabel: string;
  badges: UserBadge[];
  awardLabel?: string;
  body: string;
  imageUrl?: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
};

export type Promo = {
  ribbonLabel: string;
  countdownEndsAt: string; // ISO string
  title: string;
  subtitle: string;
  ctaLabel: string;
  progress: number; // 0..1
  purchaseToast: {
    avatarUrl?: string;
    text: string;
  };
};

export type HomePayload = {
  viewer: {
    displayName: string;
    avatarUrl?: string;
    coinBalance: number;
    streakLabel: string;
  };
  universes: Universe[];
  questionOfDay: QuestionCard;
  feed: {
    defaultTab: FeedTab;
    posts: FeedPost[];
  };
  relatedPosts: QuestionCard[];
  promo: Promo;
};
