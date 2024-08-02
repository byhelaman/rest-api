import { Router } from 'express'
import { MovieController } from '../controllers/movie.js'
import { authMiddleware } from '../middlewares/auth.js'

export const moviesRouter = Router()

// Rutas protegidas
moviesRouter.get('/', authMiddleware, MovieController.getAll)
moviesRouter.get('/:id', authMiddleware, MovieController.getById)
moviesRouter.post('/', authMiddleware, MovieController.create)
moviesRouter.patch('/:id', authMiddleware, MovieController.update)
moviesRouter.delete('/:id', authMiddleware, MovieController.delete)
