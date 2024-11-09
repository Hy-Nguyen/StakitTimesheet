import { createClient } from '@/lib/supabase/server';

export function formatDuration(duration: string) {
  if (!duration) return 'Unfinished';
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return `${hours} hr ${minutes} min`;
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

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'MST',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}
