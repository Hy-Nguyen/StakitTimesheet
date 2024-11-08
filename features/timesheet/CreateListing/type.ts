interface ListingFormData {
  user_id: string;
  start_time: string;
  end_time: string;
  duration: string;
  category_id: string;
  description: string;
}

interface Submission {
  user_id: string | undefined;
  entry_title: string | null;
  start_time: string;
  end_time: string;
  category_id: string | null;
  meeting_link: string | null;
  description: string | null;
}

interface SubmissionErrors {
  user_id?: string[] | undefined;
  entry_title?: string[] | undefined;
  start_time?: string[] | undefined;
  end_time?: string[] | undefined;
  category_id?: string[] | undefined;
  meeting_link?: string[] | undefined;
  description?: string[] | undefined;
  duration?: string[] | undefined;
}
