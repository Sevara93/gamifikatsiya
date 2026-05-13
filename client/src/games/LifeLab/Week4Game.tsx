import { useState } from 'react'
import { motion } from 'framer-motion'

interface Step { id: string; emoji: string; text: string }
interface Task { id: string; title: string; emoji: string; steps: Step[] }

const ALL_TASKS: Task[] = [
  {
    id: 'teeth', title: "Tishlarni tozalash", emoji: '🦷',
    steps: [
      { id:'t1', emoji:'🪥', text: "Tish cho'tkasini ol" },
      { id:'t2', emoji:'🧴', text: 'Pasta sur' },
      { id:'t3', emoji:'🦷', text: 'Tishlarni tozala' },
      { id:'t4', emoji:'💧', text: "Og'izni chayqa" },
    ]
  },
  {
    id: 'bed', title: "Karavotni yig'", emoji: '🛏️',
    steps: [
      { id:'b1', emoji:'🛌', text: "Ko'rpani yoy" },
      { id:'b2', emoji:'🛏️', text: "Yostiqni qo'y" },
      { id:'b3', emoji:'✨', text: 'Hamma narsani tekisla' },
    ]
  },
  {
    id: 'bag', title: "Sumkani tayyorla", emoji: '🎒',
    steps: [
      { id:'bg1', emoji:'📚', text: 'Kitoblarni sol' },
      { id:'bg2', emoji:'✏️', text: 'Qalamlarni sol' },
      { id:'bg3', emoji:'🎒', text: 'Sumkani yop' },
    ]
  },
  {
    id: 'eat', title: "Ovqatlanish", emoji: '🍽️',
    steps: [
      { id:'e1', emoji:'🧼', text: "Qo'llarni yuv" },
      { id:'e2', emoji:'🪑', text: "Stol boshiga o'tir" },
      { id:'e3', emoji:'🍽️', text: 'Ovqatni ye' },
    ]
  },
]

const TASKS_BY_LEVEL: Record<string, Task[]> = {
  KICHIK:    ALL_TASKS.slice(0, 2).map(t => ({ ...t, steps: t.steps.slice(0, 2) })),
  ORTA:      ALL_TASKS.slice(0, 2),
  KATTA:     ALL_TASKS.slice(0, 3),
  TAYYORLOV: ALL_TASKS,
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Week4Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const tasks = TASKS_BY_LEVEL[groupLevel] ?? TASKS_BY_LEVEL.KICHIK

  const [shuffledSteps] = useState<Record<string, Step[]>>(() =>
    Object.fromEntries(tasks.map(t => [t.id, shuffled(t.steps)]))
  )
  const [progress, setProgress] = useState<Record<string, number>>(() =>
    Object.fromEntries(tasks.map(t => [t.id, 0]))
  )
  const [errors,      setErrors]      = useState(0)
  const [taskErrors,  setTaskErrors]  = useState<Record<string, number>>(() =>
    Object.fromEntries(tasks.map(t => [t.id, 0]))
  )
  const [wrong,  setWrong]  = useState<string | null>(null)
  const [done,   setDone]   = useState(false)

  function handleStep(taskId: string, stepId: string) {
    const task = tasks.find(t => t.id === taskId)!
    const taskProgress = progress[taskId] ?? 0
    if (taskProgress >= task.steps.length) return
    const expectedStep = task.steps[taskProgress]
    if (expectedStep.id === stepId) {
      setProgress(prev => ({ ...prev, [taskId]: taskProgress + 1 }))
    } else {
      setErrors(e => e + 1)
      setTaskErrors(prev => ({ ...prev, [taskId]: (prev[taskId] ?? 0) + 1 }))
      setWrong(stepId)
      setTimeout(() => setWrong(null), 500)
    }
  }

  function taskFeedback(taskId: string) {
    const e = taskErrors[taskId] ?? 0
    if (e === 0) return { stars: '⭐⭐⭐', msg: 'Mukammal! Bitta ham xato yo\'q!', color: 'text-teal-600' }
    if (e === 1) return { stars: '⭐⭐',   msg: 'Yaxshi! Faqat 1 ta xato.',        color: 'text-yellow-600' }
    return               { stars: '⭐',    msg: `${e} ta xato bilan bajardingiz.`,  color: 'text-orange-500' }
  }

  const totalSteps     = tasks.reduce((s, t) => s + t.steps.length, 0)
  const completedSteps = tasks.reduce((s, t) => s + Math.min(progress[t.id] ?? 0, t.steps.length), 0)
  const allComplete    = completedSteps === totalSteps
  const score          = Math.max(0, 100 - errors * 8)

  if (done) return (
    <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
      <div className="text-6xl mb-2">🏆</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Barakalla!</h2>
      <p className="text-gray-500 mb-1">Men mustaqilman!</p>
      <p className="text-gray-500 mb-1">{completedSteps} ta vazifa bajarildi</p>
      {errors > 0 && (
        <p className="text-gray-500 mb-4">Xato: <span className="font-bold text-rose-500">{errors}</span> ta (har biri −8 ball)</p>
      )}
      <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
        <div className="bg-teal-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <button onClick={() => onComplete(score)} className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-3 rounded-2xl transition">
        Davom etish →
      </button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Men mustaqilman!</p>
      <p className="text-center text-xs text-gray-400 mb-3">
        Har bir vazifani to'g'ri tartibda bajaring
      </p>

      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div className="bg-teal-400 h-2 rounded-full transition-all"
          style={{ width: `${Math.round((completedSteps / totalSteps) * 100)}%` }} />
      </div>

      <div className="space-y-3 mb-4">
        {tasks.map(task => {
          const taskProgress = progress[task.id] ?? 0
          const taskComplete = taskProgress >= task.steps.length
          const display      = shuffledSteps[task.id] ?? task.steps

          return (
            <motion.div
              key={task.id}
              animate={taskComplete ? { scale: [1, 1.02, 1] } : {}}
              className={`rounded-2xl border-2 p-4 transition-all ${
                taskComplete ? 'bg-teal-50 border-teal-300' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{task.emoji}</span>
                <span className="font-semibold text-gray-700">{task.title}</span>
                {taskComplete && <span className="ml-auto text-teal-500 text-lg">✓</span>}
              </div>
              {taskComplete && (() => {
                const fb = taskFeedback(task.id)
                return (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-white rounded-xl px-3 py-2 mb-3 border border-teal-200"
                  >
                    <span className={`text-sm font-semibold ${fb.color}`}>{fb.msg}</span>
                    <span className="text-base leading-none">{fb.stars}</span>
                  </motion.div>
                )
              })()}
              <div className="space-y-2">
                {display.map(step => {
                  const doneIdx = task.steps.findIndex(s => s.id === step.id)
                  const isDone  = taskProgress > doneIdx
                  const isWrong = wrong === step.id

                  return (
                    <motion.button
                      key={step.id}
                      animate={isWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
                      transition={{ duration: 0.3 }}
                      onClick={() => !isDone && !taskComplete && handleStep(task.id, step.id)}
                      disabled={isDone || taskComplete}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border-2 transition-all text-left ${
                        isDone    ? 'bg-teal-100 border-teal-200 text-teal-700 cursor-default' :
                        isWrong   ? 'bg-red-100 border-red-400 text-red-700' :
                                    'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm active:scale-95 cursor-pointer'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{step.emoji}</span>
                      <span className="text-sm font-medium">{step.text}</span>
                      {isDone && (
                        <span className="ml-auto flex items-center gap-1 text-teal-500 font-bold text-xs">
                          {doneIdx + 1} ✓
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center justify-between mb-3 px-1 text-sm text-gray-400">
        <span>Xato: {errors} (−{errors * 8} ball)</span>
        <span>Ball: {score}</span>
      </div>

      <button onClick={() => setDone(true)} disabled={!allComplete}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {allComplete ? 'Tayyor →' : `Yana ${totalSteps - completedSteps} ta qadam qoldi`}
      </button>
    </div>
  )
}
