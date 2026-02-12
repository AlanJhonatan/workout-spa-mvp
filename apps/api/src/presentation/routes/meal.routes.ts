import { Router } from 'express'
import { MealController } from '@/presentation/controllers'

const mealController = new MealController()
const router = Router()

/**
 * @swagger
 * /meals:
 *   get:
 *     summary: List all meals
 *     responses:
 *       200:
 *         description: List of meals
 */
router.get('/', (req, res) => mealController.list(req, res))

/**
 * @swagger
 * /meals:
 *   post:
 *     summary: Create a new meal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 */
router.post('/', (req, res) => mealController.create(req, res))

/**
 * @swagger
 * /meals/add-food:
 *   post:
 *     summary: Add food to a meal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealId:
 *                 type: string
 *               foodId:
 *                 type: string
 *               grams:
 *                 type: number
 */
router.post('/add-food', (req, res) => mealController.addFoodToMeal(req, res))

export default router
