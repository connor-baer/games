import { LOCALE } from '../constants';

const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'medium',
});

export function formatDate(date: Date): string {
  return dateTimeFormat.format(date);
}
