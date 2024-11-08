import { z } from 'zod';

export const SubmissionSchema = z.object({
  user_id: z.string(),
  entry_title: z.string({ message: 'Please enter a title.' }).min(1, { message: 'Please enter a title.' }),
  start_time: z.string(),
  end_time: z.string(),
  category_id: z.string({ message: 'Please select a category.' }).min(1, { message: 'Please select a category.' }),
  meeting_link: z.string().nullable().optional(),
  description: z
    .string({ message: 'Please provide a description.' })
    .min(1, { message: 'Please provide a description.' }),
  duration: z
    .string()
    .refine((value) => !value.trim().startsWith('-'), { message: 'Please check your start and end time.' }),
});
