import React from 'react';
import { Layers, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'campaigns' | 'creator_hub' | 'how_it_works';
  setActiveTab: (tab: 'explore' | 'campaigns' | 'creator_hub' | 'how_it_works') => void;
  activeRole: 'advertiser' | 'creator';
  setActiveRole: (role: 'advertiser' | 'creator') => void;
  onOpenListModal: () => void;
  activeBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  onOpenListModal,
  activeBookingsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          type="button"
          onClick={() => setActiveTab('explore')}
          className="text-xl font-bold tracking-tight text-neutral-950 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow-xs">
            A
          </span>
          <span>AdSpace</span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'explore'
                ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950'
                : 'hover:text-neutral-950'
            }`}
          >
            Explore Pages
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('how_it_works')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'how_it_works'
                ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950'
                : 'hover:text-neutral-950'
            }`}
          >
            How Escrow Works
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('advertiser');
              setActiveTab('campaigns');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'campaigns'
                ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950'
                : 'hover:text-neutral-950'
            }`}
          >
            <span>My Campaigns</span>
            {activeBookingsCount > 0 && (
              <span className="font-mono text-xs px-1.5 py-0.2 bg-neutral-100 text-neutral-800 rounded font-bold">
                {activeBookingsCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('creator');
              setActiveTab('creator_hub');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'creator_hub'
                ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950'
                : 'hover:text-neutral-950'
            }`}
          >
            Creator Portal
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeRole === 'advertiser' ? (
            <button
              type="button"
              onClick={onOpenListModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              List Your Facebook Page
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setActiveRole('advertiser');
                setActiveTab('explore');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Book Ad Space
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
