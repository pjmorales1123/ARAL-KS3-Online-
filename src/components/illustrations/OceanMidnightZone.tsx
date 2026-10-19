import React from 'react';

export const OceanMidnightZone: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-md relative ${className}`}
    >
      <svg
        viewBox="0 0 700 360"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Abyssal Ocean Gradient */}
          <linearGradient id="abyssGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="40%" stopColor="#031b2b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Bioluminescent Glow */}
          <radialGradient id="anglerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Midnight Zone Dark Background */}
        <rect width="700" height="360" fill="url(#abyssGrad)" />

        {/* Ambient deep sea dust / marine snow particles */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={(i * 37) % 700}
            cy={(i * 23) % 360}
            r={(i % 3) * 0.8 + 0.8}
            fill="#7dd3fc"
            opacity={(i % 5) * 0.15 + 0.2}
          />
        ))}

        {/* Ancient Sea Trench Jagged Rocks */}
        <path
          d="M0 360 L0 260 L60 270 L110 230 L160 280 L230 250 L280 290 L340 270 L420 310 L500 280 L580 320 L640 290 L700 320 L700 360 Z"
          fill="#0f172a"
        />
        <path
          d="M0 360 L0 290 L70 310 L150 280 L220 320 L320 300 L450 330 L560 310 L700 330 L700 360 Z"
          fill="#020617"
        />

        {/* Bioluminescent Anglerfish ("Living Flashlight") */}
        <g transform="translate(180, 50)">
          {/* Light Aura Glow */}
          <circle cx="120" cy="50" r="50" fill="url(#anglerGlow)" />
          <circle cx="120" cy="50" r="8" fill="#e0f2fe" />

          {/* Esca / Lure Filament */}
          <path
            d="M175 110 C150 60 130 50 120 50"
            stroke="#38bdf8"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Anglerfish Body */}
          <path
            d="M170 120 C230 90 280 110 320 150 C300 180 240 200 180 190 C150 185 130 160 140 140 C145 130 160 122 170 120 Z"
            fill="#1e293b"
            stroke="#0ea5e9"
            strokeWidth="2"
          />

          {/* Fierce Translucent Teeth */}
          <path
            d="M142 142 L150 152 L154 142 L160 154 L165 142 L172 153 L178 142"
            stroke="#f8fafc"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M142 165 L150 155 L154 165 L160 153 L165 165 L172 154 L178 165"
            stroke="#f8fafc"
            strokeWidth="2"
            fill="none"
          />

          {/* Small Glowing Eye */}
          <circle cx="185" cy="132" r="5" fill="#38bdf8" />
          <circle cx="184" cy="131" r="1.5" fill="#ffffff" />

          {/* Pectoral & Dorsal Fins */}
          <path d="M240 100 Q260 85 270 110 Z" fill="#0284c7" opacity="0.8" />
          <path d="M220 170 Q240 195 255 175 Z" fill="#0284c7" opacity="0.8" />

          {/* Caudal Tail Fin */}
          <path d="M315 150 L345 125 L340 175 Z" fill="#0ea5e9" opacity="0.85" />
        </g>

        {/* Small Deep Sea Light Organisms */}
        <g transform="translate(480, 180)">
          <circle cx="0" cy="0" r="4" fill="#34d399" opacity="0.9" />
          <ellipse cx="14" cy="0" rx="8" ry="3" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
        </g>
        <g transform="translate(100, 210)">
          <circle cx="0" cy="0" r="3" fill="#a78bfa" opacity="0.9" />
          <ellipse cx="12" cy="0" rx="6" ry="2.5" fill="#312e81" stroke="#a78bfa" strokeWidth="1" />
        </g>

        {/* Descriptive Text Overlay */}
        <text x="30" y="45" fill="#7dd3fc" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
          THE MIDNIGHT ZONE · "A Living Flashlight"
        </text>
        <text x="30" y="65" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
          Deep below 1,000 meters where sunlight never reaches
        </text>
      </svg>
    </div>
  );
};
