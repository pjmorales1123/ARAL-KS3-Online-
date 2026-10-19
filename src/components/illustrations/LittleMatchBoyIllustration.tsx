import React from 'react';

export const LittleMatchBoyIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-300 bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 text-white shadow-sm relative ${className}`}>
      <div className="px-3 py-1.5 bg-slate-800 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between border-b border-slate-700">
        <span>Workbook Page 16 Illustration · The Little Match Boy</span>
        <span>Story Adaptation</span>
      </div>

      <svg
        viewBox="0 0 800 460"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="matchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#dc2626" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="snowGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* Cold Winter Night Sky */}
        <rect width="800" height="380" fill="#0f172a" />

        {/* Falling Snowflakes */}
        {[
          { x: 50, y: 40, r: 2.5 },
          { x: 120, y: 90, r: 1.5 },
          { x: 200, y: 50, r: 3 },
          { x: 280, y: 120, r: 2 },
          { x: 380, y: 30, r: 2 },
          { x: 450, y: 80, r: 2.5 },
          { x: 530, y: 45, r: 1.5 },
          { x: 620, y: 110, r: 3 },
          { x: 720, y: 60, r: 2 },
          { x: 100, y: 180, r: 2 },
          { x: 680, y: 190, r: 2.5 },
          { x: 750, y: 250, r: 2 },
          { x: 50, y: 280, r: 1.5 },
        ].map((s, idx) => (
          <circle key={idx} cx={s.x} cy={s.y} r={s.r} fill="#ffffff" opacity="0.8" />
        ))}

        {/* Distant City Buildings Silhouette with Cozy Warm Windows */}
        <rect x="40" y="140" width="130" height="240" fill="#1e293b" />
        <rect x="70" y="170" width="25" height="35" fill="#fef08a" opacity="0.9" rx="2" />
        <rect x="115" y="170" width="25" height="35" fill="#f59e0b" opacity="0.8" rx="2" />
        <rect x="70" y="230" width="25" height="35" fill="#fef08a" opacity="0.6" rx="2" />
        <rect x="115" y="230" width="25" height="35" fill="#334155" rx="2" />

        <rect x="190" y="100" width="160" height="280" fill="#1e293b" />
        <polygon points="190,100 270,50 350,100" fill="#0f172a" />
        <rect x="220" y="130" width="30" height="40" fill="#fef08a" opacity="0.85" rx="2" />
        <rect x="290" y="130" width="30" height="40" fill="#f59e0b" opacity="0.75" rx="2" />
        <rect x="220" y="200" width="30" height="40" fill="#334155" rx="2" />
        <rect x="290" y="200" width="30" height="40" fill="#fef08a" opacity="0.7" rx="2" />

        {/* Right Building Silhouette */}
        <rect x="580" y="120" width="180" height="260" fill="#1e293b" />
        <rect x="620" y="160" width="35" height="45" fill="#fef08a" opacity="0.9" rx="2" />
        <rect x="690" y="160" width="35" height="45" fill="#f59e0b" opacity="0.85" rx="2" />
        <rect x="620" y="230" width="35" height="45" fill="#334155" rx="2" />
        <rect x="690" y="230" width="35" height="45" fill="#fef08a" opacity="0.5" rx="2" />

        {/* Cold Stone Wall Alley corner where the boy huddles */}
        <path d="M360 160 L540 180 L540 380 L360 380 Z" fill="#334155" />
        <line x1="360" y1="220" x2="540" y2="235" stroke="#1e293b" strokeWidth="2" />
        <line x1="360" y1="280" x2="540" y2="295" stroke="#1e293b" strokeWidth="2" />
        <line x1="360" y1="340" x2="540" y2="355" stroke="#1e293b" strokeWidth="2" />

        {/* Snow covered cobblestone street */}
        <rect y="375" width="800" height="85" fill="url(#snowGround)" />
        <path d="M0 380 Q200 370 400 382 T800 376 L800 460 L0 460 Z" fill="#f8fafc" />

        {/* Matchbox on the snow */}
        <rect x="490" y="388" width="35" height="18" fill="#b45309" rx="2" />
        <rect x="494" y="391" width="27" height="12" fill="#d97706" rx="1" />
        <text x="507" y="400" fontSize="7" fontWeight="bold" fill="#ffffff" textAnchor="middle">
          MATCH
        </text>

        {/* Warm Golden Glow of the Struck Match */}
        <circle cx="450" cy="305" r="140" fill="url(#matchGlow)" />

        {/* THE LITTLE MATCH BOY */}
        <g id="matchBoy" transform="translate(400, 240)">
          {/* Tattered Winter Coat */}
          <path
            d="M20 70 Q45 55 60 70 L75 140 Q45 145 15 140 Z"
            fill="#475569"
          />
          {/* Worn wool scarf */}
          <path
            d="M30 65 Q45 75 60 65 Q65 80 50 85 Q35 80 30 65 Z"
            fill="#991b1b"
          />
          <path d="M50 85 L54 110 L44 110 Z" fill="#b91c1c" />

          {/* Head & Winter Beanie */}
          <circle cx="45" cy="42" r="18" fill="#fed7aa" />
          <path d="M26 38 Q45 18 64 38 Q50 34 26 38 Z" fill="#1e293b" />
          <ellipse cx="45" cy="22" rx="18" ry="12" fill="#334155" />
          <circle cx="45" cy="10" r="5" fill="#dc2626" />

          {/* Hopeful Face illuminated by the flame */}
          <circle cx="49" cy="40" r="2.5" fill="#451a03" />
          <path d="M48 46 Q52 49 55 46" stroke="#b45309" strokeWidth="1.5" fill="none" />

          {/* Hands holding the matchstick */}
          <ellipse cx="50" cy="75" rx="8" ry="6" fill="#fcd34d" />

          {/* The Matchstick */}
          <line x1="50" y1="75" x2="52" y2="60" stroke="#78350f" strokeWidth="2.5" />
          {/* Flickering Flame */}
          <path
            d="M52 60 Q48 50 52 42 Q56 50 52 60 Z"
            fill="#f97316"
          />
          <path
            d="M52 58 Q49 51 52 46 Q55 51 52 58 Z"
            fill="#fef08a"
          />

          {/* Boy's huddled boots in the snow */}
          <ellipse cx="25" cy="142" rx="14" ry="7" fill="#1e293b" />
          <ellipse cx="65" cy="142" rx="14" ry="7" fill="#1e293b" />
        </g>

        {/* Cozy Vision inside the flame: A warm crackling stove & feast */}
        <g transform="translate(260, 200)" opacity="0.85">
          <circle cx="60" cy="50" r="48" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="60" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b45309">
            Vision in the Glow
          </text>
          {/* Iron Stove representation */}
          <rect x="35" y="42" width="50" height="36" fill="#451a03" rx="4" />
          <rect x="45" y="52" width="30" height="20" fill="#ea580c" rx="2" />
          <polygon points="52,68 60,56 68,68" fill="#fde047" />
          <text x="60" y="90" textAnchor="middle" fontSize="8" fontWeight="600" fill="#92400e">
            Warmth & Comfort
          </text>
        </g>
      </svg>

      <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-amber-300">
          The Little Match Boy · Sequence of Events
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          In the cold winter night, each struck match brought visions of warmth and peace
        </span>
      </div>
    </div>
  );
};
