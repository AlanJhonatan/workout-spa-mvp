import 'dotenv/config'
import 'reflect-metadata'
import app from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📚 Swagger docs at http://localhost:${PORT}/swagger`)
})
