import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'

export const authRouter = Router()

authRouter.post('/auth/signin', AuthController.signIn)
authRouter.post('/auth/signout', AuthController.signOut)
