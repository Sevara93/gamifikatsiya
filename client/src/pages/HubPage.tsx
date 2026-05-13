import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { progressApi } from '../api/client'
import { LAB_ORDER, LAB_META, LEVEL_META, GROUP_EMOJI, type Lab, type GroupLevel } from '../lib/constants'

export default function HubPage() {
  const navigate = useNavigate()
  const { child, unlockedWeeks, setProgress, logout } = useAppStore()

  useEffect(() => {
    progressApi.getAll().then(({ data }) => setProgress(data.progress, data.unlockedWeeks))
  }, [setProgress])

  function isLabUnlocked(lab: Lab) {
    return (unlockedWeeks[lab]?.length ?? 0) > 0
  }

  const levelMeta = child?.group?.level ? LEVEL_META[child.group.level as GroupLevel] : null
  const groupEmoji = child?.group?.name ? (GROUP_EMOJI[child.group.name] ?? '🏫') : ''

  return (
    <div className="min-h-screen p-6 bg-sky-50">
      <header className="flex justify-between items-center mb-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Xush kelibsiz, {child?.fullName}! 👋</h1>
          <p className="text-gray-500 text-sm">
            {levelMeta?.label} — {groupEmoji} {child?.group?.name}
          </p>
        </div>
        <button onClick={logout} className="text-sm text-gray-400 hover:text-red-400 transition">
          Chiqish
        </button>
      </header>

      <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">Laboratoriyani tanlang</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {LAB_ORDER.map((lab, i) => {
          const meta = LAB_META[lab]
          const unlocked = isLabUnlocked(lab)
          return (
            <motion.div
              key={lab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => unlocked && navigate(`/lab/${lab}`)}
              className={`rounded-3xl p-6 shadow select-none transition ${
                unlocked
                  ? 'bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                  : 'bg-gray-100 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="text-5xl mb-3">{meta.emoji}</div>
              <div className="text-lg font-bold" style={{ color: meta.color }}>{meta.label}</div>
              <div className="text-sm text-gray-500 mt-1">{meta.description}</div>
              {!unlocked && <div className="mt-3 text-xs text-gray-400">🔒 Yopiq</div>}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
