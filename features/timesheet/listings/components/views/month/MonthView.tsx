import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import MonthSelector from './MonthSelector';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonthView() {
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  useEffect(() => {
    const getMonthlyReport = async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/totalHours`, {
        month: 11,
        year: 2024,
      });
      setMonthlyReport(response.data);

    };
    getMonthlyReport();
  }, []);

  const arrayStats = [
    { title: 'Total Hours', value: `${monthlyReport?.totalTime.hours} hrs ${monthlyReport?.totalTime.minutes} mins` },
    { title: 'Days Worked', value: monthlyReport?.daysWorked },
    { title: 'Avg. Hours a Day', value: monthlyReport?.avgHourPerDay },
  ];
  return (
    <div className="flex min-h-fit w-full flex-col gap-2 rounded-md border border-border p-4">
      <MonthSelector />
      <div className="flex w-full flex-row gap-4">
        {arrayStats.map((stat) => (
          <StateDisplay key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
}

function StateDisplay({ title, value }: { title: string; value: string | number | undefined }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-muted p-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
