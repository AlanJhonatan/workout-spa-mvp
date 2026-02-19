import type { Meal } from "@/types";
import { useMealStore } from "../../store/meal.store";
import { MealCard } from "../MealCard/MealCard";

interface MealsListProps {
  meals: Meal[];
}

export function MealsList({ meals }: MealsListProps) {
  const removeFoodFromMeal = useMealStore((state) => state.removeFoodFromMeal);

  const handleRemoveFood = (mealId: number, foodIndex: number) => {
    removeFoodFromMeal(mealId, foodIndex);
  };

  return (
    <>
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onRemoveFood={handleRemoveFood}
        />
      ))}
    </>
  );
}
