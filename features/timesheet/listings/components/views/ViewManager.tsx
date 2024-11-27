import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import MonthView from './month/MonthView';
import WeekView from './week/WeekView';
import DayView from './day/DayView';
import { AnimatePresence } from 'framer-motion';

export default function ViewManager() {
  const { currentTab } = useTimesheet();
  function renderTab() {
    switch (currentTab) {
      case 'day':
        return <DayView />;
      case 'week':
        return <WeekView />;
      case 'month':
        return <MonthView />;
    }
  }
  return (
    <div>
      <AnimatePresence>{renderTab()}</AnimatePresence>
    </div>
  );
}
