import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yvugsdohckrttgqsnqzf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

export class MovieModel {
  static async getAll ({ genre }) {
    const { data, error } = await supabase.rpc('get_all_movies', {
      genre_filter: genre
    })

    if (error) {
      console.error('Error fetching movies:', error)
    }

    return data
  }

  static async getById ({ id }) {
    const { data, error } = await supabase.rpc('get_all_movies', {
      movie_id_filter: id
    })

    if (error) {
      console.error('Error fetching movies:', error)
    }

    return data
  }

  static async create ({ input }) {

  }

  static async update ({ id, input }) {

  }

  static async delete ({ id }) {

  }
}
