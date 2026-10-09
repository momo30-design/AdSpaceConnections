import React from 'react';
import { X, ShieldCheck, CheckCircle2, DollarSign, Eye, RefreshCw } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
  onExplore: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose, onExplore }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        <div className="p-5 sm:px-6 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                AdSpace Protocol
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
                How AdSpace Escrow & Direct Booking Works
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Comparison Banner */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="font-bold text-rose-800 text-xs">Traditional Facebook Ads Manager</div>
              <ul className="space-y-1 text-neutral-600">
                <li>• Bidding wars inflate CPMs without warning</li>
                <li>• Banner blindness on generic sidebar ad slots</li>
                <li>• Algorithm bans accounts without human review</li>
              </ul>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-200 md:pl-4">
              <div className="font-bold text-emerald-800 text-xs">The AdSpace Direct Marketplace</div>
              <ul className="space-y-1 text-neutral-600">
                <li>• Fixed transparent pricing per slot / day</li>
                <li>• Organic posts directly on trusted creator feeds</li>
                <li>• 100% Escrow hold until live proof is verified</li>
              </ul>
            </div>
          </div>

          {/* 4 Step Process */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-neutral-900">
              The 4-Step Escrow Workflow
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">1</span>
                  <h4 className="font-bold text-sm text-neutral-950">Find & Vetted Match</h4>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Filter pages by niche, audience location, follower size, and engagement. Inspect audience age brackets and historical organic benchmarks.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">2</span>
                  <h4 className="font-bold text-sm text-neutral-950">Lock Deposit in Escrow</h4>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Book your preferred slot (Feed post, Reel, Story, or Cover takeover) and submit your creative brief. Funds are securely locked in AdSpace Escrow.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">3</span>
                  <h4 className="font-bold text-sm text-neutral-950">Draft Approval & Broadcast</h4>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  The page creator crafts custom editorial copy or adapts your brief. You approve the draft before they broadcast it to their followers.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">4</span>
                  <h4 className="font-bold text-sm text-neutral-950">Proof Verification & Release</h4>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  The creator submits the live Facebook link and real analytics. Once verified, escrow unlocks the payout to the creator.
                </p>
              </div>
            </div>
          </div>

          {/* Refund & Dispute Guarantee */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-blue-950">
            <div className="font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Full Refund Protection</span>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              If a creator fails to broadcast your sponsored post by the scheduled date, or fails to meet the slot deliverables, AdSpace issues an immediate 100% refund directly back to your original payment method.
            </p>
          </div>
        </div>

        <div className="p-5 sm:px-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="px-5 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Browse Available Ad Slots
          </button>
        </div>

      </div>
    </div>
  );
};
