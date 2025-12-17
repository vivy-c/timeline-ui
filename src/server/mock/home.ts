import type { FeedPost, HomePayload, QuestionCard, Universe } from "@/types/home";

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function iso(date: Date) {
  return date.toISOString();
}

export function getMockUniverses(): Universe[] {
  return [
    { id: "music", hashtag: "music", souls: 26_000_000 },
    { id: "movies", hashtag: "movies", souls: 20_000_000 },
    { id: "food", hashtag: "food", souls: 14_000_000 },
    { id: "gaming", hashtag: "gaming", souls: 12_000_000 },
    { id: "anime", hashtag: "anime", souls: 8_900_000 },
    { id: "animals", hashtag: "animals", souls: 6_400_000 },
    { id: "outdoors", hashtag: "outdoors", souls: 6_100_000 },
    { id: "technology", hashtag: "technology", souls: 6_100_000 },
    { id: "books", hashtag: "books", souls: 6_000_000 },
    { id: "art", hashtag: "art", souls: 5_900_000 },
    { id: "memes", hashtag: "memes", souls: 5_600_000 },
    { id: "psychology", hashtag: "psychology", souls: 5_100_000 },
    { id: "history", hashtag: "history", souls: 4_300_000 },
    { id: "culture", hashtag: "culture", souls: 4_200_000 },
    { id: "learning", hashtag: "learning", souls: 4_200_000 },
    { id: "science", hashtag: "science", souls: 3_400_000 },
    { id: "videos", hashtag: "videos", souls: 3_100_000 },
    { id: "languages", hashtag: "languages", souls: 2_500_000 },
    { id: "philosophy", hashtag: "philosophy", souls: 2_400_000 },
    { id: "sports", hashtag: "sports", souls: 2_000_000 },
    { id: "relationshipadvice", hashtag: "relationshipadvice", souls: 1_300_000 },
    { id: "fitness", hashtag: "fitness", souls: 1_100_000 },
    { id: "fashion", hashtag: "fashion", souls: 749_000 },
  ];
}

export function getMockQuestionOfDay(): QuestionCard {
  return {
    id: "qotd-relationship",
    label: "Question of the Day",
    question:
      "What would you choose: a relationship full of adventures or a peaceful one?",
    dateLabel: "11/7/2025",
    stats: {
      likes: 595,
      comments: 4076,
      shares: 0,
    },
  };
}

export function getMockFeedPosts(): FeedPost[] {
  return [
    {
      id: "post-phoebe",
      user: {
        name: "Phoebe",
        verified: true,
        avatarUrl: "/avatars/phoebe.svg",
      },
      timeAgoLabel: "1mo",
      badges: [
        { id: "mbti", label: "INFJ", variant: "pink" },
        { id: "zodiac", label: "Aquarius", variant: "slate" },
        { id: "compat", label: "2+1", variant: "cyan" },
      ],
      awardLabel: "1 Award",
      body: "A healthy relationship requires both adventure and peace. 💕",
      stats: {
        likes: 292,
        comments: 19,
        shares: 0,
        saves: 0,
      },
    },
    {
      id: "post-kostas",
      user: {
        name: "Kostas",
        verified: true,
        avatarUrl: "/avatars/kostas.svg",
      },
      timeAgoLabel: "1mo",
      badges: [
        { id: "mbti", label: "ENFP", variant: "amber" },
        { id: "zodiac", label: "Cancer", variant: "slate" },
        { id: "compat", label: "9+1", variant: "cyan" },
      ],
      body: "Y'all getting dates and relationships?!",
      imageUrl:
        "/mock/post-image.svg",
      stats: {
        likes: 128,
        comments: 31,
        shares: 0,
        saves: 0,
      },
    },
  ];
}

export function getMockRelatedPosts(): QuestionCard[] {
  return [
    {
      id: "rel-memoir",
      label: "Question of the Day",
      question: "If you wrote a memoir, what would the title be?",
      dateLabel: "12/17/2025",
      stats: { likes: 304, comments: 2727, shares: 0 },
    },
    {
      id: "rel-karaoke",
      label: "Question of the Day",
      question: "What's your go-to karaoke song?",
      dateLabel: "12/18/2025",
      stats: { likes: 3, comments: 31, shares: 0 },
    },
  ];
}

export function getMockHomePayload(): HomePayload {
  return {
    viewer: {
      displayName: "Vivy Cahyani",
      avatarUrl: "/avatars/vivy.svg",
      coinBalance: 250,
      streakLabel: "15%",
    },
    universes: getMockUniverses(),
    questionOfDay: getMockQuestionOfDay(),
    feed: {
      defaultTab: "best",
      posts: getMockFeedPosts(),
    },
    relatedPosts: getMockRelatedPosts(),
    promo: {
      ribbonLabel: "50% OFF SALE",
      countdownEndsAt: iso(daysFromNow(1)),
      title: "See Who Sent Love",
      subtitle: "See the souls who already want to be friends with you.",
      ctaLabel: "Activate Boo Infinity",
      progress: 0.28,
      purchaseToast: {
        avatarUrl: "/avatars/phoebe.svg",
        text: "just purchased",
      },
    },
  };
}
