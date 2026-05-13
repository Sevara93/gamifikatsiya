import { useState } from 'react'
import { motion } from 'framer-motion'

interface PaletteSection { id: string; label: string; emoji: string; items: { emoji: string; label: string }[] }
interface GoalConfig { label: string; emoji: string; color: string; set: Set<string>; min: number }

const SECTIONS: PaletteSection[] = [
  { id:'homes',     label:'Uylar',    emoji:'🏘️', items: [
    { emoji:'🏠', label:'Uy' },
    { emoji:'🏢', label:'Bino' },
    { emoji:'🏡', label:'Kottej' },
  ]},
  { id:'nature',    label:'Tabiat',   emoji:'🌳', items: [
    { emoji:'🌳', label:'Daraxt' },
    { emoji:'🌺', label:'Gul' },
    { emoji:'🏞️', label:'Park' },
  ]},
  { id:'transport', label:"Yo'l",     emoji:'🛣️', items: [
    { emoji:'🛣️', label:"Ko'cha" },
    { emoji:'🌉', label:"Ko'prik" },
    { emoji:'🚦', label:'Svetofor' },
  ]},
  { id:'social',    label:'Ijtimoiy', emoji:'🏫', items: [
    { emoji:'🏫', label:'Maktab' },
    { emoji:'🏥', label:'Shifoxona' },
    { emoji:'🏪', label:"Do'kon" },
  ]},
  { id:'future',    label:'Kelajak',  emoji:'🚀', items: [
    { emoji:'🚀', label:'Raketa' },
    { emoji:'🤖', label:'Robot' },
    { emoji:'⚡', label:'Energiya' },
    { emoji:'🌐', label:'Internet' },
    { emoji:'🔭', label:'Teleskop' },
    { emoji:'🛸', label:'UFO' },
    { emoji:'💡', label:"Ixtiro'" },
    { emoji:'🌌', label:'Koinot' },
  ]},
]

const HOME_EMOJIS   = new Set(['🏠','🏢','🏡'])
const NATURE_EMOJIS = new Set(['🌳','🌺','🏞️'])
const FUTURE_EMOJIS = new Set(['🚀','🤖','⚡','🌐','🔭','🛸','💡','🌌'])

const GRID_SIZE: Record<string, number> = { KICHIK:3, ORTA:4, KATTA:4, TAYYORLOV:5 }

const GOALS_BY_LEVEL: Record<string, GoalConfig[]> = {
  KICHIK: [
    { label:'Turar joy', emoji:'🏘️', color:'text-orange-500', set:HOME_EMOJIS,   min:2 },
    { label:'Yashil zona', emoji:'🌳', color:'text-green-600', set:NATURE_EMOJIS, min:1 },
    { label:'Kelajak tech', emoji:'🚀', color:'text-violet-600', set:FUTURE_EMOJIS, min:2 },
  ],
  ORTA: [
    { label:'Turar joy', emoji:'🏘️', color:'text-orange-500', set:HOME_EMOJIS,   min:3 },
    { label:'Yashil zona', emoji:'🌳', color:'text-green-600', set:NATURE_EMOJIS, min:2 },
    { label:'Kelajak tech', emoji:'🚀', color:'text-violet-600', set:FUTURE_EMOJIS, min:3 },
  ],
  KATTA: [
    { label:'Turar joy', emoji:'🏘️', color:'text-orange-500', set:HOME_EMOJIS,   min:4 },
    { label:'Yashil zona', emoji:'🌳', color:'text-green-600', set:NATURE_EMOJIS, min:2 },
    { label:'Kelajak tech', emoji:'🚀', color:'text-violet-600', set:FUTURE_EMOJIS, min:4 },
  ],
  TAYYORLOV: [
    { label:'Turar joy', emoji:'🏘️', color:'text-orange-500', set:HOME_EMOJIS,   min:5 },
    { label:'Yashil zona', emoji:'🌳', color:'text-green-600', set:NATURE_EMOJIS, min:3 },
    { label:'Kelajak tech', emoji:'🚀', color:'text-violet-600', set:FUTURE_EMOJIS, min:5 },
  ],
}

function cellStyle(emoji: string | null) {
  if (!emoji) return 'bg-white/10 border-dashed border-white/30 hover:bg-white/20'
  if (FUTURE_EMOJIS.has(emoji)) return 'bg-violet-900/60 border-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]'
  if (NATURE_EMOJIS.has(emoji)) return 'bg-green-900/60 border-green-400'
  if (HOME_EMOJIS.has(emoji))   return 'bg-orange-900/40 border-orange-300'
  return 'bg-white/20 border-white/40'
}

export default function Week4Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const size      = GRID_SIZE[groupLevel] ?? 4
  const goals     = GOALS_BY_LEVEL[groupLevel] ?? GOALS_BY_LEVEL.KICHIK
  const minFilled = Math.ceil((size * size) * 0.5)

  const [grid,     setGrid]     = useState<(string | null)[][]>(() =>
    Array(size).fill(null).map(() => Array(size).fill(null))
  )
  const [activeTab, setActiveTab] = useState('homes')
  const [selected,  setSelected]  = useState('🏠')
  const [done,      setDone]      = useState(false)

  function handleCell(r: number, c: number) {
    setGrid(prev => prev.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c) ? (cell === selected ? null : selected) : cell)
    ))
  }

  const flat = grid.flat()
  const filled = flat.filter(Boolean).length
  const total  = size * size

  const goalProgress = goals.map(g => ({
    ...g,
    count: flat.filter(c => c && g.set.has(c)).length,
    done:  flat.filter(c => c && g.set.has(c)).length >= g.min,
  }))

  const allGoalsDone = goalProgress.every(g => g.done)
  const canFinish    = filled >= minFilled && allGoalsDone

  const gridScore  = Math.min(60, Math.round((filled / minFilled) * 60))
  const goalsScore = Math.round((goalProgress.filter(g => g.done).length / goals.length) * 40)
  const score      = Math.min(100, gridScore + goalsScore)

  const activeSection = SECTIONS.find(s => s.id === activeTab) ?? SECTIONS[0]

  if (done) return (
    <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
      <div className="text-6xl mb-2">🌌</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Barakalla!</h2>
      <p className="text-gray-500 mb-1">{filled} ta ob'ekt joylashtirildi</p>
      <p className="text-gray-500 mb-3">
        Vazifalar: {goalProgress.filter(g => g.done).length}/{goals.length} bajarildi ✓
      </p>
      <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
        <div className="bg-violet-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <button onClick={() => onComplete(score)}
        className="bg-violet-500 hover:bg-violet-600 text-white font-bold px-8 py-3 rounded-2xl transition">
        Davom etish →
      </button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Kelajak shahri!</p>
      <p className="text-center text-xs text-gray-400 mb-3">Shaharni qurib, barcha vazifalarni bajaring</p>

      {/* Goal cards */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {goalProgress.map(g => (
          <div key={g.label} className={`rounded-2xl p-2 border-2 transition-all text-center ${
            g.done ? 'bg-violet-50 border-violet-300' : 'bg-white border-gray-200'
          }`}>
            <div className="text-xl mb-0.5">{g.emoji}</div>
            <div className={`text-xs font-bold ${g.done ? 'text-violet-600' : 'text-gray-500'}`}>
              {g.count}/{g.min}
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
              <div className={`h-1 rounded-full transition-all ${g.done ? 'bg-violet-400' : 'bg-gray-300'}`}
                style={{ width: `${Math.min(100, (g.count / g.min) * 100)}%` }} />
            </div>
            {g.done && <div className="text-green-500 text-xs font-bold mt-0.5">✓</div>}
          </div>
        ))}
      </div>

      {/* City grid — night sky + ground background */}
      <div
        className="rounded-3xl overflow-hidden mb-3 p-3 border-2 border-violet-300"
        style={{ background: 'linear-gradient(to bottom, #1e1b4b 0%, #1e1b4b 55%, #14532d 55%, #166534 100%)' }}
      >
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {grid.map((row, r) => row.map((cell, c) => (
            <button key={`${r}-${c}`} onClick={() => handleCell(r, c)}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                size >= 5 ? 'text-lg' : 'text-2xl'
              } ${cellStyle(cell)}`}>
              {cell ?? ''}
            </button>
          )))}
        </div>
        <p className="text-xs text-white/50 text-center mt-2">{filled}/{total} katakcha</p>
      </div>

      {/* Palette */}
      <div className="bg-white rounded-2xl shadow p-3 mb-3">
        {/* Category tabs */}
        <div className="flex gap-1 mb-2 overflow-x-auto pb-1">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveTab(s.id)}
              className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium border transition-all ${
                activeTab === s.id
                  ? 'bg-violet-100 border-violet-400 text-violet-700'
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
              }`}>
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        {/* Items */}
        <div className="flex flex-wrap gap-2">
          {activeSection.items.map(item => (
            <motion.button key={item.emoji}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(item.emoji)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-2 border transition-all ${
                selected === item.emoji
                  ? 'bg-violet-100 border-violet-400 shadow-sm scale-105'
                  : 'bg-gray-50 border-gray-200 hover:bg-violet-50 hover:border-violet-200'
              }`}>
              <span className="text-2xl leading-none">{item.emoji}</span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Status */}
      {!canFinish && (
        <div className="text-xs text-gray-400 text-center mb-2 space-y-0.5">
          {filled < minFilled && <p>Grid: yana {minFilled - filled} ta ob'ekt qo'shing</p>}
          {goalProgress.filter(g => !g.done).map(g => (
            <p key={g.label}>{g.emoji} {g.label}: yana {g.min - g.count} ta kerak</p>
          ))}
        </div>
      )}

      <button onClick={() => setDone(true)} disabled={!canFinish}
        className="w-full bg-violet-500 hover:bg-violet-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {canFinish ? 'Tayyor →' : 'Vazifalarni bajaring...'}
      </button>
    </div>
  )
}
