//import
import axios from 'axios';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { formatDate, formatDuration } from '../helpers/Formatters';

//
export async function createExcel(
  setLoading: (value: boolean) => void,
  title?: string,
  worksheetname?: string,
  month?: number
) {
  try {
    setLoading(true);
    let listings = await axios.get('/api/getAllEntries').then((res) => res.data);

    // Filter listings by the specified month
    if (month !== undefined) {
      listings = listings.filter((entry: any) => {
        const entryMonth = new Date(entry.start_time).getMonth() + 1; // getMonth() returns 0-11
        return entryMonth === month;
      });
    }

    // Check if the action result contains data and if it's an array
    if (listings && Array.isArray(listings)) {
      const dataToExport = listings.map((entry: any, index: number) => ({
        id: index + 1,
        date: format(new Date(entry.start_time), 'MM/dd/yyyy'),
        start: formatDate(entry.start_time),
        end: formatDate(entry.end_time),
        duration: Number(formatDuration(entry.duration, true)),
        description: entry.description,
        meetingLink: entry.meeting_link || 'none',
      }));
      // Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
      setLoading(false);
    } else {
      setLoading(false);
      console.log('#==================Export Error');
    }
  } catch (error: any) {
    setLoading(false);
    console.log('#==================Export Error', error.message);
  }
}
