import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

// Store
import { useMealStore } from "./store/meal.store";

// Components
import { DaySelector } from "./components/DaySelector/DaySelector";
import { MealSummary } from "./components/MealSummary/MealSummary";
import { MealsList } from "./components/MealsList/MealsList";

export function MealSchedulePage() {
  const meals = useMealStore((state) => state.meals);
  const addMeal = useMealStore((state) => state.addMeal);
  const selectedDay = "monday";

  const totals = meals.reduce(
    (acc, meal) => {
      meal.foods.forEach((food) => {
        acc.calories += food.calories;
        acc.protein += food.protein;
        acc.carbs += food.carbohydrates;
        acc.fat += food.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">
            Meal Schedule
          </h1>
          <p className="text-neutral-500">Log and manage your daily meals.</p>
        </header>

        <Tabs value={selectedDay} className="w-full">
          <DaySelector />

          {/* Empty states for other days */}
          {["tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(
            (day) => (
              <TabsContent key={day} value={day}>
                <p className="text-center text-neutral-500 py-16">
                  No meals planned for {day.charAt(0).toUpperCase() + day.slice(1)}.
                </p>
              </TabsContent>
            )
          )}

          {/* Monday - Active day */}
          <TabsContent value="monday">
            <MealSummary totals={totals} />

            <div className="space-y-4">
              <MealsList meals={meals} />

              <Button
                onClick={addMeal}
                variant="ghost"
                className="w-full border-2 border-dashed"
              >
                <PlusCircle size={16} className="mr-2" />
                Add New Meal
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
