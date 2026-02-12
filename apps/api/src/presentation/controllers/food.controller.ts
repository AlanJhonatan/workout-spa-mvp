import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFoodUseCase, ListFoodsUseCase, GetFoodByIdUseCase } from '@/application'

export class FoodController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(CreateFoodUseCase)
      const food = await useCase.execute(req.body)
      res.status(201).json(food)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(ListFoodsUseCase)
      const foods = await useCase.execute()
      res.status(200).json(foods)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(GetFoodByIdUseCase)
      const food = await useCase.execute(req.params.id)

      if (!food) {
        res.status(404).json({ error: 'Food not found' })
        return
      }

      res.status(200).json(food)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
