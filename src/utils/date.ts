import { LOCALE } from '../lib/wizard/constants';

const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'medium',
});

export function formatDate(date: Date): string {
  return dateTimeFormat.format(date);
}

export function inDaysFromNow(days: number) {
  const today = new Date();
  return new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
}

export function createTimestamp() {
  return new Date().toISOString();
}
