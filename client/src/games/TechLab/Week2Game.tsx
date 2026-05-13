import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FurnitureItem { id: string; emoji: string; label: string; room: string }
interface Room { id: string; label: string; emoji: string; bg: string; border: string }

const ROOMS: Room[] = [
  { id: 'bedroom', label: 'Yotoq xonasi',  emoji: '🛏️', bg: 'bg-pink-100',   border: 'border-pink-300'   },
  { id: 'kids',    label: 'Bolalar xonasi', emoji: '🧸', bg: 'bg-blue-100',   border: 'border-blue-300'   },
  { id: 'living',  label: 'Mehmonxona',    emoji: '🛋️', bg: 'bg-green-100',  border: 'border-green-300'  },
  { id: 'kitchen', label: 'Oshxona',       emoji: '🍳', bg: 'bg-yellow-100', border: 'border-yellow-300' },
]

const ROOM_GRID = [['bedroom', 'kids'], ['living', 'kitchen']]

const ALL_FURNITURE: FurnitureItem[] = [
  // Bedroom (4)
  { id:'f1',  emoji:'🛏️', label:'Karavot',    room:'bedroom' },
  { id:'f2',  emoji:'🪞',  label:"Ko'zgu",    room:'bedroom' },
  { id:'f3',  emoji:'🖼️',  label:'Rasm',       room:'bedroom' },
  { id:'f4',  emoji:'💡',  label:'Chiroq',     room:'bedroom' },
  // Living room (4)
  { id:'f5',  emoji:'🛋️', label:'Divan',       room:'living'  },
  { id:'f6',  emoji:'📺', label:'Televizor',   room:'living'  },
  { id:'f7',  emoji:'🪑',  label:'Stul',       room:'living'  },
  { id:'f8',  emoji:'🪴',  label:"O'simlik",  room:'living'  },
  // Kitchen (3)
  { id:'f9',  emoji:'🍳', label:'Plita',       room:'kitchen' },
  { id:'f10', emoji:'🧊', label:'Muzlatgich',  room:'kitchen' },
  { id:'f11', emoji:'🍽️', label:'Idish',       room:'kitchen' },
  // Kids room (4)
  { id:'f12', emoji:'🧸', label:"O'yinchoq",  room:'kids'    },
  { id:'f13', emoji:'📚', label:'Kitob javon', room:'kids'    },
  { id:'f14', emoji:'🧩', label:'Puzzl',       room:'kids'    },
  { id:'f15', emoji:'✏️', label:'Qalam',       room:'kids'    },
]

const BY_ROOM = {
  bedroom: ['f1','f2','f3','f4'],
  living:  ['f5','f6','f7','f8'],
  kitchen: ['f9','f10','f11'],
  kids:    ['f12','f13','f14','f15'],
}

function pick(counts: Record<string, number>): FurnitureItem[] {
  return Object.entries(counts).flatMap(([room, n]) =>
    BY_ROOM[room as keyof typeof BY_ROOM]
      .slice(0, n)
      .map(id => ALL_FURNITURE.find(f => f.id === id)!)
  )
}

const FURNITURE_BY_LEVEL: Record<string, FurnitureItem[]> = {
  KICHIK:    pick({ bedroom:3, living:3, kitchen:2, kids:2 }),  // 10 items
  ORTA:      pick({ bedroom:3, living:3, kitchen:3, kids:3 }),  // 12 items
  KATTA:     pick({ bedroom:4, living:4, kitchen:3, kids:3 }),  // 14 items
  TAYYORLOV: ALL_FURNITURE,                                      // 15 items
}

const SCORE_THRESHOLD = 65

export default function Week2Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const furniture = FURNITURE_BY_LEVEL[groupLevel] ?? FURNITURE_BY_LEVEL.KICHIK

  const [remaining,   setRemaining]   = useState<FurnitureItem[]>(furniture)
  const [placed,      setPlaced]      = useState<Record<string, string>>({})
  const [errors,      setErrors]      = useState(0)
  const [phase,       setPhase]       = useState<'playing' | 'result'>('playing')
  const [dragging,    setDragging]    = useState<string | null>(null)
  const [ghostPos,    setGhostPos]    = useState({ x: 0, y: 0 })
  const [wrong,       setWrong]       = useState<string | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const houseRef = useRef<HTMLDivElement>(null)

  const score = Math.max(0, 100 - errors * 5)
  const allPlaced = remaining.length === 0

  function handleRetry() {
    setRemaining(furniture)
    setPlaced({})
    setErrors(0)
    setPhase('playing')
  }

  function handleItemPointerDown(e: React.PointerEvent, itemId: string) {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(itemId)
    setGhostPos({ x: e.clientX, y: e.clientY })
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return
    setGhostPos({ x: e.clientX, y: e.clientY })
    const rect = houseRef.current?.getBoundingClientRect()
    if (rect) {
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      if (px >= 0 && px <= rect.width && py >= 0 && py <= rect.height) {
        setHoveredRoom(ROOM_GRID[py < rect.height / 2 ? 0 : 1][px < rect.width / 2 ? 0 : 1])
      } else {
        setHoveredRoom(null)
      }
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!dragging) { setHoveredRoom(null); return }
    const rect = houseRef.current?.getBoundingClientRect()
    if (rect) {
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      if (px >= 0 && px <= rect.width && py >= 0 && py <= rect.height) {
        const roomId = ROOM_GRID[py < rect.height / 2 ? 0 : 1][px < rect.width / 2 ? 0 : 1]
        const item = remaining.find(f => f.id === dragging)
        if (item?.room === roomId) {
          setPlaced(prev => ({ ...prev, [dragging]: roomId }))
          setRemaining(prev => prev.filter(f => f.id !== dragging))
        } else {
          setErrors(e => e + 1)
          setWrong(dragging)
          setTimeout(() => setWrong(null), 600)
        }
      }
    }
    setDragging(null)
    setHoveredRoom(null)
  }

  const draggingItem = remaining.find(f => f.id === dragging)
  const placedInRoom = (roomId: string) =>
    Object.entries(placed)
      .filter(([, r]) => r === roomId)
      .map(([id]) => furniture.find(f => f.id === id)!)
      .filter(Boolean)

  // ── Result screen ──
  if (phase === 'result') {
    const passed = score >= SCORE_THRESHOLD
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-3">{passed ? '🎉' : '💪'}</div>
        <p className="text-lg text-gray-600 mb-1">Uy qurildi! 🏡</p>
        <div className="text-4xl font-bold text-amber-600 mb-2">{score}%</div>
        <p className="text-gray-500 text-sm mb-1">
          {passed
            ? "Ajoyib! Jihozlar to'g'ri joylashtirildi!"
            : "Ko'proq mashq qiling — xatolarni kamaytiring"}
        </p>
        {errors > 0 && (
          <p className="text-xs text-gray-400 mb-1">Xato urinishlar: {errors} ta (har biri −5 ball)</p>
        )}
        <div className="w-full bg-gray-100 rounded-full h-3 mt-3 mb-5">
          <div className={`h-3 rounded-full transition-all ${passed ? 'bg-amber-400' : 'bg-orange-400'}`}
            style={{ width: `${score}%` }} />
        </div>
        {passed ? (
          <button onClick={() => onComplete(score)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-2xl transition">
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
      <p className="text-center text-gray-600 font-semibold mb-1">Uy quramiz!</p>
      <p className="text-center text-xs text-gray-400 mb-3">Jihozlarni to'g'ri xonaga suring</p>

      {/* House grid */}
      <div
        ref={houseRef}
        className="grid grid-cols-2 gap-2 bg-amber-50 border-2 border-amber-200 rounded-3xl p-3 mb-3"
        style={{ height: 230 }}
      >
        {ROOM_GRID.flat().map(roomId => {
          const room  = ROOMS.find(r => r.id === roomId)!
          const items = placedInRoom(roomId)
          return (
            <div key={roomId} className={`${room.bg} border-2 ${room.border} rounded-2xl p-2 flex flex-col transition-all ${
              hoveredRoom === roomId && dragging ? 'scale-[1.03] shadow-md' : ''
            }`}>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">{room.emoji}</span>
                <span className="text-xs font-medium text-gray-600 truncate">{room.label}</span>
              </div>
              <div className="flex flex-wrap gap-1 flex-1 content-start">
                {items.map(item => (
                  <motion.span key={item.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-2xl leading-none">
                    {item.emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Furniture shelf */}
      <div className="bg-white rounded-2xl shadow p-3 mb-3">
        <p className="text-xs text-gray-400 mb-2">Jihozlar — xonaga suring:</p>
        <div className="flex flex-wrap gap-2 min-h-[56px] items-center">
          <AnimatePresence>
            {remaining.map(item => (
              <motion.div key={item.id}
                exit={{ scale: 0, opacity: 0 }}
                animate={wrong === item.id ? { x: [-6, 6, -6, 6, 0] } : {}}
                style={{ opacity: dragging === item.id ? 0.3 : 1, touchAction: 'none' }}
                onPointerDown={e => handleItemPointerDown(e, item.id)}
                className="flex flex-col items-center gap-0.5 bg-amber-50 border border-amber-200 rounded-xl px-2 py-1.5 cursor-grab active:cursor-grabbing">
                <span className="text-2xl leading-none pointer-events-none">{item.emoji}</span>
                <span className="text-xs text-gray-500 pointer-events-none">{item.label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {allPlaced && <p className="text-sm text-green-500 font-medium">Barcha jihozlar joylashtirildi ✓</p>}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1 text-sm text-gray-400">
        <span>Xato: {errors} (−{errors * 5} ball)</span>
        <span>Ball: {score}</span>
      </div>

      <button onClick={() => setPhase('result')} disabled={!allPlaced}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition">
        {allPlaced ? "Natijani ko'rish →" : `Yana ${remaining.length} ta jihoz qoldi`}
      </button>

      {dragging && draggingItem && (
        <div style={{
          position: 'fixed', left: ghostPos.x, top: ghostPos.y,
          transform: 'translate(-50%, -50%)', fontSize: 40,
          pointerEvents: 'none', zIndex: 1000,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        }}>
          {draggingItem.emoji}
        </div>
      )}
    </div>
  )
}
