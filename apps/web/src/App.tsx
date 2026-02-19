import { useState } from 'react';
import { BottomNavBar, type View } from './components/nav/BottomNavBar';
import { MealSchedulePage } from './features/MealSchedule/MealSchedulePage';

// A simple placeholder for the future Workouts page
const WorkoutsPage = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">Workouts</h1>
    <p className="text-muted-foreground">Workout tracking will be here soon!</p>
  </div>
);

// A simple placeholder for the future Dashboard page
const DashboardPage = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <p className="text-muted-foreground">Your progress dashboard will be here soon!</p>
  </div>
);

export function App() {
  const [activeView, setActiveView] = useState<View>('schedule');

  const renderView = () => {
    switch (activeView) {
      case 'schedule':
        return <MealSchedulePage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <MealSchedulePage />;
    }
  };

  return (
    // The main container for the app
    <div className="min-h-screen bg-neutral-50">
      
      {/* 
        The main content area. 
        We add padding-bottom to ensure content at the bottom of the page 
        isn't hidden by the fixed navigation bar. 'pb-24' should be enough
        to clear the nav bar's height.
      */}
      <main className="pb-24">
        {renderView()}
      </main>

      {/* The bottom navigation bar is fixed to the viewport */}
      <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
