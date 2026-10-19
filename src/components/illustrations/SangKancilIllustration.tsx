import React from 'react';

export const SangKancilIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-emerald-200 bg-linear-to-b from-sky-100 via-emerald-50 to-amber-50 shadow-xs relative ${className}`}>
      <div className="px-3 py-1.5 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-between">
        <span>Workbook Page 1 Illustration · Folktale of Sang Kancil</span>
        <span>DepEd Reading Plus KS3</span>
      </div>

      <svg
        viewBox="0 0 800 460"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skRiverSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="70%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>
          <linearGradient id="skWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
          <linearGradient id="skJungle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="240" fill="url(#skRiverSky)" />
        {/* Sun */}
        <circle cx="700" cy="80" r="45" fill="#fef08a" opacity="0.8" />
        <circle cx="700" cy="80" r="35" fill="#fde047" />

        {/* Distant Mountains & Rainforest Foliage */}
        <path d="M0 200 Q200 130 450 180 T800 160 L800 280 L0 280 Z" fill="#86efac" opacity="0.6" />
        <path d="M0 220 Q280 150 560 210 T800 190 L800 300 L0 300 Z" fill="#4ade80" opacity="0.7" />

        {/* Far Riverbank with Fruit Trees (Across the River) */}
        <path d="M0 230 Q400 240 800 230 L800 280 L0 280 Z" fill="#16a34a" />

        {/* Lush Tree Canopies with Ripe Red & Golden Fruits across river */}
        <g id="fruitTreesFar">
          {/* Tree 1 */}
          <rect x="520" y="160" width="18" height="80" fill="#78350f" rx="3" />
          <circle cx="530" cy="150" r="50" fill="#15803d" />
          <circle cx="505" cy="130" r="40" fill="#16a34a" />
          <circle cx="550" cy="135" r="38" fill="#22c55e" />
          {/* Ripe Fruits */}
          <circle cx="510" cy="140" r="6" fill="#ef4444" />
          <circle cx="535" cy="120" r="7" fill="#f97316" />
          <circle cx="555" cy="145" r="6" fill="#ef4444" />
          <circle cx="490" cy="150" r="6" fill="#eab308" />
          <circle cx="540" cy="165" r="6" fill="#ef4444" />

          {/* Tree 2 */}
          <rect x="640" y="170" width="22" height="75" fill="#78350f" rx="3" />
          <circle cx="650" cy="155" r="55" fill="#15803d" />
          <circle cx="620" cy="135" r="42" fill="#16a34a" />
          <circle cx="680" cy="140" r="40" fill="#22c55e" />
          {/* Ripe Fruits */}
          <circle cx="630" cy="135" r="7" fill="#ef4444" />
          <circle cx="660" cy="125" r="7" fill="#f97316" />
          <circle cx="675" cy="155" r="6" fill="#eab308" />
          <circle cx="645" cy="165" r="6" fill="#ef4444" />
        </g>

        {/* The Wide River */}
        <rect y="260" width="800" height="150" fill="url(#skWater)" />

        {/* Gentle River Ripple waves */}
        {[...Array(9)].map((_, i) => (
          <path
            key={i}
            d={`M${(i * 90) % 800} ${275 + (i * 12)} Q${(i * 90 + 40) % 800} ${270 + (i * 12)} ${(i * 90 + 80) % 800} ${275 + (i * 12)}`}
            stroke="#7dd3fc"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        ))}

        {/* Crocodiles Lined Up Across the River forming a Bridge */}
        {/* Crocodile 1 */}
        <g transform="translate(190, 310)">
          <ellipse cx="40" cy="0" rx="42" ry="14" fill="#15803d" />
          <polygon points="5, -6 75, -6 70, 6 10, 6" fill="#166534" />
          {/* Spikes / ridges */}
          <polygon points="20,-8 26,-14 32,-8" fill="#14532d" />
          <polygon points="35,-8 41,-14 47,-8" fill="#14532d" />
          <polygon points="50,-8 56,-14 62,-8" fill="#14532d" />
          {/* Head & eye */}
          <ellipse cx="85" cy="2" rx="14" ry="9" fill="#15803d" />
          <circle cx="88" cy="-3" r="3.5" fill="#fef08a" />
          <circle cx="89" cy="-3" r="1.5" fill="#000000" />
          {/* Snout with sharp tooth */}
          <path d="M96 0 L102 3 L96 5 Z" fill="#15803d" />
          <polygon points="94,4 96,7 98,4" fill="#ffffff" />
          {/* Tail */}
          <path d="M0 0 Q-15 4 -25 -4 Q-15 -6 0 0" fill="#15803d" />
        </g>

        {/* Crocodile 2 */}
        <g transform="translate(300, 305)">
          <ellipse cx="40" cy="0" rx="44" ry="15" fill="#166534" />
          <polygon points="20,-9 26,-15 32,-9" fill="#14532d" />
          <polygon points="35,-9 41,-15 47,-9" fill="#14532d" />
          <polygon points="50,-9 56,-15 62,-9" fill="#14532d" />
          <ellipse cx="86" cy="2" rx="14" ry="9" fill="#166534" />
          <circle cx="89" cy="-3" r="3.5" fill="#fef08a" />
          <circle cx="90" cy="-3" r="1.5" fill="#000000" />
          <polygon points="94,4 96,7 98,4" fill="#ffffff" />
          <path d="M0 0 Q-15 4 -25 -4 Q-15 -6 0 0" fill="#166534" />
        </g>

        {/* Crocodile 3 */}
        <g transform="translate(420, 295)">
          <ellipse cx="40" cy="0" rx="42" ry="14" fill="#15803d" />
          <polygon points="20,-8 26,-14 32,-8" fill="#14532d" />
          <polygon points="35,-8 41,-14 47,-8" fill="#14532d" />
          <polygon points="50,-8 56,-14 62,-8" fill="#14532d" />
          <ellipse cx="85" cy="2" rx="14" ry="9" fill="#15803d" />
          <circle cx="88" cy="-3" r="3.5" fill="#fef08a" />
          <circle cx="89" cy="-3" r="1.5" fill="#000000" />
          <polygon points="94,4 96,7 98,4" fill="#ffffff" />
          <path d="M0 0 Q-15 4 -25 -4 Q-15 -6 0 0" fill="#15803d" />
        </g>

        {/* Crocodile 4 */}
        <g transform="translate(540, 285)">
          <ellipse cx="40" cy="0" rx="42" ry="14" fill="#166534" />
          <polygon points="20,-8 26,-14 32,-8" fill="#14532d" />
          <polygon points="35,-8 41,-14 47,-8" fill="#14532d" />
          <polygon points="50,-8 56,-14 62,-8" fill="#14532d" />
          <ellipse cx="85" cy="2" rx="14" ry="9" fill="#166534" />
          <circle cx="88" cy="-3" r="3.5" fill="#fef08a" />
          <circle cx="89" cy="-3" r="1.5" fill="#000000" />
          <polygon points="94,4 96,7 98,4" fill="#ffffff" />
          <path d="M0 0 Q-15 4 -25 -4 Q-15 -6 0 0" fill="#166534" />
        </g>

        {/* Near Riverbank (Where Sang Kancil is standing) */}
        <path d="M0 340 Q140 330 220 370 L190 460 L0 460 Z" fill="#b45309" />
        <path d="M0 330 Q120 320 200 360 L0 420 Z" fill="#22c55e" />

        {/* SANG KANCIL (Mouse Deer) - Clever small animal */}
        <g transform="translate(100, 280)">
          {/* Back legs */}
          <line x1="20" y1="40" x2="16" y2="75" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
          <line x1="28" y1="40" x2="30" y2="73" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" />
          {/* Front legs */}
          <line x1="60" y1="40" x2="56" y2="75" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="68" y1="40" x2="72" y2="72" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
          {/* Hooves */}
          <circle cx="16" cy="76" r="3" fill="#451a03" />
          <circle cx="30" cy="74" r="3" fill="#451a03" />
          <circle cx="56" cy="76" r="3" fill="#451a03" />
          <circle cx="72" cy="73" r="3" fill="#451a03" />

          {/* Mouse Deer Body */}
          <ellipse cx="44" cy="35" rx="28" ry="17" fill="#d97706" />
          <ellipse cx="44" cy="40" rx="24" ry="12" fill="#fef3c7" />
          {/* White spotted fur markings */}
          <circle cx="35" cy="30" r="2.5" fill="#ffffff" />
          <circle cx="45" cy="27" r="2.5" fill="#ffffff" />
          <circle cx="55" cy="32" r="2.5" fill="#ffffff" />

          {/* Tiny Tail */}
          <path d="M16 32 Q8 30 10 38" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />

          {/* Neck and Head looking across river */}
          <path d="M62 30 Q74 20 78 12" stroke="#d97706" strokeWidth="12" strokeLinecap="round" />
          <ellipse cx="84" cy="10" rx="14" ry="9" fill="#d97706" transform="rotate(-15, 84, 10)" />
          {/* Snout */}
          <ellipse cx="94" cy="11" rx="6" ry="4.5" fill="#b45309" />
          <circle cx="98" cy="11" r="2" fill="#18181b" />
          {/* Big clever dark eye */}
          <circle cx="82" cy="7" r="3.5" fill="#000000" />
          <circle cx="81" cy="6" r="1.2" fill="#ffffff" />
          {/* Mouse Deer Ears */}
          <ellipse cx="74" cy="-2" rx="5" ry="10" fill="#b45309" transform="rotate(-20, 74, -2)" />
          <ellipse cx="74" cy="-2" rx="3" ry="7" fill="#fef3c7" transform="rotate(-20, 74, -2)" />

          {/* Thought Bubble / Speech Indicator */}
          <g transform="translate(60, -55)">
            <rect x="0" y="0" width="130" height="42" rx="12" fill="#ffffff" stroke="#059669" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            <polygon points="18,42 28,42 22,50" fill="#ffffff" />
            <text x="65" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">
              "One! Two! Three..."
            </text>
            <text x="65" y="32" textAnchor="middle" fontSize="8" fontWeight="600" fill="#047857">
              Counting the crocodiles!
            </text>
          </g>
        </g>

        {/* Foreground river reeds & jungle plants */}
        <path d="M10 460 Q20 370 0 350 Q10 400 20 460 Z" fill="#15803d" />
        <path d="M25 460 Q40 360 20 340 Q30 390 35 460 Z" fill="#22c55e" />
        <path d="M45 460 Q60 380 40 360 Q50 410 55 460 Z" fill="#16a34a" />
      </svg>
      <div className="p-2.5 bg-white border-t border-emerald-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-emerald-950">
          The Cleverness of Sang Kancil
        </span>
        <span className="text-[11px] text-slate-500 font-medium">
          Sang Kancil forms a bridge with crocodiles to reach the fruit trees
        </span>
      </div>
    </div>
  );
};
