import { LOCALE } from '../constants';

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const pluralRules = new Intl.PluralRules(LOCALE);

export function pluralize(
  word: { singular: string; plural: string },
  n: number,
): string {
  if (n > 0 && n < 1) {
    return word.singular;
  }

  const rule = pluralRules.select(n);

  if (rule === 'one') {
    return word.singular;
  }

  return word.plural;
}
