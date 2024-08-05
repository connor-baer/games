import { createArray } from './array';

export function createId() {
  return crypto.randomUUID().slice(0, 13);
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';

export function createHumanId(length = 5) {
  return createArray(length)
    .map(() => {
      // min = 0, max = chars.length - 1
      const index = Math.floor(Math.random() * chars.length);
      return chars[index];
    })
    .join('');
}
