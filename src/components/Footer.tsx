import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onExplore: () => void;
  onHowItWorks: () => void;
  onListModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExplore, onHowItWorks, onListModal }) => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm">
                A
              </span>
              <span className="text-base font-bold text-neutral-950">AdSpace</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              The premier marketplace connecting high-growth businesses directly with verified Facebook creators and community page owners.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automated Escrow Protocol</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              For Businesses
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <button type="button" onClick={onExplore} className="hover:text-neutral-950 cursor-pointer">
                  Browse Facebook Ad Slots
                </button>
              </li>
              <li>
                <button type="button" onClick={onHowItWorks} className="hover:text-neutral-950 cursor-pointer">
                  Escrow Guarantee & Protection
                </button>
              </li>
              <li>
                <span className="text-neutral-400">Audience Verification API</span>
              </li>
              <li>
                <span className="text-neutral-400">Enterprise Campaign Manager</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              For Page Creators
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <button type="button" onClick={onListModal} className="hover:text-neutral-950 cursor-pointer">
                  List Your Facebook Page
                </button>
              </li>
              <li>
                <span className="text-neutral-400">Monetization Guidelines</span>
              </li>
              <li>
                <span className="text-neutral-400">Stripe Connect Payouts</span>
              </li>
              <li>
                <span className="text-neutral-400">Page Verification Standards</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Compliance & Safety
            </div>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              All booked advertising space complies with Meta Branded Content Policies. Creators tag sponsoring partners via Facebook's native Paid Partnership tool.
            </p>
            <div className="pt-2 text-neutral-400 text-[11px]">
              © {new Date().getFullYear()} AdSpace Technologies Inc. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
