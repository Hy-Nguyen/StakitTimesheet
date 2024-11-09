import { createClient } from '@/lib/supabase/server';
import { formatDuration, getCategoryName, formatDate } from '../helpers/Formatters';
import useSortListings from '../hooks/useSortListings';
import TableHeader from './table/TableHeader';

export default async function Listings() {
  let sortedListings = await useSortListings();

  return (
    <div className="container w-full rounded-md border border-black p-4 text-black dark:border-main-300 dark:text-white">
      <table className="w-full">
        <TableHeader />
        <tbody key="list" className="flex flex-col gap-2">
          {sortedListings.map((listing) => (
            <>
              <tr key={listing.date} className="grid w-full grid-cols-7 items-center gap-4 *:text-center">
                <td className="col-span-full flex flex-row items-center gap-4 border-b border-main-200 py-2 text-2xl">
                  <h1>Date: {listing.date}</h1> |<h1> Hours: {formatDuration(listing.netHours)}</h1>
                </td>
              </tr>
              {listing.entries.map((entry: any) => (
                <tr key={entry.entry_id} className="grid w-full grid-cols-7 items-center gap-4 *:text-center">
                  <td>{formatDate(entry.start_time)}</td>
                  <td>{formatDate(entry.end_time)}</td>
                  <td>{formatDuration(entry.duration)}</td>
                  <td>{getCategoryName(entry.category_id)}</td>
                  <td className="col-span-2 line-clamp-2">{entry.description}</td>
                  <td className="max-w-full truncate">
                    <a
                      href={entry.meeting_link ?? ''}
                      className={entry.meeting_link ? 'text-accent-ts underline underline-offset-4' : 'text-gray-500'}
                      target="_blank"
                    >
                      {entry.meeting_link ? 'Around Meeting' : 'N/A'}
                    </a>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
