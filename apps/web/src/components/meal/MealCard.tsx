// src/components/meal/MealCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FoodsPage } from "@/pages/Foods";
import type { Meal } from '@/types';
import { Beef, Drumstick, Flame, PlusCircle, Utensils, Wheat } from "lucide-react";
import React from 'react';

const InfoRow = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string | number, unit: string }) => (
  <div className="flex items-center gap-2 text-sm text-neutral-600">
    {icon}
    <span className="hidden sm:inline">{label}:</span>
    <span className="font-semibold text-neutral-800">{value}{unit}</span>
  </div>
);

interface MealCardProps {
  meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <Card key={meal.id} className="bg-white">
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
              <SheetTitle>Manage Foods</SheetTitle>
            </SheetHeader>
            {/* The FoodsPage component will render the UI for food management */}
            <div className="mt-4">
              <FoodsPage />
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="space-y-2">
        {meal.foods.length > 0 ? (
          meal.foods.map((food, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-md border bg-neutral-50/50">
              <span className="font-medium text-sm sm:text-base">{food.name}</span>
              <div className="flex items-center gap-2 sm:gap-4 text-xs">
                  <InfoRow icon={<Flame size={12} />} label="Cal" value={food.calories.toFixed(0)} unit="" />
                  <InfoRow icon={<Drumstick size={12} />} label="P" value={food.protein.toFixed(1)} unit="g" />
                  <InfoRow icon={<Wheat size={12} />} label="C" value={food.carbohydrates.toFixed(1)} unit="g" />
                  <InfoRow icon={<Beef size={12} />} label="F" value={food.fat.toFixed(1)} unit="g" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500 text-center py-4">No foods added to this meal yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
