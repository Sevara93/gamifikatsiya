import { useState } from 'react'
import { motion } from 'framer-motion'

interface ClothingItem { id: string; emoji: string; label: string; order: number }

const SEQUENCES: Record<string, ClothingItem[]> = {
  KICHIK: [
    { id:'u',  emoji:'🩲', label:'Ichki kiyim', order:1 },
    { id:'s',  emoji:'👕', label:"Ko'ylak",     order:2 },
    { id:'p',  emoji:'👖', label:'Shim',        order:3 },
    { id:'bg', emoji:'🎒', label:'Sumka',       order:4 },
  ],
  ORTA: [
    { id:'u',  emoji:'🩲', label:'Ichki kiyim', order:1 },
    { id:'k',  emoji:'🧦', label:'Paypoq',      order:2 },
    { id:'s',  emoji:'👕', label:"Ko'ylak",     order:3 },
    { id:'p',  emoji:'👖', label:'Shim',        order:4 },
    { id:'tb', emoji:'🪥', label:'Tish yuvish', order:5 },
    { id:'bg', emoji:'🎒', label:'Sumka',       order:6 },
  ],
  KATTA: [
    { id:'u',  emoji:'🩲', label:'Ichki kiyim', order:1 },
    { id:'k',  emoji:'🧦', label:'Paypoq',      order:2 },
    { id:'s',  emoji:'👕', label:"Ko'ylak",     order:3 },
    { id:'p',  emoji:'👖', label:'Shim',        order:4 },
    { id:'sh', emoji:'👟', label:'Oyoq kiyim',  order:5 },
    { id:'tb', emoji:'🪥', label:'Tish yuvish', order:6 },
    { id:'hc', emoji:'💇', label:'Soch tarash', order:7 },
  ],
  TAYYORLOV: [
    { id:'u',  emoji:'🩲', label:'Ichki kiyim', order:1 },
    { id:'k',  emoji:'🧦', label:'Paypoq',      order:2 },
    { id:'s',  emoji:'👕', label:"Ko'ylak",     order:3 },
    { id:'p',  emoji:'👖', label:'Shim',        order:4 },
    { id:'sh', emoji:'👟', label:'Oyoq kiyim',  order:5 },
    { id:'j',  emoji:'🧥', label:'Kurtka',      order:6 },
    { id:'tb', emoji:'🪥', label:'Tish yuvish', order:7 },
    { id:'hc', emoji:'💇', label:'Soch tarash', order:8 },
    { id:'bg', emoji:'🎒', label:'Sumka',       order:9 },
  ],
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Week3Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const sequence = SEQUENCES[groupLevel] ?? SEQUENCES.KICHIK
  const [displayOrder] = useState(() => shuffled(sequence))
  const [tapped, setTapped] = useState<string[]>([])
  const [errors, setErrors] = useState(0)
  const [wrong, setWrong] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const nextOrder = tapped.length + 1
  const allDone = tapped.length === sequence.length

  function handleTap(item: ClothingItem) {
    if (tapped.includes(item.id)) return
    if (item.order === nextOrder) {
      setTapped(prev => [...prev, item.id])
    } else {
      setErrors(e => e + 1)
      setWrong(item.id)
      setTimeout(() => setWrong(null), 500)
    }
  }

  const score = Math.max(0, 100 - errors * 10)

  if (done) return (
    <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
      <div className="text-6xl mb-2">👗</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Barakalla!</h2>
      <p className="text-gray-500 mb-1">Kiyim to'g'ri kiyildi!</p>
      <p className="text-gray-500 mb-4">Xato: <span className="font-bold text-rose-600">{errors}</span> ta</p>
      <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
        <div className="bg-rose-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <button onClick={() => onComplete(score)} className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-3 rounded-2xl transition">
        Davom etish →
      </button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Ertalabki tayyorgarlik!</p>
      <p className="text-center text-xs text-gray-400 mb-4">
        Kiyim va narsalarni to'g'ri tartibda bosing: 1-chi, 2-chi, 3-chi...
      </p>

      {/* Progress row */}
      <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
        {sequence.sort((a, b) => a.order - b.order).map(item => (
          <div key={item.id} className={`rounded-full border-2 flex items-center justify-center transition-all ${
            sequence.length >= 8 ? 'w-8 h-8 text-base' : sequence.length >= 6 ? 'w-9 h-9 text-lg' : 'w-10 h-10 text-xl'
          } ${tapped.includes(item.id) ? 'bg-rose-100 border-rose-400' : 'bg-gray-100 border-gray-200'}`}>
            {tapped.includes(item.id) ? item.emoji : '?'}
          </div>
        ))}
      </div>

      <div className="bg-rose-50 border-2 border-rose-100 rounded-3xl p-2 mb-4">
        <p className="text-xs text-center text-gray-500 mb-3 mt-1">
          Navbat: <span className="font-bold text-rose-600">{nextOrder}-chi kiyim</span>
          {allDone && <span className="text-green-600 font-bold"> — Tayyor! ✓</span>}
        </p>
        <div className="grid grid-cols-3 gap-2 p-1">
          {displayOrder.map(item => {
            const isPlaced = tapped.includes(item.id)
            const isWrong  = wrong === item.id
            return (
              <motion.button
                key={item.id}
                animate={isWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => handleTap(item)}
                disabled={isPlaced}
                className={`flex flex-col items-center gap-1 rounded-2xl py-3 border-2 transition-all ${
                  isPlaced  ? 'bg-rose-100 border-rose-300 opacity-60' :
                  isWrong   ? 'bg-red-100 border-red-400' :
                              'bg-white border-gray-200 hover:border-rose-300 hover:bg-rose-50 active:scale-95'
                }`}>
                <span className="text-3xl leading-none">{item.emoji}</span>
                <span className="text-xs text-gray-500">{item.label}</span>
                {isPlaced && (
                  <span className="text-xs font-bold text-rose-500">{item.order} ✓</span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1 text-sm text-gray-400">
        <span>Xato: {errors}</span>
        <span>Ball: {score}</span>
      </div>

      <button onClick={() => setDone(true)} disabled={!allDone}
        className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {allDone ? 'Tayyor →' : `Yana ${sequence.length - tapped.length} ta qoldi`}
      </button>
    </div>
  )
}
