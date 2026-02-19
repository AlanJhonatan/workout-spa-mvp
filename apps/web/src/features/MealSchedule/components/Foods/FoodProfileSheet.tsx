import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Food } from "@/types";
import { Beef, Droplet, Flame, Wheat } from "lucide-react";
import { useState } from "react";
import { MealItemInfo } from "../MealItemInfo/MealItemInfo";
import { useMealStore } from "../../store/meal.store";

interface FoodProfileSheetProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
  mealId?: number;
}

export function FoodProfileSheet({
  food,
  isOpen,
  onClose,
  mealId,
}: FoodProfileSheetProps) {
  const [grams, setGrams] = useState(100);
  const addFoodToMeal = useMealStore((state) => state.addFoodToMeal);

  if (!food) return null;

  const multiplier = grams / 100;
  const adjustedFood: Food = {
    ...food,
    calories: food.calories * multiplier,
    protein: food.protein * multiplier,
    carbohydrates: food.carbohydrates * multiplier,
    fat: food.fat * multiplier,
  };

  const handleAddToMeal = () => {
    if (mealId) {
      addFoodToMeal(mealId, adjustedFood);
    }
    console.log("Adding food to meal:", { food: adjustedFood, grams, mealId });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <SheetTitle>{food.name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Portion Input */}
          <div className="space-y-2">
            <Label htmlFor="grams">Portion (grams)</Label>
            <Input
              id="grams"
              type="number"
              min="0"
              value={grams}
              onChange={(e) => setGrams(Number(e.target.value))}
            />
          </div>

          {/* Adjusted Macros */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Nutritional Info (adjusted)</Label>
            <div className="space-y-2 p-4 bg-neutral-50 rounded-lg">
              <MealItemInfo
                icon={<Flame size={16} />}
                label="Calories"
                value={adjustedFood.calories.toFixed(1)}
                unit=" kcal"
              />
              <MealItemInfo
                icon={<Beef size={16} />}
                label="Protein"
                value={adjustedFood.protein.toFixed(1)}
                unit="g"
              />
              <MealItemInfo
                icon={<Wheat size={16} />}
                label="Carbs"
                value={adjustedFood.carbohydrates.toFixed(1)}
                unit="g"
              />
              <MealItemInfo
                icon={<Droplet size={16} />}
                label="Fat"
                value={adjustedFood.fat.toFixed(1)}
                unit="g"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddToMeal} className="flex-1" disabled={!mealId}>
              Add to Meal
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
