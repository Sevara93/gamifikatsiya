import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { progressApi } from '../api/client'
import { LAB_ORDER, LAB_META, type Lab } from '../lib/constants'

const MAX_SCORE = 2000
const RAINBOW = ['#ff4444','#ff8800','#ffdd00','#44cc44','#2288ff','#aa33ff','#ff33bb','#00ddcc']

// ── Blinking stars (1200–1700) ────────────────────────────────
function StarField() {
  const stars = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 14 + 5,
    delay: Math.random() * 4,
    dur: Math.random() * 1.8 + 1.2,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            fontSize: s.size, color: '#fde68a', lineHeight: 1,
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.6, 1.4, 0.6] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

// ── Single firework burst ─────────────────────────────────────
function FireworkBurst({ x, y, delay, colorOffset }: {
  x: number; y: number; delay: number; colorOffset: number
}) {
  const count  = 12
  const angles = Array.from({ length: count }, (_, i) => (i / count) * 2 * Math.PI)

  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 0, height: 0 }}>
      {/* Particles */}
      {angles.map((angle, i) => {
        const color = RAINBOW[(i + colorOffset) % RAINBOW.length]
        const dist  = 70 + Math.random() * 40
        const dx    = Math.cos(angle) * dist
        const dy    = Math.sin(angle) * dist
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 9, height: 9, borderRadius: '50%',
              backgroundColor: color, left: -4.5, top: -4.5,
            }}
            animate={{
              x: [0, dx * 0.4, dx],
              y: [0, dy * 0.4, dy],
              opacity: [0, 1, 1, 0],
              scale:   [0, 1.6, 1.2, 0],
            }}
            transition={{
              duration: 1.5,
              delay: delay + i * 0.02,
              repeat: Infinity,
              repeatDelay: 2.5 + Math.random() * 1.5,
              ease: 'easeOut',
            }}
          />
        )
      })}
      {/* Flash */}
      <motion.div
        style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', backgroundColor: 'white', left: -9, top: -9 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.8, 0] }}
        transition={{ duration: 0.35, delay, repeat: Infinity, repeatDelay: 4, ease: 'easeOut' }}
      />
    </div>
  )
}

// ── Full fireworks show (1700–2000) ───────────────────────────
function FireworkShow() {
  const bursts = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 6 + (i % 4) * 28 + Math.random() * 12,
    y: 6 + Math.floor(i / 4) * 32 + Math.random() * 12,
    delay: i * 0.6,
    colorOffset: i * 3,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bursts.map(b => (
        <FireworkBurst key={b.id} x={b.x} y={b.y} delay={b.delay} colorOffset={b.colorOffset} />
      ))}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function CongratulationsPage() {
  const navigate    = useNavigate()
  const { progress, child, setProgress } = useAppStore()

  useEffect(() => {
    progressApi.getAll().then(({ data }) => setProgress(data.progress, data.unlockedWeeks))
  }, [setProgress])

  const labScores = useMemo(() => LAB_ORDER.map(lab => ({
    lab,
    score: progress.filter(p => p.lab === lab).reduce((s, p) => s + (p.score ?? 0), 0),
    meta: LAB_META[lab as Lab],
  })), [progress])

  const totalScore = labScores.reduce((sum, { score }) => sum + score, 0)
  const pct        = Math.min(100, Math.round((totalScore / MAX_SCORE) * 100))

  const hasStars     = totalScore >= 1200 && totalScore < 1700
  const hasFireworks = totalScore >= 1700

  const bgClass = hasFireworks
    ? 'bg-[#0a0520]'
    : hasStars
    ? 'bg-[#0c1445]'
    : 'bg-sky-50'

  const rating = hasFireworks
    ? { stars: '🌈✨🌈', label: 'Ajoyib mukammal natija!', color: '#e879f9' }
    : hasStars
    ? { stars: '⭐⭐⭐',  label: 'Ajoyib natija!',          color: '#fbbf24' }
    : totalScore >= 800
    ? { stars: '⭐⭐',    label: 'Yaxshi harakat!',          color: '#38bdf8' }
    : { stars: '⭐',      label: 'Kuchli harakat!',          color: '#6b7280' }

  const barStyle = hasFireworks
    ? 'linear-gradient(to right,#ff4444,#ff8800,#ffdd00,#44cc44,#2288ff,#aa33ff,#ff33bb)'
    : hasStars
    ? '#fbbf24'
    : '#38bdf8'


  return (
    <div className={`relative min-h-screen flex items-center justify-center p-6 overflow-hidden ${bgClass}`}>
      {hasStars     && <StarField />}
      {hasFireworks && <FireworkShow />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        className="relative z-10 bg-white/96 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
      >
        {/* Trophy */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-7xl mb-3 leading-none"
        >
          🏆
        </motion.div>

        <h1 className="text-2xl font-extrabold text-gray-800 mb-0.5">Tabriklaymiz!</h1>
        <p className="text-gray-500 text-sm font-medium mb-0.5">{child?.fullName}</p>
        <p className="text-gray-400 text-xs mb-5">Barcha 5 ta laboratoriyani bajardingiz 🎉</p>

        {/* Score block */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <div className="flex items-end justify-center gap-1 mb-2">
            <motion.span
              className="text-5xl font-extrabold text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {totalScore}
            </motion.span>
            <span className="text-lg text-gray-400 mb-1">/ {MAX_SCORE}</span>
          </div>

          {/* Score bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full"
              style={{ background: barStyle }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
            />
          </div>

          <p className="text-sm font-bold mt-2" style={{ color: rating.color }}>
            {rating.stars} {rating.label}
          </p>
        </div>

        {/* Per-lab breakdown */}
        <div className="space-y-2 mb-6">
          {labScores.map(({ lab, score, meta }) => (
            <div key={lab} className="flex items-center gap-2">
              <span className="text-lg leading-none">{meta.emoji}</span>
              <span className="text-xs text-gray-500 flex-1 text-left">{meta.label}</span>
              <span className="text-xs font-bold w-8 text-right" style={{ color: meta.color }}>{score}</span>
              <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (score / 400) * 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/home')}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl transition"
        >
          Bosh sahifaga qaytish 🏠
        </button>
      </motion.div>
    </div>
  )
}
