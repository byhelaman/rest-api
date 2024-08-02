import { supabase } from '../utils.js'

export class AuthModel {
  static async signIn ({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  static async signOut () {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { message: error.message }
    }

    return { message: 'Successfully signed out' }
  }
}
