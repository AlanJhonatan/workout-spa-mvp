// src/components/nav/BottomNavBar.tsx
import { cn } from "@/lib/utils";
import { CalendarDays, LayoutDashboard, Dumbbell } from "lucide-react";
import React from "react";

export type View = "schedule" | "workouts" | "dashboard";

interface NavButtonProps {
  view: View;
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const NavButton = ({ label, isActive, onClick, icon }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-20 h-14 rounded-lg transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

interface BottomNavBarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const BottomNavBar = ({ activeView, setActiveView }: BottomNavBarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-sm border-t">
      <div className="flex justify-around items-center max-w-4xl mx-auto px-2 pb-safe">
        <NavButton
          view="schedule"
          label="Schedule"
          isActive={activeView === "schedule"}
          onClick={() => setActiveView("schedule")}
          icon={<CalendarDays size={20} />}
        />
        <NavButton
          view="workouts"
          label="Workouts"
          isActive={activeView === "workouts"}
          onClick={() => setActiveView("workouts")}
          icon={<Dumbbell size={20} />}
        />
        <NavButton
          view="dashboard"
          label="Dashboard"
          isActive={activeView === "dashboard"}
          onClick={() => setActiveView("dashboard")}
          icon={<LayoutDashboard size={20} />}
        />
      </div>
    </nav>
  );
};
