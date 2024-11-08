'use client';

import CreateTimeSheetForm from './components/CreateTimeSheetForm';

import { TimesheetProvider } from './providers/TimesheetContext';
export default function CreateListing() {
  return (
    <div className="container flex w-full flex-col gap-6 rounded-md px-0 text-black dark:text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Timesheet Entry</h2>
      <TimesheetProvider>
        <CreateTimeSheetForm />
      </TimesheetProvider>
    </div>
  );
}
