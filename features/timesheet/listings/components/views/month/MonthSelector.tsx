import { ChevronLeft, ChevronRight, FolderDownIcon } from 'lucide-react';
import { createExcel } from '../../../hooks/createExcel';
import { useState } from 'react';
import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
export default function MonthSelector() {
  const { displayMonth, setDisplayMonth, displayYear, setDisplayYear } = useTimesheet();
  const [loading, setLoading] = useState(false);

  // Create a function to handle the month change that is mindful of the year change
  const handleMonthChange = (month: number) => {
    if (month < 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else if (month > 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(month);
    }
  };
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <button
        onClick={() => handleMonthChange(displayMonth - 1)}
        className="flex aspect-square w-fit items-center justify-center rounded-md border p-1 transition-colors duration-500 hover:bg-muted"
      >
        <ChevronLeft className="-translate-x-0.5" />
      </button>
      <div className="flex flex-row items-center gap-6">
        <h1 className="text-xl font-semibold">
          {new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h1>
        <button
          onClick={() =>
            createExcel(
              setLoading,
              new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long', year: 'numeric' }) +
                ' Hours',
              new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long', year: 'numeric' }),
              displayMonth + 1
            )
          }
        >
          <FolderDownIcon />
        </button>
      </div>
      <button
        onClick={() => handleMonthChange(displayMonth + 1)}
        className="flex aspect-square w-fit items-center justify-center rounded-md border p-1 transition-colors duration-500 hover:bg-muted"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
