import React, { useState } from 'react';
import { BookingOrder, BookingStatus } from '../types';
import { 
  ShieldCheck, ExternalLink, MessageSquare, CheckCircle2, 
  Clock, AlertCircle, ArrowUpRight, BarChart2, DollarSign, Send 
} from 'lucide-react';

interface AdvertiserDashboardProps {
  bookings: BookingOrder[];
  onReleaseEscrow: (bookingId: string) => void;
  onRequestRevision: (bookingId: string, note: string) => void;
  onSendMessage: (bookingId: string, message: string) => void;
  onExploreMore: () => void;
}

export const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({
  bookings,
  onReleaseEscrow,
  onRequestRevision,
  onSendMessage,
  onExploreMore
}) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings.length > 0 ? bookings[0].id : ''
  );
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [revisionNote, setRevisionNote] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const selectedBooking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  const filteredBookings = bookings.filter(b => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'live') return b.status === 'published_live';
    if (filterStatus === 'pending') return b.status === 'pending_creator_review' || b.status === 'draft_submitted';
    if (filterStatus === 'completed') return b.status === 'completed_payout';
    return true;
  });

  const totalSpent = bookings.reduce((acc, curr) => acc + curr.totalPaid, 0);
  const totalInEscrow = bookings
    .filter(b => b.escrowStatus === 'held_in_escrow')
    .reduce((acc, curr) => acc + curr.totalPaid, 0);
  const totalReachDelivered = bookings.reduce((acc, curr) => acc + (curr.metrics?.reach || 0), 0);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'published_live':
        return <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Live on Facebook</span>;
      case 'completed_payout':
        return <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">Completed & Released</span>;
      case 'draft_submitted':
        return <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Draft Awaiting Approval</span>;
      case 'pending_creator_review':
        return <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Awaiting Creator Confirmation</span>;
      case 'revision_requested':
        return <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Revision Requested</span>;
      default:
        return <span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">In Progress</span>;
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedBooking) return;
    onSendMessage(selectedBooking.id, chatMessage);
    setChatMessage('');
  };

  const handleSendRevision = () => {
    if (!revisionNote.trim() || !selectedBooking) return;
    onRequestRevision(selectedBooking.id, revisionNote);
    setRevisionNote('');
    setShowRevisionInput(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Advertiser Management Center
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 mt-1">
            My Booked Facebook Ad Spaces
          </h1>
        </div>

        <button
          type="button"
          onClick={onExploreMore}
          className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <span>Find More Facebook Ad Slots</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Financial & Reach Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Funds Secured in Escrow</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-950 mt-1">
            ${totalInEscrow.toFixed(2)}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            Released strictly upon post verification
          </div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-blue-600" />
            <span>Total Organic Reach Delivered</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-950 mt-1">
            {totalReachDelivered.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Verified across live broadcasts
          </div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-neutral-600" />
            <span>Lifetime Ad Space Investment</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-950 mt-1">
            ${totalSpent.toFixed(2)}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            Across {bookings.length} creator deals
          </div>
        </div>
      </div>

      {/* Main Split Layout: Orders List (Left) + Order Details & Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Bookings Rail */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-neutral-900">
              Active Bookings ({bookings.length})
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-0.5 bg-neutral-100 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterStatus === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('live')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterStatus === 'live' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                }`}
              >
                Live
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('pending')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterStatus === 'pending' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                }`}
              >
                Draft
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBookingId(b.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedBooking?.id === b.id
                    ? 'border-neutral-950 bg-white shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={b.pageAvatar}
                      alt={b.pageName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-neutral-900 truncate">
                        {b.pageName}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-mono">
                        {b.id} · {b.slotName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-xs text-neutral-900 tabular-nums">
                      ${b.totalPaid.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
                  <div>{getStatusBadge(b.status)}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Target: {b.targetDate}
                  </div>
                </div>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <div className="p-8 text-center bg-white border border-neutral-200 rounded-xl text-neutral-500 text-xs">
                No campaigns match this filter.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Selected Booking Deep Dive */}
        {selectedBooking && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-6">
              
              {/* Order Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-500">{selectedBooking.id}</span>
                    <span>·</span>
                    <span className="text-xs text-neutral-600">Created {new Date(selectedBooking.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-neutral-950 mt-1">
                    {selectedBooking.pageName} — {selectedBooking.slotName}
                  </h3>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    For brand: <strong className="text-neutral-800">{selectedBooking.businessName}</strong> ({selectedBooking.websiteUrl})
                  </div>
                </div>

                <div>
                  {getStatusBadge(selectedBooking.status)}
                </div>
              </div>

              {/* Escrow Status & Protection Guard */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-500">Escrow Deposit Status</div>
                  <div className="text-sm font-bold text-neutral-900 font-mono mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {selectedBooking.escrowStatus === 'held_in_escrow'
                        ? `$${selectedBooking.totalPaid.toFixed(2)} Secured in AdSpace Escrow`
                        : 'Escrow Released to Page Creator'}
                    </span>
                  </div>
                </div>

                {selectedBooking.status === 'published_live' && selectedBooking.escrowStatus === 'held_in_escrow' && (
                  <button
                    type="button"
                    onClick={() => onReleaseEscrow(selectedBooking.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Release Escrow Payout to Creator
                  </button>
                )}
              </div>

              {/* Live Verification Proof (If Published) */}
              {selectedBooking.status === 'published_live' && (
                <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-bold text-sm text-neutral-950">
                        Live Broadcast Verified on Facebook
                      </h4>
                    </div>
                    {selectedBooking.livePostUrl && (
                      <a
                        href={selectedBooking.livePostUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 underline"
                      >
                        View Live Post on Facebook
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {selectedBooking.metrics && (
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t border-emerald-200/60 text-left">
                      <div className="p-2 bg-white rounded border border-emerald-100">
                        <div className="text-[10px] text-neutral-400 uppercase">Reach</div>
                        <div className="font-bold font-mono text-xs tabular-nums text-neutral-900">{selectedBooking.metrics.reach.toLocaleString()}</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-emerald-100">
                        <div className="text-[10px] text-neutral-400 uppercase">Clicks</div>
                        <div className="font-bold font-mono text-xs tabular-nums text-neutral-900">{selectedBooking.metrics.clicks.toLocaleString()}</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-emerald-100">
                        <div className="text-[10px] text-neutral-400 uppercase">Reactions</div>
                        <div className="font-bold font-mono text-xs tabular-nums text-neutral-900">{selectedBooking.metrics.reactions.toLocaleString()}</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-emerald-100">
                        <div className="text-[10px] text-neutral-400 uppercase">Comments</div>
                        <div className="font-bold font-mono text-xs tabular-nums text-neutral-900">{selectedBooking.metrics.comments.toLocaleString()}</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-emerald-100">
                        <div className="text-[10px] text-neutral-400 uppercase">Shares</div>
                        <div className="font-bold font-mono text-xs tabular-nums text-neutral-900">{selectedBooking.metrics.shares.toLocaleString()}</div>
                      </div>
                      <div className="p-2 bg-white rounded border border-emerald-100">
                        <div className="text-[10px] text-neutral-400 uppercase">Status</div>
                        <div className="font-bold font-mono text-xs text-emerald-600">Active</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Creative Brief Review */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
                  Campaign Creative Brief
                </h4>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">Key Angle / Talking Points: </span>
                    <span className="text-neutral-700">{selectedBooking.talkingPoints}</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Post Caption Draft: </span>
                    <p className="mt-1 text-neutral-700 whitespace-pre-line bg-white p-3 rounded border border-neutral-200">
                      {selectedBooking.captionDraft}
                    </p>
                  </div>
                </div>

                {/* Revision Request Trigger */}
                {selectedBooking.status === 'draft_submitted' && (
                  <div className="pt-2">
                    {!showRevisionInput ? (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setShowRevisionInput(true)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                        >
                          Request Copy Revision
                        </button>
                        <span className="text-xs text-neutral-500">
                          Creator will make changes prior to publishing.
                        </span>
                      </div>
                    ) : (
                      <div className="p-3 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                        <label className="block text-xs font-semibold text-rose-900">
                          Describe the changes needed:
                        </label>
                        <textarea
                          rows={2}
                          value={revisionNote}
                          onChange={e => setRevisionNote(e.target.value)}
                          placeholder="e.g. Please update the discount code to 'SUMMER20' and include a link to our demo page."
                          className="w-full p-2 text-xs border border-rose-300 rounded-lg focus:outline-hidden bg-white"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSendRevision}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer"
                          >
                            Send Revision Request
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowRevisionInput(false)}
                            className="text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Creator Direct Message Thread */}
              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Activity Log & Messages with {selectedBooking.pageName}</span>
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                  {selectedBooking.messages.map(m => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-lg ${
                        m.sender === 'advertiser'
                          ? 'bg-blue-50 text-blue-950 border border-blue-200 ml-4'
                          : 'bg-white text-neutral-900 border border-neutral-200 mr-4'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-neutral-500 mb-1">
                        <span className="font-bold">{m.senderName}</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{m.message}</p>
                    </div>
                  ))}
                </div>

                {/* Send chat message */}
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={e => setChatMessage(e.target.value)}
                    placeholder={`Message ${selectedBooking.pageName} admin directly...`}
                    className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
