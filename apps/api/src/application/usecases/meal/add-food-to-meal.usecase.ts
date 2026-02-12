import { injectable, inject } from 'tsyringe'
import { IMeal, IMealRepository, IMealFood } from '@/domain'

@injectable()
export class AddFoodToMealUseCase {
  constructor(@inject('MealRepository') private mealRepository: IMealRepository) {}

  async execute(mealId: string, foodId: string, grams: number): Promise<IMealFood> {
    // Validate meal exists
    const meal = await this.mealRepository.findById(mealId)
    if (!meal) {
      throw new Error(`Meal with id ${mealId} not found`)
    }

    return this.mealRepository.addFood(mealId, foodId, grams)
  }
}
