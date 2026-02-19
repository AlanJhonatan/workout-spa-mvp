import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import type { Food } from "@/types";
import { FoodsList } from "./FoodsList";
import { FoodProfileSheet } from "./FoodProfileSheet";

export function FoodsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await api.get<Food[]>("/foods");
        setFoods(response.data);
      } catch (err) {
        setError("Failed to fetch foods");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search for foods..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p className="text-center text-neutral-500">Loading foods...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && filteredFoods.length === 0 && (
        <p className="text-center text-neutral-500">No foods found.</p>
      )}

      {!loading && !error && filteredFoods.length > 0 && (
        <FoodsList
          foods={filteredFoods}
          onFoodSelect={setSelectedFood}
        />
      )}

      <FoodProfileSheet
        food={selectedFood}
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </div>
  );
}
