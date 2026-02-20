import type { Macronutrients } from "@/types";
import { Beef, Drumstick, Flame, Wheat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { InfoRow } from "./InfoRow";

interface IMealSummaryCardProps {
  totals: Macronutrients
}

export function MealSummaryCard(props: IMealSummaryCardProps) {
  const { totals } = props
  
  return (
    <Card className="mb-6 bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Day's Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <InfoRow icon={<Flame size={16} />} label="Calories" value={totals.calories.toFixed(0)} unit="kcal" />
        <InfoRow icon={<Drumstick size={16} />} label="Protein" value={totals.protein.toFixed(1)} unit="g" />
        <InfoRow icon={<Wheat size={16} />} label="Carbs" value={totals.carbohydrates.toFixed(1)} unit="g" />
        <InfoRow icon={<Beef size={16} />} label="Fat" value={totals.fat.toFixed(1)} unit="g" />
      </CardContent>
    </Card>
  )
}