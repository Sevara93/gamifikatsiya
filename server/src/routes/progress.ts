import { Router } from 'express'
import { z } from 'zod'
import { Lab } from '@prisma/client'
import prisma from '../services/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'
import { computeUnlockedWeeks } from '../services/progress'

const router = Router()
router.use(requireAuth)

async function getProgressWithUnlocked(childId: string) {
  const progress = await prisma.progress.findMany({ where: { childId } })
  const unlockedWeeks = computeUnlockedWeeks(progress)
  return { progress, unlockedWeeks }
}

router.get('/', async (req: AuthRequest, res) => {
  const result = await getProgressWithUnlocked(req.childId!)
  res.json(result)
})

const CompleteSchema = z.object({
  lab: z.enum(['ECO_LAB', 'MIND_LAB', 'ART_LAB', 'TECH_LAB', 'LIFE_LAB']),
  week: z.number().int().min(1).max(4),
  score: z.number().int().min(0).max(100),
})

router.post('/complete', async (req: AuthRequest, res) => {
  const parsed = CompleteSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() })
    return
  }
  const { lab, week, score } = parsed.data

  await prisma.progress.upsert({
    where: { childId_lab_week: { childId: req.childId!, lab: lab as Lab, week } },
    create: { childId: req.childId!, lab: lab as Lab, week, isCompleted: true, score, completedAt: new Date() },
    update: { isCompleted: true, score, completedAt: new Date() },
  })

  const result = await getProgressWithUnlocked(req.childId!)
  res.json(result)
})

export default router
