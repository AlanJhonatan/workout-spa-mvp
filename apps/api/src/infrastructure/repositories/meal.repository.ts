import { eq, and } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import { IMeal, IMealRepository, IMealFood } from '@/domain'
import { db, mealsTable, mealFoodsTable, Meal } from '@/infrastructure/database'

export class MealRepository implements IMealRepository {
  async create(meal: Omit<IMeal, 'id' | 'createdAt' | 'lastUpdate' | 'mealFoods'>): Promise<IMeal> {
    const id = uuidv4()
    const now = new Date()

    const [created] = await db
      .insert(mealsTable)
      .values({
        id,
        name: meal.name,
        createdAt: now,
        lastUpdate: now,
      })
      .returning()

    return this.mapToIMeal(created, [])
  }

  async findById(id: string): Promise<IMeal | null> {
    const meal = await db.query.mealsTable.findFirst({
      where: eq(mealsTable.id, id),
    })

    if (!meal) return null

    const foods = await db.select().from(mealFoodsTable).where(eq(mealFoodsTable.mealId, id))

    return this.mapToIMeal(meal, foods)
  }

  async findAll(): Promise<IMeal[]> {
    const meals = await db.select().from(mealsTable)

    const result: IMeal[] = []
    for (const meal of meals) {
      const foods = await db.select().from(mealFoodsTable).where(eq(mealFoodsTable.mealId, meal.id))
      result.push(this.mapToIMeal(meal, foods))
    }

    return result
  }

  async update(id: string, meal: Partial<Omit<IMeal, 'mealFoods'>>): Promise<IMeal> {
    const updated = await db
      .update(mealsTable)
      .set({
        ...meal,
        lastUpdate: new Date(),
      })
      .where(eq(mealsTable.id, id))
      .returning()

    if (!updated.length) {
      throw new Error(`Meal with id ${id} not found`)
    }

    const foods = await db.select().from(mealFoodsTable).where(eq(mealFoodsTable.mealId, id))
    return this.mapToIMeal(updated[0], foods)
  }

  async delete(id: string): Promise<void> {
    const deleted = await db.delete(mealsTable).where(eq(mealsTable.id, id)).returning()

    if (!deleted.length) {
      throw new Error(`Meal with id ${id} not found`)
    }
  }

  async addFood(mealId: string, foodId: string, grams: number): Promise<IMealFood> {
    const id = uuidv4()

    const [created] = await db
      .insert(mealFoodsTable)
      .values({
        id,
        mealId,
        foodId,
        grams,
        createdAt: new Date(),
      })
      .returning()

    return {
      id: created.id,
      mealId: created.mealId,
      foodId: created.foodId,
      grams: Number(created.grams),
      createdAt: created.createdAt!,
    }
  }

  async removeFood(mealId: string, foodId: string): Promise<void> {
    await db
      .delete(mealFoodsTable)
      .where(and(eq(mealFoodsTable.mealId, mealId), eq(mealFoodsTable.foodId, foodId)))
  }

  private mapToIMeal(meal: Meal, foods: any[]): IMeal {
    return {
      id: meal.id,
      name: meal.name,
      mealFoods: foods.map(f => ({
        id: f.id,
        mealId: f.mealId,
        foodId: f.foodId,
        grams: Number(f.grams),
        createdAt: f.createdAt,
      })),
      createdAt: meal.createdAt!,
      lastUpdate: meal.lastUpdate!,
    }
  }
}
