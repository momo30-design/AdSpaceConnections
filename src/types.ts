export type AdSlotFormat = 
  | 'feed_post'
  | 'reel_feature'
  | 'story_swipe'
  | 'group_pinned'
  | 'cover_takeover';

export interface AdSlotOption {
  id: string;
  format: AdSlotFormat;
  name: string;
  description: string;
  price: number; // in USD
  turnaroundDays: number;
  durationDays: number; // e.g. permanent or 7 days
  deliverables: string[];
  bestFor: string;
}

export interface AudienceDemographics {
  topCountry: string;
  countryShare: number; // e.g. 64%
  primaryAgeBracket: string; // e.g. "25-34"
  ageBracketShare: number; // e.g. 52%
  genderRatio: {
    male: number;
    female: number;
  };
}

export interface FacebookPage {
  id: string;
  name: string;
  handle: string; // e.g. "@techpulseweekly"
  category: 'Tech & AI' | 'Food & Dining' | 'Fitness & Wellness' | 'Business & Finance' | 'Home & Living' | 'Gaming & Esports';
  verified: boolean;
  followerCount: number;
  engagementRate: number; // e.g. 4.8%
  avgReachPerPost: number;
  coverImage: string;
  avatarImage: string;
  bio: string;
  rating: number;
  completedBookings: number;
  responseTimeHours: number;
  pageCreationYear: number;
  demographics: AudienceDemographics;
  slots: AdSlotOption[];
  featuredPostPreview?: {
    caption: string;
    likes: string;
    comments: string;
    shares: string;
  };
}

export type BookingStatus =
  | 'pending_creator_review'
  | 'accepted'
  | 'draft_submitted'
  | 'revision_requested'
  | 'scheduled'
  | 'published_live'
  | 'completed_payout';

export interface CampaignMessage {
  id: string;
  sender: 'advertiser' | 'creator';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface BookingOrder {
  id: string;
  pageId: string;
  pageName: string;
  pageHandle: string;
  pageAvatar: string;
  slotId: string;
  slotName: string;
  slotFormat: AdSlotFormat;
  
  // Advertiser Info
  businessName: string;
  businessEmail: string;
  websiteUrl: string;
  
  // Brief & Creative
  campaignGoal: 'Website Traffic' | 'Lead Generation' | 'App Installs' | 'Brand Awareness';
  captionDraft: string;
  mediaUrl?: string;
  talkingPoints: string;
  targetDate: string;
  
  // Escrow & Financials
  slotPrice: number;
  escrowFee: number;
  platformFee: number;
  totalPaid: number;
  escrowStatus: 'held_in_escrow' | 'released_to_creator' | 'refunded';
  
  // Execution & Verification
  status: BookingStatus;
  createdAt: string;
  livePostUrl?: string;
  proofScreenshotUrl?: string;
  publishedAt?: string;
  metrics?: {
    impressions: number;
    reach: number;
    clicks: number;
    reactions: number;
    comments: number;
    shares: number;
  };
  messages: CampaignMessage[];
}

export interface CreatorWallet {
  availableBalance: number;
  escrowPendingBalance: number;
  totalEarned: number;
  payoutAccount: string;
}
