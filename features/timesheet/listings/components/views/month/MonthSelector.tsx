import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MonthSelector() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <button className="flex aspect-square w-fit items-center justify-center rounded-md border p-1 transition-colors duration-500 hover:bg-muted">
        <ChevronLeft className="-translate-x-0.5" />
      </button>
      <h1 className="text-xl font-semibold">November 2024</h1>
      <button className="flex aspect-square w-fit items-center justify-center rounded-md border p-1 transition-colors duration-500 hover:bg-muted">
        <ChevronRight />
      </button>
    </div>
  );
}
