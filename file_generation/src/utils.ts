import fse from "fs-extra";
import { shuffle } from "lodash";

export const amounts = [
  10, 100, 1000, 5000, 10000, 25000, 100000, 250000, 1000000, 3000000,
];

export function writeToTxt(folder: string, lines: string, fileName: string) {
  fse.outputFile(`../files/${folder}/${fileName}.txt`, lines, (err) => {
    if (err) console.error(err);
  });
}

export function getPairs(orderedMen: string[][]): string[][][] {
  return orderedMen.map(toPairArray).map((arr) => shuffle(arr));
}

function toPairArray(arr: string[]): string[][] {
  const pairs = [];
  for (let index = 0; index < arr.length - 1; index++) {
    pairs.push([arr[index], arr[index + 1]]);
  }
  return pairs;
}

export function getOrderedMen(shuffled: string[]): string[][] {
  let curr = 0;

  const files = [];

  // Make the first ones as a subset of the 3 million
  for (let index = 0; index < amounts.length - 1; index++) {
    const size = amounts[index];
    files.push(shuffled.slice(curr, size + curr));

    curr += size;
  }

  // Reshuffle the 3 million
  files.push(shuffle(shuffled));

  return files;
}

export function generateAllCombinations(): string[] {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );

  const result = [];

  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      for (let k = 0; k < letters.length; k++) {
        for (let l = 0; l < letters.length; l++) {
          result.push(`${letters[i]}${letters[j]}${letters[k]}${letters[l]}`);
        }
      }
    }
  }

  return shuffle(result).slice(0, 3000000);
}
