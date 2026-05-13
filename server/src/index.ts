import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth'
import progressRouter from './routes/progress'
import groupsRouter from './routes/groups'
import evaluateRouter from './routes/evaluate'

const app = express()
const PORT = Number(process.env.PORT ?? 3001)

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json({ limit: '4mb' }))

app.use('/api/auth', authRouter)
app.use('/api/progress', progressRouter)
app.use('/api/groups', groupsRouter)
app.use('/api/evaluate', evaluateRouter)

app.listen(PORT, () => {
  console.log(`KinderLab API running on http://localhost:${PORT}`)
})
