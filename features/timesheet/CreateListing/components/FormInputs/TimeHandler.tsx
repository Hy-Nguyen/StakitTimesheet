import TimePicker from '../TimePicker/TimePicker';

import { useTimesheet } from '../../providers/TimesheetContext';
import ErrorMessage from './ErrorMessage';

export default function TimeHandler() {
  const { startTime, setStartTime, endTime, setEndTime, errors } = useTimesheet();
  return (
    <div className="col-span-2 flex w-full flex-col gap-2">
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-1/2 flex-col gap-4">
          <label htmlFor="startTime">Start Time:</label>
          <TimePicker selectedTime={startTime} setSelectedTime={setStartTime} />
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <label htmlFor="endTime">End Time:</label>
          <TimePicker selectedTime={endTime} setSelectedTime={setEndTime} />
        </div>
      </div>
      <ErrorMessage error={errors?.duration} />
    </div>
  );
}
