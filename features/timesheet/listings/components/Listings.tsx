import { formatDuration } from '../helpers/Formatters';
import useSortListings from '../hooks/useSortListings';
import ListingItem from './table/ListingItem';
import TableHeader from './table/TableHeader';

export default async function Listings() {
  let sortedListings = await useSortListings();

  return (
    <div className="container w-full rounded-md border border-black p-4 text-black dark:border-main-300 dark:text-white">
      <table className="w-full">
        <thead>
          <TableHeader />
        </thead>
        <tbody className="flex flex-col gap-2">
          {sortedListings.map((listing) => (
            <>
              <tr
                key={listing.date + Math.random()}
                className="grid w-full grid-cols-7 items-center gap-4 *:text-center"
              >
                <td className="col-span-full flex flex-row items-center gap-4 border-b border-main-200 py-2 text-2xl">
                  <h1>Date: {listing.date}</h1> |<h1> Hours: {formatDuration(listing.netHours)}</h1>
                </td>
              </tr>
              {listing.entries.map((entry: any) => (
                <ListingItem key={entry.entry_id} entry={entry} />
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
