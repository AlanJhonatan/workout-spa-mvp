import { injectable, inject } from 'tsyringe'
import { z } from 'zod'
import { IFood, IFoodRepository } from '@/domain'

const CreateFoodSchema = z.object({
  name: z.string().min(1),
  calories: z.number().positive(),
  carbohydrates: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  fat: z.number().nonnegative(),
})

type CreateFoodInput = z.infer<typeof CreateFoodSchema>

@injectable()
export class CreateFoodUseCase {
  constructor(@inject('FoodRepository') private foodRepository: IFoodRepository) {}

  async execute(input: CreateFoodInput): Promise<IFood> {
    const validatedInput = CreateFoodSchema.parse(input)
    return this.foodRepository.create(validatedInput)
  }
}
