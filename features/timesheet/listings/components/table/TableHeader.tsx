export default function TableHeader() {
  return (
   
      <tr className="grid w-full grid-cols-7 gap-4 *:border-b *:border-black *:py-2 dark:*:border-main-300">
        <th>Start Time</th>
        <th>End Time</th>
        <th>Duration</th>
        <th>Category ID</th>
        <th className="col-span-2">Description</th>
        <th>Meeting Link</th>
      </tr>
   
  );
}
