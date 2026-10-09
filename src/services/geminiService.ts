import { GoogleGenAI } from '@google/genai';

interface GenerateAdCopyParams {
  brandName: string;
  websiteUrl: string;
  productDescription: string;
  targetAudience: string;
  pageName: string;
  pageCategory: string;
  slotFormat: string;
  keyOffer?: string;
}

export interface GeneratedAdCopyResult {
  primaryHook: string;
  captionText: string;
  suggestedHashtags: string[];
  callToAction: string;
  firstCommentTip: string;
}

export async function generateAdCopy(params: GenerateAdCopyParams): Promise<GeneratedAdCopyResult> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a high-performance Facebook advertising copywriter and influencer marketing strategist.
Create an authentic, high-converting Facebook sponsored post draft for an advertiser booking ad space on a creator's Facebook page.

Advertiser Brand: "${params.brandName}"
Website/URL: "${params.websiteUrl}"
Product Angle / Solution: "${params.productDescription}"
Target Offer / Discount: "${params.keyOffer || 'Standard offering'}"
Creator Facebook Page: "${params.pageName}" (Niche: ${params.pageCategory})
Slot Format: ${params.slotFormat}
Audience: ${params.targetAudience}

Requirements:
- Sound like the creator naturally recommending the product to their followers (no generic corporate robotic ad speak).
- Provide:
  1. An attention-grabbing first-line hook
  2. The main post body copy (100-180 words) with storytelling, value points, and natural transition
  3. 3-5 relevant Facebook hashtags
  4. A clear call to action
  5. A recommendation for the pinned first comment link
Format response strictly as valid JSON with keys:
"primaryHook", "captionText", "suggestedHashtags" (array of strings), "callToAction", "firstCommentTip"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return {
          primaryHook: parsed.primaryHook || 'Here is something we have been testing all week that genuinely impressed us:',
          captionText: parsed.captionText || '',
          suggestedHashtags: Array.isArray(parsed.suggestedHashtags) ? parsed.suggestedHashtags : ['#sponsored', `#${params.brandName.toLowerCase().replace(/\s+/g, '')}`],
          callToAction: parsed.callToAction || `Check them out at ${params.websiteUrl}`,
          firstCommentTip: parsed.firstCommentTip || `📌 Pinned Link: ${params.websiteUrl}`
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart copy synthesizer:', err);
    }
  }

  // High quality heuristic generator tailored to niche and format
  return fallbackGenerateAdCopy(params);
}

function fallbackGenerateAdCopy(params: GenerateAdCopyParams): GeneratedAdCopyResult {
  const brand = params.brandName.trim() || 'Our Featured Partner';
  const niche = params.pageCategory;
  const offer = params.keyOffer ? ` (${params.keyOffer})` : '';

  let hook = `Most people struggling with efficiency in ${niche.toLowerCase()} are looking at the wrong bottlenecks.`;
  let body = `We spent the last couple of weeks integrating ${brand} into our day-to-day workflow, and the difference is immediate.\n\n` +
    `What stood out most:\n` +
    `• ${params.productDescription || 'Engineered with meticulous focus on real-world reliability'}\n` +
    `• Zero complicated onboarding curves—up and running within minutes\n` +
    `• Real results without unnecessary overhead\n\n` +
    `If you've been looking for a dependable upgrade, definitely give their team a look${offer}.`;

  if (niche === 'Food & Dining') {
    hook = `The difference between an average meal and something truly memorable almost always comes down to technique and the right essentials.`;
    body = `We tested ${brand} in the kitchen this week, and the quality speaks for itself.\n\n` +
      `Here is why we're stocking it in our pantry:\n` +
      `• ${params.productDescription || 'Clean, authentic ingredients crafted without shortcuts'}\n` +
      `• Elevated flavor profiles that actually deliver on flavor\n` +
      `• Direct from producers who care about every small batch\n\n` +
      `Link below to explore their full selection${offer}.`;
  } else if (niche === 'Fitness & Wellness') {
    hook = `3 things we look for before recommending any training gear or supplement to our community:`;
    body = `1. Clinical backing and honest formulation\n` +
      `2. Measurable feedback in real training blocks\n` +
      `3. Zero gimmicks\n\n` +
      `${brand} checked every single box for our team. ${params.productDescription || 'Built for athletes who take recovery and longevity seriously.'}\n\n` +
      `Use the direct link below to support our page and test them out${offer}.`;
  } else if (niche === 'Business & Finance') {
    hook = `Every executive we speak with is trying to do more with tighter margins. Here is what's actually moving the needle:`;
    body = `We analyzed ${brand}'s recent case studies and product architecture.\n\n` +
      `Key findings:\n` +
      `• ${params.productDescription || 'Eliminates repetitive data fragmentation across teams'}\n` +
      `• Measurable time-to-value within the first billing cycle\n` +
      `• Enterprise-ready data security without enterprise complexity\n\n` +
      `Check out their live product tour and customer teardowns at the link below.`;
  }

  return {
    primaryHook: hook,
    captionText: `${hook}\n\n${body}`,
    suggestedHashtags: [
      `#${params.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      `#${niche.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      '#ad',
      '#partnership',
      '#featured'
    ],
    callToAction: `Explore ${brand} here: ${params.websiteUrl}`,
    firstCommentTip: `📌 Direct Sponsor Link: ${params.websiteUrl} — Use code COMMUNITY at checkout!`
  };
}
