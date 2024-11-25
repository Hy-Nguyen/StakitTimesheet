import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';
import MonthView from './month/MonthView';

export default function ViewManager() {
  const { currentTab } = useTimesheet();
  function renderTab() {
    switch (currentTab) {
      case 'day':
        return <h1>Day</h1>;
      case 'week':
        return <h1>Week</h1>;
      case 'month':
        return <MonthView />;
    }
  }
  return <div>{renderTab()}</div>;
}
