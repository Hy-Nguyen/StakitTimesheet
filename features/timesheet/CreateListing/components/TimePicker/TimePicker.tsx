import { useCloseDropdown } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { SetStateAction, Dispatch, useRef, useState, useEffect } from 'react';
import TimeInput from './TimePickerDisplay';
import TimePickerItem from './TimePickerItem';

export default function TimePicker({
  selectedTime,
  setSelectedTime,
}: {
  selectedTime: Date;
  setSelectedTime: Dispatch<SetStateAction<Date>>;
}) {
  const timePickerRef = useRef<HTMLDivElement>(null);
  useCloseDropdown(timePickerRef, () => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);

  const [hour, setHour] = useState(() => {
    const hours = selectedTime.getHours();
    return hours % 12 === 0 ? '12' : String(hours % 12).padStart(2, '0');
  });

  const [minute, setMinute] = useState(() => {
    return String(selectedTime.getMinutes()).padStart(2, '0');
  });

  const [period, setPeriod] = useState(() => {
    return selectedTime.getHours() >= 12 ? 'PM' : 'AM';
  });

  const hours = Array.from({ length: 12 }, (_, i) => (i < 9 ? `0${i + 1}` : `${i + 1}`));
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  const periods = ['AM', 'PM'];

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setHour(selectedTime.getHours() % 12 === 0 ? '12' : String(selectedTime.getHours() % 12).padStart(2, '0'));
    setMinute(String(selectedTime.getMinutes()).padStart(2, '0'));
    setPeriod(selectedTime.getHours() >= 12 ? 'PM' : 'AM');
  }, [selectedTime]);

  useEffect(() => {
    function updateSelectedTime(hour: string, minute: string, period: string) {
      let hours24 = parseInt(hour, 10);
      if (period === 'PM' && hours24 !== 12) {
        hours24 += 12;
      } else if (period === 'AM' && hours24 === 12) {
        hours24 = 0;
      }
      selectedTime.setHours(hours24, parseInt(minute, 10), 0, 0);
    }

    updateSelectedTime(hour, minute, period);
    setSelectedTime(new Date(selectedTime)); // Ensure state update
  }, [hour, minute, period]);

  return (
    <div className="relative w-full" ref={timePickerRef}>
      <button
        onClick={handleClick}
        className="flex h-10 w-full flex-row items-center justify-start gap-4 rounded-md border border-main-400 bg-main-200 px-4 text-left font-normal dark:border-main-400 dark:bg-main dark:text-mono-100"
      >
        <Clock className="h-4 w-4" />
        <TimeInput
          hours={hour}
          minutes={minute}
          period={period}
          setHours={setHour}
          setMinutes={setMinute}
          setPeriod={setPeriod}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="time-picker"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-12 z-10 grid h-fit w-full grid-cols-3 gap-2 overflow-hidden rounded-md border border-main-400 bg-main-200 p-2 dark:border-main-400 dark:bg-main"
          >
            <TimePickerItem listItem={hours} currentState={hour} setState={setHour} />
            <TimePickerItem listItem={minutes} currentState={minute} setState={setMinute} />
            <TimePickerItem listItem={periods} currentState={period} setState={setPeriod} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
