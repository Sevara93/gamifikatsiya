import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { LAB_META, type Lab } from '../lib/constants'

export default function LabPage() {
  const { lab } = useParams<{ lab: string }>()
  const navigate = useNavigate()
  const { unlockedWeeks, progress } = useAppStore()

  const meta = LAB_META[lab as Lab]
  const unlocked: number[] = unlockedWeeks[lab as string] ?? []

  function weekStatus(week: number): 'completed' | 'unlocked' | 'locked' {
    const row = progress.find((p) => p.lab === lab && p.week === week)
    if (row?.isCompleted) return 'completed'
    if (unlocked.includes(week)) return 'unlocked'
    return 'locked'
  }

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto bg-sky-50">
      <button onClick={() => navigate('/home')} className="text-sky-500 hover:underline mb-6 block">
        ← Bosh sahifaga qaytish
      </button>

      <div className="text-center mb-8">
        <div className="text-6xl mb-2">{meta?.emoji}</div>
        <h1 className="text-3xl font-bold" style={{ color: meta?.color }}>{meta?.label}</h1>
        <p className="text-gray-500">{meta?.description}</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((week) => {
          const status = weekStatus(week)
          return (
            <motion.div
              key={week}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: week * 0.1 }}
              onClick={() => status !== 'locked' && navigate(`/lab/${lab}/week/${week}`)}
              className={`rounded-2xl p-5 flex items-center gap-4 shadow transition ${
                status === 'locked'
                  ? 'bg-gray-100 cursor-not-allowed opacity-60'
                  : 'bg-white hover:shadow-md cursor-pointer hover:-translate-y-0.5'
              }`}
            >
              <div className="text-3xl">
                {status === 'completed' ? '✅' : status === 'unlocked' ? '▶️' : '🔒'}
              </div>
              <div>
                <div className="font-bold text-gray-800">{week}-hafta</div>
                <div className="text-sm text-gray-500">
                  {status === 'completed'
                    ? `Ball: ${progress.find((p) => p.lab === lab && p.week === week)?.score ?? 0}`
                    : status === 'unlocked'
                    ? 'O\'ynashga tayyor!'
                    : 'Avval oldingi haftani bajaring'}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
