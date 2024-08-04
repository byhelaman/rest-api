import { supabase } from '../utils.js'

export const authMiddleware = async (req, res, next) => {
  const { access_token: accessToken } = req.cookies

  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !accessToken) {
    return res.status(401).json({ message: 'Unauthorized: Authentication failed' })
  }

  if (!data?.user) {
    return res.status(401).json({ message: 'Unauthorized: User not found' })
  }

  next()
}
