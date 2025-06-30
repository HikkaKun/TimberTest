import { randomRangeInt } from 'cc';

export function createDoubleArray<T>(width: number, height: number, iterate: (x: number, y: number) => T): T[][] {
  return Array.from({ length: width }, (_, x) => Array.from({ length: height }, (_, y) => iterate(x, y)));
}

export function filterDoubleArray<T>(array: T[][], predicate: (value: T, x: number, y: number) => boolean): T[] {
  const result: T[] = [];
  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array[0].length; y++) {
      if (predicate(array[x][y], x, y)) result.push(array[x][y]);
    }
  }

  return result;
}

export function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;

  let randomIndex: number;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function getRandomElementArray<T>(array: T[]): T {
  return array[randomRangeInt(0, array.length)];
}
