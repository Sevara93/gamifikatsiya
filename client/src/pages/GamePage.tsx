import { useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { progressApi } from '../api/client'
import { LAB_META, type Lab } from '../lib/constants'
import { getGame } from '../games'

function PlaceholderGame({
  lab,
  week,
  onComplete,
}: {
  lab: string
  week: number
  onComplete: (score: number) => void
}) {
  return (
    <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
      <div className="text-5xl mb-4">{LAB_META[lab as Lab]?.emoji}</div>
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        {LAB_META[lab as Lab]?.label} — {week}-hafta
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Bu hafta uchun o'yin tez orada qo'shiladi! Tugatishni bosing.
      </p>
      <button
        onClick={() => onComplete(Math.floor(Math.random() * 30) + 70)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-2xl transition"
      >
        Haftani tugatish ✔
      </button>
    </div>
  )
}

export default function GamePage() {
  const { lab, week } = useParams<{ lab: string; week: string }>()
  const navigate = useNavigate()
  const { child, setProgress } = useAppStore()
  const groupLevel = child?.group?.level ?? 'KICHIK'
  const weekNum = Number(week)

  async function handleComplete(score: number) {
    const { data } = await progressApi.complete(lab!, weekNum, score)
    setProgress(data.progress, data.unlockedWeeks)

    if (weekNum < 4) {
      navigate(`/lab/${lab}/week/${weekNum + 1}`)
    } else {
      navigate(`/lab/${lab}/results`)
    }
  }

  const GameComponent = getGame(lab!, weekNum)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-sky-50">
      <button
        onClick={() => navigate(`/lab/${lab}`)}
        className="text-sky-500 hover:underline mb-6 self-start"
      >
        ← {LAB_META[lab as Lab]?.label}ga qaytish
      </button>
      {GameComponent
        ? <GameComponent groupLevel={groupLevel} onComplete={handleComplete} />
        : <PlaceholderGame lab={lab!} week={weekNum} onComplete={handleComplete} />
      }
    </div>
  )
}
