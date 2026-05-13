// Inline SVG vehicle parts — TechLab Week 1 assembly game

// ─── CAR (red) ──────────────────────────────────────────────

export const CarWheels = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.55)} viewBox="0 0 100 55" fill="none">
    <rect x="20" y="22" width="60" height="7" rx="3.5" fill="#374151"/>
    <circle cx="20" cy="34" r="18" fill="#1f2937"/>
    <circle cx="20" cy="34" r="11" fill="#6b7280"/>
    <circle cx="20" cy="34" r="4" fill="#e5e7eb"/>
    <line x1="20" y1="16" x2="20" y2="52" stroke="#e5e7eb" strokeWidth="1.5"/>
    <line x1="2" y1="34" x2="38" y2="34" stroke="#e5e7eb" strokeWidth="1.5"/>
    <circle cx="80" cy="34" r="18" fill="#1f2937"/>
    <circle cx="80" cy="34" r="11" fill="#6b7280"/>
    <circle cx="80" cy="34" r="4" fill="#e5e7eb"/>
    <line x1="80" y1="16" x2="80" y2="52" stroke="#e5e7eb" strokeWidth="1.5"/>
    <line x1="62" y1="34" x2="98" y2="34" stroke="#e5e7eb" strokeWidth="1.5"/>
  </svg>
)

export const CarBody = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.65)} viewBox="0 0 120 78" fill="none">
    <rect x="5" y="36" width="110" height="32" rx="6" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
    <path d="M 28 36 C 32 16 88 16 94 36 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
    <path d="M 8 68 Q 28 58 42 68" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5"/>
    <path d="M 78 68 Q 92 58 112 68" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5"/>
    <line x1="60" y1="36" x2="60" y2="68" stroke="#dc2626" strokeWidth="2"/>
    <circle cx="111" cy="50" r="7" fill="#fef9c3" stroke="#fcd34d" strokeWidth="1.5"/>
    <rect x="5" y="44" width="9" height="13" rx="2" fill="#991b1b"/>
  </svg>
)

export const CarGlass = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.75)} viewBox="0 0 80 60" fill="none">
    <path d="M 8 56 L 20 8 L 60 8 L 72 56 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="40" y1="8" x2="40" y2="56" stroke="#3b82f6" strokeWidth="2.5"/>
    <line x1="12" y1="36" x2="68" y2="36" stroke="#3b82f6" strokeWidth="1.5"/>
    <path d="M 22 14 L 19 30 L 33 14 Z" fill="white" opacity="0.55"/>
    <path d="M 48 14 L 45 30 L 59 14 Z" fill="white" opacity="0.55"/>
  </svg>
)

export const CarFull = ({ size = 160 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.6)} viewBox="0 0 160 96" fill="none">
    <rect x="5" y="42" width="150" height="34" rx="7" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
    <path d="M 34 42 C 40 18 116 18 126 42 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
    <path d="M 38 42 L 48 20 L 78 20 L 78 42 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
    <path d="M 82 42 L 82 20 L 116 20 L 122 42 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
    <circle cx="34" cy="76" r="17" fill="#1f2937"/>
    <circle cx="34" cy="76" r="11" fill="#6b7280"/>
    <circle cx="34" cy="76" r="4" fill="#e5e7eb"/>
    <circle cx="126" cy="76" r="17" fill="#1f2937"/>
    <circle cx="126" cy="76" r="11" fill="#6b7280"/>
    <circle cx="126" cy="76" r="4" fill="#e5e7eb"/>
    <circle cx="150" cy="56" r="8" fill="#fef9c3" stroke="#fcd34d" strokeWidth="1.5"/>
    <rect x="5" y="50" width="11" height="14" rx="2" fill="#991b1b"/>
  </svg>
)

// ─── TRAIN (navy) ───────────────────────────────────────────

export const TrainEngine = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="6" y="72" width="68" height="7" rx="2" fill="#1e3a8a"/>
    <ellipse cx="52" cy="50" rx="24" ry="22" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
    <rect x="6" y="38" width="28" height="34" rx="3" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
    <rect x="35" y="14" width="11" height="20" rx="3" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1.5"/>
    <rect x="31" y="10" width="19" height="7" rx="3.5" fill="#1e3a8a"/>
    <rect x="10" y="44" width="20" height="14" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <circle cx="68" cy="54" r="6" fill="#fef9c3" stroke="#fcd34d" strokeWidth="1.5"/>
    <line x1="6" y1="50" x2="76" y2="50" stroke="#1e3a8a" strokeWidth="1.5"/>
  </svg>
)

export const TrainCabin = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="8" y="22" width="64" height="50" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
    <rect x="4" y="16" width="72" height="10" rx="3" fill="#1e3a8a"/>
    <rect x="16" y="34" width="20" height="16" rx="3" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="44" y="34" width="20" height="16" rx="3" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="28" y="54" width="24" height="18" rx="2" fill="#1e3a8a" stroke="#2563eb" strokeWidth="1.5"/>
    <circle cx="47" cy="64" r="2.5" fill="#bfdbfe"/>
    <line x1="8" y1="52" x2="72" y2="52" stroke="#1e3a8a" strokeWidth="1.5"/>
  </svg>
)

export const TrainWheels = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.55)} viewBox="0 0 130 72" fill="none">
    <rect x="0" y="62" width="130" height="8" rx="2" fill="#374151"/>
    <rect x="14" y="38" width="102" height="8" rx="4" fill="#1e3a8a"/>
    <circle cx="20" cy="50" r="20" fill="#1e3a8a"/>
    <circle cx="20" cy="50" r="13" fill="#2563eb"/>
    <circle cx="20" cy="50" r="5" fill="#bfdbfe"/>
    <line x1="20" y1="30" x2="20" y2="70" stroke="#bfdbfe" strokeWidth="1.5"/>
    <line x1="0" y1="50" x2="40" y2="50" stroke="#bfdbfe" strokeWidth="1.5"/>
    <circle cx="65" cy="50" r="20" fill="#1e3a8a"/>
    <circle cx="65" cy="50" r="13" fill="#2563eb"/>
    <circle cx="65" cy="50" r="5" fill="#bfdbfe"/>
    <line x1="65" y1="30" x2="65" y2="70" stroke="#bfdbfe" strokeWidth="1.5"/>
    <line x1="45" y1="50" x2="85" y2="50" stroke="#bfdbfe" strokeWidth="1.5"/>
    <circle cx="110" cy="50" r="20" fill="#1e3a8a"/>
    <circle cx="110" cy="50" r="13" fill="#2563eb"/>
    <circle cx="110" cy="50" r="5" fill="#bfdbfe"/>
    <line x1="110" y1="30" x2="110" y2="70" stroke="#bfdbfe" strokeWidth="1.5"/>
    <line x1="90" y1="50" x2="130" y2="50" stroke="#bfdbfe" strokeWidth="1.5"/>
  </svg>
)

export const TrainSteam = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="56" r="20" fill="#e2e8f0" opacity="0.9"/>
    <circle cx="22" cy="46" r="16" fill="#f1f5f9" opacity="0.9"/>
    <circle cx="58" cy="42" r="18" fill="#e2e8f0" opacity="0.9"/>
    <circle cx="38" cy="30" r="14" fill="#f8fafc" opacity="0.9"/>
    <circle cx="60" cy="18" r="10" fill="#f8fafc" opacity="0.9"/>
    <circle cx="22" cy="24" r="11" fill="#f1f5f9" opacity="0.9"/>
    <circle cx="36" cy="52" r="7" fill="white" opacity="0.6"/>
    <circle cx="20" cy="44" r="5" fill="white" opacity="0.6"/>
    <circle cx="55" cy="40" r="6" fill="white" opacity="0.6"/>
  </svg>
)

export const TrainFull = ({ size = 200 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.55)} viewBox="0 0 200 110" fill="none">
    <rect x="0" y="96" width="200" height="8" rx="2" fill="#374151"/>
    <rect x="4" y="48" width="62" height="48" rx="3" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5"/>
    <rect x="4" y="40" width="64" height="10" rx="2" fill="#1e3a8a"/>
    <rect x="14" y="58" width="18" height="12" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="38" y="58" width="18" height="12" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <circle cx="18" cy="92" r="12" fill="#1e3a8a"/>
    <circle cx="18" cy="92" r="7" fill="#2563eb"/>
    <circle cx="18" cy="92" r="3" fill="#bfdbfe"/>
    <circle cx="52" cy="92" r="12" fill="#1e3a8a"/>
    <circle cx="52" cy="92" r="7" fill="#2563eb"/>
    <circle cx="52" cy="92" r="3" fill="#bfdbfe"/>
    <rect x="70" y="32" width="126" height="64" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
    <ellipse cx="172" cy="54" rx="22" ry="20" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5"/>
    <rect x="88" y="12" width="12" height="24" rx="3" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1.5"/>
    <rect x="84" y="10" width="20" height="6" rx="3" fill="#1e3a8a"/>
    <circle cx="94" cy="6" r="6" fill="#e2e8f0" opacity="0.9"/>
    <rect x="78" y="40" width="20" height="14" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="104" y="40" width="20" height="14" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
    <circle cx="186" cy="58" r="7" fill="#fef9c3" stroke="#fcd34d" strokeWidth="1.5"/>
    <circle cx="88" cy="92" r="14" fill="#1e3a8a"/>
    <circle cx="88" cy="92" r="9" fill="#2563eb"/>
    <circle cx="88" cy="92" r="4" fill="#bfdbfe"/>
    <circle cx="130" cy="92" r="14" fill="#1e3a8a"/>
    <circle cx="130" cy="92" r="9" fill="#2563eb"/>
    <circle cx="130" cy="92" r="4" fill="#bfdbfe"/>
    <circle cx="172" cy="92" r="14" fill="#1e3a8a"/>
    <circle cx="172" cy="92" r="9" fill="#2563eb"/>
    <circle cx="172" cy="92" r="4" fill="#bfdbfe"/>
    <rect x="88" y="88" width="84" height="8" rx="4" fill="#1e3a8a"/>
  </svg>
)

// ─── AIRPLANE (blue) ────────────────────────────────────────

export const AirplaneNose = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.5)} viewBox="0 0 110 55" fill="none">
    <path d="M 104 27 C 90 10 32 6 6 27 C 32 48 90 44 104 27 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 100 24 C 88 14 36 10 14 24" stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <line x1="6" y1="27" x2="100" y2="27" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="5 4" opacity="0.5"/>
  </svg>
)

export const AirplaneBody = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.5)} viewBox="0 0 120 60" fill="none">
    <rect x="5" y="12" width="110" height="36" rx="18" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
    <circle cx="30" cy="28" r="7" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="54" cy="28" r="7" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="78" cy="28" r="7" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="98" cy="28" r="7" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="28" cy="26" r="2.5" fill="white" opacity="0.7"/>
    <circle cx="52" cy="26" r="2.5" fill="white" opacity="0.7"/>
    <circle cx="76" cy="26" r="2.5" fill="white" opacity="0.7"/>
    <circle cx="96" cy="26" r="2.5" fill="white" opacity="0.7"/>
    <path d="M 26 13 Q 70 11 114 15" stroke="#93c5fd" strokeWidth="1.5" fill="none"/>
  </svg>
)

export const AirplaneWings = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.6)} viewBox="0 0 140 84" fill="none">
    <path d="M 70 32 L 136 56 L 136 68 L 70 52 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 70 32 L 4 56 L 4 68 L 70 52 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2"/>
    <rect x="56" y="8" width="28" height="68" rx="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 70 34 L 130 56" stroke="#93c5fd" strokeWidth="1.5" fill="none"/>
    <path d="M 70 34 L 10 56" stroke="#93c5fd" strokeWidth="1.5" fill="none"/>
    <ellipse cx="108" cy="56" rx="10" ry="5" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5"/>
    <ellipse cx="32" cy="56" rx="10" ry="5" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5"/>
  </svg>
)

export const AirplaneTail = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="34" y="32" width="12" height="40" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 36 36 L 20 10 L 36 20 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5"/>
    <path d="M 34 62 L 4 70 L 4 76 L 34 72 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
    <path d="M 46 62 L 76 70 L 76 76 L 46 72 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
    <path d="M 38 36 L 34 14" stroke="#93c5fd" strokeWidth="1.5" fill="none"/>
  </svg>
)

export const AirplaneFull = ({ size = 200 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.44)} viewBox="0 0 200 88" fill="none">
    <path d="M 182 44 C 170 22 80 18 8 44 C 80 70 170 66 182 44 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 178 40 C 158 28 80 24 16 38" stroke="#93c5fd" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="130" cy="40" r="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="112" cy="38" r="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="94" cy="37" r="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="76" cy="37" r="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="58" cy="38" r="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <path d="M 92 44 L 78 82 L 116 70 L 116 44 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 16 44 L 6 22 L 22 28 L 22 44 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2"/>
    <path d="M 14 48 L 2 54 L 14 56 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
    <path d="M 22 48 L 36 52 L 22 56 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
    <ellipse cx="90" cy="70" rx="14" ry="6" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5"/>
  </svg>
)

// ─── ROCKET (orange) ────────────────────────────────────────

export const RocketNose = ({ size = 80 }: { size?: number }) => (
  <svg width={Math.round(size * 0.7)} height={size} viewBox="0 0 56 80" fill="none">
    <path d="M 28 5 C 16 20 10 40 10 58 L 46 58 C 46 40 40 20 28 5 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
    <path d="M 28 5 C 24 16 22 28 21 42 L 35 42 C 34 28 32 16 28 5 Z" fill="#ef4444"/>
    <path d="M 16 22 C 14 34 13 46 13 58" stroke="#fdba74" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="28" cy="46" r="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="26" cy="44" r="3" fill="white" opacity="0.6"/>
  </svg>
)

export const RocketBody = ({ size = 80 }: { size?: number }) => (
  <svg width={Math.round(size * 0.7)} height={size} viewBox="0 0 56 80" fill="none">
    <rect x="10" y="5" width="36" height="70" rx="6" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
    <rect x="10" y="22" width="36" height="7" fill="#ea580c" opacity="0.45"/>
    <rect x="10" y="51" width="36" height="7" fill="#ea580c" opacity="0.45"/>
    <circle cx="28" cy="38" r="9" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5"/>
    <circle cx="25" cy="35" r="3" fill="#93c5fd" opacity="0.8"/>
    <line x1="15" y1="5" x2="15" y2="75" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
  </svg>
)

export const RocketFins = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.8)} viewBox="0 0 100 80" fill="none">
    <rect x="36" y="0" width="28" height="80" rx="5" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
    <path d="M 36 28 L 4 76 L 36 70 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="2"/>
    <path d="M 64 28 L 96 76 L 64 70 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="2"/>
    <path d="M 36 30 L 10 72" stroke="#fb923c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M 64 30 L 90 72" stroke="#fb923c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

export const RocketEngine = ({ size = 80 }: { size?: number }) => (
  <svg width={Math.round(size * 0.75)} height={size} viewBox="0 0 60 80" fill="none">
    <path d="M 14 6 L 4 34 L 56 34 L 46 6 Z" fill="#4b5563" stroke="#374151" strokeWidth="2"/>
    <path d="M 4 30 L 0 44 L 60 44 L 56 30 Z" fill="#6b7280" stroke="#4b5563" strokeWidth="1.5"/>
    <ellipse cx="30" cy="34" rx="22" ry="6" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
    <path d="M 14 44 C 12 54 8 64 20 76 C 22 68 26 60 30 56 C 34 60 38 68 40 76 C 52 64 48 54 46 44 Z" fill="#ef4444"/>
    <path d="M 18 44 C 16 52 15 60 24 70 C 26 64 28 58 30 54 C 32 58 34 64 36 70 C 45 60 44 52 42 44 Z" fill="#f97316"/>
    <path d="M 22 44 C 22 52 24 58 30 64 C 36 58 38 52 38 44 Z" fill="#fbbf24"/>
  </svg>
)

export const RocketFull = ({ size = 120 }: { size?: number }) => (
  <svg width={Math.round(size * 0.65)} height={size} viewBox="0 0 78 120" fill="none">
    <path d="M 39 4 C 26 18 18 38 16 62 L 62 62 C 60 38 52 18 39 4 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
    <path d="M 39 4 C 34 16 30 30 28 46 L 50 46 C 48 30 44 16 39 4 Z" fill="#ef4444"/>
    <circle cx="39" cy="50" r="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
    <circle cx="37" cy="48" r="3.5" fill="white" opacity="0.6"/>
    <rect x="16" y="62" width="46" height="38" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
    <rect x="16" y="78" width="46" height="7" fill="#ea580c" opacity="0.45"/>
    <path d="M 16 80 L 2 112 L 16 108 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="2"/>
    <path d="M 62 80 L 76 112 L 62 108 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="2"/>
    <rect x="20" y="100" width="38" height="12" rx="3" fill="#4b5563" stroke="#374151" strokeWidth="1.5"/>
    <path d="M 22 112 C 18 120 14 126 28 118 C 30 124 34 128 39 120 C 44 128 48 124 50 118 C 64 126 60 120 56 112 Z" fill="#ef4444"/>
    <path d="M 26 112 C 23 118 22 124 32 118 C 34 122 36 124 39 118 C 42 124 44 122 46 118 C 56 124 55 118 52 112 Z" fill="#f97316"/>
    <path d="M 30 112 C 30 118 33 122 39 116 C 45 122 48 118 48 112 Z" fill="#fbbf24"/>
    <line x1="22" y1="8" x2="22" y2="100" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
  </svg>
)
