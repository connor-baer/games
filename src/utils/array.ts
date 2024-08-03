// @ts-expect-error TypeScript doesn't infer that the default value and T are mutually exclusive
export function createArray<T = null>(length: number, initialValue: T = null) {
  return Array<T>(length).fill(initialValue);
}

export function shiftArray<T>(array: T[], shift: number): T[] {
  if (shift % array.length === 0) {
    return array;
  }

  return array.map((_, index) => {
    const shiftedIndex = (index + shift) % array.length;
    return array[shiftedIndex] as T;
  });
}
