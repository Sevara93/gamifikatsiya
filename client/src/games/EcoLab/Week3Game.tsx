import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Item { id: number; label: string; emoji: string; type: 'tabiat' | 'inson' }

const LEVEL_ITEMS: Record<string, Item[]> = {
  KICHIK: [
    { id: 1,  label: 'Daraxt',        emoji: '🌳', type: 'tabiat' },
    { id: 2,  label: 'Mashina',       emoji: '🚗', type: 'inson'  },
    { id: 3,  label: 'Tosh',          emoji: '🪨', type: 'tabiat' },
    { id: 4,  label: 'Telefon',       emoji: '📱', type: 'inson'  },
    { id: 5,  label: 'Gul',           emoji: '🌸', type: 'tabiat' },
    { id: 6,  label: 'Stul',          emoji: '🪑', type: 'inson'  },
    { id: 7,  label: 'Qush',          emoji: '🦅', type: 'tabiat' },
    { id: 8,  label: 'Televizor',     emoji: '📺', type: 'inson'  },
    { id: 9,  label: 'Bulut',         emoji: '☁️', type: 'tabiat' },
    { id: 10, label: 'Velosiped',     emoji: '🚲', type: 'inson'  },
  ],
  ORTA: [
    { id: 1,  label: 'Daraxt',        emoji: '🌳', type: 'tabiat' },
    { id: 2,  label: 'Mashina',       emoji: '🚗', type: 'inson'  },
    { id: 3,  label: 'Tosh',          emoji: '🪨', type: 'tabiat' },
    { id: 4,  label: 'Telefon',       emoji: '📱', type: 'inson'  },
    { id: 5,  label: 'Gul',           emoji: '🌸', type: 'tabiat' },
    { id: 6,  label: 'Stul',          emoji: '🪑', type: 'inson'  },
    { id: 7,  label: 'Qush',          emoji: '🦅', type: 'tabiat' },
    { id: 8,  label: 'Televizor',     emoji: '📺', type: 'inson'  },
    { id: 9,  label: 'Bulut',         emoji: '☁️', type: 'tabiat' },
    { id: 10, label: 'Velosiped',     emoji: '🚲', type: 'inson'  },
    { id: 11, label: 'Daryo',         emoji: '🏞️', type: 'tabiat' },
    { id: 12, label: 'Kompyuter',     emoji: '💻', type: 'inson'  },
    { id: 13, label: 'Ot',            emoji: '🐴', type: 'tabiat' },
    { id: 14, label: 'Ko\'prik',      emoji: '🌉', type: 'inson'  },
    // Slightly tricky: honey is made by bees (nature)
    { id: 15, label: 'Asal',          emoji: '🍯', type: 'tabiat' },
  ],
  KATTA: [
    { id: 1,  label: 'Daraxt',        emoji: '🌳', type: 'tabiat' },
    { id: 2,  label: 'Mashina',       emoji: '🚗', type: 'inson'  },
    { id: 3,  label: 'Tosh',          emoji: '🪨', type: 'tabiat' },
    { id: 4,  label: 'Telefon',       emoji: '📱', type: 'inson'  },
    { id: 5,  label: 'Gul',           emoji: '🌸', type: 'tabiat' },
    { id: 6,  label: 'Stul',          emoji: '🪑', type: 'inson'  },
    { id: 7,  label: 'Qush',          emoji: '🦅', type: 'tabiat' },
    { id: 8,  label: 'Televizor',     emoji: '📺', type: 'inson'  },
    { id: 9,  label: 'Bulut',         emoji: '☁️', type: 'tabiat' },
    { id: 10, label: 'Velosiped',     emoji: '🚲', type: 'inson'  },
    { id: 11, label: 'Daryo',         emoji: '🏞️', type: 'tabiat' },
    { id: 12, label: 'Kompyuter',     emoji: '💻', type: 'inson'  },
    { id: 13, label: 'Ot',            emoji: '🐴', type: 'tabiat' },
    { id: 14, label: 'Ko\'prik',      emoji: '🌉', type: 'inson'  },
    { id: 15, label: 'Asal',          emoji: '🍯', type: 'tabiat' },
    // Tricky: a wooden plank comes FROM a tree, but it was shaped by humans
    { id: 16, label: 'Taxta',         emoji: '🪵', type: 'inson'  },
    // Tricky: brick is shaped by humans from clay
    { id: 17, label: "G'isht",        emoji: '🧱', type: 'inson'  },
    { id: 18, label: 'Yomg\'ir',      emoji: '🌧️', type: 'tabiat' },
    { id: 19, label: 'Ko\'l',         emoji: '🌊', type: 'tabiat' },
    { id: 20, label: 'Kema',         emoji: '🚢', type: 'inson'  },
  ],
  TAYYORLOV: [
    { id: 1,  label: 'Daraxt',        emoji: '🌳', type: 'tabiat' },
    { id: 2,  label: 'Mashina',       emoji: '🚗', type: 'inson'  },
    { id: 3,  label: 'Tosh',          emoji: '🪨', type: 'tabiat' },
    { id: 4,  label: 'Telefon',       emoji: '📱', type: 'inson'  },
    { id: 5,  label: 'Gul',           emoji: '🌸', type: 'tabiat' },
    { id: 6,  label: 'Stul',          emoji: '🪑', type: 'inson'  },
    { id: 7,  label: 'Qush',          emoji: '🦅', type: 'tabiat' },
    { id: 8,  label: 'Televizor',     emoji: '📺', type: 'inson'  },
    { id: 9,  label: 'Bulut',         emoji: '☁️', type: 'tabiat' },
    { id: 10, label: 'Velosiped',     emoji: '🚲', type: 'inson'  },
    { id: 11, label: 'Daryo',         emoji: '🏞️', type: 'tabiat' },
    { id: 12, label: 'Kompyuter',     emoji: '💻', type: 'inson'  },
    { id: 13, label: 'Ot',            emoji: '🐴', type: 'tabiat' },
    { id: 14, label: 'Ko\'prik',      emoji: '🌉', type: 'inson'  },
    { id: 15, label: 'Asal',          emoji: '🍯', type: 'tabiat' },
    { id: 16, label: 'Taxta',         emoji: '🪵', type: 'inson'  },
    { id: 17, label: "G'isht",        emoji: '🧱', type: 'inson'  },
    { id: 18, label: 'Yomg\'ir',      emoji: '🌧️', type: 'tabiat' },
    { id: 19, label: 'Ko\'l',         emoji: '🌊', type: 'tabiat' },
    { id: 20, label: 'Kema',         emoji: '🚢', type: 'inson'  },
    // School-level tricky: wool comes from sheep (tabiat) but the yarn/sweater is inson
    { id: 21, label: 'Jun',     emoji: '🧶', type: 'inson'  },
    // Tricky: milk is natural (from cows)
    { id: 22, label: 'Sut',           emoji: '🥛', type: 'tabiat' },
    // Tricky: butter is PROCESSED from milk by humans
    { id: 23, label: "Sariyog'",      emoji: '🧈', type: 'inson'  },
    // Tricky: sand exists in nature
    { id: 24, label: 'Qum',           emoji: '🏖️', type: 'tabiat' },
    // Tricky: glass is made FROM sand by humans
    { id: 25, label: 'Oyna', emoji: '🪞', type: 'inson'  },
  ],
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

export default function Week3Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const items = LEVEL_ITEMS[groupLevel] ?? LEVEL_ITEMS.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current, setCurrent] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong,   setWrong]   = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; correctType: string } | null>(null)
  const [done,   setDone]     = useState(false)
  const [failed, setFailed]   = useState(false)

  const item = items[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleChoice(type: string) {
    if (feedback) return
    const ok = item.type === type
    setFeedback({ ok, correctType: item.type })
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
        <div className="text-6xl mb-4">🌿</div>
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

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">Tabiatdami yoki inson yasadimi?</p>

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
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-3xl shadow p-8 text-center mb-5 border-4 transition-colors ${
            !feedback      ? 'border-transparent'
            : feedback.ok  ? 'border-green-400 bg-green-50'
                           : 'border-red-400 bg-red-50'
          }`}
        >
          <div className="text-8xl mb-3">{item.emoji}</div>
          <p className="font-semibold text-gray-700 text-xl">{item.label}</p>
          {feedback?.ok && <p className="text-green-600 font-bold mt-3">✅ To'g'ri!</p>}
          {feedback && !feedback.ok && (
            <p className="text-red-500 font-bold mt-3">
              ❌ Bu {feedback.correctType === 'tabiat' ? '🌳 Tabiat' : '🏭 Inson yasadi'}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleChoice('tabiat')}
          className="bg-green-50 border-2 border-green-300 hover:border-green-500 hover:bg-green-100 rounded-2xl p-5 text-center font-bold transition-transform hover:scale-105 active:scale-95"
        >
          <div className="text-4xl mb-1">🌳</div>
          <div className="text-green-700">Tabiat</div>
        </button>
        <button
          onClick={() => handleChoice('inson')}
          className="bg-blue-50 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-100 rounded-2xl p-5 text-center font-bold transition-transform hover:scale-105 active:scale-95"
        >
          <div className="text-4xl mb-1">🏭</div>
          <div className="text-blue-700">Inson yasadi</div>
        </button>
      </div>
    </div>
  )
}
