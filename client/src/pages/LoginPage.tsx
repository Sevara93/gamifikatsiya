import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { authApi, groupsApi, progressApi } from '../api/client'
import type { GroupSummary, ChildSummary } from '../api/client'
import { useAppStore } from '../store/useAppStore'
import { LEVEL_ORDER, LEVEL_META, GROUP_EMOJI, type GroupLevel } from '../lib/constants'

type Step = 'level' | 'group' | 'child'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setAuth, setProgress } = useAppStore()

  const [step, setStep] = useState<Step>('level')
  const [selectedLevel, setSelectedLevel] = useState<GroupLevel | null>(null)
  const [groups, setGroups] = useState<GroupSummary[]>([])
  const [selectedGroup, setSelectedGroup] = useState<GroupSummary | null>(null)
  const [children, setChildren] = useState<ChildSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (selectedLevel) {
      groupsApi.getByLevel(selectedLevel).then(({ data }) => setGroups(data))
    }
  }, [selectedLevel])

  useEffect(() => {
    if (selectedGroup) {
      groupsApi.getChildren(selectedGroup.id).then(({ data }) => setChildren(data))
    }
  }, [selectedGroup])

  async function handleChildSelect(child: ChildSummary) {
    setLoading(true)
    setError('')
    try {
      const { data } = await authApi.login(child.id)
      setAuth(data.child, data.token)
      const { data: prog } = await progressApi.getAll()
      setProgress(prog.progress, prog.unlockedWeeks)
      navigate('/home')
    } catch {
      setError('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-sky-50">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎓</div>
          <h1 className="text-4xl font-extrabold text-sky-700">Gamifikatsiya</h1>
          <p className="text-gray-500 mt-1">O'rganamiz, rivojlanamiz!</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'level' && (
            <motion.div key="level" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <h2 className="text-center text-xl font-bold text-gray-700 mb-5">Guruh darajangizni tanlang</h2>
              <div className="grid grid-cols-2 gap-4">
                {LEVEL_ORDER.map((lvl) => {
                  const m = LEVEL_META[lvl]
                  return (
                    <button
                      key={lvl}
                      onClick={() => { setSelectedLevel(lvl); setStep('group') }}
                      className="bg-white rounded-3xl p-6 shadow hover:shadow-lg hover:-translate-y-1 transition text-left"
                    >
                      <div className="font-bold text-lg" style={{ color: m.color }}>{m.label}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 'group' && selectedLevel && (
            <motion.div key="group" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setStep('level')} className="text-sky-500 hover:underline text-sm">← Orqaga</button>
                <h2 className="text-xl font-bold text-gray-700">Guruhingizni tanlang</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setSelectedGroup(g); setStep('child') }}
                    className="bg-white rounded-3xl p-6 shadow hover:shadow-lg hover:-translate-y-1 transition text-center"
                  >
                    <div className="text-4xl mb-2">{GROUP_EMOJI[g.name] ?? '🏫'}</div>
                    <div className="font-bold text-sky-700 text-lg">{g.name}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'child' && selectedGroup && (
            <motion.div key="child" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setStep('group')} className="text-sky-500 hover:underline text-sm">← Orqaga</button>
                <h2 className="text-xl font-bold text-gray-700">
                  <span className="text-sky-600">{selectedGroup.name}</span> — o'zingizni tanlang
                </h2>
              </div>
              {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[55vh] overflow-y-auto pr-1">
                {children.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => !loading && handleChildSelect(c)}
                    disabled={loading}
                    className="bg-white rounded-2xl p-4 shadow hover:shadow-md hover:bg-sky-50 hover:-translate-y-0.5 transition text-sm font-semibold text-gray-800 disabled:opacity-50 text-left leading-tight"
                  >
                    {c.fullName}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
