import { useRef, useState, useEffect } from 'react'

const PALETTE = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#A855F7', '#EC4899', '#92400E',
  '#6B7280', '#111111', '#FFFFFF',
]

const BRUSH_SIZES = [
  { label: 'S', size: 4 },
  { label: 'M', size: 10 },
  { label: 'L', size: 20 },
]

const THEMES: Record<string, { prompt: string; hint: string }> = {
  KICHIK:    { prompt: 'Daraxt chiz',                       hint: '🌳' },
  ORTA:      { prompt: 'Gul chiz',                          hint: '🌸' },
  KATTA:     { prompt: "Tog' manzarasini chiz",             hint: '⛰️' },
  TAYYORLOV: { prompt: 'Daryo va tabiat manzarasini chiz',  hint: '🏞️' },
}

const CANVAS_W = 320
const CANVAS_H = 260

function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const sx = CANVAS_W / rect.width, sy = CANVAS_H / rect.height
  if ('touches' in e) {
    return { x: (e.touches[0].clientX - rect.left) * sx, y: (e.touches[0].clientY - rect.top) * sy }
  }
  return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy }
}

export default function Week2Game({ groupLevel, onComplete }: { groupLevel: string; onComplete: (score: number) => void }) {
  const { prompt, hint } = THEMES[groupLevel] ?? THEMES.KICHIK

  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const lastPos    = useRef<{ x: number; y: number } | null>(null)
  const [drawing,  setDrawing]  = useState(false)
  const [color,    setColor]    = useState('#111111')
  const [brushIdx, setBrushIdx] = useState(1)
  const [tool,     setTool]     = useState<'pen' | 'eraser'>('pen')
  const [done,     setDone]     = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#FEFCE8'
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
  const drawColor = tool === 'eraser' ? '#FEFCE8' : color
  const lineW     = tool === 'eraser' ? brushSize * 2.5 : brushSize

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const pos = getPos(e, canvas)
    const ctx = canvas.getContext('2d')!
    setDrawing(true)
    lastPos.current = pos
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, lineW / 2, 0, Math.PI * 2)
    ctx.fillStyle = drawColor
    ctx.fill()
  }

  function doDraw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing || !lastPos.current) return
    const canvas = canvasRef.current!
    const pos = getPos(e, canvas)
    const ctx = canvas.getContext('2d')!
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = drawColor
    ctx.lineWidth = lineW
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  function endDraw() { setDrawing(false); lastPos.current = null }

  function clearCanvas() {
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.fillStyle = '#FEFCE8'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }

  if (done) {
    return (
      <div className="text-center p-8 bg-white rounded-3xl shadow max-w-md mx-auto">
        <div className="text-6xl mb-4">🖼️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barakalla!</h2>
        <p className="text-gray-500 mb-4">Ajoyib rasm chizdingiz! {hint}</p>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
          <div className="bg-purple-400 h-4 rounded-full transition-all" style={{ width: '100%' }} />
        </div>
        <button onClick={() => onComplete(100)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl transition">
          Davom etish →
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto select-none">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-3xl">{hint}</span>
        <p className="text-gray-700 font-semibold">{prompt}</p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow border-2 border-purple-100 mb-3">
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
          className="w-full block" style={{ touchAction: 'none' }}
          onMouseDown={startDraw} onMouseMove={doDraw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={doDraw} onTouchEnd={endDraw} />
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
            ✕ Tozalash
          </button>
        </div>
      </div>

      <button onClick={() => setDone(true)}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl transition">
        Tayyor →
      </button>
    </div>
  )
}
