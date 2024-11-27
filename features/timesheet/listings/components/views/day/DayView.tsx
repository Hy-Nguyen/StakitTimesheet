import { useState } from 'react';
import { format } from 'date-fns';
import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import { convertTimeToMinutes } from '@/lib/utils';
import EntryCard from './EntryCard';
import { motion } from 'framer-motion';
export default function DayView() {
  const [date, setDate] = useState(new Date());
  const { entries } = useTimesheet();
  let todayEntries = entries.filter((entry) => new Date(entry.start_time).getDate() === date.getDate());
  console.log(todayEntries);

  let totalHours = todayEntries.reduce((acc, entry) => acc + convertTimeToMinutes(entry.duration) / 60, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-fit w-full flex-col gap-2 rounded-md border border-border p-4"
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold">
          {date.getDate() === new Date().getDate() ? 'Today' : format(date, 'MMM d, yyyy')}
        </h1>
        <p className="text-sm text-muted-foreground">Total: {totalHours} hrs</p>
      </div>
      {/* Entries */}
      <div className="flex w-full flex-col gap-2">
        {todayEntries.map((entry) => (
          <EntryCard key={entry.entry_id} entry={entry} />
        ))}
      </div>
    </motion.div>
  );
}
