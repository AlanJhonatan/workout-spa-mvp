export interface IFood {
  id: string
  name: string
  calories: number
  carbohydrates: number
  protein: number
  fat: number
  createdAt: Date
  lastUpdate: Date
}

export interface IFoodRepository {
  create(food: Omit<IFood, 'id' | 'createdAt' | 'lastUpdate'>): Promise<IFood>
  findById(id: string): Promise<IFood | null>
  findAll(): Promise<IFood[]>
  update(id: string, food: Partial<IFood>): Promise<IFood>
  delete(id: string): Promise<void>
}
