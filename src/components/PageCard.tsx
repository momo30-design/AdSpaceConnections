import React from 'react';
import { FacebookPage } from '../types';
import { CheckCircle2, Star, Users, ArrowUpRight, Clock } from 'lucide-react';

interface PageCardProps {
  page: FacebookPage;
  onSelect: (page: FacebookPage) => void;
  onQuickBook: (page: FacebookPage) => void;
}

export const PageCard: React.FC<PageCardProps> = ({ page, onSelect, onQuickBook }) => {
  // Lowest starting price among slots
  const lowestPrice = Math.min(...page.slots.map(s => s.price));
  const formatFollowers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-all flex flex-col group shadow-xs">
      {/* Cover / Feature Visual */}
      <div className="relative aspect-16/10 bg-neutral-900 overflow-hidden cursor-pointer" onClick={() => onSelect(page)}>
        <img
          src={page.coverImage}
          alt={page.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        {/* Category & Status Overlay (clean text, no pills) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow-md">
          <span className="font-semibold text-white/90 tracking-wide uppercase text-[11px]">
            {page.category}
          </span>
          <div className="flex items-center gap-1 font-mono tabular-nums text-white/90">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
            <span className="font-semibold">{page.rating.toFixed(2)}</span>
            <span className="text-white/70">({page.completedBookings})</span>
          </div>
        </div>

        {/* Page Identity on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
          <img
            src={page.avatarImage}
            alt={page.name}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
          />
          <div className="min-w-0 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base truncate leading-tight drop-shadow-sm">
                {page.name}
              </h3>
              {page.verified && (
                <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400 shrink-0 inline" />
              )}
            </div>
            <p className="text-xs text-white/80 font-mono truncate">
              {page.handle}
            </p>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Bio */}
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
          {page.bio}
        </p>

        {/* Audience & Performance Metrics (clean unboxed tabular text) */}
        <div className="pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-left">
          <div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Followers</div>
            <div className="text-sm font-bold text-neutral-900 font-mono tabular-nums">
              {formatFollowers(page.followerCount)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Engagement</div>
            <div className="text-sm font-bold text-neutral-900 font-mono tabular-nums">
              {page.engagementRate}%
            </div>
          </div>
          <div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Avg Reach</div>
            <div className="text-sm font-bold text-neutral-900 font-mono tabular-nums">
              {formatFollowers(page.avgReachPerPost)}
            </div>
          </div>
        </div>

        {/* Audience Geography Kicker */}
        <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <div className="truncate">
            <span className="font-medium text-neutral-700">{page.demographics.topCountry}</span>
            <span> ({page.demographics.countryShare}%)</span>
            <span className="mx-1">·</span>
            <span>Ages {page.demographics.primaryAgeBracket}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400 shrink-0 font-mono">
            <Clock className="w-3 h-3" />
            <span>~{page.responseTimeHours}h reply</span>
          </div>
        </div>

        {/* Available Slot Formats Preview */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {page.slots.map(s => (
            <span
              key={s.id}
              className="text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-medium"
            >
              {s.format === 'feed_post' ? 'Feed Post' : 
               s.format === 'reel_feature' ? 'Reel Video' : 
               s.format === 'story_swipe' ? 'Story (24h)' : 
               s.format === 'cover_takeover' ? 'Cover Banner' : 'Group Pinned'}
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-neutral-400 leading-none">Starting from</div>
            <div className="text-lg font-bold text-neutral-950 font-mono tabular-nums leading-tight">
              ${lowestPrice}
              <span className="text-xs font-normal text-neutral-500"> /slot</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(page)}
              className="px-3.5 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              View Profile
            </button>
            <button
              type="button"
              onClick={() => onQuickBook(page)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span>Book Space</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
