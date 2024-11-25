'use client';

import { Dispatch, SetStateAction } from 'react';
import { useTimesheet } from '@/features/timesheet/CreateListing/providers/TimesheetContext';

export default function Tabs() {
  const { currentTab } = useTimesheet();
  const tabs: {
    value: Tab;
    label: string;
  }[] = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  // Calculate the position of the sliding indicator
  const activeIndex = tabs.findIndex((tab) => tab.value === currentTab);
  const indicatorStyle = {
    left: `calc(${activeIndex * (100 / tabs.length)}% + 4px)`,
    width: `calc(${100 / tabs.length}% - 4px)`,
  };

  return (
    <div className="relative flex w-full flex-row rounded-md border border-border bg-muted p-1">
      <div
        className="absolute h-[calc(100%-0.5rem)] rounded-md bg-primary-foreground shadow transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
      {tabs.map((tab) => (
        <TabButtons key={tab.value} tab={tab.value} selectedTab={currentTab} label={tab.label} />
      ))}
    </div>
  );
}

function TabButtons({ tab, selectedTab, label }: { tab: Tab; selectedTab: Tab; label: string }) {
  const { setCurrentTab } = useTimesheet();
  return (
    <button
      className={`relative flex-1 rounded-md py-2 text-center text-primary transition-colors ${
        !(selectedTab === tab) && 'hover:text-muted-foreground'
      }`}
      onClick={() => {
        setCurrentTab(tab);
      }}
    >
      {label}
    </button>
  );
}
