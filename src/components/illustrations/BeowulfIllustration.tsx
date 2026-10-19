import React from 'react';

export const BeowulfIllustration: React.FC<{
  type?: 'grendel' | 'dragon';
  className?: string;
}> = ({ type = 'grendel', className = '' }) => {
  if (type === 'dragon') {
    return (
      <div className={`w-full overflow-hidden rounded-2xl border border-amber-300 bg-linear-to-b from-slate-950 via-amber-950 to-slate-900 text-white shadow-xs relative ${className}`}>
        <div className="px-3 py-1.5 bg-amber-950 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between border-b border-amber-800">
          <span>Session 5 Reader's Theater · Beowulf and the Fierce Dragon</span>
          <span>Epic Hero Tale</span>
        </div>

        <svg viewBox="0 0 800 380" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="dragonFire" cx="65%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#f97316" />
              <stop offset="65%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dark Mountain Barrow Cave */}
          <rect width="800" height="380" fill="#09090b" />
          <path d="M0 380 L0 180 Q200 40 400 60 T800 160 L800 380 Z" fill="#18181b" />
          <circle cx="580" cy="180" r="160" fill="url(#dragonFire)" />

          {/* The Fierce Fire-Breathing Dragon */}
          <g transform="translate(480, 100)">
            {/* Dragon Wings */}
            <path d="M80 50 Q160 -30 220 20 Q160 50 140 120 Z" fill="#7f1d1d" />
            <path d="M140 120 Q190 60 220 20" stroke="#fca5a5" strokeWidth="2" fill="none" />
            {/* Dragon Body */}
            <path d="M40 120 Q110 80 180 140 Q210 200 130 220 Q50 210 40 120 Z" fill="#991b1b" />
            {/* Spines on back */}
            {[...Array(6)].map((_, i) => (
              <polygon key={i} points={`${60 + i * 20},${100 - i * 3} ${70 + i * 20},${80 - i * 3} ${80 + i * 20},${100 - i * 3}`} fill="#450a0a" />
            ))}
            {/* Dragon Neck & Head thrusting forward */}
            <path d="M50 130 Q-20 120 -60 140 Q-20 170 30 160 Z" fill="#991b1b" />
            {/* Glowing Eye */}
            <circle cx="-35" cy="135" r="5" fill="#fef08a" />
            <circle cx="-35" cy="135" r="2.5" fill="#ef4444" />
            {/* Fire Breath Stream */}
            <path d="M-60 145 Q-160 150 -260 180 Q-160 210 -60 160 Z" fill="#f97316" opacity="0.9" />
            <path d="M-60 148 Q-140 152 -220 175 Q-140 195 -60 158 Z" fill="#fef08a" opacity="0.95" />
          </g>

          {/* BEOWULF & WIGLAF (Holding Iron Shields against the fire) */}
          <g transform="translate(180, 190)">
            {/* Wiglaf (Loyal Young Warrior) */}
            <g transform="translate(-40, 25)">
              <circle cx="20" cy="20" r="14" fill="#fed7aa" />
              <polygon points="10,12 20,-2 30,12" fill="#71717a" />
              <path d="M5 34 L35 34 L30 110 L10 110 Z" fill="#3f3f46" />
              {/* Wooden Shield */}
              <ellipse cx="40" cy="55" rx="16" ry="28" fill="#854d0e" stroke="#ca8a04" strokeWidth="2.5" />
              {/* Spear */}
              <line x1="10" y1="90" x2="65" y2="10" stroke="#e4e4e7" strokeWidth="3" />
              <polygon points="65,10 75,5 68,18" fill="#e4e4e7" />
            </g>

            {/* King Beowulf (Mighty Elder Warrior) */}
            <g transform="translate(40, 0)">
              {/* Golden Helmet */}
              <circle cx="30" cy="25" r="16" fill="#fed7aa" />
              <path d="M14 20 Q30 -2 46 20 Z" fill="#eab308" />
              <line x1="30" y1="-2" x2="30" y2="25" stroke="#ca8a04" strokeWidth="3" />
              {/* Mail Coat */}
              <path d="M10 40 L50 40 L45 135 L15 135 Z" fill="#52525b" />
              {/* Massive Iron Shield withstanding Dragon fire */}
              <ellipse cx="65" cy="70" rx="22" ry="38" fill="#71717a" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="65" cy="70" r="8" fill="#eab308" />
              {/* Famous Sword: Naegling */}
              <line x1="20" y1="60" x2="-20" y2="10" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
              <line x1="12" y1="48" x2="28" y2="58" stroke="#ca8a04" strokeWidth="3" />
            </g>
          </g>
        </svg>

        <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-300">
            Reader’s Theater: Beowulf and Wiglaf
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Beowulf and Wiglaf stand shoulder-to-shoulder against the mountain dragon
          </span>
        </div>
      </div>
    );
  }

  // Grendel scene in Session 9
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-indigo-300 bg-linear-to-b from-indigo-950 via-slate-900 to-slate-950 text-white shadow-xs relative ${className}`}>
      <div className="px-3 py-1.5 bg-indigo-900 text-indigo-200 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between border-b border-indigo-700">
        <span>Workbook Page 36 · Beowulf Battles Grendel in Heorot Hall</span>
        <span>Reality vs. Fantasy Analysis</span>
      </div>

      <svg viewBox="0 0 800 380" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hallGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#431407" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
        </defs>

        {/* Great Mead Hall Heorot Timber Walls */}
        <rect width="800" height="380" fill="url(#hallGlow)" />
        {/* Timber Beams */}
        {[...Array(9)].map((_, i) => (
          <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={380} stroke="#292524" strokeWidth="8" opacity="0.6" />
        ))}

        {/* Floor Benches with Sleeping Warriors */}
        <rect y="310" width="800" height="70" fill="#1c1917" />
        <g opacity="0.6">
          <rect x="40" y="325" width="80" height="18" fill="#44403c" rx="4" />
          <circle cx="55" cy="320" r="7" fill="#fed7aa" />
          <rect x="180" y="325" width="80" height="18" fill="#44403c" rx="4" />
          <circle cx="195" cy="320" r="7" fill="#fed7aa" />
        </g>

        {/* Shadow Monster Grendel on the Right */}
        <g id="grendelMonster" transform="translate(480, 100)">
          {/* Shadowy claws and towering beast body */}
          <path d="M80 60 Q160 30 180 120 Q190 220 90 240 Q10 230 40 140 Z" fill="#0f172a" />
          <path d="M50 80 Q10 40 -30 90 Q-20 140 40 120 Z" fill="#1e293b" />
          {/* Glowing menacing red eyes */}
          <circle cx="20" cy="90" r="5" fill="#ef4444" />
          <circle cx="35" cy="92" r="5" fill="#ef4444" />
          {/* Monster Arm reached out */}
          <path d="M40 130 L-70 160 L-90 150" stroke="#0f172a" strokeWidth="22" strokeLinecap="round" />
          {/* Monster Claws */}
          <polygon points="-90,145 -115,135 -85,155" fill="#ffffff" />
          <polygon points="-95,152 -120,150 -90,160" fill="#ffffff" />
          <polygon points="-88,160 -115,168 -82,165" fill="#ffffff" />
        </g>

        {/* Mighty Warrior Beowulf seizing Grendel's Arm */}
        <g id="beowulfHero" transform="translate(240, 110)">
          {/* Beowulf Body in action */}
          <circle cx="80" cy="50" r="18" fill="#fed7aa" />
          {/* Braided warrior beard & hair */}
          <path d="M68 40 Q80 20 95 40 Z" fill="#eab308" />
          <path d="M72 60 Q80 75 88 60 Z" fill="#eab308" />
          {/* Muscular Torso */}
          <path d="M60 68 L100 68 L95 180 L65 180 Z" fill="#78350f" />
          {/* Sturdy Stance */}
          <line x1="70" y1="180" x2="45" y2="240" stroke="#451a03" strokeWidth="12" strokeLinecap="round" />
          <line x1="90" y1="180" x2="115" y2="235" stroke="#451a03" strokeWidth="12" strokeLinecap="round" />
          {/* Mighty Arms gripping Grendel's claw with bare hands */}
          <path d="M70 85 L145 135 L170 148" stroke="#fed7aa" strokeWidth="14" strokeLinecap="round" />
          <circle cx="170" cy="148" r="9" fill="#d97706" />
        </g>

        {/* Clash Impact Sparks */}
        <circle cx="395" cy="255" r="6" fill="#fde047" />
        <line x1="395" y1="250" x2="395" y2="235" stroke="#f59e0b" strokeWidth="3" />
        <line x1="400" y1="255" x2="415" y2="255" stroke="#f59e0b" strokeWidth="3" />
      </svg>

      <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="font-semibold text-indigo-300">
          Beowulf Battles Grendel in Heorot Hall
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          Real human courage and physical strength vs. mythical monster creature
        </span>
      </div>
    </div>
  );
};
