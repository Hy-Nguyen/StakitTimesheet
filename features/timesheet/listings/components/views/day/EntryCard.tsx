import { formatDuration, formatDate } from '../../../helpers/Formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    // <Card className="flex w-full flex-col items-start">
    //   <CardHeader>
    //     <CardTitle>{entry.entry_title}</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <p>{formatDate(entry.start_time)}</p>
    //     <p>{formatDuration(entry.duration)}</p>
    //   </CardContent>
    // </Card>
    <div className="flex w-full flex-col items-start rounded-md border border-border p-4">
      <div className="flex w-full flex-row items-start justify-between">
        <h1 className="text-lg font-semibold">{entry.entry_title}</h1>
        <p className="text-sm font-normal text-muted-foreground">{formatDuration(entry.duration)}</p>
      </div>
      <p className="text-sm font-normal text-muted-foreground">
        {formatDate(entry.start_time)} - {formatDate(entry.end_time)}
      </p>
    </div>
  );
}
