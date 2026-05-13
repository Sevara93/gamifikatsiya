import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Scenario { id: number; label: string; emoji: string; correct: 'yaxshi' | 'yomon'; msg: string }

const LEVEL_SCENARIOS: Record<string, Scenario[]> = {
  KICHIK: [
    { id: 1, label: 'Kranini yopish',           emoji: '🚿', correct: 'yaxshi', msg: 'Suv tejash muhim!'             },
    { id: 2, label: "Axlatni ko'chaga tashlash", emoji: '🗑️', correct: 'yomon',  msg: 'Axlatni savatga tashlang'      },
    { id: 3, label: 'Daraxt ekish',              emoji: '🌱', correct: 'yaxshi', msg: 'Daraxtlar havo tozalaydi'      },
    { id: 4, label: "Daryoga axlat to'kish",     emoji: '🏞️', correct: 'yomon',  msg: 'Daryolarni ifloslantirmang'    },
    { id: 5, label: 'Velosipedda yurish',        emoji: '🚲', correct: 'yaxshi', msg: "Mashina o'rniga velosipeddan foydalan" },
    { id: 6, label: "O'rmonni yoqish",           emoji: '🔥', correct: 'yomon',  msg: "O'rmonni asrash kerak"         },
    { id: 7, label: "Qog'ozni qayta ishlatish",  emoji: '♻️', correct: 'yaxshi', msg: 'Qayta ishlash tabiatni asraydi' },
    { id: 8, label: 'Hayvonlarga ozor berish',   emoji: '🐾', correct: 'yomon',  msg: "Hayvonlarga g'amxo'r bo'ling"  },
  ],
  ORTA: [
    { id: 1,  label: 'Kranini yopish',           emoji: '🚿', correct: 'yaxshi', msg: 'Suv tejash muhim!'             },
    { id: 2,  label: "Axlatni ko'chaga tashlash", emoji: '🗑️', correct: 'yomon',  msg: 'Axlatni savatga tashlang'      },
    { id: 3,  label: 'Daraxt ekish',              emoji: '🌱', correct: 'yaxshi', msg: 'Daraxtlar havo tozalaydi'      },
    { id: 4,  label: "Daryoga axlat to'kish",     emoji: '🏞️', correct: 'yomon',  msg: 'Daryolarni ifloslantirmang'    },
    { id: 5,  label: 'Velosipedda yurish',        emoji: '🚲', correct: 'yaxshi', msg: "Mashina o'rniga velosipeddan foydalan" },
    { id: 6,  label: "O'rmonni yoqish",           emoji: '🔥', correct: 'yomon',  msg: "O'rmonni asrash kerak"         },
    { id: 7,  label: "Qog'ozni qayta ishlatish",  emoji: '♻️', correct: 'yaxshi', msg: 'Qayta ishlash tabiatni asraydi' },
    { id: 8,  label: 'Hayvonlarga ozor berish',   emoji: '🐾', correct: 'yomon',  msg: "Hayvonlarga g'amxo'r bo'ling"  },
    { id: 9,  label: "Ishlatilmagan chiroqni o'chirish", emoji: '💡', correct: 'yaxshi', msg: "Elektr energiyasini tejang" },
    { id: 10, label: 'Qo\'shni ko\'cha suvini oqizish', emoji: '💦', correct: 'yomon', msg: "Suvni behuda sarflamang"    },
  ],
  KATTA: [
    { id: 1,  label: 'Kranini yopish',            emoji: '🚿', correct: 'yaxshi', msg: 'Suv tejash muhim!'             },
    { id: 2,  label: "Axlatni ko'chaga tashlash",  emoji: '🗑️', correct: 'yomon',  msg: 'Axlatni savatga tashlang'      },
    { id: 3,  label: 'Daraxt ekish',               emoji: '🌱', correct: 'yaxshi', msg: 'Daraxtlar havo tozalaydi'      },
    { id: 4,  label: "Daryoga axlat to'kish",      emoji: '🏞️', correct: 'yomon',  msg: 'Daryolarni ifloslantirmang'    },
    { id: 5,  label: 'Velosipedda yurish',         emoji: '🚲', correct: 'yaxshi', msg: "Mashina o'rniga velosipeddan foydalan" },
    { id: 6,  label: "O'rmonni yoqish",            emoji: '🔥', correct: 'yomon',  msg: "O'rmonni asrash kerak"         },
    { id: 7,  label: "Qog'ozni qayta ishlatish",   emoji: '♻️', correct: 'yaxshi', msg: 'Qayta ishlash tabiatni asraydi' },
    { id: 8,  label: 'Hayvonlarga ozor berish',    emoji: '🐾', correct: 'yomon',  msg: "Hayvonlarga g'amxo'r bo'ling"  },
    { id: 9,  label: "Ishlatilmagan chiroqni o'chirish", emoji: '💡', correct: 'yaxshi', msg: "Elektr energiyasini tejang" },
    { id: 10, label: "Suvni oqizib qo'yish",       emoji: '💦', correct: 'yomon',  msg: "Suvni behuda sarflamang"       },
    { id: 11, label: 'Eski kiyimlarni qayta kiyish',emoji: '👕', correct: 'yaxshi', msg: "Qayta foydalanish — tejamkorlik" },
    // Slightly nuanced: burning autumn leaves produces smoke/CO2
    { id: 12, label: "Kuz barglarini yoqish",      emoji: '🍂', correct: 'yomon',  msg: "Tutun havoni ifloslantiradi"   },
  ],
  TAYYORLOV: [
    { id: 1,  label: 'Kranini yopish',            emoji: '🚿', correct: 'yaxshi', msg: 'Suv tejash muhim!'             },
    { id: 2,  label: "Axlatni ko'chaga tashlash",  emoji: '🗑️', correct: 'yomon',  msg: 'Axlatni savatga tashlang'      },
    { id: 3,  label: 'Daraxt ekish',               emoji: '🌱', correct: 'yaxshi', msg: 'Daraxtlar havo tozalaydi'      },
    { id: 4,  label: "Daryoga axlat to'kish",      emoji: '🏞️', correct: 'yomon',  msg: 'Daryolarni ifloslantirmang'    },
    { id: 5,  label: 'Velosipedda yurish',         emoji: '🚲', correct: 'yaxshi', msg: "Mashina o'rniga velosipeddan foydalan" },
    { id: 6,  label: "O'rmonni yoqish",            emoji: '🔥', correct: 'yomon',  msg: "O'rmonni asrash kerak"         },
    { id: 7,  label: "Qog'ozni qayta ishlatish",   emoji: '♻️', correct: 'yaxshi', msg: 'Qayta ishlash tabiatni asraydi' },
    { id: 8,  label: 'Hayvonlarga ozor berish',    emoji: '🐾', correct: 'yomon',  msg: "Hayvonlarga g'amxo'r bo'ling"  },
    { id: 9,  label: "Ishlatilmagan chiroqni o'chirish", emoji: '💡', correct: 'yaxshi', msg: "Elektr energiyasini tejang" },
    { id: 10, label: "Suvni oqizib qo'yish",       emoji: '💦', correct: 'yomon',  msg: "Suvni behuda sarflamang"       },
    { id: 11, label: 'Eski kiyimlarni qayta kiyish',emoji: '👕', correct: 'yaxshi', msg: "Qayta foydalanish — tejamkorlik" },
    { id: 12, label: "Kuz barglarini yoqish",      emoji: '🍂', correct: 'yomon',  msg: "Tutun havoni ifloslantiradi"   },
    // School-level nuanced: catching a butterfly disrupts nature
    { id: 13, label: 'Kapalakni tutib olish',      emoji: '🦋', correct: 'yomon',  msg: "Tabiat jonzotlarini ozod qo'ying" },
    // School-level: using both sides of paper is eco-friendly
    { id: 14, label: "Qog'ozning ikki tomonini ishlatish", emoji: '📄', correct: 'yaxshi', msg: "Qog'oz tejash — daraxtlarni asraydi" },
  ],
}

const MAX_WRONG: Record<string, number> = { KICHIK: 4, ORTA: 3, KATTA: 2, TAYYORLOV: 1 }

export default function Week4Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const scenarios = LEVEL_SCENARIOS[groupLevel] ?? LEVEL_SCENARIOS.KICHIK
  const maxWrong = MAX_WRONG[groupLevel] ?? 4

  const [current, setCurrent] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong,   setWrong]   = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null)
  const [done,   setDone]     = useState(false)
  const [failed, setFailed]   = useState(false)

  const scenario = scenarios[current]

  function restart() {
    setCurrent(0); setCorrect(0); setWrong(0)
    setFeedback(null); setFailed(false); setDone(false)
  }

  function handleChoice(choice: string) {
    if (feedback) return
    const ok = scenario.correct === choice
    setFeedback({ ok, msg: scenario.msg })
    if (ok) setCorrect(c => c + 1)
    const newWrong = ok ? wrong : wrong + 1
    if (!ok) setWrong(newWrong)

    setTimeout(() => {
      setFeedback(null)
      if (newWrong >= maxWrong) { setFailed(true); return }
      if (current + 1 >= scenarios.length) setDone(true)
      else setCurrent(c => c + 1)
    }, 1200)
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
    const score = Math.round(correct / scenarios.length * 100)
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🌍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">{correct} / {scenarios.length} to'g'ri javob</p>
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
      <p className="text-center text-gray-600 font-semibold mb-3">Yer uchun yaxshimi yoki yomonmi?</p>

      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm text-gray-400">{current + 1} / {scenarios.length}</span>
        <span className="text-sm text-gray-400">✅ {correct}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div className="bg-green-400 h-2 rounded-full transition-all" style={{ width: `${(current / scenarios.length) * 100}%` }} />
      </div>

      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: maxWrong }).map((_, i) => (
          <span key={i} className="text-xl">{i < wrong ? '🩶' : '❤️'}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-3xl shadow p-8 text-center mb-5 border-4 transition-colors ${
            !feedback      ? 'border-transparent'
            : feedback.ok  ? 'border-green-400 bg-green-50'
                           : 'border-red-400 bg-red-50'
          }`}
        >
          <div className="text-8xl mb-3">{scenario.emoji}</div>
          <p className="font-semibold text-gray-700 text-xl mb-2">{scenario.label}</p>
          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-bold text-sm mt-1 ${feedback.ok ? 'text-green-600' : 'text-red-500'}`}
            >
              {feedback.ok ? '✅' : '❌'} {feedback.msg}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleChoice('yaxshi')}
          className="bg-green-50 border-2 border-green-300 hover:border-green-500 hover:bg-green-100 rounded-2xl p-5 text-center font-bold transition-transform hover:scale-105 active:scale-95"
        >
          <div className="text-5xl mb-1">👍</div>
          <div className="text-green-700">Yaxshi</div>
        </button>
        <button
          onClick={() => handleChoice('yomon')}
          className="bg-red-50 border-2 border-red-300 hover:border-red-500 hover:bg-red-100 rounded-2xl p-5 text-center font-bold transition-transform hover:scale-105 active:scale-95"
        >
          <div className="text-5xl mb-1">👎</div>
          <div className="text-red-700">Yomon</div>
        </button>
      </div>
    </div>
  )
}
