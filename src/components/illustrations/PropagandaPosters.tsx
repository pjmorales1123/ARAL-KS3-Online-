import React from 'react';
import { Megaphone, Users, Award, ShieldAlert, Sparkles } from 'lucide-react';

export const PropagandaPosters: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-3xl border border-rose-300 bg-linear-to-b from-rose-950 via-slate-900 to-slate-950 text-white shadow-md relative ${className}`}>
      <div className="bg-linear-to-r from-rose-700 via-amber-600 to-rose-800 px-4 py-2.5 flex items-center justify-between border-b border-rose-500/40">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-300" />
          <span className="text-[11px] font-black uppercase tracking-widest text-white">
            Propaganda & Advertising Posters · Workbook Page 54
          </span>
        </div>
        <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
          Critical Thinking
        </span>
      </div>

      <div className="p-3.5 space-y-3">
        <p className="text-xs text-rose-100 font-medium">
          Examine these 4 visual propaganda posters from the workbook before playing <strong>Buy or Bye?</strong>:
        </p>

        {/* 2x2 Grid of Propaganda Visual Posters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* POSTER 1: BANDWAGON */}
          <div className="border-2 border-amber-400 bg-linear-to-br from-amber-500 via-amber-600 to-orange-600 rounded-2xl p-3 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">
                  Technique 1: Bandwagon
                </span>
                <Users className="w-4 h-4 text-amber-200" />
              </div>
              <h4 className="text-sm font-black uppercase leading-tight text-yellow-100 drop-shadow-xs">
                “Over 10 Million Filipinos Have Switched!”
              </h4>
              <p className="text-[11px] text-white/95 mt-1 leading-snug font-medium">
                Everyone is drinking <strong>MegaGlow Energy</strong>. Don't be the only one left behind!
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10px]">
              <span className="italic">Peer pressure appeal</span>
              <span className="font-bold bg-black/40 px-2 py-0.5 rounded">Join the Crowd</span>
            </div>
          </div>

          {/* POSTER 2: TESTIMONIAL */}
          <div className="border-2 border-blue-400 bg-linear-to-br from-blue-600 via-indigo-700 to-slate-900 rounded-2xl p-3 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">
                  Technique 2: Testimonial
                </span>
                <Award className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0">
                  🥇
                </div>
                <div>
                  <span className="text-xs font-bold block text-blue-100">National Champion</span>
                  <span className="text-[9px] text-amber-300 font-semibold">Gold Medalist</span>
                </div>
              </div>
              <p className="text-[11px] italic text-blue-50 leading-snug">
                “I won gold only because I drink <strong>SuperPower Shake</strong> every morning!”
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10px]">
              <span className="italic">Celebrity endorsement</span>
              <span className="font-bold bg-black/40 px-2 py-0.5 rounded">Trust the Star</span>
            </div>
          </div>

          {/* POSTER 3: PLAIN FOLKS */}
          <div className="border-2 border-emerald-400 bg-linear-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-2xl p-3 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">
                  Technique 3: Plain Folks
                </span>
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </div>
              <h4 className="text-sm font-black leading-tight text-emerald-100">
                “From our humble family farm to your kitchen table.”
              </h4>
              <p className="text-[11px] text-white/95 mt-1 leading-snug font-medium">
                Nanay Teresa relies on simple, honest <strong>Bayanihan Rice</strong> for her hard-working children.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10px]">
              <span className="italic">Everyday ordinary people</span>
              <span className="font-bold bg-black/40 px-2 py-0.5 rounded">Relatable</span>
            </div>
          </div>

          {/* POSTER 4: CARD STACKING */}
          <div className="border-2 border-rose-400 bg-linear-to-br from-rose-700 via-pink-800 to-slate-900 rounded-2xl p-3 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">
                  Technique 4: Card Stacking
                </span>
                <ShieldAlert className="w-4 h-4 text-rose-300" />
              </div>
              <div className="bg-white/20 p-2 rounded-xl text-center mb-1">
                <span className="text-base font-black text-amber-300 block">
                  100% VITAMIN C! 0% CHOLESTEROL!
                </span>
                <span className="text-[9px] text-slate-300 block">
                  (Hidden in tiny text: Contains 54g Added Refined Sugar per serving)
                </span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10px]">
              <span className="italic">One-sided facts</span>
              <span className="font-bold bg-rose-950 px-2 py-0.5 rounded text-rose-200">Deceptive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
