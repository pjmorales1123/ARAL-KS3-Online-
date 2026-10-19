import React from 'react';
import { Globe, Users, TrendingUp, Sun, Palmtree, MapPin } from 'lucide-react';

export const ReasonsToStayInfographic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full bg-linear-to-b from-sky-50 via-amber-50/50 to-orange-50 border-2 border-orange-200 rounded-3xl p-4 sm:p-5 shadow-sm text-slate-900 select-none ${className}`}
    >
      {/* Bold Poster Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 text-center mb-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono leading-none">
            5
          </span>
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-300 block">
              REASONS TO STAY IN THE
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight font-serif">
              Philippines
            </span>
          </div>
        </div>
      </div>

      {/* 5 Points Vertical Stack */}
      <div className="space-y-3">
        {/* 1. ENGLISH SPEAKING COUNTRY */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs flex items-start gap-3">
          <span className="text-2xl font-black text-rose-600 font-mono shrink-0 w-7">
            1
          </span>
          <div className="flex-1">
            <h4 className="font-extrabold text-xs uppercase tracking-tight text-slate-900">
              ENGLISH SPEAKING COUNTRY
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                3rd in the World
              </span>
              <span className="text-xs font-semibold text-slate-700">
                <strong>93%</strong> of the population are English speakers
              </span>
            </div>
          </div>
        </div>

        {/* 2. DIVERSE CULTURE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs flex items-start gap-3">
          <span className="text-2xl font-black text-amber-600 font-mono shrink-0 w-7">
            2
          </span>
          <div className="flex-1">
            <h4 className="font-extrabold text-xs uppercase tracking-tight text-slate-900">
              DIVERSE CULTURE
            </h4>
            <p className="text-xs text-slate-700 mt-0.5">
              Diversity produces culturally vibrant communities blending heritage, festivals, and warmth.
            </p>
            <div className="flex items-center gap-1.5 text-sm mt-1">
              <span>🇵🇭</span>
              <span>🇪🇸</span>
              <span>🇺🇸</span>
              <span>🇨🇳</span>
              <span className="text-[10px] text-slate-500 font-medium ml-1">Multicultural Harmony</span>
            </div>
          </div>
        </div>

        {/* 3. RICH IN RESOURCES */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs flex items-start gap-3">
          <span className="text-2xl font-black text-emerald-600 font-mono shrink-0 w-7">
            3
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs uppercase tracking-tight text-slate-900">
                RICH IN RESOURCES
              </h4>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Higher Per Capita Income
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1">
              Abundant agriculture, marine biodiversity, tropical fruits, pearls, and precious natural minerals.
            </p>
          </div>
        </div>

        {/* 4. TROPICAL COUNTRY */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs flex items-start gap-3">
          <span className="text-2xl font-black text-cyan-600 font-mono shrink-0 w-7">
            4
          </span>
          <div className="flex-1">
            <h4 className="font-extrabold text-xs uppercase tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>TROPICAL COUNTRY</span>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </h4>
            <p className="text-xs text-slate-700 mt-0.5">
              The fair and tropical climate permits enjoyable outdoor activities and beach living year-round.
            </p>
          </div>
        </div>

        {/* 5. TOP TOURIST DESTINATIONS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs flex items-start gap-3">
          <span className="text-2xl font-black text-purple-600 font-mono shrink-0 w-7">
            5
          </span>
          <div className="flex-1">
            <h4 className="font-extrabold text-xs uppercase tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>TOP TOURIST DESTINATIONS</span>
              <Palmtree className="w-3.5 h-3.5 text-emerald-600" />
            </h4>
            <span className="text-xs font-bold text-rose-700 block mt-0.5">
              ITS 7,107 ISLANDS HOUSES THE BEST TOURIST SPOTS IN ASIA
            </span>
            <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold text-slate-600 mt-2 text-center">
              <span className="bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                Taal Lake & Volcano
              </span>
              <span className="bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                People's Park
              </span>
              <span className="bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                Twin Lakes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="mt-3 pt-2 text-center border-t border-orange-200 text-[10px] text-slate-500 font-semibold flex items-center justify-between px-1">
        <span>#SEETWINLAKESPH</span>
        <span>Twin Lakes Information Center, Dayap Itaas, Laurel, Batangas</span>
      </div>
    </div>
  );
};
