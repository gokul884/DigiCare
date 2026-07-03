/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CompanyLogoProps {
  className?: string;
}

export default function CompanyLogo({ className = 'w-8 h-8' }: CompanyLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Orange/Yellow Crescent Sweep (Right side of the 'D') */}
      <path
        d="M50 10C68 10 85 24 85 50C85 76 68 90 50 90C45 90 41 89 37 87C52 80 65 66 65 50C65 34 52 20 37 13C41 11 45 10 50 10Z"
        fill="url(#logo-orange-grad)"
      />
      
      {/* Blue top and bottom blocks of the 'D' */}
      <path
        d="M25 10H50C53 10 55.5 11 57.5 12.5C51 16 45 22 45 28H25V10Z"
        fill="url(#logo-blue-grad)"
      />
      <path
        d="M25 72H45C45 78 51 84 57.5 87.5C55.5 89 53 90 50 90H25V72Z"
        fill="url(#logo-blue-grad)"
      />
      
      {/* Circuit lines and nodes extending to the left */}
      {/* Middle Branch 1 (Top straight branch) */}
      <path d="M21 34H44" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="21" cy="34" r="3.5" fill="white" stroke="#0052FF" strokeWidth="2.5"/>
      <circle cx="44" cy="34" r="3.5" fill="white" stroke="#0052FF" strokeWidth="2.5"/>

      {/* Middle Branch 2 (Branching line in the middle) */}
      <path d="M15 44H31" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="15" cy="44" r="3.5" fill="white" stroke="#0052FF" strokeWidth="2.5"/>
      
      {/* Branch split path */}
      <path d="M31 44L22 55" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M31 44L44 53" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="22" cy="55" r="3.5" fill="white" stroke="#0052FF" strokeWidth="2.5"/>
      <circle cx="44" cy="53" r="3.5" fill="white" stroke="#0052FF" strokeWidth="2.5"/>

      {/* Middle Branch 3 (Bottom straight branch) */}
      <path d="M23 59H38" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="23" cy="59" r="3.5" fill="white" stroke="#0052FF" strokeWidth="2.5"/>

      {/* Gradients */}
      <defs>
        <linearGradient id="logo-orange-grad" x1="50" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA000"/>
          <stop offset="50%" stopColor="#FF6B00"/>
          <stop offset="100%" stopColor="#FF3D00"/>
        </linearGradient>
        <linearGradient id="logo-blue-grad" x1="25" y1="10" x2="57.5" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0052FF"/>
          <stop offset="100%" stopColor="#002D9C"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
