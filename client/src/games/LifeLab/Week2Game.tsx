import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Item { id: string; emoji: string; category: string; label: string }
interface Bin  { id: string; emoji: string; label: string; bg: string; border: string }

const ALL_CLOTHES: Item[] = [
  { id:'su1', emoji:'👕', category:'summer', label:"Ko'ylak" },
  { id:'su2', emoji:'👗', category:'summer', label:"Ko'ylakcha" },
  { id:'su3', emoji:'🩱', category:'summer', label:'Kupalnik' },
  { id:'su4', emoji:'🕶️', category:'summer', label:"Ko'zoynak" },
  { id:'wi1', emoji:'🧥', category:'winter', label:'Palto' },
  { id:'wi2', emoji:'🧣', category:'winter', label:'Sharf' },
  { id:'wi3', emoji:'🧤', category:'winter', label:"Qo'lqop" },
  { id:'wi4', emoji:'🧢', category:'winter', label:'Shapka' },
  { id:'sh1', emoji:'👟', category:'shoes', label:'Krossovka' },
  { id:'sh2', emoji:'👠', category:'shoes', label:'Tufliya' },
  { id:'sh3', emoji:'🥾', category:'shoes', label:'Etik' },
  { id:'sh4', emoji:'🩴', category:'shoes', label:'Sandal' },
]

const BINS: Bin[] = [
  { id:'summer', emoji:'☀️', label:'Yozgi kiyim',   bg:'bg-yellow-50', border:'border-yellow-300' },
  { id:'winter', emoji:'❄️', label:'Qishki kiyim',  bg:'bg-blue-50',   border:'border-blue-300'   },
  { id:'shoes',  emoji:'👟', label:'Oyoq kiyim',    bg:'bg-purple-50', border:'border-purple-300' },
]

const ITEMS_BY_LEVEL: Record<string, Item[]> = {
  KICHIK:    ALL_CLOTHES.filter(i => i.category !== 'shoes').slice(0, 4),
  ORTA:      ALL_CLOTHES.filter(i => i.category !== 'shoes').slice(0, 6),
  KATTA:     ALL_CLOTHES.slice(0, 9),
  TAYYORLOV: ALL_CLOTHES,
}

const BINS_BY_LEVEL: Record<string, Bin[]> = {
  KICHIK:    BINS.slice(0, 2),
  ORTA:      BINS.slice(0, 2),
  KATTA:     BINS,
  TAYYORLOV: BINS,
}

export default function Week2Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const initItems = ITEMS_BY_LEVEL[groupLevel] ?? ITEMS_BY_LEVEL.KICHIK
  const bins      = BINS_BY_LEVEL[groupLevel]  ?? BINS_BY_LEVEL.KICHIK

  const [remaining, setRemaining] = useState<Item[]>(initItems)
  const [sorted,    setSorted]    = useState<{ item: Item; correct: boolean }[]>([])
  const [selected,  setSelected]  = useState<string | null>(null)
  const [wrong,     setWrong]     = useState<string | null>(null)
  const [done,      setDone]      = useState(false)

  function handleBin(binId: string) {
    if (!selected) return
    const item = remaining.find(i => i.id === selected)
    if (!item) return
    const correct = item.category === binId
    setSelected(null)
    if (correct) {
      setSorted(prev => [...prev, { item, correct: true }])
      setRemaining(prev => prev.filter(i => i.id !== item.id))
    } else {
      setWrong(item.id)
      setTimeout(() => {
        setWrong(null)
        setSorted(prev => [...prev, { item, correct: false }])
        setRemaining(prev => prev.filter(i => i.id !== item.id))
      }, 650)
    }
  }

  const correctCount = sorted.filter(s => s.correct).length
  const score = sorted.length > 0 ? Math.round((correctCount / initItems.length) * 100) : 0

  if (done) return (
    <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
      <div className="text-6xl mb-2">👕</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Barakalla!</h2>
      <p className="text-gray-500 mb-1">{initItems.length} ta kiyim tartiblandi</p>
      <p className="text-gray-500 mb-4">To'g'ri: <span className="font-bold text-yellow-600">{correctCount}</span> / {initItems.length}</p>
      <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
        <div className="bg-yellow-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <button onClick={() => onComplete(score)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-2xl transition">
        Davom etish →
      </button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Kiyimlarni tartibla!</p>
      <p className="text-center text-xs text-gray-400 mb-4">Kiyimni tanlang, keyin to'g'ri javonga soling</p>

      <div className="bg-gray-50 border-2 border-gray-100 rounded-3xl p-4 mb-3 min-h-[120px]">
        {remaining.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6">Barcha kiyimlar tartiblandi ✓</p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            <AnimatePresence>
              {remaining.map(item => (
                <motion.button key={item.id}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  animate={wrong === item.id ? { x: [-6, 6, -6, 6, 0] } : {}}
                  onClick={() => setSelected(prev => prev === item.id ? null : item.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 border-2 transition-all ${
                    selected === item.id
                      ? 'bg-yellow-100 border-yellow-400 shadow-md scale-110'
                      : wrong === item.id
                        ? 'bg-red-100 border-red-300'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}>
                  <span className="text-3xl leading-none">{item.emoji}</span>
                  <span className="text-xs text-gray-500">{item.label}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className={`grid gap-2 mb-4 ${bins.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {bins.map(bin => (
          <button key={bin.id} onClick={() => handleBin(bin.id)}
            disabled={!selected}
            className={`${bin.bg} border-2 ${bin.border} rounded-2xl p-3 flex flex-col items-center gap-1 transition-all
              ${selected ? 'hover:scale-105 active:scale-95 cursor-pointer shadow-sm' : 'opacity-60 cursor-default'}`}>
            <span className="text-2xl">{bin.emoji}</span>
            <span className="text-xs font-medium text-gray-600 text-center leading-tight">{bin.label}</span>
            <span className="text-xs text-gray-400">{sorted.filter(s => s.item.category === bin.id).length} ta</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3 px-1 text-sm text-gray-400">
        <span>Qoldi: {remaining.length}</span>
        <span>To'g'ri: {correctCount}/{sorted.length}</span>
      </div>

      <button onClick={() => setDone(true)} disabled={remaining.length > 0}
        className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {remaining.length > 0 ? `Yana ${remaining.length} ta qoldi` : 'Tayyor →'}
      </button>
    </div>
  )
}
