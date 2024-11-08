'use client';

import Input from './components/Input';

import React, { useState } from 'react';
import { DatePicker } from './components/DatePicker';
import TimePicker from './components/TimePicker/TimePicker';
import CategoryDropdown from './components/CategoryDropdown';
import { TimesheetProvider } from './providers/TimesheetContext';
import CreateTimeSheetForm from './components/CreateTimeSheetForm';
import DebugWindow from './DebugWindow';
export default function CreateListing() {
  return (
    <div className="container flex w-full flex-col gap-6 rounded-md px-0 text-black dark:text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Timesheet Entry</h2>
      <TimesheetProvider>
        <CreateTimeSheetForm />
        <DebugWindow />
      </TimesheetProvider>
    </div>
  );
}
