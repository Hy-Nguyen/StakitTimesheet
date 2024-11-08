import CreateListing from '@/features/timesheet/CreateListing/CreateListing';
import Listings from '@/features/timesheet/listings/components/Listings';
import Overview from '@/features/timesheet/Overview/components/Overview';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <CreateListing />
      <Listings />
      <Overview />
    </main>
  );
}
