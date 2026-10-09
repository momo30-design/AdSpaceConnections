import React, { useState } from 'react';
import { BookingOrder, FacebookPage, CreatorWallet } from '../types';
import { 
  DollarSign, ShieldCheck, ArrowDownRight, CheckCircle2, 
  ExternalLink, Clock, Send, Plus, Upload, Check 
} from 'lucide-react';

interface CreatorDashboardProps {
  wallet: CreatorWallet;
  pages: FacebookPage[];
  bookings: BookingOrder[];
  onAcceptBooking: (bookingId: string) => void;
  onSubmitDraft: (bookingId: string, draftNote: string) => void;
  onSubmitLiveProof: (bookingId: string, postUrl: string, reachNumber: number) => void;
  onOpenListNewPage: () => void;
  onWithdrawFunds: () => void;
}

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  wallet,
  pages,
  bookings,
  onAcceptBooking,
  onSubmitDraft,
  onSubmitLiveProof,
  onOpenListNewPage,
  onWithdrawFunds
}) => {
  const [activeBookingId, setActiveBookingId] = useState<string>(
    bookings.length > 0 ? bookings[0].id : ''
  );
  const [proofUrl, setProofUrl] = useState('https://facebook.com/techpulseweekly/posts/94827103829');
  const [proofReach, setProofReach] = useState('85000');
  const [draftNote, setDraftNote] = useState('');
  const [showProofModal, setShowProofModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const selectedBooking = bookings.find(b => b.id === activeBookingId) || bookings[0];

  const handleWithdraw = () => {
    onWithdrawFunds();
    setWithdrawSuccess(true);
    setTimeout(() => setWithdrawSuccess(false), 3000);
  };

  const handleSubmitProofAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    const reach = parseInt(proofReach.replace(/,/g, ''), 10) || 50000;
    onSubmitLiveProof(selectedBooking.id, proofUrl, reach);
    setShowProofModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Creator Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Page Owner & Creator Dashboard
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 mt-1">
            Creator Earnings & Ad Slot Fulfillments
          </h1>
        </div>

        <button
          type="button"
          onClick={onOpenListNewPage}
          className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>List Another Facebook Page</span>
        </button>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Available for Instant Payout</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-neutral-950">
            ${wallet.availableBalance.toFixed(2)}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500">{wallet.payoutAccount}</span>
            <button
              type="button"
              onClick={handleWithdraw}
              disabled={wallet.availableBalance <= 0}
              className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Withdraw Now
            </button>
          </div>
          {withdrawSuccess && (
            <div className="text-[11px] text-emerald-700 font-bold pt-1">
              ✓ Transfer initiated to your Stripe account!
            </div>
          )}
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Locked in Escrow (In Delivery)</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-neutral-950">
            ${wallet.escrowPendingBalance.toFixed(2)}
          </div>
          <p className="text-[11px] text-neutral-500 pt-1">
            Auto-released upon advertiser review & Facebook verification
          </p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Lifetime Creator Earnings</span>
            <CheckCircle2 className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-neutral-950">
            ${wallet.totalEarned.toFixed(2)}
          </div>
          <p className="text-[11px] text-neutral-500 pt-1">
            From verified sponsored placements
          </p>
        </div>
      </div>

      {/* Main Creator Operations Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Incoming & Active Bookings */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-sm text-neutral-900">
            Ad Space Booking Requests ({bookings.length})
          </h3>

          <div className="space-y-2">
            {bookings.map((b) => (
              <div
                key={b.id}
                onClick={() => setActiveBookingId(b.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedBooking?.id === b.id
                    ? 'border-neutral-950 bg-white shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-neutral-400">{b.id}</span>
                    <h4 className="font-bold text-sm text-neutral-900 mt-0.5">
                      {b.businessName}
                    </h4>
                    <p className="text-xs text-neutral-600">
                      {b.slotName} · {b.pageName}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-emerald-700 tabular-nums">
                      +${b.slotPrice.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-neutral-400">Escrow Held</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-600">
                    Target Broadcast: {b.targetDate}
                  </span>
                  <span className="font-semibold text-neutral-800">
                    {b.status === 'published_live' ? '✓ Live' : 
                     b.status === 'pending_creator_review' ? 'Needs Review' : 
                     b.status === 'draft_submitted' ? 'Draft Sent' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking Execution & Submit Proof */}
        {selectedBooking && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-6">
              
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>Deal {selectedBooking.id}</span>
                    <span>·</span>
                    <span>For {selectedBooking.pageName}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-neutral-950 mt-1">
                    {selectedBooking.businessName} — {selectedBooking.slotName}
                  </h3>
                  <a
                    href={selectedBooking.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>{selectedBooking.websiteUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-right">
                  <div className="text-xs text-neutral-500">Payout upon proof</div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-600 tabular-nums">
                    ${selectedBooking.slotPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Campaign Talking Points & Brief */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
                  Advertiser Brief & Instructions
                </h4>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">Core Objective: </span>
                    <span className="text-neutral-700">{selectedBooking.campaignGoal}</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Talking Points: </span>
                    <span className="text-neutral-700">{selectedBooking.talkingPoints}</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Suggested Copy Draft: </span>
                    <p className="mt-1 text-neutral-700 whitespace-pre-line bg-white p-3 rounded border border-neutral-200">
                      {selectedBooking.captionDraft}
                    </p>
                  </div>
                </div>
              </div>

              {/* Creator Fulfillment Actions */}
              <div className="space-y-3 pt-3 border-t border-neutral-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
                  Fulfillment Actions
                </h4>

                {selectedBooking.status === 'pending_creator_review' && (
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                    <div className="text-xs text-amber-950 font-medium">
                      Advertiser has deposited ${selectedBooking.totalPaid.toFixed(2)} in Escrow. Please accept the booking to begin drafting the content.
                    </div>
                    <button
                      type="button"
                      onClick={() => onAcceptBooking(selectedBooking.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors shadow-xs"
                    >
                      Accept Booking & Begin Drafting
                    </button>
                  </div>
                )}

                {selectedBooking.status === 'accepted' && (
                  <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
                    <div className="text-xs text-blue-950 font-medium">
                      Submit your content draft or creative preview for advertiser approval.
                    </div>
                    <textarea
                      rows={3}
                      value={draftNote}
                      onChange={e => setDraftNote(e.target.value)}
                      placeholder="Add draft preview or notes on the planned broadcast time..."
                      className="w-full p-2.5 text-xs bg-white border border-blue-200 rounded-lg focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onSubmitDraft(selectedBooking.id, draftNote || 'Draft prepared. Scheduling for broadcast.');
                        setDraftNote('');
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
                    >
                      Send Draft to Advertiser
                    </button>
                  </div>
                )}

                {(selectedBooking.status === 'draft_submitted' || selectedBooking.status === 'accepted') && (
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-emerald-950">
                        Ready to publish or already live?
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowProofModal(true)}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Live Post Proof</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-emerald-900">
                      Submitting your live Facebook link triggers the escrow verification process and unlocks your payout.
                    </p>
                  </div>
                )}

                {selectedBooking.status === 'published_live' && (
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Post is Live & Verified!</span>
                    </div>
                    <div className="text-xs text-neutral-600">
                      Live URL: <a href={selectedBooking.livePostUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">{selectedBooking.livePostUrl}</a>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Escrow of ${selectedBooking.slotPrice.toFixed(2)} will automatically credit to your available balance upon advertiser confirmation.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Proof Submission Modal */}
      {showProofModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <h3 className="font-bold text-lg text-neutral-950">
              Submit Live Post Proof for {selectedBooking.pageName}
            </h3>
            <p className="text-xs text-neutral-600">
              Provide the live Facebook post URL and initial reach numbers. This is verified by AdSpace and the advertiser.
            </p>

            <form onSubmit={handleSubmitProofAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Facebook Live Post URL
                </label>
                <input
                  type="url"
                  required
                  value={proofUrl}
                  onChange={e => setProofUrl(e.target.value)}
                  placeholder="https://facebook.com/yourpage/posts/..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Estimated Initial Organic Reach
                </label>
                <input
                  type="text"
                  required
                  value={proofReach}
                  onChange={e => setProofReach(e.target.value)}
                  placeholder="e.g. 65,000"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg text-[11px] text-neutral-500">
                Tip: Ensure the post remains public for the duration specified in your slot package terms.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProofModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-xs"
                >
                  Confirm & Mark Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
