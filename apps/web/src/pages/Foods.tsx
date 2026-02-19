import { FoodProfileSheet } from "@/components/meal/FoodProfileSheet";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Import ScrollArea
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { type Food } from "@/types";
import { useEffect, useState } from "react";

// Mock data for food database
// const mockFoodDatabase: Food[] = [
//   { id: uuidv4(), name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, grams: 182 },
//   { id: uuidv4(), name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, grams: 118 },
//   { id: uuidv4(), name: 'Chicken Breast (cooked)', calories: 165, protein: 31, carbs: 0, fat: 3.6, grams: 100 },
//   { id: uuidv4(), name: 'Brown Rice (cooked)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, grams: 100 },
//   { id: uuidv4(), name: 'Broccoli (steamed)', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, grams: 150 },
//   { id: uuidv4(), name: 'Egg (large)', calories: 78, protein: 6, carbs: 0.6, fat: 5, grams: 50 },
//   { id: uuidv4(), name: 'Oats', calories: 89, protein: 3.4, carbs: 19, fat: 0.4, grams: 100 },
// ];

export function FoodsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await api.get<Food[]>('/foods');
        setFoods(response.data);
      } catch (err) {
        setError('Failed to fetch foods');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Added flex-col and h-full to make content fill available height
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col h-full"> 
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Foods</h1>
        <p className="text-neutral-500">Manage your food database.</p>
      </header>

      {/* Added flex-1 to make Tabs take available height */}
      <Tabs defaultValue="food-database" className="w-full flex-1 flex flex-col"> 
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recently-eaten">Recently Eaten</TabsTrigger>
          <TabsTrigger value="food-database">Food Database</TabsTrigger>
        </TabsList>

        <TabsContent value="recently-eaten" className="mt-4 flex-1 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-4 flex items-center justify-center h-full">
              <p className="text-center text-neutral-500">No recently eaten foods yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Added flex-1 and overflow-hidden to make this TabContent take available height and allow ScrollArea */}
        <TabsContent value="food-database" className="mt-4 flex-1 flex flex-col overflow-hidden">
          <div className="mb-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
            <Input
              type="text"
              placeholder="Search for foods..."
              className="mb-4"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {loading && <p className="text-center text-neutral-500">Loading foods...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && filteredFoods.length === 0 && (
            <p className="text-center text-neutral-500">No foods found.</p>
          )}

          <ScrollArea className="h-[calc(100%-4rem)]"> {/* Adjusted height for input */}
            <div className="grid gap-4">
              {!loading && !error && filteredFoods.map(food => (
                <Card
                  key={food.id}
                  className="cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => setSelectedFood(food)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{food.name}</h3>
                    <p className="text-sm text-neutral-500">{food.calories} kcal</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </TabsContent>

        <FoodProfileSheet
          food={selectedFood}
          isOpen={!!selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      </Tabs>

      <FoodProfileSheet
        food={selectedFood}
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </div>
  );
}
