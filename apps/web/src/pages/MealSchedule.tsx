import { MealCard } from "@/components/meal/MealCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Meal } from "@/types";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { MealSummaryCard } from "@/components/meal/MealSummaryCard";
import { initialMeals } from "@/mocks/MealData";

export function MealSchedulePage() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [nextMealId, setNextMealId] = useState(3);

  const handleAddMeal = () => {
    const newMeal: Meal = {
      id: nextMealId,
      title: `Meal ${nextMealId}`,
      foods: [],
    };
    setMeals([...meals, newMeal]);
    setNextMealId(prev => prev + 1);
  };

  const totals = meals.reduce((acc, meal) => {
    meal.foods.forEach(food => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbs += food.carbs;
      acc.fat += food.fat;
    });
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Meal Schedule</h1>
          <p className="text-neutral-500">Log and manage your daily meals.</p>
        </header>
        
        <Tabs defaultValue="monday" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
            <TabsTrigger value="monday">Monday</TabsTrigger>
            <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
            <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
            <TabsTrigger value="thursday">Thursday</TabsTrigger>
            <TabsTrigger value="friday">Friday</TabsTrigger>
            <TabsTrigger value="saturday">Saturday</TabsTrigger>
            <TabsTrigger value="sunday">Sunday</TabsTrigger>
          </TabsList>

          <TabsContent value="tuesday"><p className="text-center text-neutral-500 py-16">No meals planned for Tuesday.</p></TabsContent>
          <TabsContent value="wednesday"><p className="text-center text-neutral-500 py-16">No meals planned for Wednesday.</p></TabsContent>
          <TabsContent value="thursday"><p className="text-center text-neutral-500 py-16">No meals planned for Thursday.</p></TabsContent>
          <TabsContent value="friday"><p className="text-center text-neutral-500 py-16">No meals planned for Friday.</p></TabsContent>
          <TabsContent value="saturday"><p className="text-center text-neutral-500 py-16">No meals planned for Saturday.</p></TabsContent>
          <TabsContent value="sunday"><p className="text-center text-neutral-500 py-16">No meals planned for Sunday.</p></TabsContent>

          <TabsContent value="monday">
            <MealSummaryCard totals={totals} />

            <div className="space-y-4">
              {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}

              <Button onClick={handleAddMeal} variant="ghost" className="w-full border-2 border-dashed">
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
