// src/components/meal/FoodProfileSheet.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { type Food } from "@/types";
import { Beef, Drumstick, Flame, Wheat } from "lucide-react";
import React, { useState } from "react";

interface FoodProfileSheetProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
  // onSave: (updatedFood: Food) => void; // For future implementation
}

const InfoRow = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string | number, unit: string }) => (
  <div className="flex items-center gap-2 text-sm text-neutral-600">
    {icon}
    <span>{label}:</span>
    <span className="font-semibold text-neutral-800">{value}{unit}</span>
  </div>
);

export const FoodProfileSheet = ({ food, isOpen, onClose }: FoodProfileSheetProps) => {
  const [currentGrams, setCurrentGrams] = useState(() => food?.grams || 0);

  if (!food) return null;

  // Calculate macros for the current grams
  const factor = currentGrams / food.grams; // Original grams vs. current grams

  const calculatedMacros = {
    calories: food.calories * factor,
    protein: food.protein * factor,
    carbs: food.carbohydrates * factor,
    fat: food.fat * factor,
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col"> {/* Added flex flex-col for better layout */}
        <SheetHeader>
          <SheetTitle>{food.name}</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6 flex-1 overflow-y-auto px-6"> {/* Added px-6 for padding, flex-1 and overflow */}
          {/* Grams & Unit Input */}
          <div className="grid gap-2">
            <Label htmlFor="grams-input">Amount</Label>
            <div className="flex gap-2">
              <Input
                id="grams-input"
                type="number"
                value={currentGrams}
                onChange={(e) => setCurrentGrams(e.target.value as unknown as number)}
                className="flex-1"
              />
              <Input
                id="unit-input"
                type="text"
                value="grams"
                disabled
                className="w-20 text-center"
              />
            </div>
          </div>

          {/* Macro Preview */}
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <InfoRow icon={<Flame size={16} />} label="Calories" value={calculatedMacros.calories.toFixed(0)} unit="kcal" />
              <InfoRow icon={<Drumstick size={16} />} label="Protein" value={calculatedMacros.protein.toFixed(1)} unit="g" />
              <InfoRow icon={<Wheat size={16} />} label="Carbs" value={calculatedMacros.carbs.toFixed(1)} unit="g" />
              <InfoRow icon={<Beef size={16} />} label="Fat" value={calculatedMacros.fat.toFixed(1)} unit="g" />
            </CardContent>
          </Card>
        </div>
        <SheetFooter className="absolute bottom-4 left-4 right-4 px-6"> {/* Added px-6 to match SheetContent */}
          <SheetClose asChild>
            <Button type="submit" disabled={!currentGrams} onClick={() => console.log('Saving food with grams:', currentGrams)}>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
