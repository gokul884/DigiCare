/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Database, 
  Trash2, 
  Mail, 
  Check, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  X, 
  Briefcase,
  AlertCircle,
  Lock,
  LogOut
} from 'lucide-react';
import { Lead, AuditRequest } from '../types';
import { User } from 'firebase/auth';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  audits: AuditRequest[];
  onDeleteLead: (id: string) => void;
  onDeleteAudit: (id: string) => void;
  onUpdateLeadStatus: (id: string, status: 'new' | 'contacted' | 'closed') => void;
  onUpdateAuditStatus: (id: string, status: 'pending' | 'analyzing' | 'completed') => void;
  user: User | null;
  onSignIn: () => Promise<User>;
  onSignOut: () => Promise<void>;
}

export default function AdminPanel({
  isOpen,
  onClose,
  leads,
  audits,
  onDeleteLead,
  onDeleteAudit,
  onUpdateLeadStatus,
  onUpdateAuditStatus,
  user,
  onSignIn,
  onSignOut
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'Leads' | 'Audits'>('Leads');
  const [simulationMsg, setSimulationMsg] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  const triggerEmailSimulation = (clientName: string, service: string) => {
    setSimulationMsg(`Simulated welcoming auto-responder dispatched to ${clientName} for "${service}"!`);
    setTimeout(() => {
      setSimulationMsg(null);
    }, 4000);
  };

  const handleSignIn = async () => {
    setAuthError(null);
    setIsSigningIn(true);
    try {
      await onSignIn();
    } catch (err) {
      console.error(err);
      setAuthError("Authentication failed. Please verify popup permissions and try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const isAdminAuthenticated = user?.email === 'krishnan989756@gmail.com' && user?.emailVerified;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl border-l border-surface-variant flex flex-col h-full transform transition-transform duration-300">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 -z-10 bg-on-secondary-fixed/30 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Header */}
      <div className="px-6 py-5 bg-on-secondary-fixed text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-primary-container" />
          <div>
            <h3 className="font-headline font-bold text-sm leading-none">
              Client Lead CRM Workspace
            </h3>
            <p className="text-[10px] text-secondary-fixed opacity-70 mt-1">
              {isAdminAuthenticated ? "Connected: Firebase Firestore (Live)" : "Firebase Security Layer: ACTIVE"}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Authentication Gateway State */}
      {!user ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h4 className="font-display font-extrabold text-base text-on-surface">
              Administrator Authentication Required
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              To read and manage customer inquiries and website audits securely, please authenticate using your authorized Google Account.
            </p>
          </div>

          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="flex items-center justify-center gap-3 bg-primary text-white font-headline text-xs font-bold px-6 py-3 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer disabled:opacity-50"
          >
            {isSigningIn ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 1.372 15.42 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.814 11.57-11.79 0-.79-.085-1.393-.19-1.925H12.24z"/>
                </svg>
                Sign In with Google
              </>
            )}
          </button>

          {authError && (
            <p className="text-[11px] text-red-500 font-medium px-4">
              {authError}
            </p>
          )}
        </div>
      ) : !isAdminAuthenticated ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-container-low text-center space-y-6">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-600 border border-yellow-500/20">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h4 className="font-display font-extrabold text-base text-on-surface">
              Access Restriction
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              You are signed in as <span className="font-bold text-on-surface">{user.email}</span>, which is not registered as an authorized database administrator. 
            </p>
            <p className="text-[11px] text-on-surface-variant/80">
              Only <span className="font-mono font-bold text-primary">krishnan989756@gmail.com</span> is allowed to view, modify, or delete production leads.
            </p>
          </div>

          <button
            onClick={onSignOut}
            className="flex items-center gap-2 bg-on-secondary-fixed text-white font-headline text-xs font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out & Switch Account
          </button>
        </div>
      ) : (
        <>
          {/* Sub-Header Tabs & User Account Banner */}
          <div className="bg-surface-container px-6 py-2 border-b border-surface-variant flex justify-between items-center shrink-0">
            <div className="flex bg-white rounded-lg p-0.5 text-xs">
              {[
                { id: 'Leads', label: `Inquiries (${leads.length})` },
                { id: 'Audits', label: `Strategic Audits (${audits.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-primary-container text-white shadow-sm' 
                      : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-bold text-on-surface leading-none">Admin Area</p>
                <p className="text-[8px] font-mono text-on-surface-variant leading-none mt-0.5">{user.email}</p>
              </div>
              <button 
                onClick={onSignOut}
                title="Sign Out"
                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-red-500 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Notification Toast */}
          {simulationMsg && (
            <div className="bg-green-500 text-white text-xs font-bold px-6 py-3 flex items-center justify-between animate-fade-in shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{simulationMsg}</span>
              </div>
              <button onClick={() => setSimulationMsg(null)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Database list body */}
          <div className="p-6 overflow-y-auto flex-1 bg-surface-container-low space-y-4">
            
            {/* LEADS TAB */}
            {activeTab === 'Leads' && (
              <>
                {leads.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-surface-variant border-dashed">
                    <Briefcase className="w-10 h-10 text-on-surface-variant mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-bold text-on-surface">No inquiries registered yet</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 px-6">
                      Please submit the Contact form on the homepage to populate this CRM workspace in real time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="bg-white p-5 rounded-2xl border border-surface-variant shadow-sm space-y-3">
                        {/* Top Row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-headline font-bold text-xs text-on-surface">
                              {lead.name}
                            </h4>
                            <p className="text-[11px] text-on-surface-variant">
                              {lead.email} &bull; <span className="font-mono">{lead.timestamp}</span>
                            </p>
                          </div>
                          <button 
                            onClick={() => onDeleteLead(lead.id)}
                            className="text-on-surface-variant hover:text-red-500 transition-colors p-1"
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Service and Message */}
                        <div className="p-3 bg-surface-container-low rounded-lg border border-surface-variant text-xs space-y-1.5">
                          <p className="font-bold text-primary-container text-[10px] uppercase">
                            Service of Interest: {lead.service}
                          </p>
                          <p className="text-on-surface-variant leading-relaxed text-[11px]">
                            "{lead.message}"
                          </p>
                        </div>

                        {/* Status & Workflows */}
                        <div className="flex justify-between items-center pt-2 border-t border-surface-variant/40">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-on-surface-variant uppercase font-bold mr-1">Status:</span>
                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                              className="text-[10px] font-bold bg-surface-container border border-surface-variant rounded px-2 py-1 text-on-surface cursor-pointer focus:outline-none"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>

                          <button
                            onClick={() => triggerEmailSimulation(lead.name, lead.service)}
                            className="text-[10px] font-bold text-primary-container flex items-center gap-1 hover:underline"
                          >
                            <Mail className="w-3 h-3" /> Auto-Respond
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* AUDITS TAB */}
            {activeTab === 'Audits' && (
              <>
                {audits.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-surface-variant border-dashed">
                    <Sparkles className="w-10 h-10 text-on-surface-variant mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-bold text-on-surface">No strategic audits compiled</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 px-6">
                      Please click "Get Started" in the Hero section, complete the 3-step wizard, and see responses stored here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {audits.map((audit) => (
                      <div key={audit.id} className="bg-white p-5 rounded-2xl border border-surface-variant shadow-sm space-y-3">
                        {/* Top Row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-headline font-bold text-xs text-on-surface">
                              {audit.email}
                            </h4>
                            <p className="text-[10px] text-on-surface-variant font-mono">
                              Generated on {audit.timestamp}
                            </p>
                          </div>
                          <button 
                            onClick={() => onDeleteAudit(audit.id)}
                            className="text-on-surface-variant hover:text-red-500 transition-colors p-1"
                            title="Delete audit request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Parameters detail */}
                        <div className="grid grid-cols-2 gap-3 text-xs bg-surface-container-low p-3 rounded-lg border border-surface-variant">
                          <div>
                            <span className="text-[9px] text-on-surface-variant block uppercase font-bold">Goal Objective:</span>
                            <span className="font-bold text-primary">{audit.objective}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-on-surface-variant block uppercase font-bold">Ad Budget:</span>
                            <span className="font-bold text-on-surface">{audit.budget}</span>
                          </div>
                        </div>

                        {/* Status selection */}
                        <div className="flex justify-between items-center pt-2 border-t border-surface-variant/40">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-on-surface-variant uppercase font-bold">Audit Status:</span>
                            <select
                              value={audit.status}
                              onChange={(e) => onUpdateAuditStatus(audit.id, e.target.value as any)}
                              className="text-[10px] font-bold bg-surface-container border border-surface-variant rounded px-2 py-1 text-on-surface cursor-pointer focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="analyzing">Analyzing</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Live Analysis Ready
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-surface-variant flex justify-between items-center shrink-0">
            <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span>Database is synchronized with Google Cloud Firestore.</span>
            </div>
            <button 
              onClick={onClose}
              className="bg-on-secondary-fixed text-white font-headline font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg hover:opacity-90 transition-all"
            >
              Close Drawer
            </button>
          </div>
        </>
      )}

    </div>
  );
}
