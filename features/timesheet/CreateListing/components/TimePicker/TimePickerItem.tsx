import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function TimePickerItem({
  listItem,
  currentState,
  setState,
}: {
  listItem: any[];
  currentState: any;
  setState: Dispatch<SetStateAction<any>>;
}) {
  const selectedRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [currentState]);

  return (
    <ul className="timesheet-scrollbar flex h-[150px] flex-col gap-2 overflow-y-auto">
      {listItem.map((item) => (
        <li
          ref={currentState === item ? selectedRef : null}
          className={cn(
            'cursor-pointer rounded-sm bg-inherit py-1 text-center transition-colors duration-200 hover:bg-white/10',
            currentState === item && 'bg-white/10 text-black dark:text-purple-200'
          )}
          onClick={() => setState(item)}
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
