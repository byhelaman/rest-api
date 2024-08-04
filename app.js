import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { authRouter } from './routes/auth.js'
import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'
import { authMiddleware } from './middlewares/auth.js'

const app = express()
app.use(express.json())

app.use(corsMiddleware())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/movies', authMiddleware, moviesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server listeng on port http://localhost:${process.env.PORT}`)
})
