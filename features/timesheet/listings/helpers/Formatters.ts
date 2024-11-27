export function formatDuration(duration: string) {
  if (!duration) return 'Unfinished';
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return `${hours + minutes / 60} hrs`;
}

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'MST',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}
