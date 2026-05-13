import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CarWheels, CarBody, CarGlass, CarFull,
  TrainEngine, TrainCabin, TrainWheels, TrainSteam, TrainFull,
  AirplaneNose, AirplaneBody, AirplaneWings, AirplaneTail, AirplaneFull,
  RocketNose, RocketBody, RocketFins, RocketEngine, RocketFull,
} from './VehicleParts'

interface Part { id: string; Svg: React.FC<{ size?: number }>; label: string; slot: number }
interface Build { name: string; FullSvg: React.FC<{ size?: number }>; parts: Part[] }

const BUILDS: Record<string, Build> = {
  KICHIK: { name: 'Mashina', FullSvg: CarFull, parts: [
    { id:'w', Svg: CarWheels,  label:"G'ildiraklar", slot:0 },
    { id:'b', Svg: CarBody,    label:'Tana',         slot:1 },
    { id:'g', Svg: CarGlass,   label:'Oynalar',      slot:2 },
  ]},
  ORTA: { name: 'Poyezd', FullSvg: TrainFull, parts: [
    { id:'e', Svg: TrainEngine, label:'Dvigatel',  slot:0 },
    { id:'b', Svg: TrainCabin,  label:'Kabi',      slot:1 },
    { id:'w', Svg: TrainWheels, label:"G'ildiraklar", slot:2 },
    { id:'s', Svg: TrainSteam,  label:"Bug'",      slot:3 },
  ]},
  KATTA: { name: 'Samolyot', FullSvg: AirplaneFull, parts: [
    { id:'n', Svg: AirplaneNose,  label:'Burun',  slot:0 },
    { id:'b', Svg: AirplaneBody,  label:'Tana',   slot:1 },
    { id:'w', Svg: AirplaneWings, label:'Qanotlar', slot:2 },
    { id:'t', Svg: AirplaneTail,  label:'Dum',    slot:3 },
  ]},
  TAYYORLOV: { name: 'Raketa', FullSvg: RocketFull, parts: [
    { id:'n', Svg: RocketNose,   label:'Burun',    slot:0 },
    { id:'b', Svg: RocketBody,   label:'Tana',     slot:1 },
    { id:'f', Svg: RocketFins,   label:'Qanotcha', slot:2 },
    { id:'e', Svg: RocketEngine, label:'Dvigatel', slot:3 },
  ]},
}

const SCORE_THRESHOLD = 65

export default function Week1Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const build = BUILDS[groupLevel] ?? BUILDS.KICHIK

  const [placed,      setPlaced]      = useState<Record<number, Part>>({})
  const [errors,      setErrors]      = useState(0)
  const [phase,       setPhase]       = useState<'playing' | 'result'>('playing')
  const [dragging,    setDragging]    = useState<string | null>(null)
  const [ghostPos,    setGhostPos]    = useState({ x: 0, y: 0 })
  const [wrong,       setWrong]       = useState<string | null>(null)
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null)

  const slotsRef = useRef<(HTMLDivElement | null)[]>([])

  const unplaced = build.parts.filter(p => !Object.values(placed).find(pl => pl.id === p.id))
  const allPlaced = unplaced.length === 0
  const score = Math.max(0, 100 - errors * 10)

  function handleRetry() {
    setPlaced({})
    setErrors(0)
    setPhase('playing')
  }

  function handlePartPointerDown(e: React.PointerEvent, partId: string) {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(partId)
    setGhostPos({ x: e.clientX, y: e.clientY })
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return
    setGhostPos({ x: e.clientX, y: e.clientY })
    let hovered: number | null = null
    slotsRef.current.forEach((el, idx) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom)
        hovered = idx
    })
    setHoveredSlot(hovered)
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!dragging) { setHoveredSlot(null); return }

    let droppedSlot: number | null = null
    slotsRef.current.forEach((el, idx) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom)
        droppedSlot = idx
    })

    const part = build.parts.find(p => p.id === dragging)
    if (part && droppedSlot !== null) {
      if (droppedSlot === part.slot && !placed[droppedSlot]) {
        setPlaced(prev => ({ ...prev, [droppedSlot]: part }))
      } else {
        setErrors(e => e + 1)
        setWrong(dragging)
        setTimeout(() => setWrong(null), 600)
      }
    }
    setDragging(null)
    setHoveredSlot(null)
  }

  const draggingPart = build.parts.find(p => p.id === dragging)
  const FullSvg = build.FullSvg

  // ── Result screen ──
  if (phase === 'result') {
    const passed = score >= SCORE_THRESHOLD
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-3">{passed ? '🎉' : '💪'}</div>
        <p className="text-lg text-gray-600 mb-1">{build.name}</p>
        <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
        <p className="text-gray-500 text-sm mb-1">
          {passed
            ? "Ajoyib! Qurilmani to'g'ri yasadingiz!"
            : "Ko'proq mashq qiling — xatolarni kamaytiring"}
        </p>
        {errors > 0 && (
          <p className="text-xs text-gray-400 mb-1">Xato urinishlar: {errors} ta (har biri −10 ball)</p>
        )}
        <div className="w-full bg-gray-100 rounded-full h-3 mt-3 mb-5">
          <div className={`h-3 rounded-full transition-all ${passed ? 'bg-blue-400' : 'bg-orange-400'}`}
            style={{ width: `${score}%` }} />
        </div>
        {passed ? (
          <button onClick={() => onComplete(score)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-2xl transition">
            Davom etish →
          </button>
        ) : (
          <div>
            <p className="text-red-500 text-sm font-medium mb-4">
              {SCORE_THRESHOLD}% dan kam — qaytadan urinib ko'ring!
            </p>
            <button onClick={handleRetry}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition">
              🔄 Qaytadan
            </button>
          </div>
        )}
      </div>
    )
  }

  // ── Playing screen ──
  return (
    <div
      className="max-w-md mx-auto select-none"
      style={{ touchAction: 'none' }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <p className="text-center text-gray-600 font-semibold mb-1">{build.name} quramiz!</p>
      <p className="text-center text-xs text-gray-400 mb-4">Har bir detalini to'g'ri joyga suring</p>

      {/* Assembly board */}
      <div className="bg-blue-50 border-2 border-blue-100 rounded-3xl p-6 mb-4 text-center">
        <AnimatePresence mode="wait">
          {allPlaced ? (
            <motion.div key="complete" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center">
              <FullSvg size={200}/>
            </motion.div>
          ) : (
            <motion.div key="slots" className="flex gap-3 flex-wrap justify-center">
              {build.parts.map((p, idx) => {
                const PlacedSvg = placed[idx]?.Svg
                return (
                  <div key={idx} ref={el => { slotsRef.current[idx] = el }} className="flex flex-col items-center gap-1">
                    <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all overflow-hidden ${
                      placed[idx]        ? 'bg-white border-blue-300 shadow-sm' :
                      hoveredSlot === idx ? 'bg-blue-200 border-blue-400 scale-110' :
                                           'bg-white/50 border-dashed border-gray-300'
                    }`}>
                      {PlacedSvg ? <PlacedSvg size={64}/> : null}
                    </div>
                    <span className="text-xs text-gray-400">{placed[idx] ? p.label : '?'}</span>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
        {allPlaced
          ? <p className="text-sm text-green-500 font-medium mt-2">Tayyor! ✓</p>
          : <p className="text-xs text-gray-400 mt-3">{Object.keys(placed).length}/{build.parts.length} detal</p>
        }
      </div>

      {/* Parts shelf */}
      <div className="bg-white rounded-2xl shadow p-4 mb-4">
        <p className="text-xs text-gray-400 mb-3">Detallar — to'g'ri joyga suring:</p>
        <div className="flex flex-wrap gap-3 justify-center min-h-[80px] items-center">
          <AnimatePresence>
            {unplaced.map(part => {
              const S = part.Svg
              return (
                <motion.div key={part.id}
                  exit={{ scale: 0, opacity: 0 }}
                  animate={wrong === part.id ? { x: [-6, 6, -6, 6, 0] } : {}}
                  style={{ opacity: dragging === part.id ? 0.3 : 1, touchAction: 'none' }}
                  onPointerDown={e => handlePartPointerDown(e, part.id)}
                  className="flex flex-col items-center gap-1 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 cursor-grab active:cursor-grabbing">
                  <span className="leading-none pointer-events-none"><S size={72}/></span>
                  <span className="text-xs text-gray-500 pointer-events-none">{part.label}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
          {allPlaced && <p className="text-sm text-green-500 font-medium">Barcha detallar ✓</p>}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1 text-sm text-gray-400">
        <span>Xato: {errors}</span>
        <span>Ball: {score}</span>
      </div>

      <button onClick={() => setPhase('result')} disabled={!allPlaced}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {allPlaced ? "Natijani ko'rish →" : `Yana ${unplaced.length} ta detal qoldi`}
      </button>

      {dragging && draggingPart && (() => {
        const S = draggingPart.Svg
        return (
          <div style={{
            position: 'fixed', left: ghostPos.x, top: ghostPos.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', zIndex: 1000,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
          }}>
            <S size={64}/>
          </div>
        )
      })()}
    </div>
  )
}
