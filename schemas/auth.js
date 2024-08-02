import z from 'zod'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})

export function validateAuth (object) {
  return authSchema.safeParse(object)
}
