import getSortedListings from '@/features/timesheet/listings/hooks/getSortedListings';
import { NextResponse } from 'next/server';

interface Response {
  data?: Listing[];
  error?: string;
}
export async function GET(): Promise<NextResponse<Response>> {
  try {
    const sortedListings = await getSortedListings();
    return NextResponse.json({ data: sortedListings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sorted listings' });
  }
}
