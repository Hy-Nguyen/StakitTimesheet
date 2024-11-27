'use client';

import { useState } from 'react';
import { formatDuration, formatDate } from '../../../helpers/Formatters';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
export default function EntryCard({ entry }: { entry: Entry }) {
  const [expanded, setExpanded] = useState(false);

  const link = entry.meeting_link ? (
    <a
      href={entry.meeting_link}
      target="_blank"
      className="pl-2 text-sm font-normal text-muted-foreground underline underline-offset-2"
    >
      Meeting Recording
    </a>
  ) : (
    <span className="pl-2 text-sm font-normal text-muted-foreground">No Meeting Link</span>
  );

  return (
    <div className="flex w-full flex-col items-center justify-between rounded-md border border-border">
      <div className="flex w-full flex-row items-center justify-between gap-2 p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">{entry.entry_title}</h1>
          <p className="text-sm font-normal text-muted-foreground">
            {formatDate(entry.start_time)} - {formatDate(entry.end_time)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-right text-sm font-normal">{formatDuration(entry.duration)}</p>
          <p className="text-sm font-normal text-muted-foreground">{entry.category_name}</p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            key={entry.entry_id}
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className="flex w-full origin-top flex-col items-start justify-start gap-2 px-4 pb-2 transition-none"
          >
            <h2 className="text-sm font-semibold">Description:</h2>
            <p className="line-clamp-4 text-sm font-normal text-muted-foreground">{entry.description}</p>
            <h2 className="text-sm font-semibold">Meeting Link: {link}</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full flex-row items-center justify-center rounded-b-md bg-inherit py-1 transition-colors duration-500 ease-in-out hover:bg-muted"
      >
        <ChevronDown className={`transition-transform duration-500 ease-in-out ${expanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
