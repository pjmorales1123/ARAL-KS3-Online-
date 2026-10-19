import React from 'react';

export const RebusClueCard: React.FC<{
  itemIndex: number;
  label?: string;
}> = ({ itemIndex, label }) => {
  return (
    <div className="flex items-center justify-center p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs">
      {itemIndex === 1 && (
        <div className="flex items-center gap-6">
          {/* Honeybee */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <ellipse cx="50" cy="55" rx="26" ry="20" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
              {/* Stripes */}
              <path d="M42 36 L42 74" stroke="#1e293b" strokeWidth="5" />
              <path d="M58 36 L58 74" stroke="#1e293b" strokeWidth="5" />
              {/* Head */}
              <circle cx="28" cy="45" r="14" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
              <circle cx="24" cy="42" r="3.5" fill="#1e293b" />
              <circle cx="23" cy="41" r="1.2" fill="#ffffff" />
              {/* Antenna */}
              <path d="M22 34 Q18 24 14 26" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="13" cy="26" r="2.5" fill="#1e293b" />
              {/* Wings */}
              <ellipse cx="48" cy="26" rx="14" ry="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" opacity="0.85" />
              <ellipse cx="64" cy="24" rx="12" ry="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" opacity="0.85" />
              {/* Stinger */}
              <polygon points="76,55 86,52 86,58" fill="#1e293b" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Bee</span>
          </div>

          <span className="text-xl font-black text-slate-300">+</span>

          {/* Phone Receiver */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <rect width="100" height="100" fill="transparent" />
              <path
                d="M30 20 C22 20 20 32 24 45 C30 65 48 82 70 86 C82 88 88 80 84 72 L74 62 C70 58 64 60 60 64 L56 68 C45 62 38 55 32 44 L36 40 C40 36 42 30 38 26 Z"
                fill="#0284c7"
                stroke="#0369a1"
                strokeWidth="2.5"
              />
              <circle cx="32" cy="26" r="5" fill="#bae6fd" opacity="0.6" />
              <circle cx="78" cy="78" r="5" fill="#bae6fd" opacity="0.6" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Call</span>
          </div>
        </div>
      )}

      {itemIndex === 2 && (
        <div className="flex items-center gap-6">
          {/* Thumbs Down Boo */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <path
                d="M35 25 L55 25 C62 25 65 30 65 36 L65 55 C65 60 60 65 52 65 L48 78 C46 84 40 86 36 82 L34 78 C30 70 30 65 30 60 L30 30 C30 26 32 25 35 25 Z"
                fill="#fca5a5"
                stroke="#dc2626"
                strokeWidth="2.5"
              />
              <rect x="22" y="25" width="10" height="38" rx="3" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
              <text x="56" y="80" fontSize="12" fontWeight="bold" fill="#dc2626">Boo~</text>
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Boo</span>
          </div>

          <span className="text-xl font-black text-slate-300">+</span>

          {/* Sando / T-Shirt */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <path
                d="M35 20 Q50 32 65 20 L85 34 L76 46 L68 40 L68 84 L32 84 L32 40 L24 46 L15 34 Z"
                fill="#2dd4bf"
                stroke="#0f766e"
                strokeWidth="2.5"
              />
              <circle cx="50" cy="50" r="8" fill="#ffffff" opacity="0.6" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Sando</span>
          </div>
        </div>
      )}

      {itemIndex === 3 && (
        <div className="flex items-center gap-6">
          {/* Coral Reef / Sea */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <rect width="100" height="100" rx="14" fill="#0284c7" />
              {/* Coral branches */}
              <path d="M25 85 Q22 55 35 50 Q40 60 45 42 Q55 58 52 85 Z" fill="#f43f5e" />
              <path d="M50 85 Q65 60 75 52 Q82 65 72 85 Z" fill="#fb923c" />
              {/* Sea anemone & clownfish */}
              <ellipse cx="60" cy="38" rx="12" ry="7" fill="#ea580c" />
              <rect x="58" y="31" width="3" height="14" fill="#ffffff" />
              <polygon points="48,38 42,32 42,44" fill="#ea580c" />
              {/* Water bubbles */}
              <circle cx="35" cy="28" r="3" fill="#bae6fd" opacity="0.8" />
              <circle cx="42" cy="18" r="4.5" fill="#bae6fd" opacity="0.8" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Sea</span>
          </div>

          <span className="text-xl font-black text-slate-300">+</span>

          {/* Thumbs Down Boo */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <path
                d="M35 25 L55 25 C62 25 65 30 65 36 L65 55 C65 60 60 65 52 65 L48 78 C46 84 40 86 36 82 L34 78 C30 70 30 65 30 60 L30 30 C30 26 32 25 35 25 Z"
                fill="#fed7aa"
                stroke="#ea580c"
                strokeWidth="2.5"
              />
              <rect x="22" y="25" width="10" height="38" rx="3" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
              <text x="56" y="80" fontSize="12" fontWeight="bold" fill="#ea580c">Boo~</text>
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Boo</span>
          </div>
        </div>
      )}

      {itemIndex === 4 && (
        <div className="flex items-center gap-6">
          {/* Bubbles */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <circle cx="40" cy="55" r="18" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" opacity="0.8" />
              <circle cx="34" cy="48" r="5" fill="#ffffff" opacity="0.8" />
              <circle cx="68" cy="38" r="14" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" opacity="0.8" />
              <circle cx="63" cy="33" r="3.5" fill="#ffffff" opacity="0.8" />
              <circle cx="56" cy="74" r="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" opacity="0.8" />
              <circle cx="30" cy="26" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" opacity="0.8" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Bubbles</span>
          </div>

          <span className="text-xl font-black text-slate-300">+</span>

          {/* Tin Soda Can */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              {/* Can body */}
              <rect x="34" y="24" width="32" height="56" rx="4" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
              <rect x="34" y="44" width="32" height="16" fill="#ffffff" />
              <ellipse cx="50" cy="24" rx="16" ry="5" fill="#e2e8f0" stroke="#c2410c" strokeWidth="2" />
              <ellipse cx="50" cy="80" rx="16" ry="5" fill="#c2410c" />
              <circle cx="50" cy="24" r="3" fill="#94a3b8" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Can</span>
          </div>
        </div>
      )}

      {itemIndex === 5 && (
        <div className="flex items-center gap-6">
          {/* White Flying Dove */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <path
                d="M75 45 C65 38 52 38 42 45 C35 32 20 30 14 36 C10 44 18 55 28 58 C22 64 24 74 32 76 C42 78 52 72 60 62 L78 60 C85 60 88 54 84 48 Z"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="2.5"
              />
              <circle cx="76" cy="48" r="2.5" fill="#1e293b" />
              <polygon points="84,50 92,52 84,54" fill="#f59e0b" />
              {/* Olive leaf in beak */}
              <path d="M88 52 Q94 46 98 48 Q94 54 88 52 Z" fill="#22c55e" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Dove (Ibon)</span>
          </div>

          <span className="text-xl font-black text-slate-300">+</span>

          {/* Barking Dog */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              {/* Body */}
              <ellipse cx="50" cy="62" rx="22" ry="14" fill="#d97706" stroke="#92400e" strokeWidth="2.5" />
              {/* Head */}
              <circle cx="70" cy="45" r="13" fill="#d97706" stroke="#92400e" strokeWidth="2" />
              <polygon points="65,34 68,22 75,32" fill="#78350f" />
              <polygon points="76,34 82,24 85,35" fill="#78350f" />
              <circle cx="74" cy="43" r="2" fill="#1e293b" />
              <ellipse cx="80" cy="47" rx="3" ry="2" fill="#1e293b" />
              {/* Bark lines */}
              <path d="M84 40 L92 36" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
              <path d="M86 48 L94 48" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
              {/* Legs */}
              <rect x="36" y="72" width="6" height="16" rx="2" fill="#d97706" />
              <rect x="46" y="72" width="6" height="16" rx="2" fill="#d97706" />
              <rect x="58" y="72" width="6" height="16" rx="2" fill="#d97706" />
              {/* Tail */}
              <path d="M30 58 Q20 50 24 40" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Dog (Aso)</span>
          </div>
        </div>
      )}
    </div>
  );
};
