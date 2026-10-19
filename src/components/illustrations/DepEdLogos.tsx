import React from 'react';

export const DepEdBannerStrip: React.FC = () => {
  return (
    <div className="w-full bg-linear-to-r from-blue-700 via-amber-500 to-rose-600 h-2.5 flex items-center justify-between px-2 overflow-hidden shadow-2xs">
      <div className="flex items-center gap-4 text-[9px] text-white/90 font-bold tracking-widest uppercase">
        <span>DepEd ARAL Program</span>
        <span>•</span>
        <span>Key Stage 3</span>
        <span>•</span>
        <span>Reading Plus</span>
      </div>
    </div>
  );
};

export const AralProgramLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 56,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-2xl bg-linear-to-tr from-amber-400 via-rose-500 to-blue-600 p-0.5 shadow-sm flex items-center justify-center shrink-0 ${className}`}
    >
      <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center p-1 text-center">
        <svg viewBox="0 0 100 80" className="w-full h-8" fill="none">
          {/* Open Book */}
          <path
            d="M50 45 C35 35 15 38 5 44 L5 70 C15 64 35 62 50 72 C65 62 85 64 95 70 L95 44 C85 38 65 35 50 45 Z"
            fill="#1e3a8a"
          />
          <path
            d="M50 45 L50 72"
            stroke="#ffffff"
            strokeWidth="2"
          />
          {/* Stylized reading learners heads */}
          <circle cx="50" cy="22" r="11" fill="#f59e0b" />
          <circle cx="28" cy="28" r="9" fill="#ef4444" />
          <circle cx="72" cy="28" r="9" fill="#0284c7" />
          {/* Smiles */}
          <path d="M46 24 Q50 28 54 24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-[9px] font-black tracking-wider text-rose-600 leading-none mt-0.5">
          ARAL
        </span>
      </div>
    </div>
  );
};

export const DepEdOfficialSeal: React.FC<{ className?: string }> = ({ className = 'h-7' }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center font-extrabold text-blue-900 tracking-tight text-sm">
        <span>Dep</span>
        <span className="text-rose-600">ED</span>
      </div>
      <span className="text-[8px] leading-tight text-slate-500 font-bold border-l border-slate-300 pl-1.5 hidden xs:inline">
        DEPARTMENT<br />OF EDUCATION
      </span>
    </div>
  );
};
