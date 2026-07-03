/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  MousePointer,
  Share2, 
  FileText, 
  BarChart3,
  Code,
  ArrowRight, 
  Check, 
  Calendar, 
  TrendingUp, 
  X
} from 'lucide-react';
import { SERVICES_DATA, Service } from '../types';

interface ServicesProps {
  onOpenAnalyticsDemo: () => void;
  onGetStartedClick: () => void;
}

export default function Services({ onOpenAnalyticsDemo, onGetStartedClick }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Helper to map string to actual Lucide component
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className={className} />;
      case 'MousePointer':
        return <MousePointer className={className} />;
      case 'Share2':
        return <Share2 className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'BarChart3':
        return <BarChart3 className={className} />;
      case 'Code':
        return <Code className={className} />;
      default:
        return <Search className={className} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline font-extrabold text-headline-lg text-on-surface">
            Precision Services for Peak Performance
          </h2>
          <p className="font-sans text-body-md text-on-surface-variant max-w-2xl mx-auto">
            We don't just run ads; we engineer organic and paid growth through a comprehensive suite of digital marketing tools.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          
          {/* Card 1: SEO (Full width top featured card) */}
          <div 
            className="md:col-span-6 lg:col-span-12 bg-white p-8 md:p-10 rounded-3xl border border-surface-variant shadow-soft micro-lift group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="max-w-3xl">
              <div className="w-14 h-14 bg-primary-container flex items-center justify-center rounded-2xl mb-6 text-white group-hover:scale-105 transition-transform duration-300">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-headline font-bold text-headline-md text-on-surface mb-3">
                Search Engine Optimization
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant">
                Dominate the first page. Our SEO specialists use technical audits and content excellence to put your brand where customers are actively looking.
              </p>
            </div>
          </div>

          {/* Card 2: Web Development */}
          <div 
            className="md:col-span-2 lg:col-span-4 bg-white p-8 rounded-3xl border border-surface-variant shadow-soft micro-lift group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-on-secondary-fixed flex items-center justify-center rounded-2xl mb-6 text-white group-hover:scale-105 transition-transform duration-300">
                <Code className="w-7 h-7 text-primary-fixed" />
              </div>
              <h3 className="font-headline font-bold text-sm tracking-wide text-on-surface uppercase mb-2">
                Web Development
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Stunning, responsive, and blazing-fast websites engineered to capture leads and deliver seamless experiences.
              </p>
            </div>
          </div>

          {/* Card 3: Social Media */}
          <div 
            className="md:col-span-2 lg:col-span-4 bg-white p-8 rounded-3xl border border-surface-variant shadow-soft micro-lift group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-on-secondary-fixed flex items-center justify-center rounded-2xl mb-6 text-white group-hover:scale-105 transition-transform duration-300">
                <Share2 className="w-7 h-7 text-primary-fixed" />
              </div>
              <h3 className="font-headline font-bold text-sm tracking-wide text-on-surface uppercase mb-2">
                Social Media
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Building active brand conviction and vibrant community groups that convert followers into client inquiries.
              </p>
            </div>
          </div>

          {/* Card 4: Content Marketing */}
          <div 
            className="md:col-span-2 lg:col-span-4 bg-white p-8 rounded-3xl border border-surface-variant shadow-soft micro-lift group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-on-secondary-fixed flex items-center justify-center rounded-2xl mb-6 text-white group-hover:scale-105 transition-transform duration-300">
                <FileText className="w-7 h-7 text-primary-fixed" />
              </div>
              <h3 className="font-headline font-bold text-sm tracking-wide text-on-surface uppercase mb-2">
                Content Marketing
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Compelling industry stories, professional case copy, and expert lead magnets that capture audience interest.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* SERVICE DETAIL POPUP OVERLAY */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-on-secondary-fixed/55 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-surface-variant overflow-hidden z-10">
            {/* Header banner */}
            <div className="px-6 py-5 bg-surface-container border-b border-surface-variant flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {getIcon(selectedService.icon, "w-5.5 h-5.5")}
                </div>
                <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wide">
                  {selectedService.title} Detail
                </h4>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-primary font-headline mb-2 uppercase tracking-wide">
                  Technical Overview & Execution
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedService.details}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Core Monthly Deliverables:
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedService.deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 bg-surface-container-low p-2.5 rounded-lg border border-surface-variant">
                      <div className="w-5 h-5 bg-primary-container rounded-full flex items-center justify-center text-white shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-on-surface font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance / Timeline metrics info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-variant">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold uppercase tracking-wide text-[10px]">Average Onboarding</span>
                  </div>
                  <p className="text-xs font-bold text-on-surface">
                    {selectedService.averageTimeline}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold uppercase tracking-wide text-[10px] text-green-600">Expected Growth Target</span>
                  </div>
                  <p className="text-xs font-bold text-green-600 font-headline">
                    {selectedService.roiPotential}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onGetStartedClick();
                  }}
                  className="flex-1 bg-primary-container text-on-primary-container py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-all"
                >
                  Create custom {selectedService.title} Roadmap
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="border border-outline text-on-secondary-fixed px-5 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:bg-surface-container transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
