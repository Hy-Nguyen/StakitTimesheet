import { z } from 'zod';

export const createListingSchema = z.object({
  user_id: z.string(),
  start_time: z.string().min(1, { message: 'Start time is required' }),
  end_time: z.string().min(1, { message: 'End time is required' }),
  duration: z.string(),
  category_id: z.string().min(1, { message: 'Category is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  meeting_link: z.string().optional(),
  file_attachment: z.string().optional(),
});
