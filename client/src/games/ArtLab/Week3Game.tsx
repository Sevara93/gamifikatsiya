import { useRef, useState, useEffect } from 'react'

const PALETTE = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#A855F7', '#EC4899', '#92400E',
  '#6B7280', '#111111', '#FFFFFF',
]

const BRUSH_SIZES = [{ label: 'S', size: 4 }, { label: 'M', size: 10 }, { label: 'L', size: 20 }]

const CANVAS_W = 320
const CANVAS_H = 240
const CANVAS_BG = '#F0FFF4'

interface Animal { id: number; name: string; emoji: string; hint: string }

const ALL_ANIMALS: Animal[] = [
  { id: 1,  name: 'Mushuk',  emoji: '🐱', hint: 'Dumaloq bosh, quloqlar va mo\'ylov chizing' },
  { id: 2,  name: 'It',      emoji: '🐕', hint: 'Uzun quloqlar, burun va dumini unutmang' },
  { id: 3,  name: 'Baliq',   emoji: '🐟', hint: 'Oval tana, dum va qanotlarni chizing' },
  { id: 4,  name: 'Ot',      emoji: '🐴', hint: 'Uzun bo\'yin, yol va to\'rt oyoq' },
  { id: 5,  name: 'Kapalak', emoji: '🦋', hint: 'To\'rtta qanotni chiroyli chizing' },
  { id: 6,  name: 'Qush',    emoji: '🐦', hint: 'Qanotlar, tumshug\' va oyoqlarni chizing' },
  { id: 7,  name: 'Quyon',   emoji: '🐰', hint: 'Uzun quloqlar va yumshoq tana' },
  { id: 8,  name: 'Burgut',  emoji: '🦅', hint: 'Katta qanotlar va kuchli tumshug\'' },
  { id: 9,  name: 'Fil',     emoji: '🐘', hint: 'Katta tana, uzun xartum va quloqlar' },
  { id: 10, name: 'Tulki',   emoji: '🦊', hint: 'Uchli quloqlar, to\'liq dum va burni' },
]

const ANIMALS_BY_LEVEL: Record<string, Animal[]> = {
  KICHIK:    ALL_ANIMALS.slice(0, 3),
  ORTA:      ALL_ANIMALS.slice(0, 4),
  KATTA:     ALL_ANIMALS.slice(0, 6),
  TAYYORLOV: ALL_ANIMALS,
}

// ─── Canvas helpers ───────────────────────────────────────────────────────────
function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const sx = CANVAS_W / rect.width, sy = CANVAS_H / rect.height
  if ('touches' in e) {
    return { x: (e.touches[0].clientX - rect.left) * sx, y: (e.touches[0].clientY - rect.top) * sy }
  }
  return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy }
}

function isCanvasBlank(canvas: HTMLCanvasElement): boolean {
  const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data
  const [bgR, bgG, bgB] = [0xF0, 0xFF, 0xF4]
  let drawn = 0
  for (let i = 0; i < data.length; i += 16) {
    const dr = Math.abs(data[i] - bgR) + Math.abs(data[i+1] - bgG) + Math.abs(data[i+2] - bgB)
    if (data[i+3] > 10 && dr > 30) drawn++
  }
  return drawn / (data.length / 16) < 0.01
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Week3Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const animals = ANIMALS_BY_LEVEL[groupLevel] ?? ANIMALS_BY_LEVEL.KICHIK

  const [current,    setCurrent]    = useState(0)
  const [scores,     setScores]     = useState<number[]>([])
  const [phase,      setPhase]      = useState<'draw' | 'result' | 'done'>('draw')
  const [lastScore,  setLastScore]  = useState(0)
  const [evaluating, setEvaluating] = useState(false)
  const [evalError,  setEvalError]  = useState(false)

  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const lastPos    = useRef<{ x: number; y: number } | null>(null)
  const [drawing,  setDrawing]  = useState(false)
  const [color,    setColor]    = useState(PALETTE[0])
  const [brushIdx, setBrushIdx] = useState(1)
  const [tool,     setTool]     = useState<'pen' | 'eraser'>('pen')

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
    const prevent = (e: TouchEvent) => e.preventDefault()
    canvas.addEventListener('touchstart', prevent, { passive: false })
    canvas.addEventListener('touchmove',  prevent, { passive: false })
    return () => {
      canvas.removeEventListener('touchstart', prevent)
      canvas.removeEventListener('touchmove',  prevent)
    }
  }, [])

  const brushSize = BRUSH_SIZES[brushIdx].size
  const drawColor = tool === 'eraser' ? CANVAS_BG : color
  const lineW     = tool === 'eraser' ? brushSize * 2.5 : brushSize

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const pos = getPos(e, canvas)
    const ctx = canvas.getContext('2d')!
    setDrawing(true); lastPos.current = pos
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, lineW / 2, 0, Math.PI * 2)
    ctx.fillStyle = drawColor; ctx.fill()
  }

  function doDraw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing || !lastPos.current) return
    const canvas = canvasRef.current!
    const pos = getPos(e, canvas)
    const ctx = canvas.getContext('2d')!
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = drawColor; ctx.lineWidth = lineW
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke()
    lastPos.current = pos
  }

  function endDraw() { setDrawing(false); lastPos.current = null }

  function clearCanvas() {
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }

  async function handleEvaluate() {
    const canvas = canvasRef.current!
    if (isCanvasBlank(canvas)) {
      setLastScore(0); setPhase('result'); return
    }

    setEvaluating(true); setEvalError(false)
    try {
      const base64 = canvas.toDataURL('image/png').split(',')[1]
      const res = await fetch('http://localhost:3001/api/evaluate/drawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, animalName: animals[current].name, animalEmoji: animals[current].emoji }),
      })
      const data = await res.json()
      setLastScore(typeof data.score === 'number' ? data.score : 50)
    } catch {
      setEvalError(true)
      setLastScore(50)
    } finally {
      setEvaluating(false)
      setPhase('result')
    }
  }

  function handleNext() {
    setScores(prev => [...prev, lastScore])
    clearCanvas()
    if (current + 1 >= animals.length) setPhase('done')
    else { setCurrent(c => c + 1); setPhase('draw') }
  }

  function handleRetry() {
    clearCanvas(); setPhase('draw')
  }

  const animal  = animals[current]
  const avg     = scores.length > 0 ? Math.round(scores.reduce((a,b)=>a+b,0) / scores.length) : 0
  const isLast  = current + 1 >= animals.length

  return (
    <div className="max-w-md mx-auto select-none">

      {/* ── Done screen ── */}
      {phase === 'done' && (
        <div className="text-center p-8 bg-white rounded-3xl shadow">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
          <p className="text-gray-500 mb-1">{scores.length} ta hayvon chizildi</p>
          <p className="text-gray-500 mb-4">O'rtacha ball: <span className="font-bold text-purple-600">{avg}%</span></p>
          <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
            <div className="bg-purple-400 h-4 rounded-full transition-all" style={{ width: `${avg}%` }} />
          </div>
          <button onClick={() => onComplete(avg)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl transition">
            Davom etish →
          </button>
        </div>
      )}

      {/* ── Per-animal result screen ── */}
      {phase === 'result' && (
        <div className="text-center p-8 bg-white rounded-3xl shadow">
          <div className="text-5xl mb-3">
            {lastScore >= 70 ? '🎉' : lastScore >= 50 ? '👍' : '💪'}
          </div>
          <p className="text-lg text-gray-600 mb-1">{animal.name} {animal.emoji}</p>
          <div className="text-4xl font-bold text-purple-600 mb-2">{lastScore}%</div>
          <p className="text-gray-500 text-sm mb-1">
            {lastScore >= 70 ? 'Ajoyib! Juda aniq chizildi!' : lastScore >= 50 ? 'Yaxshi! Tanib bo\'ladi!' : 'Hayvon tanilmadi — yana bir bor urinib ko\'ring'}
          </p>
          {evalError && (
            <p className="text-xs text-orange-400 mt-1">Baholashda xatolik — taxminiy ball berildi</p>
          )}
          <div className="w-full bg-gray-100 rounded-full h-3 mt-3 mb-5">
            <div className="bg-purple-400 h-3 rounded-full transition-all" style={{ width: `${lastScore}%` }} />
          </div>

          {lastScore >= 50 ? (
            <button onClick={handleNext}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl transition">
              {isLast ? 'Natija →' : 'Keyingi hayvon →'}
            </button>
          ) : (
            <div>
              <p className="text-red-500 text-sm font-medium mb-4">
                50% dan kam — hayvonni aniqroq chizing!
              </p>
              <button onClick={handleRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition">
                🔄 Qaytadan chizish
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Draw screen — canvas always mounted so ref stays valid ── */}
      <div className={phase === 'draw' ? '' : 'hidden'}>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-sm text-gray-400">{current + 1} / {animals.length}</span>
          <span className="text-sm text-gray-400">✅ {scores.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
          <div className="bg-purple-400 h-2 rounded-full transition-all"
            style={{ width: `${(current / animals.length) * 100}%` }} />
        </div>

        <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4 mb-3 text-center">
          <div className="text-5xl mb-1">{animal.emoji}</div>
          <p className="font-bold text-gray-800 text-lg">{animal.name} chiz</p>
          <p className="text-gray-400 text-xs mt-1">{animal.hint}</p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow border-2 border-purple-100 mb-3 relative">
          <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
            className="w-full block" style={{ touchAction: 'none' }}
            onMouseDown={startDraw} onMouseMove={doDraw} onMouseUp={endDraw} onMouseLeave={endDraw}
            onTouchStart={startDraw} onTouchMove={doDraw} onTouchEnd={endDraw} />
          {evaluating && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2 rounded-3xl">
              <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-purple-600 font-semibold text-sm">Baholanmoqda...</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-3 mb-3 space-y-2">
          <div className="flex gap-1.5 flex-wrap">
            {PALETTE.map(c => (
              <button key={c} onClick={() => { setColor(c); setTool('pen') }}
                className="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: c,
                  borderColor: tool === 'pen' && color === c ? '#7c3aed' : '#e5e7eb',
                  boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 1px #d1d5db' : undefined,
                }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {BRUSH_SIZES.map((b, i) => (
                <button key={b.label} onClick={() => setBrushIdx(i)}
                  className={`px-2 py-1 text-xs font-bold rounded-lg border transition ${brushIdx === i ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {b.label}
                </button>
              ))}
            </div>
            <button onClick={() => setTool(tool === 'eraser' ? 'pen' : 'eraser')}
              className={`px-3 py-1 text-xs font-bold rounded-lg border transition ${tool === 'eraser' ? 'bg-orange-400 text-white border-orange-400' : 'bg-white text-gray-500 border-gray-200'}`}>
              🧹
            </button>
            <button onClick={clearCanvas}
              className="ml-auto px-3 py-1 text-xs font-bold rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition">
              ✕
            </button>
          </div>
        </div>

        <button onClick={handleEvaluate} disabled={evaluating}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-bold py-3 rounded-2xl transition">
          {evaluating ? 'Baholanmoqda...' : 'Baholash →'}
        </button>
      </div>

    </div>
  )
}
