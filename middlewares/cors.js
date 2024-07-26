import cors from 'cors'

const ACEPTED_ORIGNS = ['http://127.0.0.1:3000']

export const corsMiddleware = ({ acceptedOrigins = ACEPTED_ORIGNS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
