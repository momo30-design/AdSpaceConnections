import React from 'react';
import { HERO_IMAGE } from '../data/mockData';
import { ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Users } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenHowItWorks }) => {
  return (
    <section className="border-b border-neutral-200 bg-white">
      {/* 2-Column Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
              <span>Direct Creator Advertising</span>
              <span aria-hidden="true">·</span>
              <span>Facebook Pages & Groups</span>
              <span aria-hidden="true">·</span>
              <span>100% Escrow Protected</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Direct Facebook Ad Space From Pages Your Customers Follow
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Bypass opaque programmatic bidding algorithms. Book guaranteed sponsored posts, reel integrations, story takeovers, and pinned group announcements directly from vetted Facebook creators. Funds remain securely held in escrow until proof of broadcast is verified.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Facebook Ad Slots</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenHowItWorks}
                className="px-5 py-3 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-neutral-600" />
                <span>How Escrow Protection Works</span>
              </button>
            </div>

            {/* Micro Trust Points (Unboxed metadata with subtle dots) */}
            <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-800" />
                <span>Direct page admin access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-800" />
                <span>Verified audience demographic sheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-800" />
                <span>Zero creator payment until verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Image */}
          <div className="lg:col-span-5 relative">
            <div className="h-full min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative group bg-neutral-950">
              <img
                src={HERO_IMAGE}
                alt="AdSpace Digital Media Marketing Workspace"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Overlay Stat Capsule */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-md">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 pb-2 border-b border-neutral-200/60">
                  <span>Recent Escrow Payout Verified</span>
                  <span className="font-mono text-emerald-700 font-bold tabular-nums">$750.00 Released</span>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-neutral-600">
                  <span>TechPulse Weekly · 60s Reel Feature</span>
                  <span className="tabular-nums font-mono font-medium">114k organic views</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Column KPI Strip Full-Width Row Below Split */}
      <div className="border-t border-neutral-200 bg-neutral-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums font-mono">
                $2.4M+
              </div>
              <div className="text-xs font-medium text-neutral-500 mt-0.5">
                Advertising escrow safeguarded
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums font-mono">
                850+
              </div>
              <div className="text-xs font-medium text-neutral-500 mt-0.5">
                Vetted Facebook creators & pages
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums font-mono">
                18.4M
              </div>
              <div className="text-xs font-medium text-neutral-500 mt-0.5">
                Total aggregate follower reach
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums font-mono">
                99.2%
              </div>
              <div className="text-xs font-medium text-neutral-500 mt-0.5">
                On-time publication delivery rate
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
