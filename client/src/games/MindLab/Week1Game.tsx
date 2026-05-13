import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PatternRound {
  id: number
  sequence: string[]
  options: string[]
  answer: string
  isNumber?: boolean
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

// AB patterns — 4 items shown, ask 5th
const BASE: PatternRound[] = [
  { id: 1, sequence: ['🔴','🔵','🔴','🔵'], options: ['🔴','🔵','🟡'],      answer: '🔴' },
  { id: 2, sequence: ['⭐','🌙','⭐','🌙'], options: ['⭐','🌙','☀️'],       answer: '⭐' },
  { id: 3, sequence: ['🐱','🐶','🐱','🐶'], options: ['🐱','🐶','🐰'],       answer: '🐱' },
  { id: 4, sequence: ['🍎','🍌','🍎','🍌'], options: ['🍎','🍌','🍊'],       answer: '🍎' },
  { id: 5, sequence: ['🌧️','☀️','🌧️','☀️'], options: ['🌧️','☀️','⛅'],    answer: '🌧️' },
  { id: 6, sequence: ['🌸','🌻','🌸','🌻'], options: ['🌸','🌻','🌷'],       answer: '🌸' },
  { id: 7, sequence: ['🚗','🚕','🚗','🚕'], options: ['🚗','🚕','🚌'],       answer: '🚗' },
  { id: 8, sequence: ['🔺','🔷','🔺','🔷'], options: ['🔺','🔷','⬛'],       answer: '🔺' },
]

// ABB pattern (ABBABB…, 5th = B) and AAB (AABAAB…, 5th = A)
const ORTA_EXTRA: PatternRound[] = [
  { id: 9,  sequence: ['🔴','🔵','🔵','🔴'], options: ['🔵','🔴','🟡'],     answer: '🔵' },
  { id: 10, sequence: ['🍎','🍎','🍊','🍎'], options: ['🍎','🍊','🍋'],      answer: '🍎' },
]

// ABC pattern (ABCABC…, 5th = B), 4 options
const KATTA_EXTRA: PatternRound[] = [
  { id: 11, sequence: ['🔴','🔵','🟡','🔴'], options: ['🔴','🔵','🟡','⚪'], answer: '🔵' },
  { id: 12, sequence: ['🐱','🐶','🐰','🐱'], options: ['🐱','🐶','🐰','🐸'], answer: '🐶' },
]

// Counting sequences — school level, 4 options
const TAYYORLOV_EXTRA: PatternRound[] = [
  { id: 13, sequence: ['1','2','3','4'], options: ['5','6','4','7'],   answer: '5',  isNumber: true },
  { id: 14, sequence: ['2','4','6','8'], options: ['10','9','7','5'],  answer: '10', isNumber: true },
]

const ROUNDS_BY_LEVEL: Record<string, PatternRound[]> = {
  KICHIK:    BASE,
  ORTA:      [...BASE, ...ORTA_EXTRA],
  KATTA:     [...BASE, ...ORTA_EXTRA, ...KATTA_EXTRA],
  TAYYORLOV: [...BASE, ...ORTA_EXTRA, ...KATTA_EXTRA, ...TAYYORLOV_EXTRA],
}

export default function Week1Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const rounds    = ROUNDS_BY_LEVEL[groupLevel] ?? ROUNDS_BY_LEVEL.KICHIK
  const maxWrong  = MAX_WRONG[groupLevel] ?? 4

  const [current,  setCurrent]  = useState(0)
  const [correct,  setCorrect]  = useState(0)
  const [wrong,    setWrong]    = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean } | null>(null)
  const [done,     setDone]     = useState(false)
  const [failed,   setFailed]   = useState(false)

  const round = rounds[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleOption(opt: string) {
    if (feedback) return
    const ok = opt === round.answer
    setFeedback({ ok })
    if (ok) setCorrect(c => c + 1)
    const newWrong = ok ? wrong : wrong + 1
    if (!ok) setWrong(newWrong)

    setTimeout(() => {
      setFeedback(null)
      if (newWrong >= maxWrong) { setFailed(true); return }
      if (current + 1 >= rounds.length) setDone(true)
      else setCurrent(c => c + 1)
    }, 900)
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

  const fourOpts = round.options.length === 4

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">Naqshni davom ettiring!</p>

      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm text-gray-400">{current + 1} / {rounds.length}</span>
        <span className="text-sm text-gray-400">✅ {correct}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div className="bg-indigo-400 h-2 rounded-full transition-all" style={{ width: `${(current / rounds.length) * 100}%` }} />
      </div>
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: maxWrong }).map((_, i) => (
          <span key={i} className="text-xl">{i < wrong ? '🩶' : '❤️'}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-3xl shadow p-5 mb-5 border-4 transition-colors ${
            !feedback      ? 'border-transparent'
            : feedback.ok  ? 'border-indigo-400 bg-indigo-50'
                           : 'border-red-400 bg-red-50'
          }`}
        >
          <div className="flex gap-2 justify-center items-center flex-wrap">
            {round.sequence.map((item, i) => (
              <div
                key={i}
                className={`w-13 h-13 rounded-xl flex items-center justify-center border-2 border-gray-200 bg-gray-50 ${
                  round.isNumber ? 'w-12 h-12 text-2xl font-bold text-gray-700' : 'w-12 h-12 text-3xl'
                }`}
              >
                {item}
              </div>
            ))}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-dashed border-indigo-400 bg-indigo-50 text-indigo-500 text-xl font-bold">
              ?
            </div>
          </div>
          {feedback?.ok  && <p className="text-center text-indigo-600 font-bold mt-3">✅ Ajoyib!</p>}
          {feedback && !feedback.ok && <p className="text-center text-red-500 font-bold mt-3">❌ Xato! Javob: {round.answer}</p>}
        </motion.div>
      </AnimatePresence>

      <div className={`grid gap-3 ${fourOpts ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {round.options.map(opt => (
          <button
            key={opt}
            onClick={() => handleOption(opt)}
            className="bg-white border-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 rounded-2xl py-4 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            <span className={round.isNumber ? 'text-2xl font-bold text-gray-700' : 'text-3xl'}>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
