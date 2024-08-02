import 'dotenv/config'
import { createRequire } from 'node:module'
import { createClient } from '@supabase/supabase-js'

const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
