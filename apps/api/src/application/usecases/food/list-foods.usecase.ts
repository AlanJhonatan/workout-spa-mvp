import { injectable, inject } from 'tsyringe'
import { IFood, IFoodRepository } from '@/domain'

@injectable()
export class ListFoodsUseCase {
  constructor(@inject('FoodRepository') private foodRepository: IFoodRepository) {}

  async execute(): Promise<IFood[]> {
    return this.foodRepository.findAll()
  }
}
