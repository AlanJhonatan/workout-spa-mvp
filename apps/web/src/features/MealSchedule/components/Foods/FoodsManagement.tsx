import { Input } from "@/components/ui/input";
import type { Food } from "@/types";
import { useState } from "react";
import { useFoods } from "../../hooks/useFoods";
import { FoodProfileSheet } from "./FoodProfileSheet";
import { FoodsList } from "./FoodsList";

interface FoodsManagementProps {
  mealId?: number;
}

export function FoodsManagement({ mealId }: FoodsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const { loading, error, searchFoods } = useFoods();

  const filteredFoods = searchFoods(searchTerm);

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

      {mealId && selectedFood && (
        <FoodProfileSheet
          food={selectedFood}
          isOpen={!!selectedFood}
          onClose={() => setSelectedFood(null)}
          mealId={mealId}
        />
      )}

      {!mealId && selectedFood && (
        <FoodProfileSheet
          food={selectedFood}
          isOpen={!!selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
}
