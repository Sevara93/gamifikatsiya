import { useState } from 'react'

const PALETTE = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#A855F7', '#EC4899', '#92400E',
  '#6B7280', '#111111', '#BAE6FD', '#D1FAE5',
]

const BLANK = '#FFFFFF'
const isColored = (fill: string) => fill !== BLANK
function initFills(ids: string[]): Record<string, string> {
  return Object.fromEntries(ids.map(id => [id, BLANK]))
}

function SunScene({ f, tap }: { f: Record<string, string>; tap: (id: string) => void }) {
  const sc = f.sun === BLANK ? '#ccc' : f.sun
  return (
    <svg viewBox="0 0 200 180" className="w-full" style={{ maxHeight: 260 }}>
      <rect x="0" y="0" width="200" height="180" fill={f.sky} stroke="#bbb" strokeWidth="1.5"
        onClick={() => tap('sky')} style={{ cursor: 'pointer' }} />
      <rect x="0" y="130" width="200" height="50" fill={f.ground} stroke="#777" strokeWidth="2"
        onClick={() => tap('ground')} style={{ cursor: 'pointer' }} />
      <g onClick={() => tap('cloud')} style={{ cursor: 'pointer' }}>
        <ellipse cx="42" cy="48" rx="24" ry="16" fill={f.cloud} stroke="#aaa" strokeWidth="1.5" />
        <ellipse cx="63" cy="38" rx="20" ry="14" fill={f.cloud} stroke="#aaa" strokeWidth="1.5" />
        <ellipse cx="82" cy="47" rx="22" ry="15" fill={f.cloud} stroke="#aaa" strokeWidth="1.5" />
      </g>
      <g onClick={() => tap('sun')} style={{ cursor: 'pointer' }}>
        {[0,45,90,135,180,225,270,315].map(deg => {
          const r = (deg * Math.PI) / 180
          return <line key={deg}
            x1={148 + 35 * Math.cos(r)} y1={55 + 35 * Math.sin(r)}
            x2={148 + 50 * Math.cos(r)} y2={55 + 50 * Math.sin(r)}
            stroke={sc} strokeWidth="5" strokeLinecap="round" />
        })}
        <circle cx="148" cy="55" r="28" fill={f.sun} stroke="#777" strokeWidth="2" />
      </g>
    </svg>
  )
}

function FlowerScene({ f, tap }: { f: Record<string, string>; tap: (id: string) => void }) {
  const cx = 100, cy = 85, pr = 22
  return (
    <svg viewBox="0 0 200 210" className="w-full" style={{ maxHeight: 260 }}>
      <rect x="0" y="0" width="200" height="148" fill={f.sky} stroke="#bbb" strokeWidth="1.5"
        onClick={() => tap('sky')} style={{ cursor: 'pointer' }} />
      <rect x="0" y="148" width="200" height="62" fill={f.ground} stroke="#777" strokeWidth="2"
        onClick={() => tap('ground')} style={{ cursor: 'pointer' }} />
      <rect x="97" y="106" width="6" height="52" rx="3" fill={f.stem} stroke="#555" strokeWidth="1.5"
        onClick={() => tap('stem')} style={{ cursor: 'pointer' }} />
      <ellipse cx="119" cy="133" rx="18" ry="9" fill={f.leaf} stroke="#555" strokeWidth="1.5"
        transform="rotate(-30,119,133)" onClick={() => tap('leaf')} style={{ cursor: 'pointer' }} />
      <g onClick={() => tap('petals')} style={{ cursor: 'pointer' }}>
        {[270,342,54,126,198].map((deg, i) => {
          const r = (deg * Math.PI) / 180
          const px = cx + pr * Math.cos(r), py = cy + pr * Math.sin(r)
          return <ellipse key={i} cx={px} cy={py} rx="11" ry="20" fill={f.petals} stroke="#999" strokeWidth="1.5"
            transform={`rotate(${deg - 90},${px},${py})`} />
        })}
      </g>
      <circle cx={cx} cy={cy} r="16" fill={f.center} stroke="#666" strokeWidth="2"
        onClick={() => tap('center')} style={{ cursor: 'pointer' }} />
    </svg>
  )
}

function HouseScene({ f, tap }: { f: Record<string, string>; tap: (id: string) => void }) {
  return (
    <svg viewBox="0 0 220 200" className="w-full" style={{ maxHeight: 260 }}>
      <rect x="0" y="0" width="220" height="200" fill={f.sky} stroke="#bbb" strokeWidth="1.5"
        onClick={() => tap('sky')} style={{ cursor: 'pointer' }} />
      <rect x="0" y="120" width="220" height="80" fill={f.ground} stroke="#777" strokeWidth="2"
        onClick={() => tap('ground')} style={{ cursor: 'pointer' }} />
      <rect x="42" y="80" width="136" height="95" fill={f.body} stroke="#555" strokeWidth="2"
        onClick={() => tap('body')} style={{ cursor: 'pointer' }} />
      <polygon points="28,82 110,18 192,82" fill={f.roof} stroke="#555" strokeWidth="2"
        onClick={() => tap('roof')} style={{ cursor: 'pointer' }} />
      <rect x="145" y="28" width="20" height="38" fill={f.chimney} stroke="#555" strokeWidth="2"
        onClick={() => tap('chimney')} style={{ cursor: 'pointer' }} />
      <rect x="52" y="95" width="38" height="28" rx="2" fill={f.win_l} stroke="#555" strokeWidth="2"
        onClick={() => tap('win_l')} style={{ cursor: 'pointer' }} />
      <rect x="130" y="95" width="38" height="28" rx="2" fill={f.win_r} stroke="#555" strokeWidth="2"
        onClick={() => tap('win_r')} style={{ cursor: 'pointer' }} />
      <rect x="90" y="130" width="40" height="45" rx="2" fill={f.door} stroke="#555" strokeWidth="2"
        onClick={() => tap('door')} style={{ cursor: 'pointer' }} />
      <circle cx="122" cy="154" r="3" fill="#aaa" />
    </svg>
  )
}

function ButterflyScene({ f, tap }: { f: Record<string, string>; tap: (id: string) => void }) {
  const ac = f.antennae === BLANK ? '#ccc' : f.antennae
  return (
    <svg viewBox="0 0 200 200" className="w-full" style={{ maxHeight: 260 }}>
      <rect x="0" y="0" width="200" height="200" fill={f.bg} stroke="#bbb" strokeWidth="1"
        onClick={() => tap('bg')} style={{ cursor: 'pointer' }} />
      <rect x="0" y="155" width="200" height="45" fill={f.grass} stroke="#666" strokeWidth="1.5"
        onClick={() => tap('grass')} style={{ cursor: 'pointer' }} />
      <ellipse cx="72" cy="90" rx="50" ry="36" fill={f.wing_tl} stroke="#555" strokeWidth="2"
        transform="rotate(-30,72,90)" onClick={() => tap('wing_tl')} style={{ cursor: 'pointer' }} />
      <ellipse cx="128" cy="90" rx="50" ry="36" fill={f.wing_tr} stroke="#555" strokeWidth="2"
        transform="rotate(30,128,90)" onClick={() => tap('wing_tr')} style={{ cursor: 'pointer' }} />
      <ellipse cx="82" cy="118" rx="32" ry="22" fill={f.wing_bl} stroke="#555" strokeWidth="2"
        transform="rotate(15,82,118)" onClick={() => tap('wing_bl')} style={{ cursor: 'pointer' }} />
      <ellipse cx="118" cy="118" rx="32" ry="22" fill={f.wing_br} stroke="#555" strokeWidth="2"
        transform="rotate(-15,118,118)" onClick={() => tap('wing_br')} style={{ cursor: 'pointer' }} />
      <g onClick={() => tap('spots')} style={{ cursor: 'pointer' }}>
        <circle cx="66" cy="84" r="9" fill={f.spots} stroke="#555" strokeWidth="1.5" />
        <circle cx="134" cy="84" r="9" fill={f.spots} stroke="#555" strokeWidth="1.5" />
      </g>
      <ellipse cx="100" cy="100" rx="6" ry="28" fill={f.body} stroke="#444" strokeWidth="2"
        onClick={() => tap('body')} style={{ cursor: 'pointer' }} />
      <g onClick={() => tap('antennae')} style={{ cursor: 'pointer' }}>
        <line x1="96" y1="74" x2="82" y2="56" stroke={ac} strokeWidth="2.5" />
        <circle cx="81" cy="54" r="4" fill={f.antennae} stroke="#555" strokeWidth="1.5" />
        <line x1="104" y1="74" x2="118" y2="56" stroke={ac} strokeWidth="2.5" />
        <circle cx="119" cy="54" r="4" fill={f.antennae} stroke="#555" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

interface PicConfig {
  name: string
  regionIds: string[]
  Scene: (props: { f: Record<string, string>; tap: (id: string) => void }) => JSX.Element
}

const PIC: Record<string, PicConfig> = {
  KICHIK:    { name: 'Quyosh manzarasi', regionIds: ['sky','ground','sun','cloud'], Scene: SunScene },
  ORTA:      { name: 'Gul', regionIds: ['sky','ground','stem','leaf','petals','center'], Scene: FlowerScene },
  KATTA:     { name: 'Uy', regionIds: ['sky','ground','body','roof','chimney','win_l','win_r','door'], Scene: HouseScene },
  TAYYORLOV: { name: 'Kapalak', regionIds: ['bg','grass','wing_tl','wing_tr','wing_bl','wing_br','spots','body','antennae'], Scene: ButterflyScene },
}

export default function Week1Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const { name, regionIds, Scene } = PIC[groupLevel] ?? PIC.KICHIK

  const [fills,    setFills]    = useState(() => initFills(regionIds))
  const [selected, setSelected] = useState(PALETTE[0])
  const [done,     setDone]     = useState(false)
  const [score,    setScore]    = useState(0)

  function handleTap(id: string) {
    setFills(prev => ({ ...prev, [id]: selected }))
  }

  function handleDone() {
    const colored = regionIds.filter(id => isColored(fills[id])).length
    const s = Math.round((colored / regionIds.length) * 100)
    setScore(s)
    setDone(true)
  }

  if (done) {
    const colored = regionIds.filter(id => isColored(fills[id])).length
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">{colored} / {regionIds.length} qism bo'yaldi</p>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
          <div className="bg-purple-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
        </div>
        <button onClick={() => onComplete(score)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl transition">
          Davom etish →
        </button>
      </div>
    )
  }

  const coloredCount = regionIds.filter(id => isColored(fills[id])).length

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Rasmni bo'ya!</p>
      <p className="text-center text-purple-500 text-sm font-medium mb-3">{name}</p>

      <div className="bg-white rounded-3xl shadow border border-gray-100 p-3 mb-3">
        <Scene f={fills} tap={handleTap} />
      </div>

      <div className="bg-white rounded-2xl shadow p-3 mb-3">
        <div className="grid grid-cols-6 gap-2 mb-2">
          {PALETTE.map(color => (
            <button key={color} onClick={() => setSelected(color)}
              className="aspect-square rounded-xl border-2 transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: color,
                borderColor: selected === color ? '#7c3aed' : '#e5e7eb',
                transform: selected === color ? 'scale(1.18)' : undefined,
                boxShadow: selected === color ? '0 0 0 2px #7c3aed' : undefined,
              }} />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Tanlangan:</span>
          <div className="w-5 h-5 rounded-lg border border-gray-300" style={{ backgroundColor: selected }} />
          <span className="ml-auto">{coloredCount} / {regionIds.length} bo'yalgan</span>
        </div>
      </div>

      <button onClick={handleDone}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl transition">
        Tayyor →
      </button>
    </div>
  )
}
