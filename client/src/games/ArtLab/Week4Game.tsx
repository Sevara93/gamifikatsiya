import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SceneItem { id: string; emoji: string; x: number; y: number; scale: number }
interface PaletteItem { emoji: string; label: string }

const SCALES = [0.5, 0.7, 1, 1.4, 1.8, 2.4]

const BASE: PaletteItem[] = [
  { emoji: '🌳', label: 'Daraxt' },
  { emoji: '🌸', label: 'Gul' },
  { emoji: '☀️', label: 'Quyosh' },
  { emoji: '☁️', label: 'Bulut' },
  { emoji: '🐦', label: 'Qush' },
  { emoji: '🌿', label: "O't" },
]
const ORTA_X: PaletteItem[] = [
  { emoji: '🦋', label: 'Kapalak' },
  { emoji: '🌙', label: 'Oy' },
  { emoji: '🏔️', label: "Tog'" },
  { emoji: '💧', label: 'Suv' },
]
const KATTA_X: PaletteItem[] = [
  { emoji: '🌺', label: 'Lola' },
  { emoji: '🐰', label: 'Quyon' },
  { emoji: '🍄', label: "Qo'ziqorin" },
  { emoji: '🌈', label: 'Kamalak' },
]
const TAYYORLOV_X: PaletteItem[] = [
  { emoji: '🦅', label: 'Burgut' },
  { emoji: '🐝', label: 'Asalari' },
  { emoji: '🌻', label: 'Kungaboqar' },
  { emoji: '🍀', label: 'Yonchiq' },
]

const ITEMS_BY_LEVEL: Record<string, PaletteItem[]> = {
  KICHIK:    BASE,
  ORTA:      [...BASE, ...ORTA_X],
  KATTA:     [...BASE, ...ORTA_X, ...KATTA_X],
  TAYYORLOV: [...BASE, ...ORTA_X, ...KATTA_X, ...TAYYORLOV_X],
}

export default function Week4Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const palette = ITEMS_BY_LEVEL[groupLevel] ?? ITEMS_BY_LEVEL.KICHIK

  const [items,      setItems]      = useState<SceneItem[]>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [done,       setDone]       = useState(false)

  const sceneRef       = useRef<HTMLDivElement>(null)
  const nextId         = useRef(0)
  const dragStartPos   = useRef<{ x: number; y: number } | null>(null)
  const wasDragged     = useRef(false)

  function addItem(p: PaletteItem) {
    const id = String(nextId.current++)
    setItems(prev => [...prev, {
      id, emoji: p.emoji, scale: 1,
      x: 20 + Math.random() * 60,
      y: 15 + Math.random() * 65,
    }])
    setSelectedId(id)
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(it => it.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  function resizeItem(id: string, dir: number) {
    setItems(prev => prev.map(it => {
      if (it.id !== id) return it
      const idx = SCALES.indexOf(it.scale)
      const next = Math.max(0, Math.min(SCALES.length - 1, idx + dir))
      return { ...it, scale: SCALES[next] }
    }))
  }

  function handleItemPointerDown(e: React.PointerEvent, id: string) {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDraggingId(id)
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    wasDragged.current = false
  }

  function handleScenePointerMove(e: React.PointerEvent) {
    if (!draggingId) return
    const dx = e.clientX - (dragStartPos.current?.x ?? e.clientX)
    const dy = e.clientY - (dragStartPos.current?.y ?? e.clientY)
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDragged.current = true
    const rect = sceneRef.current!.getBoundingClientRect()
    const x = Math.max(4, Math.min(96, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(4, Math.min(96, ((e.clientY - rect.top)  / rect.height) * 100))
    setItems(prev => prev.map(it => it.id === draggingId ? { ...it, x, y } : it))
  }

  function handleScenePointerUp() {
    if (draggingId) {
      if (!wasDragged.current) {
        setSelectedId(prev => prev === draggingId ? null : draggingId)
      }
    }
    setDraggingId(null)
  }

  const score = Math.min(items.length * 20, 100)

  if (done) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🌿</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">{items.length} ta narsa bilan manzara yaratildi</p>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
          <div className="bg-emerald-400 h-4 rounded-full transition-all" style={{ width: `${score}%` }} />
        </div>
        <button onClick={() => onComplete(score)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-2xl transition">
          Davom etish →
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto select-none">
      <p className="text-center text-gray-600 font-semibold mb-1">Tabiat manzarasini yarat!</p>
      <p className="text-center text-xs text-gray-400 mb-3">
        Bosib qo'shing • Suring • Tanlang va kattalashtiring
      </p>

      {/* Scene */}
      <div
        ref={sceneRef}
        className="relative w-full rounded-3xl overflow-hidden shadow-md mb-3 border-2 border-emerald-100"
        style={{
          height: 240,
          background: 'linear-gradient(to bottom, #bae6fd 0%, #bae6fd 52%, #bbf7d0 52%, #86efac 100%)',
          touchAction: 'none',
        }}
        onPointerMove={handleScenePointerMove}
        onPointerUp={handleScenePointerUp}
        onPointerLeave={handleScenePointerUp}
        onClick={e => { if (e.target === e.currentTarget) setSelectedId(null) }}
      >
        {items.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-emerald-500 font-medium pointer-events-none">
            Quyida rasmlarni bosing 👇
          </p>
        )}

        <AnimatePresence>
          {items.map(item => {
            const isSelected = selectedId === item.id
            const fontSize = Math.round(36 * item.scale)
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="absolute"
                style={{
                  left: `${item.x}%`,
                  top:  `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                  touchAction: 'none',
                  cursor: draggingId === item.id ? 'grabbing' : 'grab',
                  zIndex: isSelected || draggingId === item.id ? 20 : 1,
                }}
                onPointerDown={e => { e.stopPropagation(); handleItemPointerDown(e, item.id) }}
              >
                {/* Selection ring */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400 -m-2 pointer-events-none" />
                )}

                <span style={{ fontSize, lineHeight: 1, display: 'block' }} className="drop-shadow-sm">
                  {item.emoji}
                </span>

                {/* Controls when selected */}
                {isSelected && (
                  <div
                    className="absolute flex items-center gap-0.5 bg-white rounded-full shadow-lg px-1 py-0.5 z-30"
                    style={{ bottom: '-28px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
                    onPointerDown={e => e.stopPropagation()}
                  >
                    <button
                      onClick={e => { e.stopPropagation(); resizeItem(item.id, -1) }}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-base flex items-center justify-center transition"
                    >−</button>
                    <button
                      onClick={e => { e.stopPropagation(); resizeItem(item.id, +1) }}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-base flex items-center justify-center transition"
                    >+</button>
                    <button
                      onClick={e => { e.stopPropagation(); removeItem(item.id) }}
                      className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-500 font-bold text-xs flex items-center justify-center transition ml-0.5"
                    >✕</button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Palette */}
      <div className="bg-white rounded-2xl shadow p-3 mb-3">
        <p className="text-xs text-gray-400 mb-2">Qo'shish uchun bosing:</p>
        <div className="flex flex-wrap gap-2">
          {palette.map(p => (
            <button
              key={p.emoji + p.label}
              onClick={() => addItem(p)}
              className="flex flex-col items-center gap-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-2 py-1.5 transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-2xl leading-none">{p.emoji}</span>
              <span className="text-xs text-gray-500 leading-none">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1 text-sm text-gray-400">
        <span>{items.length} ta narsa</span>
        <span>Ball: {score}</span>
      </div>

      <button onClick={() => setDone(true)}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition">
        Tayyor →
      </button>
    </div>
  )
}
