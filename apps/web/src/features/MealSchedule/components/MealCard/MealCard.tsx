import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Meal } from "@/types";
import { PlusCircle, Utensils } from "lucide-react";
import { FoodsManagement } from "../Foods/FoodsManagement";
import { MealFoodItem } from "../MealFoodItem/MealFoodItem";

interface MealCardProps {
  meal: Meal;
  onRemoveFood: (mealId: number, foodIndex: number) => void;
}

export function MealCard({ meal, onRemoveFood }: MealCardProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Utensils size={20} />
          {meal.title}
        </CardTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={16} className="mr-2" />
              Add Food
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-3/4">
            <SheetHeader>
              <SheetTitle>Add Food to Meal</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FoodsManagement mealId={meal.id} />
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="space-y-2">
        {meal.foods.length > 0 ? (
          <div className="space-y-2">
            {meal.foods.map((food, index) => (
              <MealFoodItem
                key={`${meal.id}-${index}`}
                food={food}
                onRemove={() => onRemoveFood(meal.id, index)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 py-4">No foods added yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
