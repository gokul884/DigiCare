/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles, 
  Target, 
  DollarSign, 
  Mail, 
  TrendingUp, 
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import { AuditRequest } from '../types';

interface InteractiveAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<AuditRequest, 'id' | 'timestamp' | 'status'>) => void;
}

export default function InteractiveAuditModal({ isOpen, onClose, onSubmit }: InteractiveAuditModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [objective, setObjective] = useState('');
  const [budget, setBudget] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && !objective) {
      setError('Please select a main growth objective to proceed.');
      return;
    }
    if (step === 2 && !budget) {
      setError('Please select a monthly ad budget tier.');
      return;
    }
    setError('');
    setStep((prev) => (prev + 1) as any);
  };

  const handlePrevStep = () => {
    setError('');
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmitWizard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('An email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid business email.');
      return;
    }

    setIsGenerating(true);
    setError('');

    // Simulate real AI analysis generating standard advice based on choices
    setTimeout(() => {
      onSubmit({ objective, budget, email });
      setIsGenerating(false);
      setStep(4);
    }, 1500);
  };

  const getCustomAdvice = () => {
    let focusPoints = [];
    let estimatedROI = '';
    let quickStrategy = '';

    if (objective === 'SEO Strategy') {
      focusPoints = [
        'Perform fully integrated semantic audit of competitors',
        'Identify 15+ high-volume, low-difficulty transactional keywords',
        'Fix rendering and Core Web Vitals speed blockages on homepage'
      ];
      estimatedROI = '+280% organic visibility';
      quickStrategy = 'A comprehensive hub-and-spoke content cluster built around your core services will compound organic growth without increasing paid ad spend.';
    } else if (objective === 'Paid Advertising') {
      focusPoints = [
        'Deploy server-side conversion tracking to decrease CPA',
        'Build granular lookalike audiences from existing clients',
        'Design 3 high-impact ad hook styles to increase hold rate'
      ];
      estimatedROI = '-35% Customer Acquisition Cost';
      quickStrategy = 'Transitioning from Last-Touch Attribution to Server-Side GTM signals will feed cleaner bidding metrics into Google/Meta Ads immediately.';
    } else if (objective === 'Social Media Growth') {
      focusPoints = [
        'Establish thought leadership on LinkedIn with expert-led articles',
        'Create a video-first short-form strategy (Reels / YouTube shorts)',
        'Design custom high-conversion graphic templates matching your brand'
      ];
      estimatedROI = '+150% community engagement';
      quickStrategy = 'Leveraging your leadership team’s personal networks on LinkedIn will drive high-trust B2B organic inbound leads much faster than corporate postings.';
    } else {
      focusPoints = [
        'Audit complete site traffic flow and uncover dropout spots',
        'Establish end-to-end multi-channel looker studio reporting',
        'Perform heat-mapping of core service pages'
      ];
      estimatedROI = '100% budget transparency & reallocation';
      quickStrategy = 'A deep technical digital sweep will isolate where your advertising budget is leaking, allowing us to redirect cash into proven high-conversion streams.';
    }

    return { focusPoints, estimatedROI, quickStrategy };
  };

  const advice = getCustomAdvice();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-secondary-fixed/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-surface-variant overflow-hidden z-10 transition-all">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-variant flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-container" />
            <span className="font-headline font-bold text-sm tracking-wide text-on-surface uppercase">
              Growth Roadmapping Wizard
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Progress Indicators */}
          {step < 4 && (
            <div className="flex justify-between items-center mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s 
                      ? 'bg-primary-container text-white scale-110 shadow-md shadow-primary-container/20' 
                      : step > s 
                        ? 'bg-primary text-white' 
                        : 'bg-surface-container text-on-surface-variant'
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`h-1 flex-1 mx-2 rounded ${
                      step > s ? 'bg-primary' : 'bg-surface-container'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          {/* STEP 1: Main Goal */}
          {step === 1 && (
            <div>
              <h3 className="font-headline text-headline-md text-on-surface mb-2">
                What is your main growth objective?
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                We will tailor your roadmap to address this specific pain point.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'SEO Strategy', desc: 'Dominate first page search rankings organically' },
                  { label: 'Paid Advertising', desc: 'Decrease conversion costs and scale lead volume' },
                  { label: 'Social Media Growth', desc: 'Build trusted corporate community presence' },
                  { label: 'Full Digital Audit', desc: 'Find tracking leaks and discover ROI opportunities' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setObjective(item.label);
                      setError('');
                    }}
                    type="button"
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group ${
                      objective === item.label
                        ? 'border-primary-container bg-primary-fixed/30 ring-2 ring-primary-container/20'
                        : 'border-surface-variant bg-white hover:border-primary-container/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      objective === item.label
                        ? 'border-primary-container bg-primary-container text-white'
                        : 'border-outline-variant group-hover:border-primary-container/50'
                    }`}>
                      {objective === item.label && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className="font-headline font-bold text-sm text-on-surface">{item.label}</p>
                      <p className="text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-2"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Budget */}
          {step === 2 && (
            <div>
              <h3 className="font-headline text-headline-md text-on-surface mb-2">
                What is your current monthly ad budget?
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                This helps us estimate resource allocation and suitable marketing playbooks.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'Under $5,000 / mo', desc: 'Local testing and initial search engine positioning' },
                  { value: '$5,000 - $15,000 / mo', desc: 'Sustained local scaling and search ranking capture' },
                  { value: '$15,000 - $50,000 / mo', desc: 'Full multi-channel capture, content engines, and custom funnels' },
                  { value: '$50,000+ / mo', desc: 'Enterprise expansion, cloud tracking, and custom BI solutions' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setBudget(item.value);
                      setError('');
                    }}
                    type="button"
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group ${
                      budget === item.value
                        ? 'border-primary-container bg-primary-fixed/30 ring-2 ring-primary-container/20'
                        : 'border-surface-variant bg-white hover:border-primary-container/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      budget === item.value
                        ? 'border-primary-container bg-primary-container text-white'
                        : 'border-outline-variant group-hover:border-primary-container/50'
                    }`}>
                      {budget === item.value && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className="font-headline font-bold text-sm text-on-surface">{item.value}</p>
                      <p className="text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrevStep}
                  className="border border-outline text-on-secondary-fixed px-5 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:bg-surface-container transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-2"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Email / Website Info */}
          {step === 3 && (
            <form onSubmit={handleSubmitWizard}>
              <h3 className="font-headline text-headline-md text-on-surface mb-2">
                Where should we send your custom report?
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                We will prepare a customized audit strategy presentation matching your inputs.
              </p>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant block">Company Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant" />
                    <input
                      required
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="e.g. www.yourcompany.com"
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-surface-variant rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant block">Business Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. decisionmaker@yourcompany.com"
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-surface-variant rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                    />
                  </div>
                </div>

                <div className="p-3 bg-surface-container rounded-lg flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-on-surface-variant mt-0.5 shrink-0" />
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    GrowthPulse respects database security. Your inputs are stored strictly locally in local storage for preview demonstration and will never be shared.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="border border-outline text-on-secondary-fixed px-5 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:bg-surface-container transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isGenerating ? 'Synthesizing...' : 'Generate Roadmap'} <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Strategy Output */}
          {step === 4 && (
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-headline text-headline-md text-on-surface mb-1">
                Strategy Roadmap Generated!
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                We have recorded your parameters. An expert consultant has been alerted.
              </p>

              {/* Dynamic generated strategic content */}
              <div className="bg-surface-container-low border border-outline-variant text-left rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4.5 h-4.5 text-primary-container" />
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                    Focus: {objective} &bull; Budget: {budget}
                  </span>
                </div>
                
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  <strong>Initial Assessment:</strong> {advice.quickStrategy}
                </p>

                <div className="space-y-2 border-t border-surface-variant pt-3">
                  <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
                    Immediate Actionable Milestones:
                  </p>
                  {advice.focusPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                      <span className="text-primary-container font-bold mt-0.5">&bull;</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-surface-variant flex justify-between items-center bg-white -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
                  <span className="text-xs text-on-surface-variant">Estimated ROI Target:</span>
                  <span className="text-sm font-bold text-primary-container font-headline">
                    {advice.estimatedROI}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    // Scroll to contact form
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 bg-on-secondary-fixed text-white py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  Schedule Consultation Call
                </button>
                <button
                  onClick={onClose}
                  className="border border-outline text-on-secondary-fixed px-5 py-3 rounded-lg font-headline font-bold text-xs tracking-wider uppercase hover:bg-surface-container transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
