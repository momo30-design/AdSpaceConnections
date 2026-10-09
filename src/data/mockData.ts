import { FacebookPage, BookingOrder } from '../types';

export const HERO_IMAGE = '/src/assets/images/adspace_hero_workspace_1791543122669.jpg';

export const INITIAL_FACEBOOK_PAGES: FacebookPage[] = [
  {
    id: 'page_tech_pulse',
    name: 'TechPulse Weekly',
    handle: '@techpulseweekly',
    category: 'Tech & AI',
    verified: true,
    followerCount: 485000,
    engagementRate: 4.8,
    avgReachPerPost: 142000,
    coverImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    avatarImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    bio: 'Deep dives on consumer technology, generative AI tools, developer ecosystems, and silicon breakthroughs. Over 480k founders and tech enthusiasts.',
    rating: 4.95,
    completedBookings: 64,
    responseTimeHours: 3,
    pageCreationYear: 2018,
    demographics: {
      topCountry: 'United States',
      countryShare: 62,
      primaryAgeBracket: '25-34',
      ageBracketShare: 54,
      genderRatio: { male: 72, female: 28 }
    },
    featuredPostPreview: {
      caption: 'The next wave of local AI hardware has arrived. We tested 5 accelerators on real-world developer benchmarks. Full breakdown inside...',
      likes: '14.2K',
      comments: '890',
      shares: '1.4K'
    },
    slots: [
      {
        id: 'tp_feed_standard',
        format: 'feed_post',
        name: 'Dedicated Feed Post + First Comment Link',
        description: 'Single high-engagement image or carousel post written in our technical editorial style with your product as the featured solution.',
        price: 450,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Original 250-word editorial copy', 'Tagged brand page', 'Direct tracking UTM link in post and top pinned comment', '30-day analytics report'],
        bestFor: 'SaaS products, Developer tools, Hardware launches'
      },
      {
        id: 'tp_reel_feature',
        format: 'reel_feature',
        name: '60-Second Hands-On Video Reel',
        description: 'High-production 9:16 vertical video review and workflow demonstration recorded in our 4K studio setup.',
        price: 750,
        turnaroundDays: 3,
        durationDays: 365,
        deliverables: ['4K vertical video production', 'Custom on-screen captions & call-to-action', 'Permanent placement on Reels tab', 'Link sticker & description mention'],
        bestFor: 'Physical tech gadgets, AI productivity apps, Visual software'
      },
      {
        id: 'tp_story_swipe',
        format: 'story_swipe',
        name: '24-Hour Story Sequence (3 Frames)',
        description: 'A 3-part interactive story sequence detailing the problem, your solution, and direct swipe/link sticker.',
        price: 220,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['3 bespoke graphic/video frames', 'Interactive poll or question sticker', 'Direct link sticker', '24h screenshot analytics'],
        bestFor: 'Flash sales, Webinar registrations, Early bird signups'
      },
      {
        id: 'tp_cover_takeover',
        format: 'cover_takeover',
        name: '14-Day Page Header Banner Takeover',
        description: 'Prime billboard real estate across our 480k-follower Facebook page header with clickable callout description.',
        price: 980,
        turnaroundDays: 2,
        durationDays: 14,
        deliverables: ['Custom co-branded banner design', 'Pinned top link in cover photo description', 'Seen by ~65k weekly organic profile visitors'],
        bestFor: 'Major brand repositioning, Annual conference announcements'
      }
    ]
  },
  {
    id: 'page_urban_gastronomy',
    name: 'Urban Gastronomy',
    handle: '@urbangastronomy',
    category: 'Food & Dining',
    verified: true,
    followerCount: 320000,
    engagementRate: 5.6,
    avgReachPerPost: 118000,
    coverImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    avatarImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    bio: 'Celebrating modern dining, artisanal kitchens, farm-to-table culinary techniques, and specialty pantry essentials.',
    rating: 4.92,
    completedBookings: 42,
    responseTimeHours: 4,
    pageCreationYear: 2019,
    demographics: {
      topCountry: 'United States',
      countryShare: 68,
      primaryAgeBracket: '25-44',
      ageBracketShare: 61,
      genderRatio: { male: 44, female: 56 }
    },
    featuredPostPreview: {
      caption: 'The secret to silky emulsion sauces starts with stone-pressed single-estate olive oil. Here is why temperature matters more than whisking speed...',
      likes: '19.8K',
      comments: '1.2K',
      shares: '3.1K'
    },
    slots: [
      {
        id: 'ug_feed_recipe',
        format: 'feed_post',
        name: 'Recipe Integration Feed Post',
        description: 'We develop a custom seasonal recipe incorporating your ingredient or kitchen tool with step-by-step imagery.',
        price: 380,
        turnaroundDays: 3,
        durationDays: 365,
        deliverables: ['Custom recipe development', 'High-res food photography', 'Direct shopping link in caption & comments', 'Full commercial usage rights'],
        bestFor: 'Artisanal foods, Cookware, Specialty sauces, Wine & beverages'
      },
      {
        id: 'ug_reel_prep',
        format: 'reel_feature',
        name: 'Culinary ASMR & Prep Reel (45s)',
        description: 'Sensory cooking reel showing knife prep, sizzling, and final plating with your product naturally integrated.',
        price: 620,
        turnaroundDays: 4,
        durationDays: 365,
        deliverables: ['Studio sound-engineered cooking reel', 'Ingredient callout overlay', 'Permanent Reels placement', 'Direct buy link'],
        bestFor: 'Chef knives, Kitchen appliances, Meal kits'
      },
      {
        id: 'ug_story_swipe',
        format: 'story_swipe',
        name: 'Chef Tasting Story Feature (2 Frames)',
        description: 'Authentic kitchen taste test and unboxing with direct promo code sticker.',
        price: 180,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['Unboxing reaction frame', 'Tasting notes frame with link sticker', 'Discount code distribution'],
        bestFor: 'Food box subscriptions, Gourmet snacks'
      }
    ]
  },
  {
    id: 'page_apex_athletics',
    name: 'Apex Athletics',
    handle: '@apexathleticshq',
    category: 'Fitness & Wellness',
    verified: true,
    followerCount: 615000,
    engagementRate: 4.2,
    avgReachPerPost: 185000,
    coverImage: '/src/assets/images/page_apex_athletics_1791543155459.jpg',
    avatarImage: '/src/assets/images/page_apex_athletics_1791543155459.jpg',
    bio: 'Evidence-based strength conditioning, athletic longevity, recovery protocols, and training gear for dedicated lifters.',
    rating: 4.88,
    completedBookings: 51,
    responseTimeHours: 2,
    pageCreationYear: 2017,
    demographics: {
      topCountry: 'United States',
      countryShare: 58,
      primaryAgeBracket: '20-35',
      ageBracketShare: 66,
      genderRatio: { male: 64, female: 36 }
    },
    featuredPostPreview: {
      caption: '3 overlooked mechanics that fix your posterior chain hip hinge. Save this cue sheet before your next heavy deadlift session.',
      likes: '28.4K',
      comments: '1.6K',
      shares: '4.8K'
    },
    slots: [
      {
        id: 'aa_feed_breakdown',
        format: 'feed_post',
        name: 'Training Protocol Infographic + Sponsor Mention',
        description: 'Carousel or single technical infographic breaking down training physiology featuring your brand recommendation.',
        price: 520,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Co-branded graphic design', 'Long-form educational post copy', 'Direct coupon code in caption', 'Targeted fitness audience engagement'],
        bestFor: 'Supplements, Recovery gear, Fitness trackers, Activewear'
      },
      {
        id: 'aa_reel_workout',
        format: 'reel_feature',
        name: 'Workout Execution & Gear Spotlight Reel',
        description: 'Dynamic workout routine showing real coach testing of your equipment or apparel during high-intensity training.',
        price: 840,
        turnaroundDays: 3,
        durationDays: 365,
        deliverables: ['Professional gym videography', 'Active gear demonstration', 'Pinned comment link', 'Engagement response management for 48h'],
        bestFor: 'Footwear, Weightlifting accessories, Gym tech'
      },
      {
        id: 'aa_group_pinned',
        format: 'group_pinned',
        name: '7-Day Pinned Post in Apex VIP Community (95k Members)',
        description: 'Pinned announcement at the very top of our highly active Facebook private group for strength athletes.',
        price: 490,
        turnaroundDays: 1,
        durationDays: 7,
        deliverables: ['Sticky pinned announcement for 7 days', 'Admin endorsement note', 'Direct discussion moderation'],
        bestFor: 'Community software, Challenges, High-ticket gear'
      }
    ]
  },
  {
    id: 'page_capital_insights',
    name: 'Capital Insights',
    handle: '@capitalinsightsmedia',
    category: 'Business & Finance',
    verified: true,
    followerCount: 245000,
    engagementRate: 6.4,
    avgReachPerPost: 92000,
    coverImage: '/src/assets/images/page_capital_insights_1791543165513.jpg',
    avatarImage: '/src/assets/images/page_capital_insights_1791543165513.jpg',
    bio: 'Macro trends, venture market data, enterprise software teardowns, and wealth architecture for operators and investors.',
    rating: 4.98,
    completedBookings: 38,
    responseTimeHours: 1,
    pageCreationYear: 2020,
    demographics: {
      topCountry: 'United States',
      countryShare: 71,
      primaryAgeBracket: '30-49',
      ageBracketShare: 58,
      genderRatio: { male: 68, female: 32 }
    },
    featuredPostPreview: {
      caption: 'Why recurring revenue multiples shifted by 42% over the last 18 months, and what high-growth businesses are doing to counter rising CAC.',
      likes: '11.5K',
      comments: '640',
      shares: '1.9K'
    },
    slots: [
      {
        id: 'ci_feed_analysis',
        format: 'feed_post',
        name: 'Executive Case Study & Market Breakdown',
        description: 'In-depth analytical breakdown highlighting your company’s customer success story or market data.',
        price: 420,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Comprehensive 300-word business analysis', 'Custom chart/infographic design', 'Clear CTA for B2B decision makers', 'Lifetime post archive'],
        bestFor: 'B2B SaaS, Fintech, Executive recruiting, Venture funds'
      },
      {
        id: 'ci_story_swipe',
        format: 'story_swipe',
        name: 'Market Brief Story Takeover (3 Frames)',
        description: 'Morning market briefing sequence with sponsor branding on slide 1 and direct download link on slide 3.',
        price: 210,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['Whitepaper/Report link sticker', 'Executive-targeted morning timing', 'Detailed reach metrics'],
        bestFor: 'Industry whitepapers, B2B report downloads'
      },
      {
        id: 'ci_cover_takeover',
        format: 'cover_takeover',
        name: '7-Day Editorial Cover Banner Sponsorship',
        description: 'Featured header banner on Capital Insights desktop & mobile pages seen by daily executives.',
        price: 580,
        turnaroundDays: 2,
        durationDays: 7,
        deliverables: ['Dedicated co-branded banner', 'Pinned link in cover description', 'Estimated 45k impressions'],
        bestFor: 'Enterprise software rollouts, Series A/B funding announcements'
      }
    ]
  },
  {
    id: 'page_greenhaven',
    name: 'GreenHaven Living',
    handle: '@greenhavenhome',
    category: 'Home & Living',
    verified: false,
    followerCount: 198000,
    engagementRate: 5.8,
    avgReachPerPost: 74000,
    coverImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    avatarImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    bio: 'Biophilic interior architecture, urban gardening, sustainable textiles, and calming domestic aesthetics.',
    rating: 4.89,
    completedBookings: 29,
    responseTimeHours: 4,
    pageCreationYear: 2021,
    demographics: {
      topCountry: 'United States',
      countryShare: 65,
      primaryAgeBracket: '25-40',
      ageBracketShare: 62,
      genderRatio: { male: 28, female: 72 }
    },
    slots: [
      {
        id: 'gh_feed_style',
        format: 'feed_post',
        name: 'Interior Styling Showcase Post',
        description: 'Photoshoot styling your home decor or sustainable lifestyle item in a sunlit architectural setting.',
        price: 290,
        turnaroundDays: 3,
        durationDays: 365,
        deliverables: ['3 styled photos', 'Care & usage description in caption', 'Direct affiliate or store link in caption'],
        bestFor: 'Home decor, Bedding, Plants, Eco-friendly goods'
      },
      {
        id: 'gh_story_swipe',
        format: 'story_swipe',
        name: 'Weekend Refresh Story Feature',
        description: 'Featured slide in our popular Saturday morning room makeover story series.',
        price: 140,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['2 custom styled story slides', 'Direct product link sticker'],
        bestFor: 'Lifestyle accessories, Home fragrances'
      }
    ]
  },
  {
    id: 'page_nextgen_gaming',
    name: 'NextGen Gaming Hub',
    handle: '@nextgengaminghub',
    category: 'Gaming & Esports',
    verified: true,
    followerCount: 890000,
    engagementRate: 4.5,
    avgReachPerPost: 260000,
    coverImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    avatarImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    bio: 'The home of competitive esports clips, PC hardware battlestations, indie game discoveries, and gaming culture.',
    rating: 4.91,
    completedBookings: 88,
    responseTimeHours: 2,
    pageCreationYear: 2017,
    demographics: {
      topCountry: 'United States',
      countryShare: 54,
      primaryAgeBracket: '18-29',
      ageBracketShare: 71,
      genderRatio: { male: 82, female: 18 }
    },
    slots: [
      {
        id: 'ng_feed_spotlight',
        format: 'feed_post',
        name: 'Game/Hardware Spotlight Feed Post',
        description: 'Engaging gameplay snapshot or hardware breakdown with custom graphics crafted for gamers.',
        price: 580,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['High-contrast gaming creative', 'Pinned link with special gamer discount code', 'Over 200k estimated reach'],
        bestFor: 'Indie game studios, Peripherals, Energy drinks, Monitors'
      },
      {
        id: 'ng_reel_clip',
        format: 'reel_feature',
        name: 'Viral Gameplay / Setup Reel Integration',
        description: 'Integration in our daily top highlight reel with sponsored bumper and pinned comment.',
        price: 890,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Dedicated sponsor segment in highlight clip', 'Tag & link sticker', 'Permanent Reel archive'],
        bestFor: 'Gaming chairs, Keyboards, Steam games'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: BookingOrder[] = [
  {
    id: 'BK-94021',
    pageId: 'page_tech_pulse',
    pageName: 'TechPulse Weekly',
    pageHandle: '@techpulseweekly',
    pageAvatar: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    slotId: 'tp_feed_standard',
    slotName: 'Dedicated Feed Post + First Comment Link',
    slotFormat: 'feed_post',
    businessName: 'Synthetix AI Lab',
    businessEmail: 'growth@synthetixlab.io',
    websiteUrl: 'https://synthetixlab.io',
    campaignGoal: 'Website Traffic',
    captionDraft: 'Writing clean SQL shouldn’t require hours of trial-and-error schema debugging. Synthetix AI generates and explains complex database queries in seconds. Built by developers, for developers.',
    talkingPoints: 'Highlight zero setup required, native PostgreSQL integration, and 14-day free trial without credit card.',
    targetDate: '2026-10-15',
    slotPrice: 450,
    escrowFee: 13.50,
    platformFee: 22.50,
    totalPaid: 486.00,
    escrowStatus: 'held_in_escrow',
    status: 'published_live',
    createdAt: '2026-10-06T14:20:00Z',
    publishedAt: '2026-10-08T18:00:00Z',
    livePostUrl: 'https://facebook.com/techpulseweekly/posts/94827103829',
    proofScreenshotUrl: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    metrics: {
      impressions: 114200,
      reach: 98400,
      clicks: 3410,
      reactions: 4230,
      comments: 312,
      shares: 480
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'advertiser',
        senderName: 'Synthetix AI Team',
        message: 'Looking forward to this! Please be sure to tag our page @SynthetixLab in the first paragraph.',
        timestamp: '2026-10-06 14:25'
      },
      {
        id: 'msg-2',
        sender: 'creator',
        senderName: 'TechPulse Weekly Editor',
        message: 'Draft ready and reviewed. Tagged @SynthetixLab and pinned your UTM link in the top comment. Post is now live!',
        timestamp: '2026-10-08 18:05'
      }
    ]
  },
  {
    id: 'BK-94022',
    pageId: 'page_capital_insights',
    pageName: 'Capital Insights',
    pageHandle: '@capitalinsightsmedia',
    pageAvatar: '/src/assets/images/page_capital_insights_1791543165513.jpg',
    slotId: 'ci_feed_analysis',
    slotName: 'Executive Case Study & Market Breakdown',
    slotFormat: 'feed_post',
    businessName: 'VentureScale ERP',
    businessEmail: 'marketing@venturescale.co',
    websiteUrl: 'https://venturescale.co',
    campaignGoal: 'Lead Generation',
    captionDraft: 'How mid-market CFOs are automating multi-entity financial consolidation while cutting close times from 14 days down to 48 hours.',
    talkingPoints: 'Emphasize real audit trail compliance and SOC2 Type II certification.',
    targetDate: '2026-10-18',
    slotPrice: 420,
    escrowFee: 12.60,
    platformFee: 21.00,
    totalPaid: 453.60,
    escrowStatus: 'held_in_escrow',
    status: 'draft_submitted',
    createdAt: '2026-10-08T09:15:00Z',
    messages: [
      {
        id: 'msg-3',
        sender: 'creator',
        senderName: 'Capital Insights Team',
        message: 'Draft completed and uploaded to your review panel. Please verify the executive chart graphics before we schedule for Tuesday broadcast.',
        timestamp: '2026-10-08 17:30'
      }
    ]
  }
];

export const INITIAL_CREATOR_WALLET = {
  availableBalance: 1240.00,
  escrowPendingBalance: 870.00,
  totalEarned: 18450.00,
  payoutAccount: 'Stripe Connect (•••• 4892)'
};
