import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

export async function getCategories() {
  const supabase = createClient();
  const { data } = await supabase.from('timesheet_categories').select('*');
  return data as Category[];
}
