import React, { useState } from 'react';
import { FacebookPage, AdSlotOption, BookingOrder } from '../types';
import { generateAdCopy } from '../services/geminiService';
import { 
  X, ShieldCheck, Sparkles, Check, ArrowRight, 
  CreditCard, Calendar, AlertCircle, Lock, Info, CheckCircle2 
} from 'lucide-react';

interface BookingModalProps {
  page: FacebookPage;
  initialSlot?: AdSlotOption;
  onClose: () => void;
  onConfirmBooking: (booking: BookingOrder) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  page,
  initialSlot,
  onClose,
  onConfirmBooking
}) => {
  const [selectedSlot, setSelectedSlot] = useState<AdSlotOption>(initialSlot || page.slots[0]);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Brief & Copy, 2: Escrow & Payment, 3: Confirmed

  // Form State
  const [businessName, setBusinessName] = useState('Nexus Cloud Analytics');
  const [businessEmail, setBusinessEmail] = useState('marketing@nexusanalytics.io');
  const [websiteUrl, setWebsiteUrl] = useState('https://nexusanalytics.io/trial');
  const [campaignGoal, setCampaignGoal] = useState<'Website Traffic' | 'Lead Generation' | 'App Installs' | 'Brand Awareness'>('Website Traffic');
  const [talkingPoints, setTalkingPoints] = useState('Highlight automated multi-cloud cost reduction by 38% and 5-minute setup.');
  const [captionDraft, setCaptionDraft] = useState('');
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });

  // AI Assistant State
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);

  // Confirmed booking state
  const [createdOrder, setCreatedOrder] = useState<BookingOrder | null>(null);

  // Financial calculations
  const slotPrice = selectedSlot.price;
  const escrowFee = Number((slotPrice * 0.03).toFixed(2));
  const platformFee = Number((slotPrice * 0.05).toFixed(2));
  const totalPaid = Number((slotPrice + escrowFee + platformFee).toFixed(2));

  const handleGenerateAiCopy = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await generateAdCopy({
        brandName: businessName,
        websiteUrl: websiteUrl,
        productDescription: talkingPoints,
        targetAudience: `${page.demographics.topCountry}, ages ${page.demographics.primaryAgeBracket}`,
        pageName: page.name,
        pageCategory: page.category,
        slotFormat: selectedSlot.name
      });

      setCaptionDraft(res.captionText);
      setAiGeneratedSuccess(true);
      setTimeout(() => setAiGeneratedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handlePayAndEscrow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newBooking: BookingOrder = {
        id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
        pageId: page.id,
        pageName: page.name,
        pageHandle: page.handle,
        pageAvatar: page.avatarImage,
        slotId: selectedSlot.id,
        slotName: selectedSlot.name,
        slotFormat: selectedSlot.format,
        businessName,
        businessEmail,
        websiteUrl,
        campaignGoal,
        captionDraft: captionDraft || `Partnering with ${businessName} to offer our community an exclusive look at their solution. Check out ${websiteUrl} for more!`,
        talkingPoints,
        targetDate,
        slotPrice,
        escrowFee,
        platformFee,
        totalPaid,
        escrowStatus: 'held_in_escrow',
        status: 'pending_creator_review',
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'advertiser',
            senderName: businessName,
            message: `Booking submitted and $${totalPaid} deposited into AdSpace Escrow. Target broadcast date: ${targetDate}. Looking forward to your creative draft!`,
            timestamp: new Date().toLocaleDateString()
          }
        ]
      };

      setCreatedOrder(newBooking);
      setIsProcessing(false);
      setStep(3);
      onConfirmBooking(newBooking);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:px-6 bg-white border-b border-neutral-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Secure Ad Space Booking
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
              Book on {page.name}
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

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-xs font-medium text-neutral-600">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${step >= 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
              1
            </span>
            <span className={step === 1 ? 'font-bold text-neutral-900' : ''}>Campaign Brief</span>
          </div>

          <span className="text-neutral-300">———</span>

          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${step >= 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
              2
            </span>
            <span className={step === 2 ? 'font-bold text-neutral-900' : ''}>Escrow & Payment</span>
          </div>

          <span className="text-neutral-300">———</span>

          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
              3
            </span>
            <span className={step === 3 ? 'font-bold text-emerald-700' : ''}>Confirmation</span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-5">
              {/* Slot Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Select Ad Format Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {page.slots.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                        selectedSlot.id === s.id
                          ? 'border-neutral-950 bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-xs text-neutral-900 leading-tight">
                          {s.name}
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-950 tabular-nums">
                          ${s.price}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        Turnaround: {s.turnaroundDays}d · {s.bestFor}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Name & Target URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Brand / Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    placeholder="e.g. Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Destination Landing Page (URL)
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={e => setWebsiteUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-mono"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Goal & Target Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Primary Campaign Objective
                  </label>
                  <select
                    value={campaignGoal}
                    onChange={e => setCampaignGoal(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 bg-white"
                  >
                    <option value="Website Traffic">Website Traffic</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="App Installs">App Installs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Target Broadcast Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
              </div>

              {/* Talking Points & Key Angle */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Key Value Propositions / Talking Points for {page.name}
                </label>
                <textarea
                  rows={2}
                  value={talkingPoints}
                  onChange={e => setTalkingPoints(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  placeholder="What key features or special discount offer should the page admin mention to their followers?"
                />
              </div>

              {/* Caption Draft with AI Copy Generator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-700">
                    Draft Post Caption (Optional or use AI)
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateAiCopy}
                    disabled={isGeneratingAi}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isGeneratingAi ? 'Synthesizing Tailored Copy...' : 'Generate with Gemini AI'}</span>
                  </button>
                </div>

                {aiGeneratedSuccess && (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    ✓ Tailored Facebook draft generated based on {page.name}'s audience!
                  </div>
                )}

                <textarea
                  rows={4}
                  value={captionDraft}
                  onChange={e => setCaptionDraft(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 font-sans leading-relaxed"
                  placeholder="You can provide your desired caption text or let the page creator adapt your talking points..."
                />
                <p className="text-[11px] text-neutral-400">
                  The page creator will review this draft and submit a final proof before broadcasting.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Booking Summary Box */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                <div className="text-xs font-semibold text-neutral-900 pb-2 border-b border-neutral-200 flex justify-between">
                  <span>Ad Space Package</span>
                  <span className="font-mono text-neutral-600">{page.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-700">
                  <span className="font-medium">{selectedSlot.name}</span>
                  <span className="font-mono tabular-nums font-bold">${slotPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>AdSpace Escrow Protection Fee (3%)</span>
                  <span className="font-mono tabular-nums">${escrowFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Platform Verification & Audit (5%)</span>
                  <span className="font-mono tabular-nums">${platformFee.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-sm font-extrabold text-neutral-950">
                  <span>Total Escrow Deposit:</span>
                  <span className="font-mono tabular-nums text-base">${totalPaid.toFixed(2)} USD</span>
                </div>
              </div>

              {/* How Escrow Protects You */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-950 leading-relaxed">
                  <span className="font-bold">100% Escrow Protection: </span>
                  Your payment of <strong className="font-mono">${totalPaid.toFixed(2)}</strong> will be locked in AdSpace Escrow. The creator will only receive payout after submitting the live post link and verified reach metrics. You hold full revision rights.
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-neutral-700">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-neutral-950 bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs font-semibold text-neutral-900">Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ach')}
                    className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'ach'
                        ? 'border-neutral-950 bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs font-semibold text-neutral-900">ACH Bank Transfer</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 border border-neutral-200 rounded-xl space-y-3 bg-white">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={e => setCardExp(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">CVC Security Code</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={e => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && createdOrder && (
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-neutral-950">
                  Ad Space Booking Confirmed!
                </h3>
                <p className="text-xs text-neutral-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Your funds of <span className="font-mono font-bold text-neutral-900">${createdOrder.totalPaid.toFixed(2)}</span> are now securely locked in AdSpace Escrow under Reference <strong className="font-mono text-neutral-900">{createdOrder.id}</strong>.
                </p>
              </div>

              {/* Timeline Next Steps */}
              <div className="max-w-md mx-auto p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left text-xs space-y-3">
                <div className="font-bold text-neutral-900">What happens next:</div>
                <div className="flex items-start gap-2 text-neutral-700">
                  <span className="font-mono font-bold text-neutral-900">1.</span>
                  <span>{page.name}'s page administrator has received your campaign brief and has <strong>{selectedSlot.turnaroundDays} business days</strong> to draft & review.</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-700">
                  <span className="font-mono font-bold text-neutral-900">2.</span>
                  <span>You will review their final draft before it goes live on target date: <strong>{targetDate}</strong>.</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-700">
                  <span className="font-mono font-bold text-neutral-900">3.</span>
                  <span>Escrow is only released after proof of live post and Facebook analytics are verified.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 sm:px-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3 shrink-0">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Continue to Escrow Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
              >
                Back to Brief
              </button>
              <button
                type="button"
                onClick={handlePayAndEscrow}
                disabled={isProcessing}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Securing Escrow Deposit...' : `Pay & Lock $${totalPaid.toFixed(2)} in Escrow`}</span>
              </button>
            </>
          )}

          {step === 3 && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                Close & View in My Campaigns
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
