'use client';

import { useRef, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import createListing from '../hooks/createListing';
import { formatDateForPostgres } from '../lib/helper';
import { useTimesheet } from '../providers/TimesheetContext';
import { SubmissionSchema } from '../schema';
import CategoryDropdown from './FormInputs/CategoryDropdown';
import { DatePicker } from './FormInputs/DatePicker';
import Input from './FormInputs/Input';
import TextArea from './FormInputs/TextArea';
import TimeHandler from './FormInputs/TimeHandler';

export default function CreateTimeSheetForm() {
  const {
    title,
    setTitle,
    workDate,
    setWorkDate,
    startTime,
    endTime,
    description,
    setDescription,
    meetingLink,
    setMeetingLink,
    category,
    resetForm,
    errors,
    setErrors,
    duration,
  } = useTimesheet();

  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = useCallback(
    (payload: Submission) => {
      setErrors(null);
      const result = SubmissionSchema.safeParse({ ...payload, duration });

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        toast.error('Please double check your entry.');
        return false;
      }
      return true;
    },
    [duration, setErrors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSending(true);

      const userId = process.env.NEXT_PUBLIC_USER_ID;
      if (!userId) {
        toast.error('User ID is not defined.');
        setIsSending(false);
        return;
      }

      const payload: Submission = {
        user_id: userId,
        entry_title: title,
        start_time: formatDateForPostgres(startTime),
        end_time: formatDateForPostgres(endTime),
        category_id: category,
        meeting_link: meetingLink,
        description,
      };

      if (!validateForm(payload)) {
        setIsSending(false);
        return;
      }

      try {
        const { success, message } = await createListing({ payload });
        if (success) {
          toast.success('Timesheet entry created successfully');
          resetForm();
        } else {
          toast.error(`Failed to create timesheet entry: ${message}`);
        }
      } catch (error) {
        toast.error('An unexpected error occurred.');
        console.error(error);
      } finally {
        setIsSending(false);
      }
    },
    [title, startTime, endTime, category, meetingLink, description, validateForm, resetForm]
  );

  return (
    <form className="grid w-full grid-cols-4 gap-4" onSubmit={handleSubmit} ref={formRef}>
      <Input
        label="Entry Title"
        placeholder="Enter Title"
        id="entryTitle"
        value={title}
        setValue={setTitle}
        error={errors?.entry_title}
      />

      <div className="flex flex-col gap-4">
        <label htmlFor="workDate">Work Date:</label>
        <DatePicker id="workDate" date={workDate} setDate={setWorkDate} />
      </div>

      <TimeHandler />

      <TextArea
        label="Description"
        value={description}
        id="description"
        setValue={setDescription}
        placeholder="Enter Description"
        error={errors?.description}
      />
      <div className="col-span-2 flex flex-col gap-4">
        <CategoryDropdown error={errors?.category_id} />
        <Input
          label="Meeting Link"
          id="meetingLink"
          placeholder="Enter Meeting Link (Optional)"
          value={meetingLink}
          setValue={setMeetingLink}
        />
      </div>
      <button
        type="submit"
        className="col-span-4 rounded-md bg-accent-ts py-2 transition-colors duration-200 hover:bg-[#5735d2] disabled:cursor-wait disabled:bg-main-300 disabled:text-black"
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
