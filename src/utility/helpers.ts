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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T & { cancel: () => void } {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    const remaining = limit - (now - lastCall);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCall = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return throttled;
}
