import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = Router()
const client = new Anthropic()

router.post('/drawing', async (req, res) => {
  const { image, animalName, animalEmoji } = req.body as {
    image: string
    animalName: string
    animalEmoji: string
  }

  if (!image || !animalName) {
    res.status(400).json({ error: 'image and animalName required' })
    return
  }

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 10,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: 'image/png', data: image },
          },
          {
            type: 'text',
            text: `A child aged 3-7 was asked to draw "${animalEmoji} ${animalName}". Rate how recognizable this drawing is as a ${animalName} from 0 to 100. Be lenient — give 50+ for any reasonable attempt that shows basic body shape or key features. Give 0-20 only if the canvas is blank or completely unrecognizable. Reply with ONLY a single integer, nothing else.`,
          },
        ],
      }],
    })

    const raw = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '50'
    const score = Math.min(100, Math.max(0, parseInt(raw) || 50))
    res.json({ score })
  } catch (err) {
    console.error('Evaluate drawing error:', err)
    res.status(500).json({ error: 'evaluation failed', score: 50 })
  }
})

export default router
