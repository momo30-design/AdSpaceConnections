import React, { useState, useEffect, useMemo } from 'react';
import { 
  FacebookPage, AdSlotOption, BookingOrder, CreatorWallet, AdSlotFormat 
} from './types';
import { 
  INITIAL_FACEBOOK_PAGES, INITIAL_BOOKINGS, INITIAL_CREATOR_WALLET 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PageCard } from './components/PageCard';
import { PageDetailModal } from './components/PageDetailModal';
import { BookingModal } from './components/BookingModal';
import { AdvertiserDashboard } from './components/AdvertiserDashboard';
import { CreatorDashboard } from './components/CreatorDashboard';
import { ListNewPageModal } from './components/ListNewPageModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { Footer } from './components/Footer';
import { 
  Search, SlidersHorizontal, CheckCircle2, ShieldCheck, 
  ArrowUpDown, Filter, Sparkles 
} from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<'explore' | 'campaigns' | 'creator_hub' | 'how_it_works'>('explore');
  const [activeRole, setActiveRole] = useState<'advertiser' | 'creator'>('advertiser');

  // Persistence State
  const [pages, setPages] = useState<FacebookPage[]>(() => {
    try {
      const saved = localStorage.getItem('adspace_pages');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_FACEBOOK_PAGES;
  });

  const [bookings, setBookings] = useState<BookingOrder[]>(() => {
    try {
      const saved = localStorage.getItem('adspace_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_BOOKINGS;
  });

  const [wallet, setWallet] = useState<CreatorWallet>(() => {
    try {
      const saved = localStorage.getItem('adspace_wallet');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_CREATOR_WALLET;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('adspace_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('adspace_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('adspace_wallet', JSON.stringify(wallet));
  }, [wallet]);

  // Modals State
  const [selectedPageForDetail, setSelectedPageForDetail] = useState<FacebookPage | null>(null);
  const [bookingContext, setBookingContext] = useState<{ page: FacebookPage; slot?: AdSlotOption } | null>(null);
  const [showListModal, setShowListModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'followers' | 'engagement' | 'price_low' | 'rating'>('recommended');

  const categories = [
    'All',
    'Tech & AI',
    'Food & Dining',
    'Fitness & Wellness',
    'Business & Finance',
    'Home & Living',
    'Gaming & Esports'
  ];

  // Filtered & Sorted Pages
  const filteredPages = useMemo(() => {
    return pages
      .filter((page) => {
        // Category filter
        if (selectedCategory !== 'All' && page.category !== selectedCategory) {
          return false;
        }

        // Format filter
        if (selectedFormat !== 'All') {
          const hasFormat = page.slots.some((s) => s.format === selectedFormat);
          if (!hasFormat) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = page.name.toLowerCase().includes(q);
          const matchHandle = page.handle.toLowerCase().includes(q);
          const matchBio = page.bio.toLowerCase().includes(q);
          const matchCountry = page.demographics.topCountry.toLowerCase().includes(q);
          if (!matchName && !matchHandle && !matchBio && !matchCountry) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'followers') return b.followerCount - a.followerCount;
        if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_low') {
          const minA = Math.min(...a.slots.map((s) => s.price));
          const minB = Math.min(...b.slots.map((s) => s.price));
          return minA - minB;
        }
        return b.completedBookings - a.completedBookings; // recommended
      });
  }, [pages, selectedCategory, selectedFormat, searchQuery, sortBy]);

  // Booking & Escrow Handlers
  const handleConfirmBooking = (newBooking: BookingOrder) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update creator pending escrow wallet
    setWallet((prev) => ({
      ...prev,
      escrowPendingBalance: prev.escrowPendingBalance + newBooking.slotPrice
    }));

    showToast(`Order ${newBooking.id} secured! $${newBooking.totalPaid.toFixed(2)} locked in AdSpace Escrow.`);
  };

  const handleReleaseEscrow = (bookingId: string) => {
    const order = bookings.find((b) => b.id === bookingId);
    if (!order) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, escrowStatus: 'released_to_creator', status: 'completed_payout' }
          : b
      )
    );

    // Shift pending escrow to available wallet
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + order.slotPrice,
      escrowPendingBalance: Math.max(0, prev.escrowPendingBalance - order.slotPrice),
      totalEarned: prev.totalEarned + order.slotPrice
    }));

    showToast(`Escrow of $${order.slotPrice.toFixed(2)} successfully released to ${order.pageName}!`);
  };

  const handleRequestRevision = (bookingId: string, note: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'revision_requested',
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'advertiser',
              senderName: b.businessName,
              message: `Revision Request: ${note}`,
              timestamp: new Date().toLocaleDateString()
            }
          ]
        };
      })
    );
    showToast('Revision request sent to creator.');
  };

  const handleSendMessage = (bookingId: string, messageText: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'advertiser',
              senderName: b.businessName,
              message: messageText,
              timestamp: new Date().toLocaleDateString()
            }
          ]
        };
      })
    );
  };

  // Creator Actions
  const handleAcceptBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'accepted',
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'creator',
              senderName: `${b.pageName} Team`,
              message: 'Booking accepted! We are preparing the creative draft.',
              timestamp: new Date().toLocaleDateString()
            }
          ]
        };
      })
    );
    showToast('Booking accepted! Content draft unlocked.');
  };

  const handleSubmitDraft = (bookingId: string, draftNote: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'draft_submitted',
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'creator',
              senderName: `${b.pageName} Team`,
              message: `Draft ready for review: ${draftNote}`,
              timestamp: new Date().toLocaleDateString()
            }
          ]
        };
      })
    );
    showToast('Draft sent to advertiser for verification.');
  };

  const handleSubmitLiveProof = (bookingId: string, postUrl: string, reachNumber: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'published_live',
          livePostUrl: postUrl,
          metrics: {
            impressions: Math.round(reachNumber * 1.2),
            reach: reachNumber,
            clicks: Math.round(reachNumber * 0.035),
            reactions: Math.round(reachNumber * 0.045),
            comments: Math.round(reachNumber * 0.004),
            shares: Math.round(reachNumber * 0.006)
          },
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'creator',
              senderName: `${b.pageName} Team`,
              message: `Post is live at ${postUrl} with initial organic reach of ${reachNumber.toLocaleString()}!`,
              timestamp: new Date().toLocaleDateString()
            }
          ]
        };
      })
    );
    showToast('Proof submitted! Post marked live on Facebook.');
  };

  const handleAddPage = (newPage: FacebookPage) => {
    setPages((prev) => [newPage, ...prev]);
    showToast(`"${newPage.name}" is now listed in the AdSpace marketplace!`);
  };

  const handleWithdrawFunds = () => {
    setWallet((prev) => ({
      ...prev,
      availableBalance: 0
    }));
  };

  const activeBookingsCount = bookings.filter((b) => b.status !== 'completed_payout').length;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-neutral-800 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenListModal={() => setShowListModal(true)}
        activeBookingsCount={activeBookingsCount}
      />

      {/* View Routing */}
      {activeTab === 'explore' && (
        <main className="flex-1 space-y-10">
          {/* Hero Section */}
          <Hero
            onExploreClick={() => {
              const el = document.getElementById('marketplace-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenHowItWorks={() => setShowHowItWorksModal(true)}
          />

          {/* Marketplace Directory Section */}
          <section id="marketplace-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Search & Filter Header */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                    Verified Facebook Advertising Inventory
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Showing {filteredPages.length} vetted Facebook creators & page owners ready for ad bookings
                  </p>
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-80 relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search page name, niche, audience..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Tabs (Interactive Segmented Control) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Secondary Controls: Format Selector & Sort */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs">
                {/* Format Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">Slot Type:</span>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 font-medium cursor-pointer focus:outline-hidden"
                  >
                    <option value="All">All Formats</option>
                    <option value="feed_post">Dedicated Feed Post</option>
                    <option value="reel_feature">Video Reel (60s)</option>
                    <option value="story_swipe">Story (24h)</option>
                    <option value="cover_takeover">Cover Banner Takeover</option>
                    <option value="group_pinned">Group Pinned Post</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 font-medium cursor-pointer focus:outline-hidden"
                  >
                    <option value="recommended">Recommended & Verified</option>
                    <option value="followers">Most Followers</option>
                    <option value="engagement">Highest Engagement Rate</option>
                    <option value="price_low">Lowest Starting Price</option>
                    <option value="rating">Highest Creator Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Marketplace Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredPages.map((page) => (
                <PageCard
                  key={page.id}
                  page={page}
                  onSelect={(p) => setSelectedPageForDetail(p)}
                  onQuickBook={(p) => setBookingContext({ page: p })}
                />
              ))}
            </div>

            {filteredPages.length === 0 && (
              <div className="p-12 text-center bg-white border border-neutral-200 rounded-2xl space-y-3">
                <div className="text-neutral-400 text-sm">
                  No Facebook pages match your filter criteria.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedFormat('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 rounded-lg hover:bg-neutral-200 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </section>
        </main>
      )}

      {activeTab === 'campaigns' && (
        <main className="flex-1">
          <AdvertiserDashboard
            bookings={bookings}
            onReleaseEscrow={handleReleaseEscrow}
            onRequestRevision={handleRequestRevision}
            onSendMessage={handleSendMessage}
            onExploreMore={() => setActiveTab('explore')}
          />
        </main>
      )}

      {activeTab === 'creator_hub' && (
        <main className="flex-1">
          <CreatorDashboard
            wallet={wallet}
            pages={pages}
            bookings={bookings}
            onAcceptBooking={handleAcceptBooking}
            onSubmitDraft={handleSubmitDraft}
            onSubmitLiveProof={handleSubmitLiveProof}
            onOpenListNewPage={() => setShowListModal(true)}
            onWithdrawFunds={handleWithdrawFunds}
          />
        </main>
      )}

      {activeTab === 'how_it_works' && (
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Guaranteed Escrow Protection
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950">
                How AdSpace Escrow Safeguards Your Ad Dollars
              </h1>
              <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                We eliminate the risks of working with social media creators. Funds are held safely in third-party escrow until live broadcast proof and Facebook analytics are verified.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                <div className="text-emerald-600 font-extrabold font-mono text-xl">01. Direct Inventory Booking</div>
                <h3 className="font-bold text-base text-neutral-900">Pick Real Pages, Not Algorithmic Slots</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Choose specific Facebook pages whose organic audience matches your exact target customers. View verified demographic distributions, engagement rates, and recent benchmarks.
                </p>
              </div>

              <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                <div className="text-emerald-600 font-extrabold font-mono text-xl">02. Locked Escrow Holding</div>
                <h3 className="font-bold text-base text-neutral-900">Your Deposit Stays Safe</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  When you check out, your payment is placed in a secure AdSpace Escrow vault. The page owner cannot withdraw the money until the agreed deliverables are satisfied.
                </p>
              </div>

              <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                <div className="text-emerald-600 font-extrabold font-mono text-xl">03. Creative Review & Drafting</div>
                <h3 className="font-bold text-base text-neutral-900">Approve Before Broadcast</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  The page creator drafts copy tailored to their followers or uses our Gemini AI assistant. You review and have the right to request copy revisions prior to publication.
                </p>
              </div>

              <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                <div className="text-emerald-600 font-extrabold font-mono text-xl">04. Live Proof & Payout Release</div>
                <h3 className="font-bold text-base text-neutral-900">Verified Broadcast Proof</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Once published on Facebook, the creator submits the live post link and real reach metrics. Once confirmed, escrow unlocks payout to the creator.
                </p>
              </div>
            </div>

            <div className="p-6 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-lg">Ready to test Facebook Ad Space?</h3>
                <p className="text-xs text-neutral-400 mt-1">Browse verified pages starting from $140 per slot.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('explore')}
                className="px-6 py-3 font-semibold text-xs text-neutral-950 bg-white hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors shrink-0"
              >
                Browse Ad Slots Now
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer
        onExplore={() => {
          setActiveTab('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHowItWorks={() => setShowHowItWorksModal(true)}
        onListModal={() => setShowListModal(true)}
      />

      {/* Page Detail Modal */}
      {selectedPageForDetail && (
        <PageDetailModal
          page={selectedPageForDetail}
          onClose={() => setSelectedPageForDetail(null)}
          onSelectSlotToBook={(page, slot) => {
            setSelectedPageForDetail(null);
            setBookingContext({ page, slot });
          }}
        />
      )}

      {/* Booking / Escrow Checkout Modal */}
      {bookingContext && (
        <BookingModal
          page={bookingContext.page}
          initialSlot={bookingContext.slot}
          onClose={() => setBookingContext(null)}
          onConfirmBooking={(booking) => {
            handleConfirmBooking(booking);
            setActiveRole('advertiser');
            setActiveTab('campaigns');
          }}
        />
      )}

      {/* List New Page Modal */}
      {showListModal && (
        <ListNewPageModal
          onClose={() => setShowListModal(false)}
          onAddPage={handleAddPage}
        />
      )}

      {/* How Escrow Works Modal */}
      {showHowItWorksModal && (
        <HowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
          onExplore={() => setActiveTab('explore')}
        />
      )}
    </div>
  );
}
