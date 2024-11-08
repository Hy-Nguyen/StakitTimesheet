import { getTotalHours } from '../hooks/getAllEntries';

export default async function Overview() {
  const netHours = await getTotalHours();
  return <div>Net Hours: {netHours}</div>;
}
