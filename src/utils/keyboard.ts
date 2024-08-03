export function isEnter(event: KeyboardEvent): boolean {
  return event.key === 'Enter';
}

export function isEscape(event: KeyboardEvent): boolean {
  return event.key === 'Escape';
}

export function isSpacebar(event: KeyboardEvent): boolean {
  return event.key === ' ';
}

export function isArrowLeft(event: KeyboardEvent): boolean {
  return event.key === 'ArrowLeft';
}

export function isArrowUp(event: KeyboardEvent): boolean {
  return event.key === 'ArrowUp';
}

export function isArrowRight(event: KeyboardEvent): boolean {
  return event.key === 'ArrowRight';
}

export function isArrowDown(event: KeyboardEvent): boolean {
  return event.key === 'ArrowDown';
}
