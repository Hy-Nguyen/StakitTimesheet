'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export default async function createListing({ payload }: { payload: Submission }) {
  const supabase = await createClient();

  try {
    await supabase.from('timesheet_time_entries').insert(payload);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
}
