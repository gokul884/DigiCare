/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  X, 
  TrendingUp, 
  MousePointer, 
  DollarSign, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  Percent, 
  Award, 
  BarChart3,
  RefreshCw
} from 'lucide-react';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsDashboardModal({ isOpen, onClose }: AnalyticsDashboardModalProps) {
  const [channelFilter, setChannelFilter] = useState<'All' | 'SEO' | 'PPC' | 'Social'>('All');
  const [timeframe, setTimeframe] = useState<'7d' | '30d'>('30d');
  const [attributionModel, setAttributionModel] = useState<'First' | 'Last' | 'Linear'>('Linear');

  if (!isOpen) return null;

  // Base mock metrics database
  const channelData = useMemo(() => {
    return {
      SEO: {
        '7d': { impressions: 14200, clicks: 1200, convRate: 2.8, spend: 350, revenue: 3800 },
        '30d': { impressions: 68000, clicks: 5800, convRate: 3.1, spend: 1500, revenue: 19500 }
      },
      PPC: {
        '7d': { impressions: 28500, clicks: 3100, convRate: 4.2, spend: 2400, revenue: 8400 },
        '30d': { impressions: 125000, clicks: 13500, convRate: 4.5, spend: 9800, revenue: 38500 }
      },
      Social: {
        '7d': { impressions: 45000, clicks: 1800, convRate: 1.8, spend: 800, revenue: 2600 },
        '30d': { impressions: 198000, clicks: 8200, convRate: 2.1, spend: 3500, revenue: 11800 }
      }
    };
  }, []);

  // Compute calculated values based on current active filters
  const currentMetrics = useMemo(() => {
    if (channelFilter !== 'All') {
      const data = channelData[channelFilter][timeframe];
      const leads = Math.round(data.clicks * (data.convRate / 100));
      const cpa = leads > 0 ? (data.spend / leads).toFixed(2) : '0.00';
      const roas = data.spend > 0 ? (data.revenue / data.spend).toFixed(1) : '0.0';
      return { ...data, leads, cpa, roas };
    } else {
      // Aggregate all
      const channels: ('SEO' | 'PPC' | 'Social')[] = ['SEO', 'PPC', 'Social'];
      let impressions = 0;
      let clicks = 0;
      let spend = 0;
      let revenue = 0;
      let weightedConvNumerator = 0;

      channels.forEach((chan) => {
        const item = channelData[chan][timeframe];
        impressions += item.impressions;
        clicks += item.clicks;
        spend += item.spend;
        revenue += item.revenue;
        weightedConvNumerator += item.clicks * item.convRate;
      });

      const convRate = clicks > 0 ? Number((weightedConvNumerator / clicks).toFixed(2)) : 0;
      const leads = Math.round(clicks * (convRate / 100));
      const cpa = leads > 0 ? (spend / leads).toFixed(2) : '0.00';
      const roas = spend > 0 ? (revenue / spend).toFixed(1) : '0.0';

      return { impressions, clicks, convRate, spend, revenue, leads, cpa, roas };
    }
  }, [channelFilter, timeframe, channelData]);

  // SVG Chart rendering points
  const chartPoints = useMemo(() => {
    const counts = timeframe === '7d' ? 7 : 10;
    const points: { label: string; value: number }[] = [];
    const baseValue = currentMetrics.revenue / counts;
    
    for (let i = 0; i < counts; i++) {
      const dayNum = timeframe === '7d' ? i + 1 : (i + 1) * 3;
      // Add subtle noise to the graph to look real
      const noise = 1 + (Math.sin(i * 1.5) * 0.15 + Math.cos(i * 0.7) * 0.08);
      points.push({
        label: `Day ${dayNum}`,
        value: Math.round(baseValue * noise)
      });
    }
    return points;
  }, [currentMetrics, timeframe]);

  // Compute heights for our custom SVG/HTML bar charts
  const maxChartValue = Math.max(...chartPoints.map(p => p.value));

  // Attribution comparison data
  const attributionData = useMemo(() => {
    if (attributionModel === 'First') {
      return [
        { name: 'SEO (Search)', credit: '45%', leads: Math.round(currentMetrics.leads * 0.45), desc: 'Introduces your brand initially' },
        { name: 'PPC Ads', credit: '30%', leads: Math.round(currentMetrics.leads * 0.30), desc: 'Pushes consideration mid-journey' },
        { name: 'Social Media', credit: '25%', leads: Math.round(currentMetrics.leads * 0.25), desc: 'Keeps engagement active before click' }
      ];
    } else if (attributionModel === 'Last') {
      return [
        { name: 'SEO (Search)', credit: '20%', leads: Math.round(currentMetrics.leads * 0.20), desc: 'Direct search triggers conversion last' },
        { name: 'PPC Ads', credit: '65%', leads: Math.round(currentMetrics.leads * 0.65), desc: 'Retargeting ads secure the final touch' },
        { name: 'Social Media', credit: '15%', leads: Math.round(currentMetrics.leads * 0.15), desc: 'Organic social bios capture last clicks' }
      ];
    } else { // Linear model
      return [
        { name: 'SEO (Search)', credit: '33%', leads: Math.round(currentMetrics.leads * 0.33), desc: 'Equally values discovery touch' },
        { name: 'PPC Ads', credit: '34%', leads: Math.round(currentMetrics.leads * 0.34), desc: 'Equally values intermediate click' },
        { name: 'Social Media', credit: '33%', leads: Math.round(currentMetrics.leads * 0.33), desc: 'Equally values community interaction' }
      ];
    }
  }, [attributionModel, currentMetrics]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-secondary-fixed/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Panel Box */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-surface-variant overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-on-secondary-fixed text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-base leading-none">
                Interactive Analytics & BI Studio
              </h3>
              <p className="text-[11px] text-secondary-fixed opacity-70 mt-1">
                GrowthPulse proprietary tracking simulator &bull; Server-Side Attribution GTM-Cloud
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Frame (Scrollable Container) */}
        <div className="p-6 overflow-y-auto space-y-6 bg-surface-container-low flex-1">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-surface-variant flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Filter 1: Channel */}
            <div className="flex items-center gap-1.5 w-full md:w-auto">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-on-surface-variant mr-1 uppercase">Channel:</span>
              <div className="flex bg-surface-container rounded-lg p-0.5 text-xs flex-1 md:flex-none">
                {(['All', 'SEO', 'PPC', 'Social'] as const).map((chan) => (
                  <button
                    key={chan}
                    onClick={() => setChannelFilter(chan)}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                      channelFilter === chan 
                        ? 'bg-primary-container text-white shadow-sm' 
                        : 'text-on-surface hover:text-primary'
                    }`}
                  >
                    {chan}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Timeframe */}
            <div className="flex items-center gap-1.5 justify-end w-full md:w-auto">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-on-surface-variant mr-1 uppercase">Timeframe:</span>
              <div className="flex bg-surface-container rounded-lg p-0.5 text-xs">
                {[
                  { value: '7d', label: 'Last 7 Days' },
                  { value: '30d', label: 'Last 30 Days' }
                ].map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setTimeframe(tf.value as any)}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                      timeframe === tf.value 
                        ? 'bg-on-secondary-fixed text-white shadow-sm' 
                        : 'text-on-surface hover:text-primary'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat 1 */}
            <div className="bg-white p-4 rounded-2xl border border-surface-variant shadow-soft flex flex-col justify-between">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Impressions</p>
              <div className="my-2 flex items-baseline gap-1.5">
                <span className="text-lg md:text-2xl font-bold font-headline text-on-surface">
                  {currentMetrics.impressions.toLocaleString()}
                </span>
                <span className="text-[10px] text-green-600 font-semibold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant">Active search & display triggers</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-4 rounded-2xl border border-surface-variant shadow-soft flex flex-col justify-between">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Qualified Leads</p>
              <div className="my-2 flex items-baseline gap-1.5">
                <span className="text-lg md:text-2xl font-bold font-headline text-on-surface">
                  {currentMetrics.leads}
                </span>
                <span className="text-[10px] text-green-600 font-semibold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +18%
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant">Avg. Conv. Rate: <strong className="text-on-surface">{currentMetrics.convRate}%</strong></p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-4 rounded-2xl border border-surface-variant shadow-soft flex flex-col justify-between">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Media Cost (CPA)</p>
              <div className="my-2 flex items-baseline gap-1.5">
                <span className="text-lg md:text-2xl font-bold font-headline text-on-surface">
                  ${currentMetrics.spend.toLocaleString()}
                </span>
                <span className="text-[10px] text-primary-container font-semibold">
                  CPA: ${currentMetrics.cpa}
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant">Total marketing cash output</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-4 rounded-2xl border border-surface-variant shadow-soft flex flex-col justify-between">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Generated Revenue</p>
              <div className="my-2 flex items-baseline gap-1.5">
                <span className="text-lg md:text-2xl font-bold font-headline text-on-surface">
                  ${currentMetrics.revenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded flex items-center">
                  {currentMetrics.roas}x ROAS
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant">Attributed direct sales value</p>
            </div>

          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-3xl border border-surface-variant shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface">
                  Attributed Revenue Timeline Graph
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Showing daily aggregated results from first-party data captures
                </p>
              </div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded">
                <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin-slow" />
                Live Feed
              </div>
            </div>

            {/* HTML custom bar graph */}
            <div className="h-44 flex items-end justify-between gap-1 border-b border-surface-variant pb-2 px-2">
              {chartPoints.map((pt, idx) => {
                const percentageHeight = maxChartValue > 0 ? (pt.value / maxChartValue) * 100 : 0;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute transform -translate-y-20 bg-on-secondary-fixed text-white px-2 py-1 rounded text-[10px] transition-all pointer-events-none shadow-md z-20">
                      ${pt.value.toLocaleString()}
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full bg-primary-container rounded-t-sm hover:bg-primary transition-all relative cursor-pointer"
                      style={{ height: `${percentageHeight}%`, minHeight: '4px' }}
                    />
                    {/* Label */}
                    <span className="text-[9px] text-on-surface-variant mt-2 font-mono truncate w-full text-center">
                      {pt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Attribution Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Attribution Explanation */}
            <div className="lg:col-span-5 bg-on-secondary-fixed text-white p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary-container" />
                <h4 className="font-headline font-bold text-sm">
                  Attribution Model Sandbox
                </h4>
              </div>
              <p className="text-xs text-secondary-fixed opacity-85 leading-relaxed mb-4">
                Different tracking models award conversion credit to different steps of the client’s purchasing journey. Traditional agencies use basic Last-Click, which masks valuable discovery channels. We engineer precise multi-touch frameworks.
              </p>
              <div className="space-y-3">
                {[
                  { value: 'First', label: 'First-Touch Attribution', desc: '100% credit goes to the initial discover channel (SEO / blogs)' },
                  { value: 'Last', label: 'Last-Touch Attribution', desc: '100% credit goes to the final closure click (PPC retargeting)' },
                  { value: 'Linear', label: 'Linear Attribution Model', desc: 'Equally distributes the credit across all customer touchpoints' }
                ].map((model) => (
                  <button
                    key={model.value}
                    onClick={() => setAttributionModel(model.value as any)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                      attributionModel === model.value
                        ? 'border-primary-container bg-primary-container/20 text-white'
                        : 'border-white/10 bg-white/5 text-secondary-fixed hover:border-white/20'
                    }`}
                  >
                    <p className="font-bold">{model.label}</p>
                    <p className="opacity-70 text-[10px] mt-0.5">{model.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Attribution Visualization */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-surface-variant shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface mb-2">
                  Channel Allocation Report
                </h4>
                <p className="text-xs text-on-surface-variant mb-4">
                  Currently showcasing <strong className="text-primary-container uppercase">{attributionModel}-Touch</strong> credit sharing for <strong className="text-on-surface">{currentMetrics.leads} leads</strong>.
                </p>
              </div>

              <div className="space-y-4">
                {attributionData.map((chan, idx) => {
                  const percentWidth = chan.credit;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs text-on-surface">
                        <span className="font-bold">{chan.name}</span>
                        <span className="font-mono text-on-surface-variant font-semibold">
                          {chan.credit} &bull; {chan.leads} leads
                        </span>
                      </div>
                      <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-container rounded-full transition-all duration-500"
                          style={{ width: percentWidth }}
                        />
                      </div>
                      <p className="text-[10px] text-on-surface-variant italic">
                        {chan.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-[10px] text-on-surface-variant">
                  Attribution modeling helps optimize spend. Ready to deploy server-side tracking?
                </p>
                <button
                  onClick={() => {
                    onClose();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-primary text-white text-xs font-headline font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center gap-1 shrink-0"
                >
                  Request Technical Strategy <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container border-t border-surface-variant flex justify-between items-center shrink-0">
          <span className="text-[11px] text-on-surface-variant">
            Simulated in real-time. Data refresh rate: 1s.
          </span>
          <button 
            onClick={onClose}
            className="bg-on-secondary-fixed text-white font-headline font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-lg hover:opacity-90 transition-all"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
