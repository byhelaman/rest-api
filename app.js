import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { authRouter } from './routes/auth.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())

app.use('/', authRouter)
app.use('/movies', moviesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server listeng on port http://localhost:${process.env.PORT}`)
})
