import { createClient } from '@/lib/supabase/server';
import { formatDuration, getCategoryName, formatDate } from '../helpers/Formatters';

export default async function Listings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('timesheet_time_entries').select('*');

  return (
    <div className="container w-full rounded-md border border-black p-4 text-black dark:border-main-300 dark:text-white">
      <table className="w-full">
        <thead>
          <tr className="grid w-full grid-cols-7 gap-4 *:border-b *:border-black *:py-2 dark:*:border-main-300">
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
            <tr key={entry.entry_id} className="grid w-full grid-cols-7 items-center gap-4 *:text-center">
              <td>{formatDate(entry.start_time)}</td>
              <td>{formatDate(entry.end_time)}</td>
              <td>{formatDuration(entry.duration)}</td>
              <td>{getCategoryName(entry.category_id)}</td>
              <td>{entry.description}</td>
              <td className="max-w-full truncate">
                <a
                  href={entry.meeting_link ?? ''}
                  className={entry.meeting_link ? 'text-accent-ts underline underline-offset-4' : 'text-gray-500'}
                  target="_blank"
                >
                  {entry.meeting_link ? 'Around Meeting' : 'N/A'}
                </a>
              </td>
              <td>{entry.file_attachment ?? 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
