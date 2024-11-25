'use client';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { formatDate, formatDuration } from '../../helpers/Formatters';

export default function EditListingPopUp({ entry }: { entry: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-0 h-full w-full border border-white opacity-0"
      />
      <AnimatePresence>
        {isOpen && (
          <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="container relative flex flex-col gap-4 rounded-md bg-main-400 p-4">
              <button onClick={() => setIsOpen(false)} className="absolute right-0 top-0">
                x
              </button>
              <h1>Edit Listing</h1>
              <form action="" className="flex w-full flex-row gap-2">
                <input
                  type="text"
                  id="start_time"
                  name="start_time"
                  className="rounded-md bg-main-300 p-1"
                  defaultValue={formatDate(entry.start_time)}
                />
                <input
                  type="text"
                  id="end_time"
                  name="end_time"
                  className="rounded-md bg-main-300 p-1"
                  defaultValue={formatDate(entry.end_time)}
                />
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  className="rounded-md bg-main-300 p-1"
                  defaultValue={formatDuration(entry.duration)}
                />
                <input
                  type="text"
                  id="category_name"
                  name="category_name"
                  className="rounded-md bg-main-300 p-1"
                  defaultValue={entry.category_name}
                />
                <textarea
                  id="description"
                  name="description"
                  className="col-span-2 line-clamp-2 rounded-md bg-main-300 p-1"
                  defaultValue={entry.description}
                />
                <input
                  type="url"
                  id="meeting_link"
                  name="meeting_link"
                  className="max-w-full truncate rounded-md bg-main-300 p-1"
                  defaultValue={entry.meeting_link ?? 'N/A'}
                />
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
