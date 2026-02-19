import React from "react";

interface MealItemInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
}

export function MealItemInfo({
  icon,
  label,
  value,
  unit,
}: MealItemInfoProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-600">
      {icon}
      <span className="hidden sm:inline">{label}:</span>
      <span className="font-semibold text-neutral-800">
        {value}
        {unit}
      </span>
    </div>
  );
}
