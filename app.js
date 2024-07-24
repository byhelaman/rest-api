const express = require('express')
const crypto = require('node:crypto')
const app = express()
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schema.js')

const PORT = process.env.PORT ?? 3000
app.use(express.json())

const ACEPTED_ORIGNS = [
  'http://127.0.0.1:3000'
]

app.get('/movies', (req, res) => {
  const origin = req.header('origin')

  if (ACEPTED_ORIGNS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  return res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.status(200).json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACEPTED_ORIGNS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.status(204).json({ message: 'Movie deleted successfully' })
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACEPTED_ORIGNS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }

  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server listeng on port http://localhost:${PORT}`)
})
