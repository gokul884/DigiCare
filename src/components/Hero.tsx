/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeroProps {
  onGetStartedClick: () => void;
  onViewCaseStudiesClick: () => void;
}

export default function Hero({ onGetStartedClick, onViewCaseStudiesClick }: HeroProps) {
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-[#e2eee9]">
      {/* Decorative leaf/plant soft ambient blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-12 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Text Info matching the attached image perfectly */}
          <div className="lg:col-span-6 space-y-8">
            <h1 className="font-display font-black text-display-lg-mobile md:text-display-lg lg:text-[4.5rem] text-[#1A56DB] leading-[1.02] tracking-tighter">
              Rank First. Grow Faster. <br />
              Best SEO & Web <br />
              Performance Agency.
            </h1>

            <p className="font-sans text-body-lg text-[#3b5998] max-w-xl leading-relaxed">
              We help digital-first companies scale through performance marketing, creative strategy, and data-driven growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onGetStartedClick}
                className="bg-[#1A56DB] hover:bg-[#0b3b9c] text-white px-8 py-4 rounded-full font-headline font-bold text-base shadow-md shadow-blue-500/10 hover:shadow-lg hover:scale-[1.02] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-get-started"
              >
                Grow With Us
              </button>

              <button
                onClick={onViewCaseStudiesClick}
                className="border-2 border-[#1A56DB]/20 hover:border-[#1A56DB] text-[#1A56DB] px-8 py-4 rounded-full font-headline font-bold text-base hover:bg-white/40 hover:scale-[1.02] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-view-case"
              >
                Case Studies
              </button>
            </div>
          </div>

          {/* Hero Visual Block with the EXACT custom high-definition vector scene */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-[580px] aspect-[1.15] select-none">
              
              {/* Clean flat vector illustration designed in high-fidelity SVG */}
              <svg 
                viewBox="0 0 650 520" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-full h-full drop-shadow-sm"
              >
                {/* Arch doorway/window background */}
                <path 
                  d="M 180 520 L 180 220 A 130 130 0 0 1 440 220 L 440 520 Z" 
                  fill="#ffffff" 
                />

                {/* Hanging Plant (Left) */}
                <line x1="240" y1="0" x2="240" y2="180" stroke="#1c2e24" strokeWidth="1.5" />
                <path d="M 220 180 C 220 180 220 195 240 195 C 260 195 260 180 260 180 Z" fill="#d97706" />
                {/* Cascading leaves */}
                <path d="M 222 185 C 215 195 210 215 212 225 M 224 190 C 220 205 221 220 223 235" stroke="#4b7a47" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 258 185 C 265 195 270 215 268 225 M 256 190 C 260 205 259 220 257 235" stroke="#4b7a47" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="212" cy="225" r="4" fill="#34d399" />
                <circle cx="223" cy="235" r="4.5" fill="#10b981" />
                <circle cx="268" cy="225" r="4" fill="#34d399" />
                <circle cx="257" cy="235" r="4.5" fill="#10b981" />

                {/* Hanging Lamp (Right) */}
                <line x1="490" y1="0" x2="490" y2="105" stroke="#1c2e24" strokeWidth="1.5" />
                <path d="M 460 130 L 520 130 L 505 105 L 475 105 Z" fill="#f59e0b" stroke="#1c2e24" strokeWidth="1.5" />
                {/* Soft yellow light cone */}
                <polygon points="460,130 520,130 560,260 420,260" fill="#fef08a" opacity="0.12" />

                {/* Minimalist Desk/Table */}
                {/* Desk Legs */}
                <line x1="335" y1="365" x2="335" y2="520" stroke="#1c2e24" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="575" y1="365" x2="575" y2="520" stroke="#1c2e24" strokeWidth="2.5" strokeLinecap="round" />
                {/* Desk Top */}
                <rect x="310" y="356" width="285" height="10" rx="5" fill="#ffffff" stroke="#1c2e24" strokeWidth="2" />

                {/* Characters Layer */}

                {/* Person 1: Standing on Left (Green Sweater, thoughtful pose) */}
                {/* Leg Left */}
                <path d="M 248 420 L 273 420 L 278 520 L 253 520 Z" fill="#94a3b8" stroke="#1c2e24" strokeWidth="2" />
                {/* Sweater/Body */}
                <path d="M 235 300 C 235 300 245 270 270 270 C 295 270 305 300 305 360 L 235 360 Z" fill="#689f7d" stroke="#1c2e24" strokeWidth="2" />
                {/* Neck */}
                <rect x="258" y="250" width="14" height="20" fill="#e0a98c" stroke="#1c2e24" strokeWidth="2" />
                {/* Head */}
                <circle cx="265" cy="235" r="18" fill="#e0a98c" stroke="#1c2e24" strokeWidth="2" />
                {/* Hair */}
                <path d="M 250 230 C 250 215 275 210 282 225 C 282 225 272 232 250 230 Z" fill="#1c2e24" stroke="#1c2e24" strokeWidth="1" />
                {/* Arm / Hand on Chin (Thinking) */}
                <path d="M 285 300 C 290 300 295 275 282 255" fill="none" stroke="#1c2e24" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="282" cy="255" r="4" fill="#e0a98c" stroke="#1c2e24" strokeWidth="1.5" />

                {/* Person 2: Sitting center (Blue T-Shirt, coral pink pants) */}
                {/* Stool behind legs */}
                <rect x="360" y="380" width="30" height="140" fill="#f8fafc" stroke="#1c2e24" strokeWidth="1.5" />
                {/* Pants */}
                <path d="M 345 356 C 345 356 320 400 340 450 C 350 470 410 520 435 520 L 455 500 C 440 480 390 440 380 410 C 375 390 385 356 385 356 Z" fill="#f87171" stroke="#1c2e24" strokeWidth="2" />
                {/* Blue Shirt */}
                <path d="M 335 290 C 335 290 385 275 400 295 L 390 356 L 340 356 Z" fill="#3b82f6" stroke="#1c2e24" strokeWidth="2" />
                {/* Head */}
                <circle cx="370" cy="245" r="16" fill="#fbcfe8" stroke="#1c2e24" strokeWidth="2" />
                {/* Hair (Yellow/orange) */}
                <path d="M 358 238 C 362 225 382 225 384 238 Z" fill="#f59e0b" stroke="#1c2e24" strokeWidth="1.5" />
                {/* Arm reaching laptop */}
                <path d="M 385 305 Q 420 295 440 340" fill="none" stroke="#1c2e24" strokeWidth="2.5" strokeLinecap="round" />

                {/* Person 3: Standing back right (Yellow-green shirt, red skirt) */}
                {/* Leg */}
                <rect x="475" y="420" width="20" height="100" fill="#ef4444" stroke="#1c2e24" strokeWidth="2" />
                {/* Yellow-Green Shirt */}
                <path d="M 445 260 L 505 265 L 495 356 L 450 356 Z" fill="#a3e635" stroke="#1c2e24" strokeWidth="2" />
                {/* Head */}
                <circle cx="475" cy="215" r="16" fill="#78350f" stroke="#1c2e24" strokeWidth="2" />
                {/* Black Hair */}
                <circle cx="475" cy="195" r="8" fill="#1c2e24" />
                {/* Notepad/Tablet */}
                <rect x="490" y="270" width="22" height="30" rx="3" fill="#ffffff" stroke="#1c2e24" strokeWidth="1.5" transform="rotate(10 490 270)" />
                <line x1="496" y1="280" x2="506" y2="282" stroke="#1c2e24" strokeWidth="1.5" />
                <line x1="495" y1="288" x2="505" y2="290" stroke="#1c2e24" strokeWidth="1.5" />

                {/* Person 4: Leaning right (Orange top, Blue pants, Red hair in bun) */}
                {/* Pants (Blue) */}
                <path d="M 545 356 L 595 356 L 585 520 L 545 520 Z" fill="#1e3a8a" stroke="#1c2e24" strokeWidth="2" />
                {/* Orange Top */}
                <path d="M 510 310 C 510 310 540 285 575 300 L 570 356 L 525 356 Z" fill="#f97316" stroke="#1c2e24" strokeWidth="2" />
                {/* Arm leaning */}
                <path d="M 540 310 Q 510 330 495 350" fill="none" stroke="#1c2e24" strokeWidth="2.5" strokeLinecap="round" />
                {/* Head */}
                <circle cx="535" cy="255" r="15" fill="#fecaca" stroke="#1c2e24" strokeWidth="2" />
                {/* Hair bun */}
                <circle cx="552" cy="245" r="7" fill="#ef4444" stroke="#1c2e24" strokeWidth="1.5" />
                {/* Hair Main */}
                <circle cx="535" cy="245" r="10" fill="#ef4444" stroke="#1c2e24" strokeWidth="1.5" />
                {/* Glasses */}
                <circle cx="522" cy="255" r="6" stroke="#1c2e24" strokeWidth="2" fill="none" />

                {/* Open Laptop on Table */}
                <path d="M 440 356 L 500 356 L 520 315 L 460 315 Z" fill="#1e293b" stroke="#1c2e24" strokeWidth="2" />
                <polygon points="460,315 520,315 510,356 450,356" fill="#f1f5f9" stroke="#1c2e24" strokeWidth="1.5" />

                {/* Left/Right Bottom botanical plants (for that gorgeous organic touch) */}
                {/* Left Plant */}
                <path d="M 160 520 C 160 480 180 440 190 440 C 200 440 185 480 185 520 Z" fill="#2d4a3e" />
                <path d="M 180 520 C 180 460 205 420 215 420 C 225 420 210 460 210 520 Z" fill="#3b5e4f" />
                <path d="M 200 520 C 200 485 220 450 225 450 C 230 450 220 485 220 520 Z" fill="#4d7463" />

                {/* Right Plant */}
                <path d="M 590 520 C 590 490 610 460 615 460 C 620 460 610 490 610 520 Z" fill="#3b5e4f" />
                <path d="M 610 520 C 610 495 625 470 630 470 C 635 470 625 495 625 520 Z" fill="#4d7463" />
              </svg>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

