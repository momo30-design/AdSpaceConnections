import React, { useState } from 'react';
import { FacebookPage, AdSlotOption } from '../types';
import { FacebookPostSimulator } from './FacebookPostSimulator';
import { 
  X, CheckCircle2, Star, Clock, Calendar, Users, 
  ArrowRight, ShieldCheck, BarChart3, ExternalLink, Sparkles 
} from 'lucide-react';

interface PageDetailModalProps {
  page: FacebookPage | null;
  onClose: () => void;
  onSelectSlotToBook: (page: FacebookPage, slot: AdSlotOption) => void;
}

export const PageDetailModal: React.FC<PageDetailModalProps> = ({
  page,
  onClose,
  onSelectSlotToBook
}) => {
  if (!page) return null;

  const [activeTab, setActiveTab] = useState<'slots' | 'analytics' | 'simulator'>('slots');
  const [selectedSlotForSim, setSelectedSlotForSim] = useState<AdSlotOption>(page.slots[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header with Page Banner */}
        <div className="relative h-48 sm:h-56 bg-neutral-950 shrink-0">
          <img
            src={page.coverImage}
            alt={page.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Page Identity Block */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={page.avatarImage}
                alt={page.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-white shadow-md shrink-0"
              />
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                    {page.name}
                  </h2>
                  {page.verified && (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400 shrink-0" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mt-1">
                  <span className="font-mono">{page.handle}</span>
                  <span>·</span>
                  <span>{page.category}</span>
                  <span>·</span>
                  <span>Est. {page.pageCreationYear}</span>
                </div>
              </div>
            </div>

            {/* Quick Ratings & Response */}
            <div className="flex items-center gap-4 text-xs text-white/90 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-xs font-mono">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold">{page.rating.toFixed(2)}</span>
                <span className="text-white/70">({page.completedBookings} bookings)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{page.responseTimeHours}h turnaround response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-neutral-200 bg-white flex items-center gap-6 text-sm font-semibold text-neutral-600 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('slots')}
            className={`py-3.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'slots'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            Ad Slot Packages ({page.slots.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            Audience & Verified Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`py-3.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            Ad Placement Simulator
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'slots' && (
            <div className="space-y-6">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold text-neutral-900">About this Page: </span>
                {page.bio}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-5 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all flex flex-col justify-between space-y-4 bg-white shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                            {slot.format === 'feed_post' ? 'Feed Post' :
                             slot.format === 'reel_feature' ? 'Reel Video' :
                             slot.format === 'story_swipe' ? 'Story (24h)' :
                             slot.format === 'cover_takeover' ? 'Cover Banner Takeover' : 'Group Pinned Announcement'}
                          </div>
                          <h4 className="font-bold text-base text-neutral-950 mt-0.5">
                            {slot.name}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-extrabold text-neutral-950 font-mono tabular-nums">
                            ${slot.price}
                          </div>
                          <div className="text-[11px] text-neutral-400">USD</div>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {slot.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                        <div className="text-[11px] font-semibold text-neutral-700">What’s included:</div>
                        {slot.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 font-mono">
                        <span>Turnaround: {slot.turnaroundDays} business days</span>
                        <span>Best for: {slot.bestFor}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSlotForSim(slot);
                          setActiveTab('simulator');
                        }}
                        className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 underline cursor-pointer"
                      >
                        Preview Mockup
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectSlotToBook(page, slot)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Book This Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Escrow Guarantee Banner */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <span className="font-bold">AdSpace Escrow Protection: </span>
                  Your payment is securely held by AdSpace and is only transferred to {page.name} after the post is published live and verified with authentic Facebook analytics. If the creator fails to broadcast your brief on time, you receive a full 100% refund.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Audience Snapshot Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500">Verified Followers</div>
                  <div className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-1">
                    {page.followerCount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">100% Organic</div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500">Engagement Rate</div>
                  <div className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-1">
                    {page.engagementRate}%
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-1">Platform avg: 2.1%</div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500">Avg Post Reach</div>
                  <div className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-1">
                    {page.avgReachPerPost.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-1">Last 90 days</div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500">Completed Deals</div>
                  <div className="text-2xl font-extrabold text-neutral-900 font-mono tabular-nums mt-1">
                    {page.completedBookings}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">100% completion</div>
                </div>
              </div>

              {/* Geographic & Age Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-neutral-200 rounded-xl bg-white space-y-4">
                  <h4 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
                    <Users className="w-4 h-4 text-neutral-600" />
                    <span>Audience Geography & Age Bracket</span>
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-neutral-700 font-medium mb-1">
                        <span>Top Country: {page.demographics.topCountry}</span>
                        <span className="font-mono tabular-nums">{page.demographics.countryShare}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${page.demographics.countryShare}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-neutral-700 font-medium mb-1">
                        <span>Primary Age: {page.demographics.primaryAgeBracket}</span>
                        <span className="font-mono tabular-nums">{page.demographics.ageBracketShare}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-800 rounded-full"
                          style={{ width: `${page.demographics.ageBracketShare}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600 font-mono">
                    <span>Gender Split:</span>
                    <span>{page.demographics.genderRatio.male}% Male · {page.demographics.genderRatio.female}% Female</span>
                  </div>
                </div>

                {/* Performance Track Record */}
                <div className="p-5 border border-neutral-200 rounded-xl bg-white space-y-4">
                  <h4 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-neutral-600" />
                    <span>Recent Post Benchmark</span>
                  </h4>

                  {page.featuredPostPreview && (
                    <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                      <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                        Sample Top Organic Broadcast
                      </div>
                      <p className="text-xs text-neutral-700 italic">
                        "{page.featuredPostPreview.caption}"
                      </p>
                      <div className="pt-2 flex items-center gap-4 text-xs font-mono tabular-nums text-neutral-800">
                        <span>❤️ {page.featuredPostPreview.likes}</span>
                        <span>💬 {page.featuredPostPreview.comments}</span>
                        <span>🔄 {page.featuredPostPreview.shares}</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Page analytics are verified monthly via Facebook Graph API token verification. Last audit: 4 days ago.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">
                    Live Placement Preview
                  </h4>
                  <p className="text-xs text-neutral-500">
                    See how your sponsored message appears directly on {page.name}'s page feed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectSlotToBook(page, selectedSlotForSim)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Book Ad Placement (${selectedSlotForSim.price})
                </button>
              </div>

              <FacebookPostSimulator
                page={page}
                format={selectedSlotForSim.format}
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:px-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-neutral-500">
            Funds safeguarded by AdSpace Escrow Guarantee.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
