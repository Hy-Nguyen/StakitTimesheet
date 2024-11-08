'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker({ id, date, setDate }: { id: string; date: Date; setDate: Dispatch<SetStateAction<Date>> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          id={id}
          className={cn(
            'w-full justify-start border-main-400 bg-main-200 text-left font-normal dark:border-main-400 dark:bg-main dark:text-mono-100',
            !date && 'text-mono-500 dark:text-mono-300'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
