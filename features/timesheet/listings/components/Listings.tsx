'use client';

import { useTimesheet } from '../../CreateListing/providers/TimesheetContext';
import Tabs from './tabs/Tabs';
import ViewManager from './views/ViewManager';
import { useEffect } from 'react';
import axios from 'axios';

export default function Listings() {
  const { setListings } = useTimesheet();
  useEffect(() => {
    const getListings = async () => {
      let sortedListings: { data: Listing[] } = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/getSortedListings`)
        .then((res) => res.data);
      setListings(sortedListings.data);
      console.log(sortedListings.data);
    };
    getListings();
  }, []);

  return (
    <div className="container flex w-full flex-col gap-4 px-0">
      <Tabs />
      <ViewManager />
    </div>
  );
}

// async function Save() {
//   let sortedListings = await useSortListings();

//   return (
//     <div className="container w-full rounded-md border border-border p-4 text-black text-primary">
//       <table className="w-full">
//         <thead>
//           <TableHeader />
//         </thead>
//         <tbody className="flex flex-col gap-2">
//           {sortedListings.map((listing) => (
//             <>
//               <tr
//                 key={listing.date + Math.random()}
//                 className="grid w-full grid-cols-7 items-center gap-4 *:text-center"
//               >
//                 <td className="col-span-full flex flex-row items-center gap-4 border-b border-main-200 py-2 text-2xl">
//                   <h1>Date: {listing.date}</h1> |<h1> Hours: {formatDuration(listing.netHours)}</h1>
//                 </td>
//               </tr>
//               {listing.entries.map((entry: any) => (
//                 <ListingItem key={entry.entry_id} entry={entry} />
//               ))}
//             </>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
