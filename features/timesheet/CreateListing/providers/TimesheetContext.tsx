import { createContext, useEffect, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';

export interface TimesheetContext {
  title: string | null;
  setTitle: Dispatch<SetStateAction<string | null>>;
  workDate: Date;
  setWorkDate: Dispatch<SetStateAction<Date>>;
  startTime: Date;
  setStartTime: Dispatch<SetStateAction<Date>>;
  endTime: Date;
  setEndTime: Dispatch<SetStateAction<Date>>;
  duration: string | null;
  setDuration: Dispatch<SetStateAction<string | null>>;
  category: string | null;
  setCategory: Dispatch<SetStateAction<string | null>>;
  description: string | null;
  setDescription: Dispatch<SetStateAction<string | null>>;
  meetingLink: string | null;
  setMeetingLink: Dispatch<SetStateAction<string | null>>;
  fileAttachment: string | null;
  setFileAttachment: Dispatch<SetStateAction<string | null>>;
}

export const TimesheetContext = createContext<TimesheetContext>({
  title: null,
  setTitle: () => {},
  workDate: new Date(),
  setWorkDate: () => {},
  startTime: new Date(),
  setStartTime: () => {},
  endTime: new Date(),
  setEndTime: () => {},
  duration: null,
  setDuration: () => {},
  category: null,
  setCategory: () => {},
  description: null,
  setDescription: () => {},
  meetingLink: null,
  setMeetingLink: () => {},
  fileAttachment: null,
  setFileAttachment: () => {},
});

export const useTimesheet = () => {
  const context = useContext(TimesheetContext);
  if (context === undefined) {
    throw new Error('useTimesheet must be used within a useTimesheet');
  }
  return context;
};

export const TimesheetProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [workDate, setWorkDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [fileAttachment, setFileAttachment] = useState<string | null>(null);

  useEffect(() => {
    const durationInMs = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

    const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    setDuration(formattedDuration);
  }, [startTime, endTime]);

  return (
    <TimesheetContext.Provider
      value={{
        title,
        setTitle,
        workDate,
        setWorkDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        duration,
        setDuration,
        category,
        setCategory,
        description,
        setDescription,
        meetingLink,
        setMeetingLink,
        fileAttachment,
        setFileAttachment,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  );
};
