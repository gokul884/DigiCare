/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface AuditRequest {
  id: string;
  objective: string;
  budget: string;
  email: string;
  timestamp: string;
  status: 'pending' | 'analyzing' | 'completed';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  deliverables: string[];
  averageTimeline: string;
  roiPotential: string;
  bgColor?: string;
  textColor?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'Strategy' | 'SEO' | 'Creative';
  date: string;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  readTime: string;
  metaKeywords?: string;
}

// Static high-quality B2B content following the spec
export const SERVICES_DATA: Service[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    description: 'Dominate the first page. Our SEO specialists use technical audits and content excellence to put your brand where customers are looking.',
    icon: 'Search',
    details: 'Search is the most high-intent channel in digital marketing. Our SEO services optimize your entire architecture, from server-side vitals and schema markup to semantic keyword networks and authority backlinks.',
    deliverables: [
      'Comprehensive Core Web Vitals Audits',
      'Competitor Search Index Reverse-Engineering',
      'Semantic Keyword Architecture Mapping',
      'Premium Content Clusters & Copywriting',
      'High-Authority White-Hat Link Building'
    ],
    averageTimeline: '4-6 weeks for initial strategy implementation',
    roiPotential: '3x - 5x average organic traffic increase in 12 months'
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Stunning, blazing fast, and conversion-optimized websites built with modern frameworks to capture and convert every visitor.',
    icon: 'Code',
    details: 'Your website is your ultimate growth hub. We design and build responsive, fast-loading, and SEO-optimized sites that deliver a flawless user experience on every screen.',
    deliverables: [
      'Responsive Website Design & Architecture',
      'Blazing-Fast Loading Performance Optimization',
      'SEO-Ready Content Structure & Metadata',
      'Modern Frontend Framework Engineering (React, Tailwind)',
      'Custom Content Management System (CMS) Integrations'
    ],
    averageTimeline: '4-8 weeks for design, build, and launch',
    roiPotential: 'Over 120% improvement in mobile conversion rates'
  },
  {
    id: 'ppc',
    title: 'PPC Management',
    description: 'Maximum ROI with minimum waste. Hyper-targeted campaigns across Google Ads, LinkedIn, and social networks that convert clicks to revenue.',
    icon: 'MousePointer',
    details: 'Stop burning budget on generic keywords. We engineer surgical PPC campaigns using intent-based targeting, predictive bid models, and dynamic ad copy to drive high-intent leads.',
    deliverables: [
      'Multi-Channel Search & Display Campaigns',
      'Predictive Bid Modeling & Script Automation',
      'High-Converting landing page copy & designs',
      'Behavioral Re-targeting Funnels',
      'Cost-Per-Acquisition (CPA) Reduction Audits'
    ],
    averageTimeline: '1-2 weeks launch, ongoing optimization',
    roiPotential: '35% reduction in CPA, 150% rise in conversion rate'
  },
  {
    id: 'social',
    title: 'Social Media Strategy',
    description: 'Building brand conviction and vibrant communities. We shape platforms into powerful lead generation machines with creative authority.',
    icon: 'Share2',
    details: 'Social media isn\'t just about likes; it\'s about brand conviction. We develop high-impact organic and paid social blueprints that position your company as the obvious market choice.',
    deliverables: [
      'Social Platform Authority Positioning',
      'Video-First Content Engine (Reels/TikTok/LinkedIn)',
      'Active Community Cultivation & PR Safeguards',
      'Influencer/KOL Campaign Activation',
      'Granular Social Attribution Setup'
    ],
    averageTimeline: '3-4 weeks setup and custom style guides',
    roiPotential: '200% increase in brand impressions and social conversions'
  },
  {
    id: 'content',
    title: 'Content Marketing',
    description: 'Stories that resonate, stick, and sell. We build comprehensive content assets that answer prospects\' critical questions.',
    icon: 'FileText',
    details: 'Great content builds trust at scale. We write research-backed blogs, white papers, lead magnets, and case studies that move prospects smoothly from awareness to action.',
    deliverables: [
      'Full Funnel Content Strategy Roadmap',
      'Expert-Led Whitepapers & Industry Reports',
      'SEO-Optimized Deep Dive Blog Posts',
      'High-Converting Email Sequence Blueprints',
      'Interactive Tools & Assessment Lead Magnets'
    ],
    averageTimeline: 'Ongoing monthly content cadence',
    roiPotential: 'Consistent compounding organic lead generation'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics & BI',
    description: 'Turning raw data into actionable business intelligence. We provide real-time dashboards and deep-dive reporting so you always know where your marketing budget is working hardest.',
    icon: 'BarChart3',
    details: 'No more guessing what works. We deploy end-to-end server-side tracking, multi-touch attribution modeling, and automated executive dashboards that unite all your marketing streams into a single source of truth.',
    deliverables: [
      'Server-Side Event Tracking (GA4/GTM Cloud)',
      'Multi-Touch Conversion Attribution Models',
      'Real-time Looker Studio/PowerBI Dashboards',
      'Cohort Analysis & Customer Lifetime Value Tracking',
      'Automated Performance Alerts & Anomaly Detection'
    ],
    averageTimeline: '3-4 weeks for complete multi-source integration',
    roiPotential: '100% marketing spend transparency, 15%+ budget reallocated to high-yield'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: 'GrowthPulse transformed our digital presence within months. Our leads increased by 300% and the quality of those leads has never been better.',
    name: 'Sarah Jenkins',
    role: 'CEO',
    company: 'TechFlow Solutions',
    rating: 5,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzdUeAU4xx3mjTK2e_PKcJwgQ7kefORBwmT4hJDXBx56Mh8eVOoXyMIcBrNVZL4Uc6uCbaAna2kTl8V_I2HMdm-P0P-1WZpP31WCnFqw0BpLSRvWTe9hM4rdig89jLy99pyUKZdBis0zJxl5hu5EIlPMWOpCFYI-YhC71XxbQiW28-GM3xWHJxF-WQLTV0P2mrBcF2x5e5XZVxx3VqaPEfDNN5E4TNjxmEzctn3hCWz-T_w5Q_lWGWpA'
  },
  {
    id: 't2',
    quote: 'The data-driven approach is what sets them apart. They don\'t guess; they know. Every decision is backed by solid research and results.',
    name: 'Michael Chen',
    role: 'Director of Marketing',
    company: 'BlueFin Corporate',
    rating: 5,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpQY7kE7nCnltfTkVg4CCdxQrNydvQyl00lrtSYDSffA-fFHAQ2_ehKkpnHh-CrBKwpsYA2Gy4kyYjGH_OB5fpSimB8FmPHDmjy-2vXk0asVoZfwL3vFB7e72QRy2Bsl6sAqSJlbvuc_-P93e15PtAlgdeV9yjQHsF44HWXtgjfw7u0aziS2zejz0gig6DBuN82c1lGL7Z4ZZqSx2z6X3z0QkQE5u1cfOMXMilVoEpTaqPYr-Kg7NHzw'
  },
  {
    id: 't3',
    quote: 'Working with GrowthPulse feels like having a world-class growth team embedded in your company. Their transparency and focus on metrics is unparalleled.',
    name: 'Elena Rostova',
    role: 'VP of Growth',
    company: 'Aura Security',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't4',
    quote: 'Their paid search audits uncovered thousands of dollars of wasted spend, which they reallocated to high-intent campaigns. Best marketing ROI we have ever had.',
    name: 'Marcus Sterling',
    role: 'Chief Revenue Officer',
    company: 'Velo Logistics',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of AI in Digital Ad Spend',
    description: 'How machine learning is redefining the way brands target high-intent audiences and optimize multi-channel media budgets.',
    category: 'Strategy',
    date: 'Jun 28, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6nUOhB6_oCa8_1yzCsNykA1TSwtRBZ_Fgu1sW-WEVcPzXL7GfEdrL2oDAXApWYYn2_jGz0V742Et4SwfDGiDaZZIRC7m-xqcZIjJb3jZiw264LXNy850P1q8egQl88Xc57udHpDM0qclZxrY-GtMCm73KbNeDCLZ-TBxeMas47FZNrmR8OBQBY-hhgn61MQulMayuPU_RtWvzR30GpndER5ykyPZYxVqKOtjvGQNwuUaiqca56NYO3g',
    author: 'Sarah Jenkins',
    authorRole: 'CEO & Founder',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzdUeAU4xx3mjTK2e_PKcJwgQ7kefORBwmT4hJDXBx56Mh8eVOoXyMIcBrNVZL4Uc6uCbaAna2kTl8V_I2HMdm-P0P-1WZpP31WCnFqw0BpLSRvWTe9hM4rdig89jLy99pyUKZdBis0zJxl5hu5EIlPMWOpCFYI-YhC71XxbQiW28-GM3xWHJxF-WQLTV0P2mrBcF2x5e5XZVxx3VqaPEfDNN5E4TNjxmEzctn3hCWz-T_w5Q_lWGWpA',
    readTime: '6 min read',
    metaKeywords: 'AI digital advertising, programmatic machine learning ad spend, predictive ad signal optimization, dynamic creative optimization, first party attribution platforms, ChatGPT search traffic growth',
    content: `
### Redefining Customer Acquisition with ML Engines

The programmatic landscape is shifting beneath our feet. For years, digital advertising relied heavily on user cookies and third-party tracking signals. Today, the deprecation of legacy data systems has forced a complete transition to server-side machine learning and first-party attribution.

#### 1. Server-Side Predictive Signals
Modern ad engines (like Google Smart Bidding and Meta Advantage+) work best when fed clean first-party conversion data. By deploying Cloud-GTM trackers, we supply real-time conversion signals directly to the platforms, allowing their neural networks to identify high-converting cohorts with surgical accuracy.

#### 2. Dynamic Creative Optimization (DCO)
AI is not here to replace human design, but to multiply its effectiveness. Generative copy platforms and smart layout engines test hundreds of headline combinations in parallel, automatically delivering the perfect pairing of graphic and text depending on the user's micro-context and intent indicators.

#### 3. Budget Synthesis
Advanced Multi-Touch Attribution (MTA) tools use Shapley value calculations to determine the exact influence of each touchpoint. By moving away from primitive "Last-Click" models, brands can reallocate up to 25% of wasted mid-funnel spend into high-yield search and conversion triggers.
    `
  },
  {
    id: 'b2',
    title: 'Core Web Vitals: More Than Just Speed',
    description: 'Understanding why user experience signals are now the most critical part of your technical SEO and search authority ranking.',
    category: 'SEO',
    date: 'Jun 15, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkygGdaw8AqZJODnLkHw2bZCfrobWvOjg1vbnx-MKgOH3nSsnYFiOabAoLcOr-N_YLJL1EgTH7lSPVSZJxDkxohUICHEzBi0LQcFPDA6fxqVG42jeUxHR-fQijcEXHVWy14JdVomwUFjpkFTvEzPg8Moqo9qRENdmMS1LESijkXSdb1YAS2Vj6isTNWHvxIGjfoFEGln8_RK12wuTyBZfjrMhrLbLEj0XgcbfXzi0NiG33mcH-Ac9Idw',
    author: 'Michael Chen',
    authorRole: 'SEO Principal',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpQY7kE7nCnltfTkVg4CCdxQrNydvQyl00lrtSYDSffA-fFHAQ2_ehKkpnHh-CrBKwpsYA2Gy4kyYjGH_OB5fpSimB8FmPHDmjy-2vXk0asVoZfwL3vFB7e72QRy2Bsl6sAqSJlbvuc_-P93e15PtAlgdeV9yjQHsF44HWXtgjfw7u0aziS2zejz0gig6DBuN82c1lGL7Z4ZZqSx2z6X3z0QkQE5u1cfOMXMilVoEpTaqPYr-Kg7NHzw',
    readTime: '5 min read',
    metaKeywords: 'Core Web Vitals SEO ranking signals, Largest Contentful Paint page speed optimization, Cumulative Layout Shift website stability, local business search engine visibility, INP interaction next paint, Google search ranking factor audit',
    content: `
### User Experience as the Ultimate Ranking Vector

Google's search algorithm has evolved from static backlink parsing into an immersive simulation of human behavior. Core Web Vitals (CWV) measure how your users experience the speed, responsiveness, and visual stability of your pages on real-world networks.

#### 1. LCP, FID, and CLS Explained
- **Largest Contentful Paint (LCP):** Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.
- **First Input Delay (FID) / INP (Interaction to Next Paint):** Measures page responsiveness. Interactive elements must respond in under 100ms.
- **Cumulative Layout Shift (CLS):** Measures visual stability. Keep layout shifting to a strict minimum (value below 0.1) by pre-allocating image slots.

#### 2. The Conversion Link
Technical performance is directly tied to the bottom line. Study after study shows that for every 100ms improvement in site load speed, conversion rates lift by an average of 8-10%. A fast page is not just an SEO preference; it is a high-yielding sales vector.

#### 3. Strategic Steps for Optimization
Always compress assets using modern formats (WebP/AVIF), split your CSS packages to prevent render-blocking styles, and implement lazy loading for non-critical elements below the fold.
    `
  },
  {
    id: 'b3',
    title: 'Bridging the Gap: Creative vs. Data',
    description: 'Why the most successful marketing campaigns are those that strike a flawless balance between artistic storytelling and hard data metrics.',
    category: 'Creative',
    date: 'May 30, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxaIUEKxhaKcwcQ5UL3hjC-I9H3ADxBQVkksyuE8NsrLRzDFK6zu7Z3ALECfaWP_IanEg2qqyOkQTGxdZsPAJJz6gpHpaS6e4ul5ADAmwiPwMp_RDf13rAawa-xqPKnEldojk4TUhNmp9JajYe0TDl0G2aVvYkxDLed83cTikRrK9PHSt1BpouRUCDeskyg8Ig3Dix7ImxCUgdSH5WwMO-Jka_0vTmZzfsPnDzCm82nu09qn_B_faSg',
    author: 'Emma Larson',
    authorRole: 'Creative Director',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    readTime: '4 min read',
    metaKeywords: 'creative and data driven marketing strategy, creative hook and hold rate optimization, emotion based visual storytelling, conversion tracking attribution metrics, high conversion design audit, creative branding and conversion analysis',
    content: `
### Creative Conviction Powered by Analytical Insights

For decades, the advertising world was split down the middle: the analytical media buyers on one side, and the passionate "Big Idea" copywriters and art directors on the other. In the modern era, high-performing growth teams integrate both disciplines into a singular, rapid-feedback loop.

#### 1. Creative as the Targeting Lever
In a privacy-first web ecosystem, targeting parameters are increasingly automated. The ad algorithms look at *who* interacts with your creative assets to find lookalikes. That means your design, your hook, and your color strategy actually act as your targeting mechanism!

#### 2. Reading Creative Feedback Metrics
Do not wait for 30 days to see if a campaign succeeds. Study the 3-second hook rate, the hold rate, and outbound CTRs. If the hook rate is low, iterate on the opening headline or visual entry. If the hold rate dips, tighten up the narrative rhythm.

#### 3. Designing with Guardrails
Having creative freedom is essential, but placing data-backed parameters keeps creative teams focused on what works. Maintain structured messaging matrices while allowing designers to experiment with emotional visual storytelling inside the grid.
    `
  }
];
