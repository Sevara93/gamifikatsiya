import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type BinId = 'plastik' | 'qogoz' | 'shisha' | 'organik' | 'metall'
interface Item   { id: number; label: string; emoji: string; bin: BinId }
interface BinDef { id: BinId; label: string; emoji: string; lid: string; body: string; border: string; text: string }

const BASE_BINS: BinDef[] = [
  { id: 'plastik', label: 'Plastik', emoji: '♻️', lid: '#3b82f6', body: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  { id: 'qogoz',   label: "Qog'oz",  emoji: '📄', lid: '#eab308', body: '#fef9c3', border: '#eab308', text: '#713f12' },
  { id: 'shisha',  label: 'Shisha',  emoji: '🫙', lid: '#14b8a6', body: '#ccfbf1', border: '#14b8a6', text: '#134e4a' },
  { id: 'organik', label: 'Organik', emoji: '🌱', lid: '#22c55e', body: '#dcfce7', border: '#22c55e', text: '#14532d' },
]
const METAL_BIN: BinDef = {
  id: 'metall', label: 'Metall', emoji: '🔩', lid: '#6b7280', body: '#f3f4f6', border: '#6b7280', text: '#1f2937',
}

const LEVEL_CONFIG: Record<string, { items: Item[]; bins: BinDef[] }> = {
  KICHIK: {
    bins: BASE_BINS,
    items: [
      { id: 1,  label: "Shampun shishasi",    emoji: '🧴', bin: 'plastik' },
      { id: 2,  label: "Gazeta",              emoji: '📰', bin: 'qogoz'   },
      { id: 3,  label: "Shisha idish",        emoji: '🫙', bin: 'shisha'  },
      { id: 4,  label: "Banan po'sti",        emoji: '🍌', bin: 'organik' },
      { id: 5,  label: "Karton quti",         emoji: '📦', bin: 'qogoz'   },
      { id: 6,  label: "Plastik sumka",       emoji: '🛍️', bin: 'plastik' },
      { id: 7,  label: "Olma qoldig'i",       emoji: '🍎', bin: 'organik' },
      { id: 8,  label: "Shisha banka",        emoji: '🍶', bin: 'shisha'  },
      { id: 9,  label: "Qog'oz ruloni",       emoji: '🧻', bin: 'qogoz'   },
      { id: 10, label: "Sabzavot qoldig'i",   emoji: '🥕', bin: 'organik' },
    ],
  },
  ORTA: {
    bins: BASE_BINS,
    items: [
      { id: 1,  label: "Shampun shishasi",    emoji: '🧴', bin: 'plastik' },
      { id: 2,  label: "Gazeta",              emoji: '📰', bin: 'qogoz'   },
      { id: 3,  label: "Shisha idish",        emoji: '🫙', bin: 'shisha'  },
      { id: 4,  label: "Banan po'sti",        emoji: '🍌', bin: 'organik' },
      { id: 5,  label: "Karton quti",         emoji: '📦', bin: 'qogoz'   },
      { id: 6,  label: "Plastik sumka",       emoji: '🛍️', bin: 'plastik' },
      { id: 7,  label: "Olma qoldig'i",       emoji: '🍎', bin: 'organik' },
      { id: 8,  label: "Shisha banka",        emoji: '🍶', bin: 'shisha'  },
      { id: 9,  label: "Qog'oz ruloni",       emoji: '🧻', bin: 'qogoz'   },
      { id: 10, label: "Sabzavot qoldig'i",   emoji: '🥕', bin: 'organik' },
      { id: 11, label: "Eski kitob",          emoji: '📚', bin: 'qogoz'   },
      { id: 12, label: "Plastik chelak",      emoji: '🪣', bin: 'plastik' },
      { id: 13, label: "Tarvuz po'sti",       emoji: '🍉', bin: 'organik' },
      // Tricky: tea bag looks like paper but the content is organic
      { id: 14, label: "Choy xaltasi",        emoji: '🍵', bin: 'organik' },
      // Tricky: juice box looks like paper/cardboard but is plastic-coated
      { id: 15, label: "Sharbat paketi",      emoji: '🧃', bin: 'plastik' },
    ],
  },
  KATTA: {
    bins: [...BASE_BINS, METAL_BIN],
    items: [
      { id: 1,  label: "Shampun shishasi",    emoji: '🧴', bin: 'plastik' },
      { id: 2,  label: "Gazeta",              emoji: '📰', bin: 'qogoz'   },
      { id: 3,  label: "Shisha idish",        emoji: '🫙', bin: 'shisha'  },
      { id: 4,  label: "Banan po'sti",        emoji: '🍌', bin: 'organik' },
      { id: 5,  label: "Karton quti",         emoji: '📦', bin: 'qogoz'   },
      { id: 6,  label: "Plastik sumka",       emoji: '🛍️', bin: 'plastik' },
      { id: 7,  label: "Olma qoldig'i",       emoji: '🍎', bin: 'organik' },
      { id: 8,  label: "Shisha banka",        emoji: '🍶', bin: 'shisha'  },
      { id: 9,  label: "Qog'oz ruloni",       emoji: '🧻', bin: 'qogoz'   },
      { id: 10, label: "Sabzavot qoldig'i",   emoji: '🥕', bin: 'organik' },
      { id: 11, label: "Eski kitob",          emoji: '📚', bin: 'qogoz'   },
      { id: 12, label: "Plastik chelak",      emoji: '🪣', bin: 'plastik' },
      { id: 13, label: "Tarvuz po'sti",       emoji: '🍉', bin: 'organik' },
      { id: 14, label: "Choy xaltasi",        emoji: '🍵', bin: 'organik' },
      { id: 15, label: "Sharbat paketi",      emoji: '🧃', bin: 'plastik' },
      // NEW metal bin — kids must now sort between 5 categories
      { id: 16, label: "Konserva bankasi",    emoji: '🥫', bin: 'metall'  },
      { id: 17, label: "Temir qoshiq",        emoji: '🥄', bin: 'metall'  },
      // Tricky: broken window is still GLASS, not trash
      { id: 18, label: "Singan oyna",         emoji: '🪟', bin: 'shisha'  },
      // Tricky: ice-cream packaging looks like paper but is plastic-coated
      { id: 19, label: "Muzqaymoq qadoqi",    emoji: '🍦', bin: 'plastik' },
      { id: 20, label: "Tuxum po'sti",        emoji: '🥚', bin: 'organik' },
    ],
  },
  TAYYORLOV: {
    bins: [...BASE_BINS, METAL_BIN],
    items: [
      { id: 1,  label: "Shampun shishasi",    emoji: '🧴', bin: 'plastik' },
      { id: 2,  label: "Gazeta",              emoji: '📰', bin: 'qogoz'   },
      { id: 3,  label: "Shisha idish",        emoji: '🫙', bin: 'shisha'  },
      { id: 4,  label: "Banan po'sti",        emoji: '🍌', bin: 'organik' },
      { id: 5,  label: "Karton quti",         emoji: '📦', bin: 'qogoz'   },
      { id: 6,  label: "Plastik sumka",       emoji: '🛍️', bin: 'plastik' },
      { id: 7,  label: "Olma qoldig'i",       emoji: '🍎', bin: 'organik' },
      { id: 8,  label: "Shisha banka",        emoji: '🍶', bin: 'shisha'  },
      { id: 9,  label: "Qog'oz ruloni",       emoji: '🧻', bin: 'qogoz'   },
      { id: 10, label: "Sabzavot qoldig'i",   emoji: '🥕', bin: 'organik' },
      { id: 11, label: "Eski kitob",          emoji: '📚', bin: 'qogoz'   },
      { id: 12, label: "Plastik chelak",      emoji: '🪣', bin: 'plastik' },
      { id: 13, label: "Tarvuz po'sti",       emoji: '🍉', bin: 'organik' },
      { id: 14, label: "Choy xaltasi",        emoji: '🍵', bin: 'organik' },
      { id: 15, label: "Sharbat paketi",      emoji: '🧃', bin: 'plastik' },
      { id: 16, label: "Konserva bankasi",    emoji: '🥫', bin: 'metall'  },
      { id: 17, label: "Temir qoshiq",        emoji: '🥄', bin: 'metall'  },
      { id: 18, label: "Singan oyna",         emoji: '🪟', bin: 'shisha'  },
      { id: 19, label: "Muzqaymoq qadoqi",    emoji: '🍦', bin: 'plastik' },
      { id: 20, label: "Tuxum po'sti",        emoji: '🥚', bin: 'organik' },
      { id: 21, label: "Batareya",            emoji: '🔋', bin: 'metall'  },
      // Tricky: greasy paper cup can't be recycled as paper — goes to organic waste
      { id: 22, label: "Yog'li qog'oz stakan",emoji: '🥤', bin: 'organik' },
      // Tricky: milk carton (Tetra Pak) is plastic-coated, NOT qog'oz
      { id: 23, label: "Sut paketi",          emoji: '🥛', bin: 'plastik' },
      // Tricky: greasy pizza box can't go to qog'oz because of oil contamination
      { id: 24, label: "Yog'li pizza qutisi", emoji: '🍕', bin: 'organik' },
      // Tricky: plastic fork looks like metal cutlery but is plastik
      { id: 25, label: "Plastik vilka",       emoji: '🍴', bin: 'plastik' },
    ],
  },
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

export default function Week1Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const { items, bins } = LEVEL_CONFIG[groupLevel] ?? LEVEL_CONFIG.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current, setCurrent] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong,   setWrong]   = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; correctLabel: string } | null>(null)
  const [done,   setDone]     = useState(false)
  const [failed, setFailed]   = useState(false)

  const item = items[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleBin(binId: BinId) {
    if (feedback) return
    const ok = item.bin === binId
    const correctBin = bins.find(b => b.id === item.bin)!
    setFeedback({ ok, correctLabel: `${correctBin.label} ${correctBin.emoji}` })
    if (ok) setCorrect(c => c + 1)
    const newWrong = ok ? wrong : wrong + 1
    if (!ok) setWrong(newWrong)

    setTimeout(() => {
      setFeedback(null)
      if (newWrong >= maxWrong) { setFailed(true); return }
      if (current + 1 >= items.length) setDone(true)
      else setCurrent(c => c + 1)
    }, 900)
  }

  if (failed) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Qaytadan urinib ko'ring!</h2>
        <p className="text-gray-500 mb-6">Juda ko'p xato — topshiriqni qaytadan bajaring</p>
        <button
          onClick={restart}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition"
        >
          🔄 Qaytadan boshlash
        </button>
      </div>
    )
  }

  if (done) {
    const score = Math.round(correct / items.length * 100)
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">{correct} / {items.length} to'g'ri javob</p>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
          <div className="bg-green-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
        </div>
        <button
          onClick={() => onComplete(score)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-2xl transition"
        >
          Davom etish →
        </button>
      </div>
    )
  }

  const fiveBins = bins.length === 5

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">Chiqindini to'g'ri savatga tashlang!</p>

      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm text-gray-400">{current + 1} / {items.length}</span>
        <span className="text-sm text-gray-400">✅ {correct}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div className="bg-green-400 h-2 rounded-full transition-all" style={{ width: `${(current / items.length) * 100}%` }} />
      </div>

      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: maxWrong }).map((_, i) => (
          <span key={i} className="text-xl">{i < wrong ? '🩶' : '❤️'}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-3xl shadow p-6 text-center mb-5 border-4 transition-colors ${
            !feedback      ? 'border-transparent'
            : feedback.ok  ? 'border-green-400 bg-green-50'
                           : 'border-red-400 bg-red-50'
          }`}
        >
          <div className="text-7xl mb-3">{item.emoji}</div>
          <p className="font-semibold text-gray-700 text-lg">{item.label}</p>
          {feedback?.ok && <p className="text-green-600 font-bold mt-2">✅ To'g'ri!</p>}
          {feedback && !feedback.ok && (
            <p className="text-red-500 font-bold mt-2">❌ Bu: {feedback.correctLabel}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={`grid gap-2 ${fiveBins ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {bins.map(bin => (
          <button
            key={bin.id}
            onClick={() => handleBin(bin.id as BinId)}
            className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
          >
            {/* Handle nub */}
            <div className="w-5 h-2 rounded-t-sm" style={{ background: bin.lid }} />
            {/* Lid — slightly wider via transform */}
            <div
              className="w-full h-3 rounded-sm origin-top"
              style={{ background: bin.lid, transform: 'scaleX(1.1)' }}
            />
            {/* Body */}
            <div
              className="w-full rounded-b-2xl flex flex-col items-center justify-center pt-2 pb-3 gap-1 border-2 border-t-0"
              style={{ background: bin.body, borderColor: bin.border }}
            >
              <span className={`leading-none ${fiveBins ? 'text-xl' : 'text-2xl'}`}>{bin.emoji}</span>
              <span
                className="text-[10px] font-bold leading-tight text-center"
                style={{ color: bin.text }}
              >
                {bin.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
