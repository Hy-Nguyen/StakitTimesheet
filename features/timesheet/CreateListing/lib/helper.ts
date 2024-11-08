export function formatDateForPostgres(date: Date): string {
  const pad = (n: number) => (n < 10 ? '0' + n : n);

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // Months are zero-indexed
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`;
}
