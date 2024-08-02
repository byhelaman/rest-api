import { supabase } from '../../utils.js'

export class MovieModel {
  static async getAll ({ genre }) {
    const { data, error } = await supabase.rpc('get_all_movies', {
      genre_filter: genre
    })

    return { data, error }
  }

  static async getById ({ id }) {
    const { data, error } = await supabase.rpc('get_all_movies', {
      movie_id_filter: id
    })

    return { data, error }
  }

  static async create ({ input }) {

  }

  static async update ({ id, input }) {

  }

  static async delete ({ id }) {

  }
}
