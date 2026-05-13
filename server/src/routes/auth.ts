import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import prisma from '../services/prisma'

const router = Router()

const LoginSchema = z.object({ childId: z.string().min(1) })

router.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() })
    return
  }

  const child = await prisma.child.findUnique({
    where: { id: parsed.data.childId },
    include: { group: true },
  })

  if (!child) {
    res.status(404).json({ error: 'Bola topilmadi' })
    return
  }

  const token = jwt.sign({ childId: child.id }, process.env.JWT_SECRET!, { expiresIn: '30d' })
  res.json({
    token,
    child: {
      id: child.id,
      fullName: child.fullName,
      group: { id: child.group.id, name: child.group.name, level: child.group.level },
    },
  })
})

export default router
