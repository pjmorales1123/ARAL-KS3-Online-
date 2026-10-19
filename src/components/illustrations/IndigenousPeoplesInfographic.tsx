import React from 'react';
import { ShieldCheck, MapPin, Users, Sparkles } from 'lucide-react';

export const IndigenousPeoplesInfographic: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-[#fdfbf7] border-2 border-amber-900/30 rounded-3xl p-4 sm:p-5 shadow-sm text-slate-900 select-none ${className}`}
    >
      {/* Decorative Top Sunburst Header */}
      <div className="text-center pb-3 border-b-2 border-amber-800/20 relative">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="w-6 h-0.5 bg-amber-700" />
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
            DepEd ARAL Infographic Study
          </span>
          <span className="w-6 h-0.5 bg-amber-700" />
        </div>
        <h2 className="text-lg sm:text-xl font-black tracking-tight text-amber-950 uppercase font-serif">
          Indigenous Peoples of the Philippines
        </h2>
      </div>

      {/* Overview Stat Strip & Law Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3.5">
        {/* Population Stat */}
        <div className="bg-amber-100/60 border border-amber-300/80 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-lg shrink-0">
            10M
          </div>
          <div>
            <span className="text-xs font-bold text-amber-950 block leading-tight">
              Around 10 MILLION people
            </span>
            <span className="text-[11px] text-amber-800 leading-tight block mt-0.5">
              (15% of the population) belong to over <strong>100 distinct ethnic groups</strong>.
            </span>
          </div>
        </div>

        {/* Governing Law IPRA Box */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-[11px] text-blue-950">
            <span className="font-bold block text-blue-900">
              Governing Law: Republic Act 8371 (IPRA)
            </span>
            <span className="text-blue-800 block mt-0.5 leading-snug">
              • Protects Ancestral Land Rights<br />
              • Overseen by National Commission on Indigenous Peoples (NCIP)
            </span>
          </div>
        </div>
      </div>

      {/* 3 REGIONS: LUZON, VISAYAS, MINDANAO */}
      <div className="space-y-3.5">
        {/* ================= LUZON ================= */}
        <div className="border border-blue-200 bg-blue-50/40 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-blue-200">
            <span className="bg-blue-800 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
              LUZON
            </span>
            <span className="text-xs font-bold text-blue-950">Cordillera & Sierra Madre</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Igorot */}
            <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-xs text-rose-800 uppercase tracking-wide">
                  IGOROT
                </h4>
                <span className="text-sm">🌾</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside">
                <li>Mountain tribes of the Cordillera</li>
                <li>Skilled in rice terracing</li>
                <li>Wear traditional woven attire</li>
              </ul>
            </div>

            {/* Dumagat */}
            <div className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wide">
                  DUMAGAT
                </h4>
                <span className="text-sm">🏹</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside">
                <li>Forest dwellers of the Sierra Madre</li>
                <li>Expert hunters and fishers</li>
                <li>Nomadic lifestyle</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= VISAYAS ================= */}
        <div className="border border-amber-200 bg-amber-50/40 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-amber-200">
            <span className="bg-amber-700 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
              VISAYAS
            </span>
            <span className="text-xs font-bold text-amber-950">Negros Oriental & Capiz</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Negritos */}
            <div className="bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide">
                  NEGRITOS
                </h4>
                <span className="text-sm">🌿</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside">
                <li>Ata Negritos of Negros Oriental</li>
                <li>Small-statured and curly-haired</li>
                <li>Practice forest survival skills</li>
              </ul>
            </div>

            {/* Sulodnon */}
            <div className="bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide">
                  SULODNON
                </h4>
                <span className="text-sm">🪘</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside">
                <li>Panay-Bukidnon of Capiz</li>
                <li>Keep ancient epic chants</li>
                <li>Skilled in traditional crafts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= MINDANAO ================= */}
        <div className="border border-rose-200 bg-rose-50/40 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-rose-200">
            <span className="bg-rose-800 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
              MINDANAO
            </span>
            <span className="text-xs font-bold text-rose-950">Lake Lanao & Lake Sebu</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Maranao */}
            <div className="bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-xs text-rose-900 uppercase tracking-wide">
                  MARANAO
                </h4>
                <span className="text-sm">🕌</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside">
                <li>People of Lake Lanao</li>
                <li>Rich in Islamic art and epics</li>
                <li>Live in grand torogan houses</li>
              </ul>
            </div>

            {/* T'boli */}
            <div className="bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-xs text-rose-900 uppercase tracking-wide">
                  T’BOLI
                </h4>
                <span className="text-sm">🧵</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 list-disc list-inside">
                <li>Highland dwellers of Lake Sebu</li>
                <li>Spiritual beliefs and many gods</li>
                <li>Known for T’nalak weaving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-3.5 pt-2 text-center border-t border-amber-900/20">
        <span className="text-xs font-black uppercase tracking-widest text-amber-900">
          ✦ KEEPING TRADITIONS ALIVE ✦
        </span>
      </div>
    </div>
  );
};
