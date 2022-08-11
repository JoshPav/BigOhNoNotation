import { assertOrderCorrect } from "./utils/assertions";
import { readInputFile, readResultFile } from "./utils/io";
import solve from "./solution";
import { trackExecutionTime } from "./utils/timings";

const inputFiles = [
  10, 100, 1000, 5000, 10000, 25000, 100000, 250000, 1000000, 3000000,
];
const timesToRun = 5;

// Set to undefined to run all
// const fileToRun = undefined;
const fileToRun = 10;

for (const count of getFilesToRun(fileToRun)) {
  const input = readInputFile(count);
  const expected = readResultFile(count);

  trackExecutionTime(
    () => solve(input),
    (curr, total) =>
      console.log(`\nRun ${curr} of ${total} for ${count} people `),
    (ans) => assertOrderCorrect(expected, ans),
    timesToRun
  );
}

function getFilesToRun(number?: number): number[] {
  return number ? [number] : inputFiles;
}
