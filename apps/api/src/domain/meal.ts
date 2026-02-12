export interface IMealFood {
  id: string
  mealId: string
  foodId: string
  grams: number
  createdAt: Date
}

export interface IMeal {
  id: string
  name: string
  mealFoods: IMealFood[]
  createdAt: Date
  lastUpdate: Date
}

export interface IMealRepository {
  create(meal: Omit<IMeal, 'id' | 'createdAt' | 'lastUpdate' | 'mealFoods'>): Promise<IMeal>
  findById(id: string): Promise<IMeal | null>
  findAll(): Promise<IMeal[]>
  update(id: string, meal: Partial<Omit<IMeal, 'mealFoods'>>): Promise<IMeal>
  delete(id: string): Promise<void>
  addFood(mealId: string, foodId: string, grams: number): Promise<IMealFood>
  removeFood(mealId: string, foodId: string): Promise<void>
}
