import { numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const foodsTable = pgTable('foods', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  calories: numeric('calories').notNull(),
  carbohydrates: numeric('carbohydrates').notNull(),
  protein: numeric('protein').notNull(),
  fat: numeric('fat').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  lastUpdate: timestamp('last_update').defaultNow().$onUpdateFn(() => new Date()),
})

export const mealsTable = pgTable('meals', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  lastUpdate: timestamp('last_update').defaultNow().$onUpdateFn(() => new Date()),
})

export const mealFoodsTable = pgTable('meal_foods', {
  id: uuid('id').primaryKey().defaultRandom(),
  mealId: uuid('meal_id')
    .notNull()
    .references(() => mealsTable.id, { onDelete: 'cascade' }),
  foodId: uuid('food_id')
    .notNull()
    .references(() => foodsTable.id, { onDelete: 'cascade' }),
  grams: numeric('grams').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Food = typeof foodsTable.$inferSelect
export type NewFood = typeof foodsTable.$inferInsert
export type Meal = typeof mealsTable.$inferSelect
export type NewMeal = typeof mealsTable.$inferInsert
export type MealFood = typeof mealFoodsTable.$inferSelect
export type NewMealFood = typeof mealFoodsTable.$inferInsert
