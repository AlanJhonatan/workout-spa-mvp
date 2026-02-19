import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beef, Droplet, Flame, Wheat } from "lucide-react";

interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealSummaryProps {
  totals: MacroTotals;
}

const MacroCard = ({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
}) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-50">
    <div className="text-neutral-600">{icon}</div>
    <span className="text-xs text-neutral-600">{label}</span>
    <span className="font-bold text-lg text-neutral-800">
      {value}
      {unit}
    </span>
  </div>
);

export function MealSummary({ totals }: MealSummaryProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Daily Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MacroCard icon={<Flame size={20} />} label="Calories" value={totals.calories} unit=" kcal" />
          <MacroCard icon={<Beef size={20} />} label="Protein" value={totals.protein} unit="g" />
          <MacroCard icon={<Wheat size={20} />} label="Carbs" value={totals.carbs} unit="g" />
          <MacroCard icon={<Droplet size={20} />} label="Fat" value={totals.fat} unit="g" />
        </div>
      </CardContent>
    </Card>
  );
}
