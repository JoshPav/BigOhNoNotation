import { assertOrderCorrect } from "./utils/assertions";
import { readInputFile, readResultFile, writeCsvFile } from "./utils/io";
import solve from "./solution";
import { trackExecutionTime } from "./utils/timings";

const inputFiles = [
  10, 100, 1000, 5000, 10000, 25000, 100000, 1000000, 3000000,
];
const timesToRun = 10;

// Leave empty to run all
const filesToRun = [10];

const allResults: number[][] = [];

for (const count of filesToRun.length ? filesToRun : inputFiles) {
  const input = readInputFile(count);
  const expected = readResultFile(count);

  const resultsForCount = trackExecutionTime(
    () => solve(input),
    (curr, total) =>
      console.log(`\nRun ${curr} of ${total} for ${count} people`),
    (ans) => assertOrderCorrect(expected, ans),
    timesToRun
  );

  allResults.push([count].concat(resultsForCount));
}

writeCsvFile(getHeaders(timesToRun), allResults);

function getHeaders(n: number): string[] {
  const runs = Array.from(Array(n).keys()).map((i: number) => `Run ${i + 1}`);
  return ["Count"].concat(runs);
}
