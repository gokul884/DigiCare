/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Lead } from '../types';

interface ContactFormProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => void;
}

export default function ContactForm({ onAddLead }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('SEO for Website');
  const [message, setMessage] = useState('');
  
  // Stateful flow control
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [error, setError] = useState('');

  // Live Consultative Estimates based on Service selection
  const serviceEstimates = useMemo(() => {
    switch (service) {
      case 'SEO for Website':
        return { timeline: '4-6 weeks implementation', traction: 'First results in 60-90 days', effort: 'Technical & Content heavy' };
      case 'Website Development':
        return { timeline: '4-8 weeks design & build', traction: 'Conversions live on launch', effort: 'Full frontend & backend architecture' };
      case 'Poster creation':
        return { timeline: '2-3 business days', traction: 'Visual assets delivered', effort: 'High-quality graphic design' };
      case 'Content Marketing':
        return { timeline: 'Ongoing monthly cadence', traction: 'Steady organic growth', effort: 'Expert-led copy & strategy' };
      default:
        return { timeline: '3-4 weeks setup', traction: 'Calculated organically', effort: 'Integrated multi-channel' };
    }
  }, [service]);

  // Mock schedule dates starting from current local time or near future
  const mockDates = [
    { id: 'd1', label: 'Mon, Jul 6', value: '2026-07-06' },
    { id: 'd2', label: 'Tue, Jul 7', value: '2026-07-07' },
    { id: 'd3', label: 'Wed, Jul 8', value: '2026-07-08' }
  ];

  const mockTimes = ['10:00 AM EST', '01:30 PM EST', '04:00 PM EST'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all the required form parameters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid business email.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate saving lead
    setTimeout(() => {
      onAddLead({ name, email, service, message });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleScheduleConfirm = () => {
    if (!selectedSlot) {
      setError('Please select an onboarding time slot to reserve.');
      return;
    }
    setError('');
    setIsScheduled(true);
  };

  return (
    <section id="contact" className="py-24 bg-on-secondary-fixed text-white overflow-hidden relative">
      {/* Abstract dark aesthetic background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-display-lg-mobile md:text-headline-lg leading-tight">
                Let's Build Your <span className="text-primary-container">Growth Strategy</span>
              </h2>
              <p className="font-sans text-body-lg text-secondary-fixed opacity-80 leading-relaxed max-w-xl">
                Ready to take your brand to the next level? Our consultants are standing by to perform a comprehensive digital audit and identify your highest-yielding growth opportunities.
              </p>
            </div>

            {/* Info Channels */}
            <div className="space-y-6 pt-2">
              
              {/* Studio */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-primary-container/15 flex items-center justify-center border border-primary-container/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-5.5 h-5.5 text-primary-container" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm text-white">Our Studio</h3>
                  <p className="text-xs text-secondary-fixed opacity-70 mt-1 leading-relaxed">
                    Salem , TamilNadu ,India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-primary-container/15 flex items-center justify-center border border-primary-container/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-5.5 h-5.5 text-primary-container" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm text-white">Email Us</h3>
                  <p className="text-xs text-secondary-fixed opacity-70 mt-1">
                    gokulkrisnan.digital@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-primary-container/15 flex items-center justify-center border border-primary-container/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Phone className="w-5.5 h-5.5 text-primary-container" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm text-white">Call Us</h3>
                  <p className="text-xs text-secondary-fixed opacity-70 mt-1">
                    +91 8667576957
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-surface-variant text-on-surface">
              
              {error && (
                <div className="mb-4 p-3.5 bg-error-container text-on-error-container text-xs rounded-lg font-semibold">
                  {error}
                </div>
              )}

              {/* STAGE 1: Standard Active Form */}
              {!isSubmitted && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-on-surface-variant block">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-on-surface-variant block">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Option */}
                  <div className="space-y-1.5">
                    <label htmlFor="interest-service" className="text-xs font-extrabold text-on-surface-variant block">Service of Interest</label>
                    <select
                      id="interest-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all cursor-pointer"
                    >
                      <option value="SEO for Website">SEO for Website</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Poster creation">Poster creation</option>
                      <option value="Content Marketing">Content Marketing</option>
                    </select>
                  </div>



                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-on-surface-variant block">Message *</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you grow?"
                      rows={4}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container transition-all resize-none"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-headline font-extrabold text-xs tracking-wider uppercase shadow-xl hover:opacity-95 transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Message'}
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </form>
              )}

              {/* STAGE 2: Scheduled Onboarding Success view */}
              {isSubmitted && !isScheduled && (
                <div className="text-center py-4 space-y-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-headline font-extrabold text-headline-md text-on-surface">
                      Inquiry Logged!
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                      Hi <strong>{name}</strong>, we've saved your inquiry for {service}. Reserve a 15-minute slot below to secure a calendar booking with our Director of Growth.
                    </p>
                  </div>

                  {/* Interactive slot picker */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-left">
                      Available Consult Dates:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {mockDates.map((date) => (
                        <div key={date.id} className="text-center">
                          <span className="text-[10px] font-bold text-on-surface block mb-1">
                            {date.label}
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {mockTimes.map((t) => {
                              const slotId = `${date.label} @ ${t}`;
                              const isSelected = selectedSlot === slotId;
                              return (
                                <button
                                  key={slotId}
                                  onClick={() => setSelectedSlot(slotId)}
                                  type="button"
                                  className={`py-1.5 px-1 rounded-md text-[9px] font-semibold border transition-all ${
                                    isSelected 
                                      ? 'bg-primary-container text-white border-primary-container shadow-sm' 
                                      : 'bg-surface-container-low text-on-surface border-surface-variant hover:border-primary-container/40'
                                  }`}
                                >
                                  {t.split(' ')[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-variant flex gap-3">
                    <button
                      onClick={handleScheduleConfirm}
                      className="flex-1 bg-on-secondary-fixed text-white py-3.5 rounded-xl font-headline font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-md"
                    >
                      Confirm Booking Slot
                    </button>
                    <button
                      onClick={() => setIsScheduled(true)}
                      className="border border-outline text-on-secondary-fixed px-4 py-3.5 rounded-xl font-headline font-bold text-xs tracking-wider uppercase hover:bg-surface-container transition-all"
                    >
                      Skip
                    </button>
                  </div>

                </div>
              )}

              {/* STAGE 3: Full Confirmed State */}
              {isSubmitted && isScheduled && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Clock className="w-9 h-9 text-primary-container" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-headline font-extrabold text-headline-md text-on-surface">
                      Consultation Reserved!
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      We have added this event to your calendar and dispatched an SMS alert.
                    </p>
                  </div>

                  <div className="bg-surface-container p-5 rounded-2xl border border-surface-variant text-left space-y-3 max-w-sm mx-auto">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-surface-variant/70">
                      <Calendar className="w-4.5 h-4.5 text-primary-container" />
                      <span className="text-xs font-extrabold text-on-surface">
                        Onboarding Meeting Card
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-on-surface">
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold">Client Contact:</p>
                      <p className="font-semibold">{name} &bull; {email}</p>
                    </div>

                    <div className="space-y-1 text-xs text-on-surface pt-1.5">
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold">Confirmed Slot:</p>
                      <p className="font-bold text-primary-container font-headline">
                        {selectedSlot || 'To be scheduled via email'}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-on-surface pt-1.5">
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold">Selected Service:</p>
                      <p className="font-semibold">{service} ({serviceEstimates.timeline})</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsScheduled(false);
                      setSelectedSlot(null);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="bg-primary text-white text-xs font-headline font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                  >
                    Send Another Message
                  </button>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
