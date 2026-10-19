import React from 'react';

export const CityCrossingIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-sky-200 via-sky-50 to-slate-100 shadow-sm relative ${className}`}>
      {/* City Crossing Canvas SVG */}
      <svg
        viewBox="0 0 800 620"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="bldgL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="bldgR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="350" fill="url(#skyGrad)" />

        {/* Tall Skyscrapers Left */}
        <rect x="30" y="40" width="160" height="400" fill="#64748b" rx="4" />
        <rect x="50" y="60" width="120" height="180" fill="#f87171" rx="4" />
        {/* Billboard 1 Left: Anime style character screen */}
        <rect x="55" y="65" width="110" height="90" fill="#fef08a" rx="3" />
        <circle cx="110" cy="100" r="24" fill="#fb923c" />
        <ellipse cx="110" cy="105" r="14" fill="#fed7aa" />
        <path d="M96 90 Q110 70 124 90 Z" fill="#b91c1c" />
        <rect x="65" y="165" width="90" height="12" fill="#ffffff" rx="2" />
        <rect x="65" y="182" width="70" height="8" fill="#fecaca" rx="2" />
        <rect x="65" y="195" width="50" height="6" fill="#fecaca" rx="2" />

        {/* Billboard 2 Left */}
        <rect x="50" y="255" width="120" height="120" fill="#38bdf8" rx="4" />
        <circle cx="110" cy="305" r="28" fill="#0284c7" />
        <rect x="65" y="345" width="90" height="12" fill="#ffffff" rx="2" />

        {/* Center Buildings (Perspective Depth) */}
        <rect x="230" y="120" width="110" height="320" fill="#e2e8f0" rx="3" />
        <rect x="370" y="140" width="110" height="300" fill="#f1f5f9" rx="3" />
        <rect x="390" y="160" width="70" height="120" fill="#cbd5e1" rx="2" />
        {/* Windows grid */}
        {[...Array(6)].map((_, r) => (
          <g key={r}>
            <rect x="400" y={175 + r * 16} width="12" height="10" fill="#94a3b8" rx="1" />
            <rect x="420" y={175 + r * 16} width="12" height="10" fill="#94a3b8" rx="1" />
            <rect x="440" y={175 + r * 16} width="12" height="10" fill="#94a3b8" rx="1" />
          </g>
        ))}

        {/* Tall Skyscrapers Right with Billboards */}
        <rect x="520" y="50" width="250" height="390" fill="#475569" rx="4" />
        {/* Large Video Display Screen 1 */}
        <rect x="545" y="70" width="190" height="120" fill="#0f172a" rx="4" />
        <rect x="555" y="80" width="170" height="100" fill="#1e293b" rx="2" />
        <circle cx="640" cy="120" r="26" fill="#38bdf8" opacity="0.8" />
        <rect x="575" y="155" width="130" height="10" fill="#38bdf8" rx="2" />

        {/* Screen 2 Right: Fashion portrait */}
        <rect x="545" y="210" width="120" height="160" fill="#fda4af" rx="4" />
        <circle cx="605" cy="265" r="28" fill="#e11d48" />
        <ellipse cx="605" cy="270" r="16" fill="#fecdd3" />
        <rect x="560" y="325" width="90" height="14" fill="#ffffff" rx="2" />

        {/* Small Screen 3 Right */}
        <rect x="680" y="210" width="80" height="100" fill="#10b981" rx="3" />
        <rect x="690" y="230" width="60" height="10" fill="#ffffff" rx="1" />
        <rect x="690" y="250" width="45" height="8" fill="#d1fae5" rx="1" />

        {/* Road Surface */}
        <polygon points="0,380 800,380 800,620 0,620" fill="#334155" />

        {/* Crosswalk Zebra Stripes */}
        <polygon points="120,440 220,440 180,620 60,620" fill="#f8fafc" opacity="0.85" />
        <polygon points="260,440 360,440 330,620 220,620" fill="#f8fafc" opacity="0.85" />
        <polygon points="400,440 500,440 480,620 370,620" fill="#f8fafc" opacity="0.85" />
        <polygon points="540,440 640,440 630,620 520,620" fill="#f8fafc" opacity="0.85" />
        <polygon points="680,440 770,440 770,620 670,620" fill="#f8fafc" opacity="0.85" />

        {/* Pedestrians Crowd Background silhouettes */}
        {[...Array(24)].map((_, i) => (
          <g key={i}>
            <circle cx={70 + i * 28} cy={425 + (i % 3) * 6} r="7" fill={['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#cbd5e1'][i % 7]} />
            <path
              d={`M${63 + i * 28} ${432 + (i % 3) * 6} Q${70 + i * 28} 428 ${77 + i * 28} ${432 + (i % 3) * 6} L${79 + i * 28} 470 L${61 + i * 28} 470 Z`}
              fill={['#1e293b', '#334155', '#475569', '#0f172a', '#1e3a8a'][i % 5]}
            />
          </g>
        ))}

        {/* Foreground Pedestrians Crowd (Distinct Characters) */}
        {/* Person 1: Businessman with briefcase */}
        <g>
          <circle cx="150" cy="480" r="14" fill="#fcd34d" />
          <path d="M136 495 C136 490 164 490 164 495 L168 560 L132 560 Z" fill="#3b82f6" />
          <rect x="138" y="560" width="12" height="45" fill="#1e293b" />
          <rect x="152" y="560" width="12" height="45" fill="#1e293b" />
          <rect x="120" y="525" width="16" height="22" rx="3" fill="#854d0e" />
        </g>

        {/* Person 2: Student with red backpack */}
        <g>
          <circle cx="230" cy="470" r="13" fill="#fed7aa" />
          <path d="M218 485 C218 480 242 480 242 485 L245 550 L215 550 Z" fill="#f43f5e" />
          <rect x="220" y="550" width="10" height="50" fill="#334155" />
          <rect x="232" y="550" width="10" height="50" fill="#334155" />
          <rect x="242" y="495" width="12" height="25" rx="4" fill="#fbbf24" />
        </g>

        {/* Person 3: Woman in emerald coat with tote bag */}
        <g>
          <circle cx="320" cy="460" r="14" fill="#fecdd3" />
          <path d="M305 476 C305 470 335 470 335 476 L338 555 L302 555 Z" fill="#059669" />
          <rect x="308" y="555" width="10" height="48" fill="#1e293b" />
          <rect x="322" y="555" width="10" height="48" fill="#1e293b" />
          <polygon points="338,510 350,545 332,545" fill="#f59e0b" />
        </g>

        {/* Person 4: Commuter with headphones */}
        <g>
          <circle cx="410" cy="465" r="14" fill="#fed7aa" />
          <path d="M395 480 C395 475 425 475 425 480 L428 555 L392 555 Z" fill="#6366f1" />
          <rect x="398" y="555" width="11" height="50" fill="#0f172a" />
          <rect x="412" y="555" width="11" height="50" fill="#0f172a" />
          {/* Headphones */}
          <path d="M398 462 Q410 448 422 462" stroke="#ffffff" strokeWidth="4" fill="none" />
          <circle cx="396" cy="465" r="5" fill="#f43f5e" />
          <circle cx="424" cy="465" r="5" fill="#f43f5e" />
        </g>

        {/* Person 5: Casual shopper with shopping bags */}
        <g>
          <circle cx="490" cy="475" r="13" fill="#fcd34d" />
          <path d="M478 490 C478 485 502 485 502 490 L505 550 L475 550 Z" fill="#d97706" />
          <rect x="480" y="550" width="10" height="50" fill="#1e293b" />
          <rect x="492" y="550" width="10" height="50" fill="#1e293b" />
          <rect x="465" y="515" width="14" height="20" rx="2" fill="#ec4899" />
          <rect x="504" y="515" width="14" height="20" rx="2" fill="#06b6d4" />
        </g>

        {/* Person 6: Tourist holding smartphone */}
        <g>
          <circle cx="580" cy="465" r="14" fill="#fed7aa" />
          <path d="M565 480 C565 475 595 475 595 480 L598 555 L562 555 Z" fill="#0284c7" />
          <rect x="568" y="555" width="11" height="50" fill="#334155" />
          <rect x="582" y="555" width="11" height="50" fill="#334155" />
          {/* Smartphone */}
          <rect x="596" y="490" width="9" height="16" rx="2" fill="#0f172a" />
          <rect x="597" y="492" width="7" height="12" fill="#38bdf8" />
        </g>

        {/* Person 7: Person walking dog */}
        <g>
          <circle cx="670" cy="480" r="13" fill="#fcd34d" />
          <path d="M658 495 C658 490 682 490 682 495 L685 555 L655 555 Z" fill="#8b5cf6" />
          <rect x="660" y="555" width="10" height="48" fill="#1e293b" />
          <rect x="672" y="555" width="10" height="48" fill="#1e293b" />
        </g>
      </svg>
      <div className="p-2.5 bg-white/95 border-t border-slate-200 text-center">
        <span className="text-[11px] font-bold text-slate-700">
          City Intersection Illustration (Session 7, Activity 1 · Page 26)
        </span>
      </div>
    </div>
  );
};
