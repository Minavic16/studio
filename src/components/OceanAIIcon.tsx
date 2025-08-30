import React from 'react';

const OceanAIIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="oceanAIGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#33A7B5', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#4A47E0', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7B45B4', stopOpacity: 1 }} />
      </linearGradient>

      <linearGradient id="waveCrestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4AFFC2', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#33A7B5', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="95" stroke="url(#oceanAIGradient)" strokeWidth="4" />

    <path
      d="M 10 100 A 90 90 0 1 1 190 100 C 180 80, 160 120, 140 100 S 100 140, 80 120 S 40 100, 10 100 Z"
      fill="url(#oceanAIGradient)"
    />

    <path
      d="M 15 110 C 30 90, 60 120, 90 105 S 150 140, 185 120 V 100 H 15 Z"
      fill="url(#waveCrestGradient)"
      opacity="0.7"
    />
    <circle cx="45" cy="60" r="5" fill="white" />
    <circle cx="75" cy="40" r="5" fill="white" />
    <circle cx="110" cy="50" r="5" fill="white" />
    <circle cx="140" cy="70" r="5" fill="white" />
    <circle cx="90" cy="80" r="5" fill="white" />

    <line x1="45" y1="60" x2="75" y2="40" stroke="white" strokeWidth="2" />
    <line x1="75" y1="40" x2="110" y2="50" stroke="white" strokeWidth="2" />
    <line x1="110" y1="50" x2="140" y2="70" stroke="white" strokeWidth="2" />
    <line x1="90" y1="80" x2="110" y2="50" stroke="white" strokeWidth="2" />
    <line x1="45" y1="60" x2="90" y2="80" stroke="white" strokeWidth="2" />
  </svg>
);

export default OceanAIIcon;
