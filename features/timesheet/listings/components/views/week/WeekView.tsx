import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, addWeeks, subWeeks } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import { convertTimeToMinutes } from '@/lib/utils';
import { motion } from 'framer-motion';
export default function WeekView() {
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const { entries, selectedDate: date, setSelectedDate: setDate, setCurrentTab } = useTimesheet();

  const weekStart = startOfWeek(displayedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(displayedDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const weekEntries = entries.filter(
    (entry) => new Date(entry.start_time) >= weekStart && new Date(entry.start_time) <= weekEnd
  );

  console.log('ENTRIES', weekEntries);

  const totalHours = weekEntries.reduce((acc, entry) => acc + convertTimeToMinutes(entry.duration) / 60, 0);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subWeeks(displayedDate, 1) : addWeeks(displayedDate, 1);
    setDisplayedDate(newDate);
  };

  const handleDaySelect = (day: Date) => {
    setDate(day);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              navigateWeek('prev');
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle>
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              navigateWeek('next');
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center text-muted-foreground">Total: {totalHours.toFixed(1)} hours</div>
          <div className="space-y-2">
            {days.map((day) => {
              const dayEntries = weekEntries.filter(
                (entry) => format(new Date(entry.start_time), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
              );
              const dayHours = dayEntries.reduce((acc, entry) => acc + convertTimeToMinutes(entry.duration) / 60, 0);
              const isSelected = format(day, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
              return (
                <Button
                  key={day.toISOString()}
                  variant={isSelected ? 'default' : isToday(day) ? 'secondary' : 'outline'}
                  className="w-full justify-between"
                  onClick={() => {
                    handleDaySelect(day);
                    setCurrentTab('day');
                  }}
                >
                  <span>{format(day, 'EEEE, MMM d')}</span>
                  <span>{dayHours.toFixed(1)} hours</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
