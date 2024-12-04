import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createExcel } from '../../../hooks/createExcel';
import { useState } from 'react';
export default function MonthSelector() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <button className="flex aspect-square w-fit items-center justify-center rounded-md border p-1 transition-colors duration-500 hover:bg-muted">
        <ChevronLeft className="-translate-x-0.5" />
      </button>
      <div>
        <h1 className="text-xl font-semibold">November 2024</h1>
        <button onClick={() => createExcel(setLoading, 'test', 'test', 11)}>download</button>
      </div>
      <button className="flex aspect-square w-fit items-center justify-center rounded-md border p-1 transition-colors duration-500 hover:bg-muted">
        <ChevronRight />
      </button>
    </div>
  );
}
