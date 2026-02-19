import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAYS_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function DaySelector() {
  return (
    <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
      {DAYS.map((day, index) => (
        <TabsTrigger key={day} value={day}>
          {DAYS_LABELS[index]}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
