import { useState } from 'react'

const PALETTE = [
  { emoji: '🏠', label: 'Uy' },
  { emoji: '🌳', label: 'Daraxt' },
  { emoji: '🛣️', label: "Ko'cha" },
  { emoji: '🏢', label: 'Bino' },
  { emoji: '🏪', label: "Do'kon" },
  { emoji: '🏫', label: 'Maktab' },
  { emoji: '🏥', label: 'Shifoxona' },
  { emoji: '🌻', label: 'Gul' },
]

const GRID_SIZE: Record<string, number> = {
  KICHIK: 3, ORTA: 3, KATTA: 4, TAYYORLOV: 4,
}

export default function Week3Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const size = GRID_SIZE[groupLevel] ?? 3
  const [grid, setGrid] = useState<(string | null)[][]>(() =>
    Array(size).fill(null).map(() => Array(size).fill(null))
  )
  const [selected, setSelected] = useState(PALETTE[0].emoji)
  const [done, setDone] = useState(false)

  function handleCell(r: number, c: number) {
    setGrid(prev => prev.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c) ? (cell === selected ? null : selected) : cell)
    ))
  }

  const filled = grid.flat().filter(Boolean).length
  const total = size * size
  const minFilled = Math.ceil(total * 0.5)
  const score = Math.min(100, Math.round((filled / minFilled) * 100))

  if (done) return (
    <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
      <div className="text-6xl mb-2">🏙️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Barakalla!</h2>
      <p className="text-gray-500 mb-3">{filled} ta ob'ekt bilan shahar qurildi!</p>
      <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
        <div className="bg-sky-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <button onClick={() => onComplete(score)} className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-2xl transition">
        Davom etish →
      </button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Shahar quramiz!</p>
      <p className="text-center text-xs text-gray-400 mb-3">Bino tanlang, keyin katakchani bosing</p>

      <div className="bg-sky-50 border-2 border-sky-100 rounded-3xl p-4 mb-3">
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {grid.map((row, r) => row.map((cell, c) => (
            <button key={`${r}-${c}`} onClick={() => handleCell(r, c)}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center text-2xl transition-all hover:scale-105 active:scale-95 ${
                cell ? 'bg-white border-sky-300 shadow-sm' : 'bg-white/60 border-dashed border-sky-200 hover:bg-white'
              }`}>
              {cell ?? ''}
            </button>
          )))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          {filled}/{total} katakcha
          {filled < minFilled && <span className="text-sky-500"> — kamida {minFilled} ta kerak</span>}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-3 mb-3">
        <p className="text-xs text-gray-400 mb-2">Bino tanlang:</p>
        <div className="flex flex-wrap gap-2">
          {PALETTE.map(p => (
            <button key={p.emoji} onClick={() => setSelected(p.emoji)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 border transition-all hover:scale-105 ${
                selected === p.emoji ? 'bg-sky-100 border-sky-400 shadow-sm' : 'bg-sky-50 border-sky-200 hover:bg-sky-100'
              }`}>
              <span className="text-2xl leading-none">{p.emoji}</span>
              <span className="text-xs text-gray-500">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setDone(true)} disabled={filled < minFilled}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {filled < minFilled ? `Yana ${minFilled - filled} ta ob'ekt qo'shing` : 'Tayyor →'}
      </button>
    </div>
  )
}
