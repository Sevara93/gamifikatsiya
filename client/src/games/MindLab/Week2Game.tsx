import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CompareRound {
  id: number
  left: string   // display label (number string or expression)
  right: string
  leftVal: number
  rightVal: number
  answer: 'left' | 'right'
  dots?: boolean  // show visual dots instead of text
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

// Kichik: visual dots, values 1–5
const KICHIK_ROUNDS: CompareRound[] = [
  { id: 1, left: '3', right: '5', leftVal: 3, rightVal: 5, answer: 'right', dots: true },
  { id: 2, left: '4', right: '2', leftVal: 4, rightVal: 2, answer: 'left',  dots: true },
  { id: 3, left: '1', right: '4', leftVal: 1, rightVal: 4, answer: 'right', dots: true },
  { id: 4, left: '5', right: '3', leftVal: 5, rightVal: 3, answer: 'left',  dots: true },
  { id: 5, left: '2', right: '4', leftVal: 2, rightVal: 4, answer: 'right', dots: true },
  { id: 6, left: '5', right: '2', leftVal: 5, rightVal: 2, answer: 'left',  dots: true },
  { id: 7, left: '1', right: '5', leftVal: 1, rightVal: 5, answer: 'right', dots: true },
  { id: 8, left: '3', right: '1', leftVal: 3, rightVal: 1, answer: 'left',  dots: true },
]

// O'rta adds dots up to 10
const ORTA_EXTRA: CompareRound[] = [
  { id: 9,  left: '7', right: '9', leftVal: 7,  rightVal: 9,  answer: 'right', dots: true },
  { id: 10, left: '8', right: '6', leftVal: 8,  rightVal: 6,  answer: 'left',  dots: true },
]

// Katta: written numbers 11–20
const KATTA_EXTRA: CompareRound[] = [
  { id: 11, left: '11', right: '9',  leftVal: 11, rightVal: 9,  answer: 'left'  },
  { id: 12, left: '15', right: '18', leftVal: 15, rightVal: 18, answer: 'right' },
]

// Tayyorlov: simple addition expressions
const TAYYORLOV_EXTRA: CompareRound[] = [
  { id: 13, left: '3+4', right: '6',   leftVal: 7,  rightVal: 6,  answer: 'left'  },
  { id: 14, left: '9',   right: '5+3', leftVal: 9,  rightVal: 8,  answer: 'left'  },
]

const ROUNDS_BY_LEVEL: Record<string, CompareRound[]> = {
  KICHIK:    KICHIK_ROUNDS,
  ORTA:      [...KICHIK_ROUNDS, ...ORTA_EXTRA],
  KATTA:     [...KICHIK_ROUNDS, ...ORTA_EXTRA, ...KATTA_EXTRA],
  TAYYORLOV: [...KICHIK_ROUNDS, ...ORTA_EXTRA, ...KATTA_EXTRA, ...TAYYORLOV_EXTRA],
}

function DotPanel({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-1 justify-center items-center min-h-16 px-2">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-2xl leading-none">⭐</span>
      ))}
    </div>
  )
}

export default function Week2Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const rounds   = ROUNDS_BY_LEVEL[groupLevel] ?? ROUNDS_BY_LEVEL.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current,  setCurrent]  = useState(0)
  const [correct,  setCorrect]  = useState(0)
  const [wrong,    setWrong]    = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; chosen: 'left' | 'right' } | null>(null)
  const [done,     setDone]     = useState(false)
  const [failed,   setFailed]   = useState(false)

  const round = rounds[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleChoice(side: 'left' | 'right') {
    if (feedback) return
    const ok = round.answer === side
    setFeedback({ ok, chosen: side })
    if (ok) setCorrect(c => c + 1)
    const newWrong = ok ? wrong : wrong + 1
    if (!ok) setWrong(newWrong)

    setTimeout(() => {
      setFeedback(null)
      if (newWrong >= maxWrong) { setFailed(true); return }
      if (current + 1 >= rounds.length) setDone(true)
      else setCurrent(c => c + 1)
    }, 1000)
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

  function panelClass(side: 'left' | 'right') {
    if (!feedback) return 'border-indigo-200 bg-white hover:border-indigo-500 hover:bg-indigo-50'
    if (side === round.answer) return 'border-green-400 bg-green-50'
    if (feedback.chosen === side) return 'border-red-400 bg-red-50'
    return 'border-gray-200 bg-gray-50 opacity-50'
  }

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">
        {round.dots ? 'Qaysi ko\'proq?' : 'Qaysi son katta?'}
      </p>

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-4"
        >
          {(['left', 'right'] as const).map(side => (
            <button
              key={side}
              onClick={() => handleChoice(side)}
              className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center min-h-28 transition-transform hover:scale-105 active:scale-95 shadow-sm ${panelClass(side)}`}
            >
              {round.dots ? (
                <DotPanel count={side === 'left' ? round.leftVal : round.rightVal} />
              ) : (
                <span className="text-4xl font-extrabold text-indigo-600">
                  {side === 'left' ? round.left : round.right}
                </span>
              )}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {feedback && (
        <p className={`text-center font-bold text-lg ${feedback.ok ? 'text-green-600' : 'text-red-500'}`}>
          {feedback.ok ? '✅ To\'g\'ri!' : '❌ Xato!'}
        </p>
      )}
    </div>
  )
}
