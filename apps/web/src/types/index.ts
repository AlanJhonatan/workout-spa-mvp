export interface Macronutrients {
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
}

export type Food = {
  id: string;
  name: string;
} & Macronutrients

export interface Meal {
  id: number;
  title: string;
  foods: Food[];
}
