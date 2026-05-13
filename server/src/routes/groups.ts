import { Router } from 'express'
import { GroupLevel } from '@prisma/client'
import prisma from '../services/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const { level } = req.query
  const where = level ? { level: level as GroupLevel } : {}
  const groups = await prisma.group.findMany({
    where,
    orderBy: { name: 'asc' },
    select: { id: true, name: true, level: true },
  })
  res.json(groups)
})

router.get('/:id/children', async (req, res) => {
  const children = await prisma.child.findMany({
    where: { groupId: req.params.id },
    orderBy: { fullName: 'asc' },
    select: { id: true, fullName: true },
  })
  res.json(children)
})

export default router
