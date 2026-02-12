import { injectable, inject } from 'tsyringe'
import { IMeal, IMealRepository } from '@/domain'

@injectable()
export class ListMealsUseCase {
  constructor(@inject('MealRepository') private mealRepository: IMealRepository) {}

  async execute(): Promise<IMeal[]> {
    return this.mealRepository.findAll()
  }
}
