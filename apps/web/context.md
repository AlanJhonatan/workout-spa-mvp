# Backend API Overview

An SPA made with Vite + React and Shadcn + TailwindCSS.

# Stack
- Vite
- React
- Typescript
- Shadcn
- TailwindCSS
- Zustand
- Axios

# Rules
- Every style is thinking on mobile-first principle.
- Component organization follows **Feature-Based Architecture**

### Folder Structure

In this project the folder structure is based on **'features/'** module.

```
src/
├── features/                    # Feature-based modules
│   ├── MealSchedule/           # MealSchedule feature (main)
│   │   ├── components/
│   │   │   ├── MealCard/
│   │   │   │   └── MealCard.tsx
│   │   │   ├── MealsList/
│   │   │   │   └── MealsList.tsx
│   │   │   ├── MealSummary/
│   │   │   │   └── MealSummary.tsx
│   │   │   ├── DaySelector/
│   │   │   │   └── DaySelector.tsx
│   │   │   ├── MealFoodItem/
│   │   │   │   └── MealFoodItem.tsx
│   │   │   ├── MealItemInfo/
│   │   │   │   └── MealItemInfo.tsx
│   │   │   └── Foods/            # Sub-feature for Food management
│   │   │       ├── FoodsManagement.tsx
│   │   │       ├── FoodsList.tsx
│   │   │       └── FoodProfileSheet.tsx
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── MealSchedulePage.tsx  # Feature page
│   │   └── index.ts             # Barrel export
│   └── Workout/                 # WIP
├── components/                   # Generic, reusable components
│   ├── ui/                      # Shadcn UI components
│   ├── layout/
│   └── nav/
├── lib/                         # Utilities & services
│   ├── api.ts                  # Axios instance
│   └── utils.ts
├── types/                       # Global types
├── App.tsx
└── main.tsx
```

### Feature: MealSchedule

**Responsibility**: Managing the daily meal schedule, adding/removing meals, and managing foods within meals.

**Components**:
- `MealSchedulePage`: Main page component
- `MealCard`: Individual meal card with food list
- `MealsList`: Container for multiple meal cards
- `MealSummary`: Daily macro summary (calories, protein, carbs, fat)
- `DaySelector`: Day of week tabs
- `MealFoodItem`: Individual food item within a meal
- `MealItemInfo`: Reusable macro info display
- `FoodsManagement`: Main container for food selection and management
- `FoodsList`: Scrollable list of foods
- `FoodProfileSheet`: Sheet to adjust portion and confirm addition

**Data Flow**:
MealSchedulePage (state) → MealsList → MealCard → (click Add Food) → FoodsManagement → FoodsList → (select food) → FoodProfileSheet → confirm → (back to MealCard with new food)

### Context/Stores/Hooks Structure

The `MealSchedule` feature includes:

*Stores* (Zustand)
- MealStore
  - actions: mealsList, addMeal, removeMeal, addFood, removeFood

*Hooks*
- useFoods
  - searchFoods, getFoodById