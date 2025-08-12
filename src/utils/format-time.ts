import { format, getTime, intervalToDuration } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

// export function fToNow(date: InputValue) {
//   return date
//     ? formatDistanceToNow(new Date(date), {
//         addSuffix: true,
//       })
//     : '';
// }

export function fToNow(date: InputValue) {
  if (!date) return '';

  const duration = intervalToDuration({ start: new Date(date), end: new Date() });

  const { years, months, days, hours, minutes } = duration;

  if (years) return `${years}y ago`;
  if (months) return `${months}mo ago`;
  if (days) return `${days}d ago`;
  if (hours) return `${hours}h ago`;
  if (minutes) return `${minutes}m ago`;

  return 'just now';
}

export function isBetween(inputDate: Date | string | number, startDate: Date, endDate: Date) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate ? new Date(startDate).getTime() > new Date(endDate).getTime() : false;

  return results;
}
