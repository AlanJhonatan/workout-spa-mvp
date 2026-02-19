import type { Meal } from "@/types";
import { MealCard } from "../MealCard/MealCard";

interface MealsListProps {
  meals: Meal[];
  onMealsChange: (meals: Meal[]) => void;
}

export function MealsList({ meals, onMealsChange }: MealsListProps) {
  const handleRemoveFood = (mealId: number, foodIndex: number) => {
    const updatedMeals = meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          foods: meal.foods.filter((_, idx) => idx !== foodIndex),
        };
      }
      return meal;
    });
    onMealsChange(updatedMeals);
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
