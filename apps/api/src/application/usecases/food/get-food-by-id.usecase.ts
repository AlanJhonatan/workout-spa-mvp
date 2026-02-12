import { injectable, inject } from 'tsyringe'
import { IFood, IFoodRepository } from '@/domain'

@injectable()
export class GetFoodByIdUseCase {
  constructor(@inject('FoodRepository') private foodRepository: IFoodRepository) {}

  async execute(id: string): Promise<IFood | null> {
    return this.foodRepository.findById(id)
  }
}
