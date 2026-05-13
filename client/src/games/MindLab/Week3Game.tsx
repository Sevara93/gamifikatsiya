import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OddRound {
  id: number
  items: { label: string; emoji: string }[]  // always 4
  oddIndex: number
  hint: string
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

// Kichik: very obvious categories
const KICHIK_ROUNDS: OddRound[] = [
  {
    id: 1, oddIndex: 2, hint: "Mashina meva emas, transport vositasi",
    items: [{ label: 'Olma',    emoji: '🍎' }, { label: 'Banan',   emoji: '🍌' },
            { label: 'Mashina', emoji: '🚗' }, { label: 'Apelsin', emoji: '🍊' }],
  },
  {
    id: 2, oddIndex: 1, hint: "Stul hayvon emas, mebel",
    items: [{ label: 'Mushuk', emoji: '🐱' }, { label: 'Stul',  emoji: '🪑' },
            { label: 'It',     emoji: '🐕' }, { label: 'Quyon', emoji: '🐰' }],
  },
  {
    id: 3, oddIndex: 2, hint: "Baliq gul emas, hayvon",
    items: [{ label: 'Lola',   emoji: '🌷' }, { label: 'Gul',    emoji: '🌸' },
            { label: 'Baliq',  emoji: '🐟' }, { label: 'Kungaboqar', emoji: '🌻' }],
  },
  {
    id: 4, oddIndex: 0, hint: "Olma transport vositasi emas, meva",
    items: [{ label: 'Olma',   emoji: '🍎' }, { label: 'Mashina', emoji: '🚗' },
            { label: 'Avtobus',emoji: '🚌' }, { label: 'Taksi',   emoji: '🚕' }],
  },
  {
    id: 5, oddIndex: 0, hint: "Mushuk rang emas, hayvon",
    items: [{ label: 'Mushuk',  emoji: '🐱' }, { label: "Ko'k",  emoji: '🔵' },
            { label: 'Qizil',   emoji: '🔴' }, { label: 'Sariq', emoji: '🟡' }],
  },
  {
    id: 6, oddIndex: 1, hint: "It maktab buyumi emas, hayvon",
    items: [{ label: 'Kitob',  emoji: '📚' }, { label: 'It',    emoji: '🐕' },
            { label: 'Daftar', emoji: '📓' }, { label: 'Qalam', emoji: '✏️' }],
  },
  {
    id: 7, oddIndex: 2, hint: "Mashina ovqat emas, transport",
    items: [{ label: 'Pizza',   emoji: '🍕' }, { label: 'Burger', emoji: '🍔' },
            { label: 'Mashina', emoji: '🚗' }, { label: 'Lag\'mon', emoji: '🍜' }],
  },
  {
    id: 8, oddIndex: 0, hint: "Telefon tabiat emas, inson yasadi",
    items: [{ label: 'Telefon', emoji: '📱' }, { label: 'Togʻ',   emoji: '🏔️' },
            { label: 'Daryo',   emoji: '🏞️' }, { label: 'Daraxt', emoji: '🌳' }],
  },
]

// O'rta: slightly tricky (tomato = fruit not vegetable, horse = animal not vehicle)
const ORTA_EXTRA: OddRound[] = [
  {
    id: 9, oddIndex: 3, hint: "Olma sabzavot emas, meva",
    items: [{ label: 'Pomidor', emoji: '🍅' }, { label: 'Sabzi',   emoji: '🥕' },
            { label: 'Brokoli', emoji: '🥦' }, { label: 'Olma',    emoji: '🍎' }],
  },
  {
    id: 10, oddIndex: 3, hint: "Ot jonli hayvon, transport vositasi emas",
    items: [{ label: 'Mashina',  emoji: '🚗'  }, { label: 'Samolyot', emoji: '✈️' },
            { label: 'Velosiped',emoji: '🚲'  }, { label: 'Ot',       emoji: '🐴' }],
  },
]

// Katta: properties-based (not just category)
const KATTA_EXTRA: OddRound[] = [
  {
    id: 11, oddIndex: 3, hint: "Olma rang emas, narsa",
    items: [{ label: 'Qizil',  emoji: '🔴' }, { label: "Ko'k",  emoji: '🔵' },
            { label: 'Yashil', emoji: '🟢' }, { label: 'Olma',  emoji: '🍎' }],
  },
  {
    id: 12, oddIndex: 2, hint: "Baliq suvda yashaydi, qolganlari quruqlikda",
    items: [{ label: 'Mushuk', emoji: '🐱' }, { label: 'Tulki',  emoji: '🦊' },
            { label: 'Baliq',  emoji: '🐟' }, { label: 'It',     emoji: '🐕' }],
  },
]

// Tayyorlov: higher-order reasoning
const TAYYORLOV_EXTRA: OddRound[] = [
  {
    id: 13, oddIndex: 2, hint: "Velosipedning motori yo'q, qolganlarida bor",
    items: [{ label: 'Mashina',   emoji: '🚗' }, { label: 'Avtobus',   emoji: '🚌' },
            { label: 'Velosiped', emoji: '🚲' }, { label: 'Samolyot',  emoji: '✈️' }],
  },
  {
    id: 14, oddIndex: 1, hint: "Quyosh yorug'lik beradi, Oy esa o'zi yormaydi",
    items: [{ label: 'Quyosh',   emoji: '☀️' }, { label: 'Oy',     emoji: '🌙' },
            { label: 'Olov',     emoji: '🔥' }, { label: 'Chiroq', emoji: '💡' }],
  },
]

const ROUNDS_BY_LEVEL: Record<string, OddRound[]> = {
  KICHIK:    KICHIK_ROUNDS,
  ORTA:      [...KICHIK_ROUNDS, ...ORTA_EXTRA],
  KATTA:     [...KICHIK_ROUNDS, ...ORTA_EXTRA, ...KATTA_EXTRA],
  TAYYORLOV: [...KICHIK_ROUNDS, ...ORTA_EXTRA, ...KATTA_EXTRA, ...TAYYORLOV_EXTRA],
}

export default function Week3Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const rounds   = ROUNDS_BY_LEVEL[groupLevel] ?? ROUNDS_BY_LEVEL.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current,  setCurrent]  = useState(0)
  const [correct,  setCorrect]  = useState(0)
  const [wrong,    setWrong]    = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; chosen: number } | null>(null)
  const [done,     setDone]     = useState(false)
  const [failed,   setFailed]   = useState(false)

  const round = rounds[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleTap(idx: number) {
    if (feedback) return
    const ok = idx === round.oddIndex
    setFeedback({ ok, chosen: idx })
    if (ok) setCorrect(c => c + 1)
    const newWrong = ok ? wrong : wrong + 1
    if (!ok) setWrong(newWrong)

    setTimeout(() => {
      setFeedback(null)
      if (newWrong >= maxWrong) { setFailed(true); return }
      if (current + 1 >= rounds.length) setDone(true)
      else setCurrent(c => c + 1)
    }, 1100)
  }

  if (failed) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Qaytadan urinib ko'ring!</h2>
        <p className="text-gray-500 mb-6">Juda ko'p xato — topshiriqni qaytadan bajaring</p>
        <button onClick={restart} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition">
          🔄 Qaytadan boshlash
        </button>
      </div>
    )
  }

  if (done) {
    const score = Math.round(correct / rounds.length * 100)
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">{correct} / {rounds.length} to'g'ri javob</p>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
          <div className="bg-indigo-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
        </div>
        <button onClick={() => onComplete(score)} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-3 rounded-2xl transition">
          Davom etish →
        </button>
      </div>
    )
  }

  function itemClass(idx: number) {
    if (!feedback) return 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50'
    if (idx === round.oddIndex) return 'border-green-400 bg-green-50'
    if (feedback.chosen === idx && !feedback.ok) return 'border-red-400 bg-red-50'
    return 'border-gray-100 bg-gray-50 opacity-40'
  }

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">Qaysi biri mos kelmaydi?</p>

      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm text-gray-400">{current + 1} / {rounds.length}</span>
        <span className="text-sm text-gray-400">✅ {correct}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div className="bg-indigo-400 h-2 rounded-full transition-all" style={{ width: `${(current / rounds.length) * 100}%` }} />
      </div>
      <div className="flex justify-center gap-1 mb-5">
        {Array.from({ length: maxWrong }).map((_, i) => (
          <span key={i} className="text-xl">{i < wrong ? '🩶' : '❤️'}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          {round.items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTap(idx)}
              className={`border-2 rounded-2xl p-5 flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-sm ${itemClass(idx)}`}
            >
              <span className="text-4xl">{item.emoji}</span>
              <span className="text-sm font-bold text-gray-700">{item.label}</span>
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {feedback && (
        <p className={`text-center font-bold mt-4 text-sm ${feedback.ok ? 'text-green-600' : 'text-red-500'}`}>
          {feedback.ok ? '✅ To\'g\'ri!' : `❌ ${round.hint}`}
        </p>
      )}
    </div>
  )
}
