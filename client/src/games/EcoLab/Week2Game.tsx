import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Round { id: number; plant: string; problem: string; need: string }
interface Tool  { id: string; label: string; emoji: string; hint: string }

const BASE_TOOLS: Tool[] = [
  { id: 'suv',    label: 'Suv',    emoji: '💧', hint: 'Suv berish kerak'      },
  { id: 'quyosh', label: 'Quyosh', emoji: '☀️', hint: 'Quyoshga olib chiqing' },
  { id: 'tuproq', label: 'Tuproq', emoji: '🪨', hint: "Tuproq almashtiring"   },
  { id: 'qaychi', label: 'Qaychi', emoji: '✂️', hint: 'Qaychi bilan kesing'   },
]
const OGIT_TOOL: Tool = { id: 'ogit', label: "O'g'it", emoji: '🧪', hint: "O'g'it bering" }

const LEVEL_CONFIG: Record<string, { rounds: Round[]; tools: Tool[] }> = {
  KICHIK: {
    tools: BASE_TOOLS,
    rounds: [
      { id: 1, plant: '🌱', problem: "Men chanqadim!",              need: 'suv'    },
      { id: 2, plant: '🌿', problem: "Qorong'u — quyosh kerak!",    need: 'quyosh' },
      { id: 3, plant: '🪴', problem: "Tuproqim qurib ketdi…",       need: 'tuproq' },
      { id: 4, plant: '🌸', problem: "Barglarim kesar kerak",       need: 'qaychi' },
      { id: 5, plant: '🌻', problem: "Men chanqadim!",              need: 'suv'    },
      { id: 6, plant: '🌵', problem: "Qorong'u — quyosh kerak!",    need: 'quyosh' },
      { id: 7, plant: '🍀', problem: "Tuproqim eski…",              need: 'tuproq' },
      { id: 8, plant: '🌺', problem: "Shoxlarim tartibsiz",         need: 'qaychi' },
    ],
  },
  ORTA: {
    tools: BASE_TOOLS,
    rounds: [
      { id: 1,  plant: '🌱', problem: "Men chanqadim!",                need: 'suv'    },
      { id: 2,  plant: '🌿', problem: "Qorong'u — quyosh kerak!",      need: 'quyosh' },
      { id: 3,  plant: '🪴', problem: "Tuproqim qurib ketdi…",         need: 'tuproq' },
      { id: 4,  plant: '🌸', problem: "Barglarim kesar kerak",         need: 'qaychi' },
      { id: 5,  plant: '🌻', problem: "Men chanqadim!",                need: 'suv'    },
      { id: 6,  plant: '🌵', problem: "Qorong'u — quyosh kerak!",      need: 'quyosh' },
      { id: 7,  plant: '🍀', problem: "Tuproqim eski…",                need: 'tuproq' },
      { id: 8,  plant: '🌺', problem: "Shoxlarim tartibsiz",           need: 'qaychi' },
      // Slightly tricky: yellowing leaves hint at soil issue, not water
      { id: 9,  plant: '🎋', problem: "Barglarim sarg'ayapti…",        need: 'tuproq' },
      // Tricky: "I'm not growing" = soil nutrients missing
      { id: 10, plant: '🌲', problem: "Men o'smayapman!",          need: 'tuproq' },
    ],
  },
  KATTA: {
    tools: [...BASE_TOOLS, OGIT_TOOL],
    rounds: [
      { id: 1,  plant: '🌱', problem: "Men chanqadim!",                need: 'suv'    },
      { id: 2,  plant: '🌿', problem: "Qorong'u — quyosh kerak!",      need: 'quyosh' },
      { id: 3,  plant: '🪴', problem: "Tuproqim qurib ketdi…",         need: 'tuproq' },
      { id: 4,  plant: '🌸', problem: "Barglarim kesar kerak",         need: 'qaychi' },
      { id: 5,  plant: '🌻', problem: "Men chanqadim!",                need: 'suv'    },
      { id: 6,  plant: '🌵', problem: "Qorong'u — quyosh kerak!",      need: 'quyosh' },
      { id: 7,  plant: '🍀', problem: "Tuproqim eski…",                need: 'tuproq' },
      { id: 8,  plant: '🌺', problem: "Shoxlarim tartibsiz",           need: 'qaychi' },
      { id: 9,  plant: '🎋', problem: "Barglarim sarg'ayapti…",        need: 'tuproq' },
      { id: 10, plant: '🌲', problem: "Men o'smayapman!",          need: 'tuproq' },
      // NEW tool: fertilizer (o'git)
      { id: 11, plant: '🌹', problem: "Oziq-ovqatim yetishmaydi!",     need: 'ogit'   },
      { id: 12, plant: '🪻', problem: "Oziqlanmayapman, yordam ber!",  need: 'ogit'   },
    ],
  },
  TAYYORLOV: {
    tools: [...BASE_TOOLS, OGIT_TOOL],
    rounds: [
      { id: 1,  plant: '🌱', problem: "Men chanqadim!",                need: 'suv'    },
      { id: 2,  plant: '🌿', problem: "Qorong'u — quyosh kerak!",      need: 'quyosh' },
      { id: 3,  plant: '🪴', problem: "Tuproqim qurib ketdi…",         need: 'tuproq' },
      { id: 4,  plant: '🌸', problem: "Barglarim kesar kerak",         need: 'qaychi' },
      { id: 5,  plant: '🌻', problem: "Men chanqadim!",                need: 'suv'    },
      { id: 6,  plant: '🌵', problem: "Qorong'u — quyosh kerak!",      need: 'quyosh' },
      { id: 7,  plant: '🍀', problem: "Tuproqim eski…",                need: 'tuproq' },
      { id: 8,  plant: '🌺', problem: "Shoxlarim tartibsiz",           need: 'qaychi' },
      { id: 9,  plant: '🎋', problem: "Barglarim sarg'ayapti…",        need: 'tuproq' },
      { id: 10, plant: '🌲', problem: "Men o'smayapman!",          need: 'tuproq' },
      { id: 11, plant: '🌹', problem: "Oziq-ovqatim yetishmaydi!",     need: 'ogit'   },
      { id: 12, plant: '🪻', problem: "Oziqlanmayapman, yordam ber!",  need: 'ogit'   },
      // School-level tricky: roots cramped → needs new soil, NOT fertilizer
      { id: 13, plant: '🌴', problem: "Ildizlarim siqilib qoldi",      need: 'tuproq' },
      // Tricky: dry/crispy tips → not enough water, looks like needs trimming
      { id: 14, plant: '🎍', problem: "Uchlarim qorayib qoldi…",       need: 'suv'    },
    ],
  },
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

export default function Week2Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const { rounds, tools } = LEVEL_CONFIG[groupLevel] ?? LEVEL_CONFIG.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current, setCurrent] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong,   setWrong]   = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; hint: string } | null>(null)
  const [done,   setDone]     = useState(false)
  const [failed, setFailed]   = useState(false)

  const round = rounds[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleTool(toolId: string) {
    if (feedback) return
    const ok = round.need === toolId
    const correctTool = tools.find(t => t.id === round.need)!
    setFeedback({ ok, hint: correctTool.hint })
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
    const score = Math.round(correct / rounds.length * 100)
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🌱</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">{correct} / {rounds.length} to'g'ri javob</p>
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

  const fiveTools = tools.length === 5

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-3">O'simlikka nima kerak?</p>

      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm text-gray-400">{current + 1} / {rounds.length}</span>
        <span className="text-sm text-gray-400">✅ {correct}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div className="bg-green-400 h-2 rounded-full transition-all" style={{ width: `${(current / rounds.length) * 100}%` }} />
      </div>

      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: maxWrong }).map((_, i) => (
          <span key={i} className="text-xl">{i < wrong ? '🩶' : '❤️'}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-3xl shadow p-8 text-center mb-5 border-4 transition-colors ${
            !feedback      ? 'border-transparent'
            : feedback.ok  ? 'border-green-400 bg-green-50'
                           : 'border-red-400 bg-red-50'
          }`}
        >
          <div className="text-8xl mb-3">{round.plant}</div>
          <p className="text-gray-600 text-lg font-medium italic">"{round.problem}"</p>
          {feedback?.ok && <p className="text-green-600 font-bold mt-3">✅ Ajoyib!</p>}
          {feedback && !feedback.ok && <p className="text-red-500 font-bold mt-3">❌ {feedback.hint}</p>}
        </motion.div>
      </AnimatePresence>

      <div className={`grid gap-3 ${fiveTools ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => handleTool(tool.id)}
            className="bg-white border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 rounded-2xl flex flex-col items-center justify-center py-3 gap-1 transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            <span className={fiveTools ? 'text-2xl' : 'text-3xl'}>{tool.emoji}</span>
            <span className="text-[11px] font-bold text-gray-600">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
