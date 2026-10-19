import React from 'react';
import { MapPin, Compass, DollarSign, Clock, ShieldCheck, TreePine, Camera, Sparkles } from 'lucide-react';

export const TwinLakesBrochure: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-3xl border border-emerald-300 bg-linear-to-b from-emerald-950 via-teal-950 to-slate-950 text-white shadow-md relative ${className}`}>
      {/* Top Banner */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-700 to-emerald-900 px-4 py-2.5 flex items-center justify-between border-b border-emerald-600/50">
        <div className="flex items-center gap-2">
          <TreePine className="w-4 h-4 text-emerald-300" />
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-100">
            Official Eco-Tourism Brochure · Workbook Page 40
          </span>
        </div>
        <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
          Protected Area
        </span>
      </div>

      {/* Hero Visual Area of Lake Balinsasayao */}
      <div className="relative">
        <svg
          viewBox="0 0 800 360"
          className="w-full h-auto block select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lakeSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="lakeWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
          </defs>

          {/* Morning Sky over Mount Talinis Ridge */}
          <rect width="800" height="220" fill="url(#lakeSky)" />
          {/* Morning Sun over mountain */}
          <circle cx="680" cy="80" r="40" fill="#fde047" opacity="0.9" />

          {/* Distant Mountain Ridges */}
          <path d="M0 160 Q200 90 440 140 T800 110 L800 240 L0 240 Z" fill="#065f46" opacity="0.5" />
          <path d="M0 180 Q250 120 520 160 T800 140 L800 260 L0 260 Z" fill="#047857" opacity="0.7" />

          {/* Lush Primary Rainforest slopes surrounding the crater lake */}
          <path d="M0 210 Q160 160 380 200 Q600 170 800 210 L800 280 L0 280 Z" fill="#064e3b" />

          {/* Deep Emerald Lake Balinsasayao */}
          <rect y="230" width="800" height="130" fill="url(#lakeWater)" />
          {/* Water reflection ripples */}
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d={`M${(i * 105) % 800} ${250 + i * 12} Q${(i * 105 + 50) % 800} ${245 + i * 12} ${(i * 105 + 100) % 800} ${250 + i * 12}`}
              stroke="#6ee7b7"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
          ))}

          {/* Kayaker paddling across peaceful water */}
          <g transform="translate(480, 260)">
            <ellipse cx="30" cy="18" rx="35" ry="5" fill="#f59e0b" />
            <circle cx="30" cy="5" r="5" fill="#fed7aa" />
            <rect x="25" y="10" width="10" height="10" fill="#dc2626" rx="2" />
            {/* Paddle */}
            <line x1="8" y1="2" x2="52" y2="28" stroke="#ffffff" strokeWidth="2.5" />
            <ellipse cx="8" cy="2" rx="4" ry="2" fill="#e2e8f0" />
            <ellipse cx="52" cy="28" rx="4" ry="2" fill="#e2e8f0" />
          </g>

          {/* Hornbill bird flying in the mist */}
          <g transform="translate(180, 90)">
            <path d="M0 10 Q15 -5 30 10 Q45 -5 60 10 Q45 2 30 5 Q15 2 0 10 Z" fill="#18181b" />
          </g>
          <g transform="translate(260, 115) scale(0.7)">
            <path d="M0 10 Q15 -5 30 10 Q45 -5 60 10 Q45 2 30 5 Q15 2 0 10 Z" fill="#18181b" />
          </g>

          {/* Foreground wooden viewing deck & observation railing */}
          <polygon points="0,320 280,310 320,360 0,360" fill="#78350f" />
          <line x1="20" y1="285" x2="260" y2="275" stroke="#b45309" strokeWidth="4" />
          <line x1="40" y1="284" x2="40" y2="330" stroke="#78350f" strokeWidth="4" />
          <line x1="120" y1="281" x2="120" y2="330" stroke="#78350f" strokeWidth="4" />
          <line x1="200" y1="278" x2="200" y2="330" stroke="#78350f" strokeWidth="4" />
        </svg>

        {/* Floating Title Overlay */}
        <div className="absolute bottom-3 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sibulan & San Jose, Negros Oriental, Philippines</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white leading-tight">
            Balinsasayao Twin Lakes Natural Park
          </h3>
          <p className="text-[11px] text-emerald-100/80 mt-0.5 leading-snug">
            Craters of Lake Balinsasayao and Lake Danao · 846 meters above sea level · Pristine rainforest sanctuary
          </p>
        </div>
      </div>

      {/* Information Cards Grid */}
      <div className="p-4 space-y-3.5 text-xs">
        {/* Key Highlights */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-emerald-900/40 border border-emerald-700/50 p-2.5 rounded-2xl">
            <span className="text-emerald-300 font-bold block mb-1 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              <span>Activities</span>
            </span>
            <ul className="text-[11px] text-slate-200 space-y-1 list-disc list-inside">
              <li>Kayaking & Paddle Boats</li>
              <li>Nature Ridge Trekking</li>
              <li>Birdwatching (Hornbills)</li>
            </ul>
          </div>
          <div className="bg-emerald-900/40 border border-emerald-700/50 p-2.5 rounded-2xl">
            <span className="text-amber-300 font-bold block mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Travel Tips</span>
            </span>
            <ul className="text-[11px] text-slate-200 space-y-1 list-disc list-inside">
              <li>Best Time: 6:00 AM – 10:00 AM</li>
              <li>Sturdy walking footwear</li>
              <li>Leave No Trace policy</li>
            </ul>
          </div>
        </div>

        {/* Entrance Fee Chart Table */}
        <div className="bg-slate-900/90 border border-emerald-600/40 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
            <span className="font-bold text-emerald-300 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Visitor Fee Schedule</span>
            </span>
            <span className="text-[10px] text-slate-400">DENR Protected Area Rate</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-300">Filipino Adults:</span>
              <span className="font-bold text-amber-300">₱50.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-300">Students & Seniors:</span>
              <span className="font-bold text-emerald-400">₱25.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-300">Foreign Visitors:</span>
              <span className="font-bold text-amber-300">₱100.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-300">Boat / Kayak Rental:</span>
              <span className="font-bold text-emerald-400">₱250.00/hr</span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Workbook Exercise:</strong> Use the brochure details above to complete your Travel Information organizer in Activity 1!
          </span>
        </div>
      </div>
    </div>
  );
};
