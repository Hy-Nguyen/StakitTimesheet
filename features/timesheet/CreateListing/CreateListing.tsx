'use client';

import { useState } from 'react';
import CreateTimeSheetForm from './components/CreateTimeSheetForm';

import { TimesheetProvider } from './providers/TimesheetContext';
export default function CreateListing() {
  const [view, setView] = useState<'start' | 'create'>('create');
  return (
    <div className="container flex w-full flex-col gap-6 rounded-md px-0 text-black dark:text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Timesheet Entry</h2>
      <div className="flex flex-row gap-4">
        <button
          className={`rounded-md border border-black p-2 transition-colors duration-200 ${view === 'start' ? 'bg-accent-ts' : 'hover:bg-accent-ts/25'}`}
          onClick={() => setView('start')}
        >
          Start
        </button>
        <button
          className={`rounded-md border border-black p-2 transition-colors duration-200 ${view === 'create' ? 'bg-accent-ts' : 'hover:bg-accent-ts/25'}`}
          onClick={() => setView('create')}
        >
          Create
        </button>
      </div>
      <TimesheetProvider>{view === 'create' ? <CreateTimeSheetForm /> : <div>Start</div>}</TimesheetProvider>
    </div>
  );
}
