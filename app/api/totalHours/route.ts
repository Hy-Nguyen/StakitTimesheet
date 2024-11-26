import getAllEntries from '@/features/timesheet/Overview/hooks/getAllEntries';
import { getMonth, getYear, parseISO } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse<MonthlyReport>> {
  const body = await req.json();
  const { month, year } = body;

  const entries = await getAllEntries();

  const currentDate = new Date();
  const currentMonth = month - 1 ?? currentDate.getMonth(); // Default to current month if no month is provided
  const currentYear = year ?? currentDate.getFullYear(); // Default to current year if no year is provided

  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  const uniqueDays = new Set<string>();

  entries?.forEach((entry: Entry) => {
    if (!entry.duration || !entry.start_time) return;

    const entryDate = parseISO(entry.start_time);
    if (getMonth(entryDate) !== currentMonth || getYear(entryDate) !== currentYear) return; // Filter by month and year

    uniqueDays.add(entryDate.toISOString().split('T')[0]); // Track unique days

    const [hours, minutes, seconds] = entry.duration.split(':').map(Number);
    totalHours += hours;
    totalMinutes += minutes;
    totalSeconds += seconds;
  });

  // Convert excess seconds to minutes
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;

  // Convert excess minutes to hours
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  // Format the result as hh:mm:ss
  const formattedHours = String(totalHours).padStart(2, '0');
  const formattedMinutes = String(totalMinutes).padStart(2, '0');

  const numberOfDaysWorked = uniqueDays.size;
  const averageHoursPerDay = numberOfDaysWorked > 0 ? (totalHours + totalMinutes / 60) / numberOfDaysWorked : 0;

  return NextResponse.json({
    totalTime: {
      hours: formattedHours,
      minutes: formattedMinutes,
    },
    month: currentMonth + 1, // Adding 1 because getMonth() returns 0-indexed month
    year: currentYear,
    daysWorked: numberOfDaysWorked,
    avgHourPerDay: averageHoursPerDay.toFixed(2), // Format to 2 decimal places
  });
}
