'use client';

import { useTimesheet } from '../../CreateListing/providers/TimesheetContext';
import Tabs from './tabs/Tabs';
import ViewManager from './views/ViewManager';
import { useEffect } from 'react';
import axios from 'axios';

export default function Listings() {
  const { listings, setListings, entries, setEntries } = useTimesheet();

  useEffect(() => {
    const getListings = async () => {
      let sortedListings: { data: Listing[] } = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/getSortedListings`)
        .then((res) => res.data);
      setListings(sortedListings.data);
      setEntries(sortedListings.data.flatMap((listing) => listing.entries));
    };
    if (listings.length === 0 || entries.length === 0) {
      getListings();
    }
  }, [entries, listings]);

  return (
    <div className="container flex w-full flex-col gap-4 px-0">
      <Tabs />
      <ViewManager />
    </div>
  );
}
