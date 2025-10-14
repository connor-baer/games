import {
  derived,
  get,
  type Readable,
  type Writable,
  writable,
} from 'svelte/store';

import { BLUE, GREEN, PENALTY_POINTS, POINTS, RED, YELLOW } from './constants';
import { type ColorConfig, Direction, type GameState } from './types';

export function stack<Value, Store extends Writable<Value>>(store: Store) {
  const history = writable<Value[]>([get(store)]);
  const position = writable(0);

  const canUndo = derived([history, position], ([$history, $position]) =>
    Boolean($history[$position - 1]),
  );

  const canRedo = derived(
    [history, position],
    ([$history, $position]) => $position < $history.length - 1,
  );

  const update = (updater: (value: Value) => Value) => {
    store.update((value) => {
      const nextValue = updater(value);
      position.update((prevPosition) => {
        history.update((prevHistory) => {
          if (prevPosition < prevHistory.length - 1) {
            return [...prevHistory.slice(0, prevPosition + 1), nextValue];
          }
          return [...prevHistory, nextValue];
        });
        return prevPosition + 1;
      });
      return nextValue;
    });
  };

  const set = (nextValue: Value) => {
    update(() => nextValue);
  };

  const undo = () => {
    const prevValue = get(history)[get(position) - 1];
    if (prevValue) {
      store.set(prevValue);
      position.update((prev) => prev - 1);
    }
  };

  const redo = () => {
    const nextValue = get(history)[get(position) + 1];
    if (nextValue) {
      store.set(nextValue);
      position.update((prev) => prev + 1);
    }
  };

  return { ...store, update, set, undo, redo, canUndo, canRedo };
}

export function getPoints(state: Readable<GameState>) {
  return derived(state, ($state) => {
    const red = getColorPoints($state, RED);
    const yellow = getColorPoints($state, YELLOW);
    const green = getColorPoints($state, GREEN);
    const blue = getColorPoints($state, BLUE);
    const penalties = getPenaltyPoints($state);
    const total = red + yellow + green + blue + penalties;

    return { red, yellow, green, blue, penalties, total };
  });
}

export function isColorLocked(numbers: number[], color: ColorConfig) {
  const { direction } = color;
  return (
    (direction === Direction.ASCENDING && numbers.includes(12)) ||
    (direction === Direction.DESCENDING && numbers.includes(2))
  );
}

function getColorPoints(state: GameState, color: ColorConfig) {
  const numbers = state[color.key];
  let crosses = numbers.length;

  if (isColorLocked(numbers, color)) {
    crosses += 1;
  }

  return POINTS[crosses] || 0;
}

function getPenaltyPoints(state: GameState) {
  return state.penalties * PENALTY_POINTS;
}
