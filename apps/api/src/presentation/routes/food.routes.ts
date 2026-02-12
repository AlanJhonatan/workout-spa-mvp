import { Router } from 'express'
import { FoodController } from '@/presentation/controllers'

const foodController = new FoodController()
const router = Router()

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: List all foods
 *     responses:
 *       200:
 *         description: List of foods
 */
router.get('/', (req, res) => foodController.list(req, res))

/**
 * @swagger
 * /foods:
 *   post:
 *     summary: Create a new food
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               calories:
 *                 type: number
 *               carbohydrates:
 *                 type: number
 *               protein:
 *                 type: number
 *               fat:
 *                 type: number
 */
router.post('/', (req, res) => foodController.create(req, res))

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Get food by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 */
router.get('/:id', (req, res) => foodController.findById(req, res))

export default router
