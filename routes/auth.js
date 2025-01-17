import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'

export const authRouter = Router()

authRouter.post('/signin', AuthController.signIn)
authRouter.post('/signout', AuthController.signOut)
