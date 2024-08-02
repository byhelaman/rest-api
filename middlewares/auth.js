import { supabase } from '../utils.js'

export const authMiddleware = async (req, res, next) => {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return res.status(401).json({ message: 'Unauthorized: Authentication failed' })
  }

  if (!data?.user) {
    return res.status(401).json({ message: 'Unauthorized: User not found' })
  }

  next()
}
