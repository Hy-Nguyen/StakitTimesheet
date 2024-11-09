import { createClient } from '@/lib/supabase/server';

export default async function useSortListings() {
  const supabase = await createClient();
  const { data: listings, error } = await supabase.from('timesheet_time_entries').select('*');
  if (!listings) return [];

  // Helper function to convert duration string to minutes
  const durationToMinutes = (duration: string): number => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to convert minutes to HH:mm format
  const minutesToDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Group listings by date
  const groupedByDate = listings.reduce((acc: { [key: string]: any[] }, listing) => {
    const date = new Date(listing.start_time).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(listing);
    return acc;
  }, {});

  // Convert the grouped object into an array with date, entries, and total duration
  const sortedListings = Object.entries(groupedByDate)
    .map(([date, entries]) => {
      // Calculate total duration for this date
      const totalMinutes = entries.reduce((sum, entry) => {
        if (entry.duration) {
          const [hours, minutes] = entry.duration.split(':');
          return sum + durationToMinutes(entry.duration);
        }
        return sum;
      }, 0);

      return {
        date,
        entries,
        netHours: minutesToDuration(totalMinutes),
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return sortedListings;
}
