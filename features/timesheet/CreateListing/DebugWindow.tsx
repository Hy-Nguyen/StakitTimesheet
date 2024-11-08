import { useTimesheet } from './providers/TimesheetContext';

export default function DebugWindow() {
  const { title, workDate, startTime, endTime, duration, category, description, meetingLink, fileAttachment } =
    useTimesheet();
  return (
    <div className="flex flex-col gap-2 rounded-md bg-black p-4 text-white">
      <h1>Title: {title ?? 'No title'}</h1>
      <p>Work Date: {workDate.toLocaleDateString() ?? 'No work date'}</p>
      <p>Start Time: {startTime.toLocaleTimeString() ?? 'No start time'}</p>
      <p>End Time: {endTime.toLocaleTimeString() ?? 'No end time'}</p>
      <p>Duration: {duration ?? 'No duration'}</p>
      <p>Category: {category ?? 'No category'}</p>
      <p>Description: {description ?? 'No description'}</p>
      <p>Meeting Link: {meetingLink ?? 'No meeting link'}</p>
      <p>File Attachment: {fileAttachment ?? 'No file attachment'}</p>
    </div>
  );
}
