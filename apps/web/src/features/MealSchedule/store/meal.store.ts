import type { Food, Meal } from '@/types';
import { create } from 'zustand';

interface MealStore {
  meals: Meal[];
  nextMealId: number;
  
  // Actions
  addMeal: () => void;
  removeMeal: (mealId: number) => void;
  addFoodToMeal: (mealId: number, food: Food) => void;
  removeFoodFromMeal: (mealId: number, foodIndex: number) => void;
  setMeals: (meals: Meal[]) => void;
  resetMeals: () => void;
}

const INITIAL_MEALS: Meal[] = [
  { id: 1, title: 'Breakfast', foods: [] },
  { id: 2, title: 'Lunch', foods: [] },
];

export const useMealStore = create<MealStore>((set) => ({
  meals: INITIAL_MEALS,
  nextMealId: 3,

  addMeal: () =>
    set((state) => ({
      meals: [
        ...state.meals,
        {
          id: state.nextMealId,
          title: `Meal ${state.nextMealId}`,
          foods: [],
        },
      ],
      nextMealId: state.nextMealId + 1,
    })),

  removeMeal: (mealId: number) =>
    set((state) => ({
      meals: state.meals.filter((meal) => meal.id !== mealId),
    })),

  addFoodToMeal: (mealId: number, food: Food) =>
    set((state) => ({
      meals: state.meals.map((meal) =>
        meal.id === mealId ? { ...meal, foods: [...meal.foods, food] } : meal
      ),
    })),

  removeFoodFromMeal: (mealId: number, foodIndex: number) =>
    set((state) => ({
      meals: state.meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              foods: meal.foods.filter((_, idx) => idx !== foodIndex),
            }
          : meal
      ),
    })),

  setMeals: (meals: Meal[]) => set({ meals }),

  resetMeals: () =>
    set({
      meals: INITIAL_MEALS,
      nextMealId: 3,
    }),
}));
