import type { Meal } from "@/types";

export const initialMeals: Meal[] = [
  {
    id: 1,
    title: "Meal 1",
    foods: [
      { id: '1', name: 'Chicken Breast', grams: 150, calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { id: '2', name: 'Brown Rice', grams: 100, calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
      { id: '3', name: 'Broccoli', grams: 100, calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    ],
  },
    {
    id: 2,
    title: "Meal 2",
    foods: [
      { id: '4', name: 'Oats', grams: 50, calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { id: '5', name: 'Banana', grams: 100, calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    ],
  },
];