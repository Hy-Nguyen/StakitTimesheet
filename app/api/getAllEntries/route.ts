import { NextResponse } from 'next/server';

import getAllEntries from '@/features/timesheet/Overview/hooks/getAllEntries';

export async function GET() {
  const entries = await getAllEntries();
  let sortedEntries = entries?.sort((a: Entry, b: Entry) => {
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
  });
  return NextResponse.json(sortedEntries);
}
