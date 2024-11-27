import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import { convertTimeToMinutes } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import EntryCard from './EntryCard';
export default function DayView() {
  const { entries, selectedDate: date } = useTimesheet();
  const todayEntries = entries.filter((entry) => new Date(entry.start_time).getDate() === date.getDate());
  const totalHours = todayEntries.reduce((acc, entry) => acc + convertTimeToMinutes(entry.duration) / 60, 0);

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
        {todayEntries.length > 0 ? (
          todayEntries.map((entry) => <EntryCard key={entry.entry_id} entry={entry} />)
        ) : (
          <p className="text-center text-lg font-medium">No entries for this day</p>
        )}
      </div>
    </motion.div>
  );
}
