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
  resetForm: () => void;
  errors: SubmissionErrors | null | undefined;
  setErrors: Dispatch<SetStateAction<SubmissionErrors | null | undefined>>;
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
  resetForm: () => {},
  errors: null,
  setErrors: () => {},
});

export const useTimesheet = () => {
  const context = useContext(TimesheetContext);
  if (context === undefined) {
    throw new Error('useTimesheet must be used within a useTimesheet');
  }
  return context;
};

export const TimesheetProvider = ({ children }: { children: ReactNode }) => {
  const todayAtMidnight = new Date();
  todayAtMidnight.setHours(0, 0, 0, 0);
  const todayMorning = new Date();
  todayMorning.setHours(8, 0, 0, 0);
  const todayNoon = new Date();
  todayNoon.setHours(12, 0, 0, 0);
  const [title, setTitle] = useState<string | null>(null);
  const [workDate, setWorkDate] = useState<Date>(todayAtMidnight);
  const [startTime, setStartTime] = useState<Date>(todayMorning);
  const [endTime, setEndTime] = useState<Date>(todayNoon);
  const [duration, setDuration] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [fileAttachment, setFileAttachment] = useState<string | null>(null);
  const [errors, setErrors] = useState<SubmissionErrors | null | undefined>(null);

  useEffect(() => {
    const durationInMs = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

    const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    setDuration(formattedDuration);
  }, [startTime, endTime]);

  useEffect(() => {
    const updateTimesWithNewDate = (time: Date, newDate: Date) => {
      const updatedTime = new Date(newDate);
      updatedTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
      return updatedTime;
    };

    setStartTime((prevStartTime) => updateTimesWithNewDate(prevStartTime, workDate));
    setEndTime((prevEndTime) => updateTimesWithNewDate(prevEndTime, workDate));
  }, [workDate]);

  function resetForm() {
    setTitle(null);
    setWorkDate(todayAtMidnight);
    setStartTime(todayMorning);
    setEndTime(todayNoon);
    setDuration(null);
    setCategory(null);
    setDescription(null);
    setMeetingLink(null);
    setFileAttachment(null);
  }

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
        resetForm,
        errors,
        setErrors,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  );
};
