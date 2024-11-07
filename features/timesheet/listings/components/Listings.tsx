import { createClient } from '@/lib/supabase/server';
import SampleButton from './SampleButton';

let sample = {
  entry_id: '8f50a4d0-abe8-426d-9736-0ef9f5087f74',
  user_id: '6f4276c9-1bb2-4741-ab3c-1a7df8111ce9',
  start_time: '2024-11-07T10:51:15+00:00',
  end_time: '2024-11-07T22:51:15+00:00',
  duration: '12:00:00',
  category_id: '740b8530-f17f-4c20-b04b-867214e72c6a',
  description: 'Search Bar',
  meeting_link: null,
  file_attachment: null,
  is_active: false,
  created_at: '2024-11-07T22:51:36.654802+00:00',
};
export default async function Listings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('timesheet_time_entries').select('*');
  console.log('DATA', data);

  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  function formatDuration(duration: string) {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return `${hours} hr ${minutes} min`;
  }

  const { data: categories } = await supabase.from('timesheet_categories').select('*');

  console.log('CATEGORIES', categories);

  function getCategoryName(category_id: string) {
    const category = categories?.find((c) => c.category_id === category_id);
    return category?.name;
  }
  return (
    <div className="container w-full rounded-md border border-black p-4 text-black">
      <table className="w-full">
        <thead>
          <tr className="grid w-full grid-cols-7 gap-4 *:border-b *:border-black *:py-2">
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Category ID</th>
            <th>Description</th>
            <th>Meeting Link</th>
            <th>File Attachment</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((entry) => (
            <tr key={entry.entry_id} className="grid w-full grid-cols-7 gap-4 *:text-center">
              <td>{new Intl.DateTimeFormat('en-US', options).format(new Date(entry.start_time))}</td>
              <td>{new Intl.DateTimeFormat('en-US', options).format(new Date(entry.end_time))}</td>
              <td>{formatDuration(entry.duration)}</td>
              <td>{getCategoryName(entry.category_id)}</td>
              <td>{entry.description}</td>
              <td className="max-w-full truncate">
                <a href={entry.meeting_link ?? ''} target="_blank">
                  {entry.meeting_link ?? 'None'}
                </a>
              </td>
              <td>{entry.file_attachment ?? 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SampleButton data={sample} />
    </div>
  );
}
