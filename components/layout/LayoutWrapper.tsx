'use client';
import { TimesheetProvider } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import { Toaster } from 'react-hot-toast';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TimesheetProvider>
        <Toaster />
        {children}
      </TimesheetProvider>
    </>
  );
}
