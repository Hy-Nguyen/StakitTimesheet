import { createClient } from '@/lib/supabase/server';

export default async function getAllEntries() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('timesheet_time_entries').select('*');
  return data;
}

export async function getTotalHours() {
  const entries = await getAllEntries();

  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  entries?.forEach((entry) => {
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
