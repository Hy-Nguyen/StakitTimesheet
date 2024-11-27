import { formatDuration, formatDate } from '@/features/timesheet/listings/helpers/Formatters';
import EditListingPopUp from './EditListingPopUp';

export default function ListingItem({ entry }: { entry: any }) {
  return (
    <>
      <tr className="relative grid w-full grid-cols-7 items-center gap-4 rounded-md border py-1 transition-colors duration-500 *:text-center hover:cursor-pointer dark:border-transparent dark:hover:border-accent-ts">
        <td>{formatDate(entry.start_time)}</td>
        <td>{formatDate(entry.end_time)}</td>
        <td>{formatDuration(entry.duration)}</td>
        <td>{entry.category_name}</td>
        <td className="col-span-2 line-clamp-2">{entry.description}</td>
        <td className="max-w-full truncate">
          <a
            href={entry.meeting_link ?? ''}
            className={entry.meeting_link ? 'text-accent-ts underline underline-offset-4' : 'text-gray-500'}
            target="_blank"
          >
            {entry.meeting_link ? 'Around Meeting' : 'N/A'}
          </a>
        </td>
        <EditListingPopUp entry={entry} />
      </tr>
    </>
  );
}
