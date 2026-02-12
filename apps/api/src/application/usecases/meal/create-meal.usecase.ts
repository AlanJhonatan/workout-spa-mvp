import { injectable, inject } from 'tsyringe'
import { z } from 'zod'
import { IMeal, IMealRepository } from '@/domain'

const CreateMealSchema = z.object({
  name: z.string().min(1),
})

type CreateMealInput = z.infer<typeof CreateMealSchema>

@injectable()
export class CreateMealUseCase {
  constructor(@inject('MealRepository') private mealRepository: IMealRepository) {}

  async execute(input: CreateMealInput): Promise<IMeal> {
    const validatedInput = CreateMealSchema.parse(input)
    return this.mealRepository.create(validatedInput)
  }
}
