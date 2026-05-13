import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Riddle {
  id: number
  question: string
  options: { label: string; emoji: string }[]
  answer: string
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

const BASE: Riddle[] = [
  {
    id: 1, question: "Sariq, uzun, shirin meva — bu nima?",
    options: [{ label: 'Banan', emoji: '🍌' }, { label: 'Limon', emoji: '🍋' }, { label: 'Olma', emoji: '🍎' }],
    answer: 'Banan',
  },
  {
    id: 2, question: "Hammani isitadi, osmonda yonadi — bu nima?",
    options: [{ label: 'Quyosh', emoji: '☀️' }, { label: 'Olov', emoji: '🔥' }, { label: 'Chiroq', emoji: '💡' }],
    answer: 'Quyosh',
  },
  {
    id: 3, question: "To'rt oyoq bor, miyovlaydi — bu kim?",
    options: [{ label: 'Mushuk', emoji: '🐱' }, { label: 'It', emoji: '🐕' }, { label: 'Quyon', emoji: '🐰' }],
    answer: 'Mushuk',
  },
  {
    id: 4, question: "Oyog'i yo'q, lekin yurar; daryo bo'ylab oqar — bu nima?",
    options: [{ label: 'Daryo', emoji: '🏞️' }, { label: 'Shamol', emoji: '💨' }, { label: 'Suv', emoji: '💧' }],
    answer: 'Daryo',
  },
  {
    id: 5, question: "Tunda ko'rinadi, miltillaydi — bu nima?",
    options: [{ label: 'Yulduz', emoji: '⭐' }, { label: 'Oy', emoji: '🌙' }, { label: 'Chiroq', emoji: '💡' }],
    answer: 'Yulduz',
  },
  {
    id: 6, question: "Qizil, yumaloq, shirin — bu nima?",
    options: [{ label: 'Olma', emoji: '🍎' }, { label: 'Pomidor', emoji: '🍅' }, { label: 'Gilos', emoji: '🍒' }],
    answer: 'Olma',
  },
]

const ORTA_EXTRA: Riddle[] = [
  {
    id: 7, question: "To'rt oyog'i bor, lekin yurmas; ustida o'tiramiz — bu nima?",
    options: [{ label: 'Stol', emoji: '🪑' }, { label: 'Ot', emoji: '🐴' }, { label: 'Karavot', emoji: '🛏️' }],
    answer: 'Stol',
  },
  {
    id: 8, question: "Oq suyuqlik, sigirdan keladi — bu nima?",
    options: [{ label: 'Sut', emoji: '🥛' }, { label: 'Suv', emoji: '💧' }, { label: 'Qatiq', emoji: '🍶' }],
    answer: 'Sut',
  },
]

const KATTA_EXTRA: Riddle[] = [
  {
    id: 9, question: "Yetmish besh kiyim kiyar, yig'lasang ko'zing yig'lar — bu nima?",
    options: [{ label: 'Piyoz', emoji: '🧅' }, { label: 'Karam', emoji: '🥬' }, { label: 'Sarimsoq', emoji: '🧄' }],
    answer: 'Piyoz',
  },
  {
    id: 10, question: "Ichi bor, og'zi yo'q; yorilsa ichidan chiqadi — bu nima?",
    options: [{ label: 'Tuxum', emoji: '🥚' }, { label: 'Yong\'oq', emoji: '🥜' }, { label: 'Olma', emoji: '🍎' }],
    answer: 'Tuxum',
  },
]

const TAYYORLOV_EXTRA: Riddle[] = [
  {
    id: 11, question: "Bitta oyog'i bor, lekin yurmas; o'rmonda o'sadi — bu nima?",
    options: [{ label: 'Qo\'ziqorin', emoji: '🍄' }, { label: 'Daraxt', emoji: '🌳' }, { label: 'Gul', emoji: '🌸' }],
    answer: 'Qo\'ziqorin',
  },
  {
    id: 12, question: "Kelganini bildiradi, lekin ko'rinmaydi — bu nima?",
    options: [{ label: 'Shamol', emoji: '💨' }, { label: 'Hid', emoji: '👃' }, { label: 'Tovush', emoji: '🔊' }],
    answer: 'Shamol',
  },
]

const ROUNDS_BY_LEVEL: Record<string, Riddle[]> = {
  KICHIK:    BASE,
  ORTA:      [...BASE, ...ORTA_EXTRA],
  KATTA:     [...BASE, ...ORTA_EXTRA, ...KATTA_EXTRA],
  TAYYORLOV: [...BASE, ...ORTA_EXTRA, ...KATTA_EXTRA, ...TAYYORLOV_EXTRA],
}

export default function Week4Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const rounds   = ROUNDS_BY_LEVEL[groupLevel] ?? ROUNDS_BY_LEVEL.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current,  setCurrent]  = useState(0)
  const [correct,  setCorrect]  = useState(0)
  const [wrong,    setWrong]    = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; chosen: string } | null>(null)
  const [done,     setDone]     = useState(false)
  const [failed,   setFailed]   = useState(false)

  const round = rounds[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleTap(label: string) {
    if (feedback) return
    const ok = label === round.answer
    setFeedback({ ok, chosen: label })
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

  function optionClass(label: string) {
    if (!feedback) return 'border-indigo-200 bg-white hover:border-indigo-500 hover:bg-indigo-50'
    if (label === round.answer) return 'border-green-400 bg-green-50'
    if (feedback.chosen === label && !feedback.ok) return 'border-red-400 bg-red-50'
    return 'border-gray-100 bg-gray-50 opacity-40'
  }

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">Topishmoqni top!</p>

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
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-6 text-center mb-5"
        >
          <div className="text-5xl mb-3">🤔</div>
          <p className="font-semibold text-gray-800 text-lg leading-snug">{round.question}</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-3">
        {round.options.map(opt => (
          <button
            key={opt.label}
            onClick={() => handleTap(opt.label)}
            className={`border-2 rounded-2xl p-4 flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-sm ${optionClass(opt.label)}`}
          >
            <span className="text-4xl">{opt.emoji}</span>
            <span className="text-xs font-bold text-gray-700 text-center">{opt.label}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <p className={`text-center font-bold mt-4 text-sm ${feedback.ok ? 'text-green-600' : 'text-red-500'}`}>
          {feedback.ok ? '✅ To\'g\'ri!' : `❌ Javob: ${round.answer}`}
        </p>
      )}
    </div>
  )
}
