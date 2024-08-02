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

    res.json({ messasge: 'Successfully signed in' })
  }
}
