import React, { useState } from 'react';
import { FacebookPage, AdSlotFormat, AdSlotOption } from '../types';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface ListNewPageModalProps {
  onClose: () => void;
  onAddPage: (newPage: FacebookPage) => void;
}

export const ListNewPageModal: React.FC<ListNewPageModalProps> = ({ onClose, onAddPage }) => {
  const [name, setName] = useState('Silicon Valley Insider');
  const [handle, setHandle] = useState('@svinsider');
  const [category, setCategory] = useState<FacebookPage['category']>('Tech & AI');
  const [followerCount, setFollowerCount] = useState('210000');
  const [engagementRate, setEngagementRate] = useState('4.4');
  const [bio, setBio] = useState('Covering venture funding rounds, tech culture, and founder interviews.');
  const [topCountry, setTopCountry] = useState('United States');
  const [countryShare, setCountryShare] = useState('65');

  // Slots
  const [slots, setSlots] = useState<{ format: AdSlotFormat; name: string; price: number; turnaround: number }[]>([
    { format: 'feed_post', name: 'Sponsored Tech Editorial Feed Post', price: 350, turnaround: 2 },
    { format: 'story_swipe', name: 'Founder Q&A Story Highlight', price: 160, turnaround: 1 }
  ]);

  const handleAddSlot = () => {
    setSlots([
      ...slots,
      { format: 'reel_feature', name: 'Short Video / Reel Feature', price: 500, turnaround: 3 }
    ]);
  };

  const handleRemoveSlot = (index: number) => {
    if (slots.length <= 1) return;
    setSlots(slots.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const followers = parseInt(followerCount.replace(/,/g, ''), 10) || 100000;
    const engagement = parseFloat(engagementRate) || 3.5;
    const avgReach = Math.round(followers * (engagement / 100) * 8);

    const generatedSlots: AdSlotOption[] = slots.map((s, idx) => ({
      id: `slot_custom_${Date.now()}_${idx}`,
      format: s.format,
      name: s.name,
      description: `Official advertising package provided directly by ${name}. Verified audience delivery.`,
      price: s.price,
      turnaroundDays: s.turnaround,
      durationDays: s.format === 'story_swipe' ? 1 : 365,
      deliverables: ['Custom editorial mention', 'Direct link in top comments & caption', '30-day analytics report'],
      bestFor: 'Targeted niche brands and software launches'
    }));

    const newPage: FacebookPage = {
      id: `page_${Date.now()}`,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      category,
      verified: true,
      followerCount: followers,
      engagementRate: engagement,
      avgReachPerPost: avgReach,
      coverImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
      avatarImage: '/src/assets/images/page_capital_insights_1791543165513.jpg',
      bio,
      rating: 5.0,
      completedBookings: 0,
      responseTimeHours: 2,
      pageCreationYear: 2022,
      demographics: {
        topCountry,
        countryShare: parseInt(countryShare, 10) || 60,
        primaryAgeBracket: '25-34',
        ageBracketShare: 55,
        genderRatio: { male: 60, female: 40 }
      },
      slots: generatedSlots
    };

    onAddPage(newPage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        <div className="p-5 sm:px-6 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Creator Marketplace Registration
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
              List Your Facebook Page on AdSpace
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Basic Page Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-neutral-900 text-sm">1. Page Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Facebook Page Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Page Handle (@handle)
                </label>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Category / Niche
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:outline-hidden"
                >
                  <option value="Tech & AI">Tech & AI</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Fitness & Wellness">Fitness & Wellness</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Verified Follower Count
                </label>
                <input
                  type="text"
                  required
                  value={followerCount}
                  onChange={e => setFollowerCount(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  30-day Engagement (%)
                </label>
                <input
                  type="text"
                  required
                  value={engagementRate}
                  onChange={e => setEngagementRate(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Page Editorial Bio / Description
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
              />
            </div>
          </div>

          {/* Ad Slot Packages Config */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">2. Ad Space Packages & Pricing</h3>
                <p className="text-neutral-500 text-[11px]">Define the ad slots businesses can book on your page.</p>
              </div>
              <button
                type="button"
                onClick={handleAddSlot}
                className="px-3 py-1.5 font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slot Package</span>
              </button>
            </div>

            <div className="space-y-3">
              {slots.map((s, idx) => (
                <div key={idx} className="p-3 border border-neutral-200 rounded-xl bg-neutral-50 flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <div className="w-full sm:w-1/3">
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Format</label>
                    <select
                      value={s.format}
                      onChange={e => {
                        const copy = [...slots];
                        copy[idx].format = e.target.value as AdSlotFormat;
                        setSlots(copy);
                      }}
                      className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs"
                    >
                      <option value="feed_post">Feed Post</option>
                      <option value="reel_feature">Video Reel</option>
                      <option value="story_swipe">Story (24h)</option>
                      <option value="cover_takeover">Cover Banner</option>
                      <option value="group_pinned">Group Pinned Post</option>
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Package Title</label>
                    <input
                      type="text"
                      value={s.name}
                      onChange={e => {
                        const copy = [...slots];
                        copy[idx].name = e.target.value;
                        setSlots(copy);
                      }}
                      className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs"
                    />
                  </div>

                  <div className="w-1/2 sm:w-28">
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Price (USD)</label>
                    <input
                      type="number"
                      value={s.price}
                      onChange={e => {
                        const copy = [...slots];
                        copy[idx].price = Number(e.target.value);
                        setSlots(copy);
                      }}
                      className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs font-mono"
                    />
                  </div>

                  <div className="w-1/2 sm:w-28">
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Turnaround (Days)</label>
                    <input
                      type="number"
                      value={s.turnaround}
                      onChange={e => {
                        const copy = [...slots];
                        copy[idx].turnaround = Number(e.target.value);
                        setSlots(copy);
                      }}
                      className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(idx)}
                    disabled={slots.length <= 1}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer mt-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-neutral-700 space-y-1">
            <div className="font-bold text-neutral-900 text-xs">AdSpace Escrow Guarantee for Creators:</div>
            <p className="text-[11px] text-neutral-600">
              When an advertiser books a slot, their full payment is deposited into AdSpace Escrow immediately. You never risk writing content or broadcasting without guaranteed payment.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              List Page & Publish Slots
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
