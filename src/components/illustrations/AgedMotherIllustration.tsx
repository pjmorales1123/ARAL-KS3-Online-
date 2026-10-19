import React from 'react';

export const AgedMotherIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-amber-300 bg-linear-to-b from-slate-900 via-amber-950/40 to-slate-900 text-white shadow-xs relative ${className}`}>
      <div className="px-3 py-1.5 bg-amber-950 text-amber-200 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between border-b border-amber-800/50">
        <span>Workbook Page 48 · The Story of the Aged Mother (Japanese Folktale by Matsuo Bashō)</span>
        <span>DepEd Reading Plus KS3</span>
      </div>

      <svg
        viewBox="0 0 800 420"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="agedMtnSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="60%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="ashGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* Mountain Sunset / Twilight Sky */}
        <rect width="800" height="260" fill="url(#agedMtnSky)" />
        {/* Full Moon illuminating Obatsuyama Mountain */}
        <circle cx="160" cy="70" r="35" fill="#fef08a" opacity="0.9" />
        <circle cx="160" cy="70" r="38" fill="#fef08a" opacity="0.2" />

        {/* Distant Japanese Mountain Ridges (Obatsuyama) */}
        <polygon points="60,260 220,100 380,260" fill="#1e1b4b" />
        <polygon points="260,260 480,80 700,260" fill="#312e81" />
        <polygon points="440,260 620,110 800,260" fill="#1e1b4b" />

        {/* Traditional Japanese Pine Trees along Mountain Ridge */}
        <g id="pineTrees" fill="#064e3b">
          <polygon points="120,220 100,250 140,250" />
          <polygon points="120,200 105,230 135,230" />
          <polygon points="600,220 580,250 620,250" />
          <polygon points="600,200 585,230 615,230" />
        </g>

        {/* Mountain Trail Ground */}
        <path d="M0 260 Q200 240 450 255 T800 240 L800 420 L0 420 Z" fill="#292524" />
        <path d="M0 290 Q220 270 420 310 T800 280 L800 420 L0 420 Z" fill="#1c1917" />

        {/* SCENE 1 (Left): Farmer Carrying Mother & Snapped Twigs on Trail */}
        <g transform="translate(60, 160)">
          {/* Snapped Twigs marking the path home */}
          {[
            { x: 20, y: 190, rot: 25 },
            { x: 70, y: 180, rot: -30 },
            { x: 120, y: 170, rot: 15 },
            { x: 170, y: 160, rot: -45 },
            { x: 220, y: 155, rot: 20 },
          ].map((tw, i) => (
            <g key={i} transform={`translate(${tw.x}, ${tw.y}) rotate(${tw.rot})`}>
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="4" y2="-5" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
          <text x="70" y="215" fontSize="8" fontWeight="bold" fill="#fde047">
            Twig trail dropped by mother
          </text>

          {/* Farmer Carrying Mother */}
          <g transform="translate(230, 40)">
            {/* Mother on Farmer's back */}
            <circle cx="25" cy="18" r="12" fill="#fed7aa" />
            {/* Gray hair bun of aged mother */}
            <ellipse cx="20" cy="12" rx="10" ry="7" fill="#cbd5e1" />
            <circle cx="16" cy="10" r="4" fill="#94a3b8" />
            {/* Mother's kimono */}
            <path d="M12 28 Q25 22 36 28 L38 65 Q25 68 12 65 Z" fill="#475569" />
            {/* Mother's hand snapping and dropping twig */}
            <line x1="36" y1="36" x2="52" y2="55" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="55" x2="56" y2="52" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />

            {/* Farmer carrying her */}
            <circle cx="48" cy="40" r="14" fill="#fed7aa" />
            <path d="M38 32 Q50 20 62 32 Z" fill="#18181b" />
            {/* Farmer's sturdy tunic */}
            <path d="M30 52 Q48 42 66 52 L68 125 Q48 130 28 125 Z" fill="#854d0e" />
            {/* Legs walking uphill */}
            <line x1="38" y1="125" x2="34" y2="160" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
            <line x1="58" y1="125" x2="65" y2="155" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>

        {/* SCENE 2 (Right): The Impossible Governor's Test: The Rope of Ashes */}
        <g transform="translate(480, 200)">
          {/* Secret bamboo cellar floor frame */}
          <rect x="-10" y="-10" width="280" height="190" rx="16" fill="#1c1917" stroke="#b45309" strokeWidth="2" />
          <text x="130" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fde047">
            The Governor’s Impossible Task: Rope of Ashes
          </text>

          {/* Flat stones */}
          <ellipse cx="130" cy="85" rx="100" ry="32" fill="#475569" stroke="#334155" strokeWidth="2" />
          <ellipse cx="130" cy="83" rx="92" ry="26" fill="#64748b" />

          {/* Burned twisted straw rope resting intact in perfect white and silver ashes */}
          <path
            d="M50 82 Q90 68 130 82 T210 82"
            stroke="url(#ashGlow)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="4,2"
            fill="none"
            filter="drop-shadow(0 0 6px rgba(254,240,138,0.4))"
          />
          {/* Ash embers glow */}
          {[...Array(6)].map((_, i) => (
            <circle key={i} cx={65 + i * 26} cy={81 + Math.sin(i) * 2} r="2" fill="#ef4444" opacity="0.8" />
          ))}

          <text x="130" y="130" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e2e8f0">
            “Make a rope of twisted straw and burn it on flat stones.”
          </text>
          <text x="130" y="146" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">
            — Mother's wisdom saved the elders of Shining
          </text>
        </g>
      </svg>

      <div className="p-2.5 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-amber-200">
          The Story of the Aged Mother
        </span>
        <span className="text-[11px] text-stone-400 font-medium">
          “With age comes wisdom. Shining needs more than youth and strength.”
        </span>
      </div>
    </div>
  );
};
