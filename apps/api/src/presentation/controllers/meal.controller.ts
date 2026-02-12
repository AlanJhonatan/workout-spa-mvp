import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateMealUseCase, ListMealsUseCase, AddFoodToMealUseCase } from '@/application'

export class MealController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(CreateMealUseCase)
      const meal = await useCase.execute(req.body)
      res.status(201).json(meal)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(ListMealsUseCase)
      const meals = await useCase.execute()
      res.status(200).json(meals)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  async addFoodToMeal(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(AddFoodToMealUseCase)
      const { mealId, foodId, grams } = req.body

      const mealFood = await useCase.execute(mealId, foodId, grams)
      res.status(201).json(mealFood)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }
}
