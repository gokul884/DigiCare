/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

export default function About() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      title: 'Data-First Strategy & Research',
      summary: 'Before creating a single asset or keyword group, we perform deep-dive competitor mapping and conversion attribution audits.',
      details: 'We reverse-engineer what is currently generating revenue for your competitors. Our process uncovers hidden search terms, high-yield display channels, and tracks user behavior maps to eliminate budget waste immediately.'
    },
    {
      title: 'Bespoke Creative Execution',
      summary: 'Custom brand artwork, high-converting copy, and professional video assets structured explicitly to trigger client engagement.',
      details: 'Our creative team designs landing pages and social collateral that perfectly represent your premium brand. We specialize in visual narrative pacing and psychological triggers that turn casual visitors into convinced inquiries.'
    },
    {
      title: 'Transparent Performance Reporting',
      summary: 'No mock statistics or vague metrics. We establish real-time dashboard trackers showing actual qualified leads and exact CPA.',
      details: 'You will receive direct login access to unified Looker Studio dashboards. Every dollar spent on SEO or paid media is attributed in real time, giving your executive team complete clarity over growth yields.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-surface-container-low relative">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Interactive Copy pillar */}
          <div className="lg:col-span-6 space-y-6">
            
            <h2 className="font-headline font-extrabold text-headline-lg text-on-surface leading-snug">
              The 'One' Complete Solution for Your Digital Growth
            </h2>

            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              GrowthPulse was founded on a simple realization: the digital landscape is fragmented. Most agencies specialize in isolated silos. We provide a fully unified approach—integrating search, creativity, attribution, and server-side tracking into a single, high-yielding engine.
            </p>

            {/* Interactive Pillar List */}
            <div className="space-y-3 pt-2">
              {pillars.map((pillar, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-white border-primary-container shadow-md' 
                        : 'bg-white/50 border-surface-variant hover:bg-white hover:border-outline-variant'
                    }`}
                  >
                    <button
                      onClick={() => setActivePillar(isSelected ? null : idx)}
                      className="w-full flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 transition-colors ${
                          isSelected ? 'text-primary-container' : 'text-primary'
                        }`} />
                        <span className="font-headline font-bold text-sm text-on-surface">
                          {pillar.title}
                        </span>
                      </div>
                      {isSelected ? (
                        <ChevronUp className="w-4 h-4 text-on-surface-variant shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-on-surface-variant shrink-0" />
                      )}
                    </button>

                    {/* Expandable Pillar content */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isSelected ? 'max-h-40 opacity-100 mt-3 pt-3 border-t border-surface-variant' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-xs font-semibold text-primary mb-1">
                        {pillar.summary}
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {pillar.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: Architectural Dual shifted images */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            
            {/* Shifted Left Pillar Exterior building */}
            <div className="pt-12">
              <div className="rounded-2xl overflow-hidden shadow-soft border border-surface-variant">
                <OptimizedImage 
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500" 
                  alt="Minimalist office architecture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6mNncGUb5Z53tbE7X7Ghq-qNEIRLGOtoVI1By8BoUiz4nb7kzkRefcZpLpTiJbfDcPF0THM82SQLiP7xcMVnIFwytvKS2zMWjHhWlgSsUOJJkX4ABOu03Ay015sqo4tkk1Ce_iwSANHHJwXt5RiWaeiNsvRk4cJNX9MyIVjRMnRwx6JLOwzFJYUDdeVaxPAnGOOPApdtlKswwnPPa60GDccJZ_bnl0Y6cv9hI-uj3hdyyBKXnqSfchA"
                  defaultWidth={600}
                />
              </div>
            </div>

            {/* Shifted Right Workspace layout */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-soft border border-surface-variant">
                <OptimizedImage 
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500" 
                  alt="Modern creative workspace setup"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6KAeOMhQEGnzTxJY9yYpxPcvXcVff_PUshuuy-7x9NPordRFCnYj5ZSzhw1ti1uWCdd32ZfIdeWP8UH23RInuVoiniJngIwyterebasseHoUs3K6TCHOKkou-1GeLMjUKE31d1-Fr9VlmgV7RT5GwYCvakgRizWVrxov7I5Fp5bHXDwIMEzAG4itrafXxR2L1AaIow49hGDcorUT4EUOvRMOipwsGrRZBAapacUAS8OeUu5EsNEqdCQ"
                  defaultWidth={600}
                />
              </div>
            </div>

            {/* Subtle floater quote or metric bubble */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur border border-outline-variant p-4 rounded-xl shadow-lg text-center hidden md:block">
              <p className="text-xs font-bold text-on-surface leading-tight">GrowthPulse Agency</p>
              <p className="text-[10px] text-primary font-bold uppercase mt-0.5 tracking-wider">Integrity &bull; Accuracy</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
