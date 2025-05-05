import { format, toDate } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Converts a date string from its original timezone to the local timezone.
 *
 * @param {string} dateString - The date string to convert.
 * @returns {string|null} The converted date string in the local timezone or null if an error occurs.
 */
export const convertDateToLocalTimezone = (dateString: string): string | null => {
  try {
    // Detect the local timezone of the device
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('localTimeZone-',localTimeZone)
    console.log('dateString-',dateString)

   // Parse the input date string to date instance
   const parsedDate = toDate(dateString)

   // Convert the parsed date to the local time zone
   const localDate = toZonedTime(parsedDate, localTimeZone);

   // Format the local date in the desired format (yyyy-MM-dd hh:mm a)
   return format(localDate, 'yyyy-MM-dd hh:mm a');
  } catch (err) {
    console.error('Error converting date to local timezone:', err);
    return null;
  }
};
