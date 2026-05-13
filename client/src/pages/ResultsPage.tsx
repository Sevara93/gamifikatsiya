import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { LAB_META, LAB_ORDER, type Lab } from '../lib/constants'

export default function ResultsPage() {
  const { lab } = useParams<{ lab: string }>()
  const navigate = useNavigate()
  const { progress } = useAppStore()

  const labProgress = progress.filter((p) => p.lab === lab)
  const totalScore = labProgress.reduce((sum, p) => sum + p.score, 0)
  const meta = LAB_META[lab as Lab]

  const nextLabIndex = LAB_ORDER.indexOf(lab as Lab) + 1
  const nextLab = LAB_ORDER[nextLabIndex]

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-sky-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center"
      >
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {meta?.label} tugadi!
        </h1>
        <p className="text-gray-500 mb-6">Siz barcha 4 haftani bajardingiz</p>

        <div className="text-5xl font-extrabold mb-2" style={{ color: meta?.color }}>
          {totalScore}
        </div>
        <p className="text-gray-400 text-sm mb-8">Umumiy ball</p>

        {nextLab ? (
          <button
            onClick={() => navigate(`/lab/${nextLab}`)}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl transition"
          >
            {LAB_META[nextLab].label}ni boshlash {LAB_META[nextLab].emoji}
          </button>
        ) : (
          <button
            onClick={() => navigate('/congratulations')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition"
          >
            🎉 Barcha laboratoriyalar tugadi!
          </button>
        )}

        <button
          onClick={() => navigate('/home')}
          className="mt-3 text-gray-400 hover:text-gray-600 text-sm transition block w-full"
        >
          Bosh sahifaga qaytish
        </button>
      </motion.div>
    </div>
  )
}
