import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import { IFood, IFoodRepository } from '@/domain'
import { db, foodsTable, Food } from '@/infrastructure/database'

export class FoodRepository implements IFoodRepository {
  async create(food: Omit<IFood, 'id' | 'createdAt' | 'lastUpdate'>): Promise<IFood> {
    const id = uuidv4()
    const now = new Date()

    const [created] = await db
      .insert(foodsTable)
      .values({
        id,
        ...food,
        createdAt: now,
        lastUpdate: now,
      })
      .returning()

    return this.mapToIFood(created)
  }

  async findById(id: string): Promise<IFood | null> {
    const food = await db.query.foodsTable.findFirst({
      where: eq(foodsTable.id, id),
    })
    return food ? this.mapToIFood(food) : null
  }

  async findAll(): Promise<IFood[]> {
    const foods = await db.select().from(foodsTable)
    return foods.map(f => this.mapToIFood(f))
  }

  async update(id: string, food: Partial<IFood>): Promise<IFood> {
    const updated = await db
      .update(foodsTable)
      .set({
        ...food,
        lastUpdate: new Date(),
      })
      .where(eq(foodsTable.id, id))
      .returning()

    if (!updated.length) {
      throw new Error(`Food with id ${id} not found`)
    }

    return this.mapToIFood(updated[0])
  }

  async delete(id: string): Promise<void> {
    const deleted = await db.delete(foodsTable).where(eq(foodsTable.id, id)).returning()

    if (!deleted.length) {
      throw new Error(`Food with id ${id} not found`)
    }
  }

  private mapToIFood(food: Food): IFood {
    return {
      id: food.id,
      name: food.name,
      calories: Number(food.calories),
      carbohydrates: Number(food.carbohydrates),
      protein: Number(food.protein),
      fat: Number(food.fat),
      createdAt: food.createdAt!,
      lastUpdate: food.lastUpdate!,
    }
  }
}
