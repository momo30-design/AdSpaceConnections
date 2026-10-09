import React, { useState } from 'react';
import { FacebookPage, AdSlotFormat } from '../types';
import { ThumbsUp, MessageSquare, Share2, Globe, CheckCircle2, ExternalLink } from 'lucide-react';

interface FacebookPostSimulatorProps {
  page: FacebookPage;
  brandName?: string;
  caption?: string;
  websiteUrl?: string;
  mediaUrl?: string;
  format?: AdSlotFormat;
}

export const FacebookPostSimulator: React.FC<FacebookPostSimulatorProps> = ({
  page,
  brandName = 'Your Brand Name',
  caption,
  websiteUrl = 'https://yourbrand.com/offer',
  mediaUrl,
  format = 'feed_post'
}) => {
  const [selectedFormat, setSelectedFormat] = useState<AdSlotFormat>(format);
  const [isExpanded, setIsExpanded] = useState(false);
  const [simulatedLiked, setSimulatedLiked] = useState(false);

  const displayCaption = caption || 
    `Excited to partner with ${brandName}! We’ve tested their platform thoroughly and the results speak for themselves. If you want to streamline your workflow with zero headaches, check them out today!`;

  const displayImage = mediaUrl || page.coverImage;
  const cleanDomain = websiteUrl ? websiteUrl.replace(/^https?:\/\//, '').split('/')[0] : 'yourbrand.com';

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Simulator Toolbar */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Live Ad Placement Preview</span>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs text-neutral-500">{page.name}</span>
        </div>
        <div className="flex items-center gap-1 p-0.5 bg-neutral-200/70 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setSelectedFormat('feed_post')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              selectedFormat === 'feed_post'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Feed Post
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat('reel_feature')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              selectedFormat === 'reel_feature'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Reel View
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat('story_swipe')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              selectedFormat === 'story_swipe'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Story Frame
          </button>
        </div>
      </div>

      {/* Simulator Viewport */}
      <div className="p-4 sm:p-6 bg-neutral-100 flex items-center justify-center min-h-[380px]">
        {selectedFormat === 'feed_post' ? (
          /* Facebook Feed Post Card */
          <div className="w-full max-w-lg bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden text-neutral-900">
            {/* Post Header */}
            <div className="p-3.5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={page.avatarImage}
                  alt={page.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm text-neutral-900 hover:underline cursor-pointer">
                      {page.name}
                    </span>
                    {page.verified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-600 inline" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <span className="font-medium text-neutral-700">Sponsored</span>
                    <span>·</span>
                    <span>Paid partnership with {brandName}</span>
                    <span>·</span>
                    <Globe className="w-3 h-3 text-neutral-400" />
                  </div>
                </div>
              </div>
              <div className="text-neutral-400 text-lg leading-none cursor-pointer px-1">···</div>
            </div>

            {/* Post Caption */}
            <div className="px-3.5 pb-3 text-sm text-neutral-800 leading-relaxed whitespace-pre-line">
              {isExpanded ? displayCaption : (
                <>
                  {displayCaption.length > 180 ? `${displayCaption.slice(0, 180)}... ` : displayCaption}
                  {displayCaption.length > 180 && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded(true)}
                      className="font-medium text-neutral-900 hover:underline inline ml-1"
                    >
                      See more
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Post Media Creative */}
            <div className="relative bg-neutral-950 aspect-16/9 overflow-hidden">
              <img
                src={displayImage}
                alt="Sponsored Creative"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Facebook Link Card Preview */}
            <div className="bg-neutral-50 p-3 border-t border-b border-neutral-200 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-neutral-500 truncate">
                  {cleanDomain}
                </div>
                <div className="text-sm font-semibold text-neutral-900 truncate">
                  {brandName} — Official Launch & Exclusive Offer
                </div>
                <div className="text-xs text-neutral-500 truncate">
                  Direct partnership offer via AdSpace verified verification.
                </div>
              </div>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 font-medium text-xs text-neutral-900 rounded transition-colors inline-flex items-center gap-1"
              >
                Learn More
                <ExternalLink className="w-3 h-3 text-neutral-600" />
              </a>
            </div>

            {/* Social Engagement Stats Strip */}
            <div className="px-3.5 py-2 flex items-center justify-between text-xs text-neutral-500 border-b border-neutral-100">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">👍</span>
                <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">❤️</span>
                <span className="tabular-nums font-mono text-neutral-700">
                  {page.featuredPostPreview ? page.featuredPostPreview.likes : '2.4K'}
                </span>
              </div>
              <div className="flex items-center gap-3 tabular-nums font-mono">
                <span>{page.featuredPostPreview ? page.featuredPostPreview.comments : '184'} comments</span>
                <span>{page.featuredPostPreview ? page.featuredPostPreview.shares : '92'} shares</span>
              </div>
            </div>

            {/* Action Bar (Like / Comment / Share) */}
            <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-neutral-600">
              <button
                type="button"
                onClick={() => setSimulatedLiked(!simulatedLiked)}
                className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded hover:bg-neutral-100 transition-colors ${
                  simulatedLiked ? 'text-blue-600' : ''
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button
                type="button"
                className="flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded hover:bg-neutral-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button
                type="button"
                className="flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded hover:bg-neutral-100 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ) : selectedFormat === 'reel_feature' ? (
          /* Facebook Reel Vertical Simulator */
          <div className="w-[280px] h-[480px] bg-neutral-900 rounded-2xl overflow-hidden relative shadow-lg border border-neutral-700 flex flex-col justify-between p-3.5 text-white">
            <img
              src={displayImage}
              alt="Reel background"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

            {/* Top Reel Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wider">Reels</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">Sponsored</span>
              </div>
              <div className="text-white/80">···</div>
            </div>

            {/* Right Action Rail */}
            <div className="relative z-10 self-end flex flex-col items-center gap-3 text-white text-xs">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-xs">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono mt-0.5">8.9K</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono mt-0.5">412</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-xs">
                  <Share2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono mt-0.5">730</span>
              </div>
            </div>

            {/* Bottom Reel Caption & Callout */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src={page.avatarImage}
                  alt={page.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-white/40"
                />
                <span className="font-semibold text-xs text-white">{page.name}</span>
                {page.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400 inline" />}
              </div>
              <p className="text-xs text-white/95 line-clamp-2 leading-relaxed">
                {displayCaption}
              </p>
              <div className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3 py-2 rounded-lg flex items-center justify-between">
                <span>Shop at {brandName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ) : (
          /* Facebook Story Frame Simulator */
          <div className="w-[280px] h-[480px] bg-neutral-900 rounded-2xl overflow-hidden relative shadow-lg border border-neutral-700 flex flex-col justify-between p-3.5 text-white">
            <img
              src={displayImage}
              alt="Story background"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

            {/* Top Story Header & Progress Bars */}
            <div className="relative z-10 space-y-2">
              <div className="flex gap-1">
                <div className="h-1 flex-1 bg-white rounded-full" />
                <div className="h-1 flex-1 bg-white/40 rounded-full" />
                <div className="h-1 flex-1 bg-white/40 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={page.avatarImage}
                    alt={page.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-white/40"
                  />
                  <div className="text-left">
                    <div className="font-bold text-xs flex items-center gap-1">
                      <span>{page.name}</span>
                      {page.verified && <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400" />}
                    </div>
                    <div className="text-[10px] text-white/80">Sponsored · 3h</div>
                  </div>
                </div>
                <div className="text-white/80 text-sm">✕</div>
              </div>
            </div>

            {/* Center / Bottom Interactive Link Sticker */}
            <div className="relative z-10 text-center space-y-3">
              <div className="inline-block bg-white text-neutral-900 font-bold text-xs px-4 py-2 rounded-xl shadow-lg border border-neutral-200 animate-bounce">
                🔗 {brandName} SPECIAL OFFER
              </div>
              <p className="text-xs text-white/90 font-medium drop-shadow-md">
                Swipe up or tap link sticker to visit {cleanDomain}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
