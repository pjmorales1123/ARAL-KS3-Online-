import React from 'react';

export const GiftOfMagiIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-teal-200 bg-linear-to-b from-amber-50 via-teal-50/40 to-slate-50 shadow-xs relative ${className}`}>
      <div className="px-3 py-1.5 bg-teal-800 text-teal-100 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between">
        <span>Workbook Page 32 · The Gift of the Magi (O. Henry)</span>
        <span>DepEd Reading Plus KS3</span>
      </div>

      <svg
        viewBox="0 0 800 440"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wallPaper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <linearGradient id="mirrorGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Cozy Parlor Room Wallpaper */}
        <rect width="800" height="340" fill="url(#wallPaper)" />
        {/* Subtle Victorian wallpaper stripes */}
        {[...Array(16)].map((_, i) => (
          <line
            key={i}
            x1={i * 50}
            y1={0}
            x2={i * 50}
            y2={340}
            stroke="#f59e0b"
            strokeWidth="0.75"
            opacity="0.3"
          />
        ))}

        {/* Wooden Floor */}
        <rect y="330" width="800" height="110" fill="#78350f" />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={330 + i * 14}
            x2={800}
            y2={330 + i * 14}
            stroke="#451a03"
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}

        {/* Center Victorian Pier Glass Mirror */}
        <g id="pierGlassMirror" transform="translate(180, 30)">
          {/* Ornate Gold Wood Frame */}
          <rect x="-8" y="-8" width="136" height="296" fill="#b45309" rx="16" />
          <rect x="-4" y="-4" width="128" height="288" fill="url(#goldGradient)" rx="14" />
          {/* Crown crest */}
          <path d="M60 -25 Q40 -5 10 0 Q60 -5 110 0 Q80 -5 60 -25 Z" fill="url(#goldGradient)" />
          {/* Mirror Reflection Glass */}
          <rect x="8" y="8" width="104" height="264" fill="url(#mirrorGlass)" rx="8" />
          {/* Glass reflection shine diagonal lines */}
          <line x1="20" y1="20" x2="100" y2="180" stroke="#ffffff" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
          <line x1="35" y1="20" x2="105" y2="160" stroke="#ffffff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        </g>

        {/* Della standing before the mirror admiring her long brown hair */}
        <g id="della" transform="translate(140, 70)">
          {/* Cascading Rich Chestnut Hair (Rippling like a cascade of brown waters) */}
          <path
            d="M90 60 Q120 70 125 150 Q130 220 110 270 Q85 240 85 160 Q80 100 90 60 Z"
            fill="#5b2808"
          />
          <path
            d="M95 70 Q130 110 132 180 Q135 240 105 280 Q88 230 90 150 Z"
            fill="#78350f"
          />
          <path
            d="M102 90 Q125 140 128 200 Q126 250 112 285"
            stroke="#a16207"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Simple Victorian Dress */}
          <path
            d="M60 110 Q80 95 100 110 L115 270 Q80 275 45 270 Z"
            fill="#0f766e"
          />
          <path
            d="M70 110 L90 110 L95 150 L65 150 Z"
            fill="#134e4a"
          />
          {/* Head & gentle profile facing the mirror */}
          <circle cx="80" cy="55" r="18" fill="#fed7aa" />
          {/* Hair top bun / part */}
          <path d="M64 50 Q80 30 98 48 Q85 40 64 50 Z" fill="#5b2808" />
          {/* Delicate Profile */}
          <circle cx="87" cy="53" r="2.5" fill="#451a03" />
          <path d="M85 62 Q89 65 92 62" stroke="#b45309" strokeWidth="1.2" fill="none" />
        </g>

        {/* Parlor Table on the Right */}
        <g id="parlorTable" transform="translate(420, 180)">
          {/* Mahogany Table Surface */}
          <polygon points="20,70 340,70 320,105 0,105" fill="#9a3412" />
          <polygon points="0,105 320,105 320,118 0,118" fill="#7c2d12" />
          {/* Carved Table Legs */}
          <rect x="20" y="118" width="16" height="130" fill="#431407" rx="3" />
          <rect x="280" y="118" width="16" height="130" fill="#431407" rx="3" />
          {/* Lace Tablecloth Doily */}
          <ellipse cx="160" cy="85" rx="110" ry="22" fill="#ffffff" opacity="0.9" stroke="#e2e8f0" strokeDasharray="3,3" />

          {/* ITEM 1: Jim's Gold Pocket Watch & Pure Platinum Chain */}
          <g transform="translate(60, 40)">
            {/* The Watch Case */}
            <circle cx="40" cy="40" r="32" fill="url(#goldGradient)" stroke="#854d0e" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
            <circle cx="40" cy="40" r="25" fill="#ffffff" stroke="#eab308" strokeWidth="1" />
            {/* Roman Numerals marks */}
            {[...Array(12)].map((_, i) => {
              const ang = (i * 30 * Math.PI) / 180;
              return (
                <circle
                  key={i}
                  cx={40 + 20 * Math.sin(ang)}
                  cy={40 - 20 * Math.cos(ang)}
                  r="1.2"
                  fill="#78350f"
                />
              );
            })}
            {/* Watch Hands */}
            <line x1="40" y1="40" x2="40" y2="24" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="40" y1="40" x2="52" y2="40" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="40" cy="40" r="2.5" fill="#ca8a04" />
            {/* Watch Crown top */}
            <rect x="36" y="4" width="8" height="6" fill="#ca8a04" rx="1" />
            <circle cx="40" cy="2" r="5" fill="none" stroke="#ca8a04" strokeWidth="2" />
            {/* Fine Platinum Chain */}
            <path
              d="M40 0 Q20 -15 10 10 T-10 25 T-20 60"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              strokeDasharray="2,2"
              fill="none"
            />
            <text x="40" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">
              Jim's Gold Watch & Chain
            </text>
          </g>

          {/* ITEM 2: The Tortoiseshell Pure Jeweled Combs */}
          <g transform="translate(190, 45)">
            {/* Set of Combs */}
            <path
              d="M10 20 Q50 0 90 20 L85 45 Q50 35 15 45 Z"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="1.5"
            />
            {/* Jeweled rim */}
            {[...Array(7)].map((_, i) => (
              <circle
                key={i}
                cx={20 + i * 10}
                cy={18 + Math.sin(i * 0.5) * 3}
                r="3"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1"
              />
            ))}
            {/* Comb Teeth */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={18 + i * 6}
                y1={42}
                x2={18 + i * 6}
                y2={65}
                stroke="#5b2808"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
            <text x="50" y="82" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">
              Jeweled Combs for Della's Hair
            </text>
          </g>

          {/* ITEM 3: Della's Small Savings: One dollar and eighty-seven cents */}
          <g transform="translate(130, 92)">
            <ellipse cx="20" cy="15" rx="8" ry="4" fill="#cbd5e1" stroke="#94a3b8" />
            <ellipse cx="28" cy="14" rx="8" ry="4" fill="#cbd5e1" stroke="#94a3b8" />
            <ellipse cx="24" cy="11" rx="8" ry="4" fill="#fde047" stroke="#ca8a04" />
            <text x="30" y="28" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991b1b">
              $1.87
            </text>
          </g>
        </g>

        {/* Legend Quote Banner */}
        <rect x="420" y="32" width="340" height="48" rx="12" fill="#ffffff" stroke="#0d9488" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
        <text x="435" y="52" fontSize="10" fontWeight="bold" fill="#134e4a">
          “Of all who give and receive gifts, such as they are wisest.”
        </text>
        <text x="435" y="68" fontSize="9" fontWeight="600" fill="#0f766e">
          Della sells her hair for Jim’s chain; Jim sells his watch for Della’s combs.
        </text>
      </svg>

      <div className="p-2.5 bg-white border-t border-teal-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-teal-950">
          The Gift of the Magi · Clues & Predictions
        </span>
        <span className="text-[11px] text-slate-500 font-medium">
          Della's hair ($1.87 savings) · Jim's gold watch · The jeweled combs
        </span>
      </div>
    </div>
  );
};
