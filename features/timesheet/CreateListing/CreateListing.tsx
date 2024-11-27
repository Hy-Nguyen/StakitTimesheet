'use client';

import { useState } from 'react';
import CreateTimeSheetForm from './components/CreateTimeSheetForm';

export default function CreateListing() {
  const [view, setView] = useState<'start' | 'create'>('create');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container flex w-full flex-row items-center justify-between gap-6 rounded-md px-0 text-black dark:text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Timesheet</h2>
      <div className="flex flex-row gap-4">
        <button
          className={`rounded-md border p-2 transition-colors duration-500 ${view === 'start' ? 'bg-primary text-primary-foreground' : 'border-border bg-primary-foreground text-black hover:bg-primary/25 dark:text-white'}`}
          onClick={() => setView('start')}
        >
          Start
        </button>
        <button
          className={`rounded-md border p-2 transition-colors duration-500 ${view === 'create' ? 'bg-primary text-primary-foreground' : 'border-border bg-primary-foreground text-black hover:bg-primary/25 dark:text-white'}`}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setView('create');
          }}
        >
          Create
        </button>
      </div>

      {view === 'create' ? <CreateTimeSheetForm isOpen={isOpen} setIsOpen={setIsOpen} /> : <div>Start</div>}
    </div>
  );
}
