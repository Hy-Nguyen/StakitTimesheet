import { useTimesheet } from '../providers/TimesheetContext';
import CategoryDropdown from './CategoryDropdown';
import { DatePicker } from './DatePicker';
import Input from './Input';
import TextArea from './TextArea';
import TimePicker from './TimePicker/TimePicker';

export default function CreateTimeSheetForm() {
  const {
    title,
    setTitle,
    workDate,
    setWorkDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    description,
    setDescription,
    meetingLink,
    setMeetingLink,
    fileAttachment,
    setFileAttachment,
  } = useTimesheet();
  return (
    <form className="grid w-full grid-cols-4 gap-4" action="">
      <Input label="Entry Title" id="entryTitle" placeholder="Enter Title" value={title} setValue={setTitle} />
      <div className="flex flex-col gap-4">
        <label htmlFor="workDate">Work Date:</label>
        <DatePicker id="workDate" date={workDate} setDate={setWorkDate} />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="startTime">Start Time:</label>
        <TimePicker selectedTime={startTime} setSelectedTime={setStartTime} />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="endTime">End Time:</label>
        <TimePicker selectedTime={endTime} setSelectedTime={setEndTime} />
      </div>
      <div className="flex flex-col gap-4">
        <CategoryDropdown />
        <Input
          label="Meeting Link"
          id="meetingLink"
          placeholder="Enter Meeting Link"
          value={meetingLink}
          setValue={setMeetingLink}
        />
      </div>
      <TextArea label="Description" id="description" value={description} setValue={setDescription} />
    </form>
  );
}
