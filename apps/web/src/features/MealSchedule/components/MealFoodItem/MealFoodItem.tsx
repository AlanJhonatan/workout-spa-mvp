import { Button } from "@/components/ui/button";
import type { Food } from "@/types";
import { Trash2, Flame, Beef, Wheat, Droplet } from "lucide-react";
import { MealItemInfo } from "../MealItemInfo/MealItemInfo";

interface MealFoodItemProps {
  food: Food;
  onRemove: () => void;
}

export function MealFoodItem({ food, onRemove }: MealFoodItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
      <div className="flex-1">
        <h4 className="font-semibold text-neutral-800">{food.name}</h4>
        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          <MealItemInfo icon={<Flame size={14} />} label="Calories" value={food.calories} unit="" />
          <MealItemInfo icon={<Beef size={14} />} label="Protein" value={food.protein} unit="g" />
          <MealItemInfo icon={<Wheat size={14} />} label="Carbs" value={food.carbohydrates} unit="g" />
          <MealItemInfo icon={<Droplet size={14} />} label="Fat" value={food.fat} unit="g" />
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
