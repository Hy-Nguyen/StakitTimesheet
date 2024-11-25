import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';

export default function MonthView() {
  const { listings } = useTimesheet();
  return (
    <div className="flex min-h-fit w-full flex-col gap-2 rounded-md border border-border p-2">
      <div>Month Select</div>
      <div>Month Details</div>
    </div>
  );
}
