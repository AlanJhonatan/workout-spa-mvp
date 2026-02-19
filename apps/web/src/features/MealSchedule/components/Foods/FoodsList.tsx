import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Food } from "@/types";

interface FoodsListProps {
  foods: Food[];
  onFoodSelect: (food: Food) => void;
}

export function FoodsList({ foods, onFoodSelect }: FoodsListProps) {
  return (
    <ScrollArea className="h-96">
      <div className="space-y-2 pr-4">
        {foods.map((food) => (
          <Card
            key={food.id}
            className="cursor-pointer hover:bg-neutral-50 transition-colors"
            onClick={() => onFoodSelect(food)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-neutral-800">{food.name}</h3>
              <p className="text-sm text-neutral-500">{food.calories} kcal</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
