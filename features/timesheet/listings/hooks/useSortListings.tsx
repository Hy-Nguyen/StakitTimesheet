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
    // Convert UTC to MST (UTC-7)
    const utcDate = new Date(listing.start_time);
    const mstDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/Denver' }));
    const date = mstDate.toLocaleDateString();

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(listing);

    return acc;
  }, {});

  // Convert the grouped object into an array with date, entries, and total duration
  const sortedListings = await Promise.all(
    Object.entries(groupedByDate).map(async ([date, entries]) => {
      // Calculate total duration for this date
      const totalMinutes = entries.reduce((sum, entry) => {
        if (entry.duration) {
          return sum + durationToMinutes(entry.duration);
        }
        return sum;
      }, 0);

      // Add category_name to each entry
      const entriesWithCategoryName = await Promise.all(
        entries.map(async (entry) => ({
          ...entry,
          category_name: await getCategoryName(entry.category_id),
        }))
      );

      return {
        date,
        entries: entriesWithCategoryName,
        netHours: minutesToDuration(totalMinutes),
      };
    })
  );

  return sortedListings;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from('timesheet_categories').select('*');
  return data;
}

export async function getCategoryName(category_id: string) {
  const categories = await getCategories();

  const category = categories?.find((c) => c.category_id === category_id);
  return category?.name;
}
