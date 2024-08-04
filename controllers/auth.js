import { AuthModel } from '../models/auth.js'
import { validateAuth } from '../schemas/auth.js'

export class AuthController {
  static async signIn (req, res) {
    const result = validateAuth(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const { data, error } = await AuthModel.signIn(req.body)

    if (error || !data?.user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    res
      .cookie('access_token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      .send({ message: 'Successfully signed in' })
  }

  static async signOut (req, res) {
    const { access_token: accessToken } = req.cookies
    const { error } = await AuthModel.signOut(accessToken)

    if (error) {
      return res.status(400).json({ message: 'Failed to sign out' })
    }

    res
      .clearCookie('access_token')
      .send({ message: 'Successfully signed out' })
  }
}
