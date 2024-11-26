import { createClient } from '@/lib/supabase/server';
import axios from 'axios';
export default async function getAllEntries() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('timesheet_time_entries').select('*');
  return data;
}

export async function getTotalHours() {
  const entries = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getSortedListings`);

  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  entries?.data?.forEach((entry: Entry) => {
    if (!entry.duration) return;
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

  return `${formattedHours} hours and ${formattedMinutes} minutes`;
}

import { parseISO, getMonth, getYear } from 'date-fns';

export async function getTotalHoursForMonthAndYear(month?: number, year?: number) {
  const entries = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getSortedListings`);

  const currentDate = new Date();
  const currentMonth = month ?? currentDate.getMonth(); // Default to current month if no month is provided
  const currentYear = year ?? currentDate.getFullYear(); // Default to current year if no year is provided

  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  entries?.data?.forEach((entry: Entry) => {
    if (!entry.duration || !entry.start_time) return;

    const entryDate = parseISO(entry.start_time);
    if (getMonth(entryDate) !== currentMonth || getYear(entryDate) !== currentYear) return; // Filter by month and year

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

  return `${formattedHours} hours and ${formattedMinutes} minutes`;
}
