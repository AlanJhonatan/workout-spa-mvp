import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { container } from 'tsyringe'
import { IFoodRepository, IMealRepository } from '@/domain'
import { FoodRepository, MealRepository } from '@/infrastructure'
import foodRoutes from '@/presentation/routes/food.routes'
import mealRoutes from '@/presentation/routes/meal.routes'

// Register dependencies
container.register<IFoodRepository>('FoodRepository', {
  useClass: FoodRepository,
})

container.register<IMealRepository>('MealRepository', {
  useClass: MealRepository,
})

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workout SPA API',
      version: '0.0.0',
      description: 'API for managing diet and workouts',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/presentation/routes/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Routes
app.use('/api/foods', foodRoutes)
app.use('/api/meals', mealRoutes)

export default app
