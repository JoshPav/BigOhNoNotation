export function trackExecutionTime<T>(
  func: () => T,
  preRun: (currentRun: number, totalRuns: number) => any,
  postRun: (result: T, timeTaken: number) => any,
  timesToRun: number = 10
): number[] {
  const timesPerRun: number[] = [];

  for (let index = 0; index < timesToRun; index++) {
    preRun(index + 1, timesToRun);

    const startTime = performance.now();

    const res = func();

    const endTime = performance.now();

    const timeTaken = endTime - startTime;

    console.log(`Time taken ${getTimeElapsedPretty(timeTaken)}`);
    timesPerRun.push(timeTaken);

    postRun(res, timeTaken);
  }
  const avgTime: number = timesPerRun.reduce((a, b) => a + b, 0) / timesToRun;

  console.log(`Average time: ${getTimeElapsedPretty(avgTime)}\n`);

  return timesPerRun;
}

function getTimeElapsedPretty(msTaken: number): string {
  const unitCalculators = [
    { unitCalc: calcMinutes, unit: "m", colour: "\u001b[31;1m" },
    { unitCalc: calcSeconds, unit: "s", colour: "\u001b[33;1m" },
    { unitCalc: calcMilliseconds, unit: "ms", colour: "\u001b[32m" },
    { unitCalc: calcMicroSeconds, unit: "μs", colour: "\u001b[32;1m" },
  ];

  const output = [];

  let i = 0;
  while (output.length < 2 && i < unitCalculators.length) {
    const { unitCalc, unit, colour } = unitCalculators[i];
    const timeMeasurement = toTimeStringOrUndefined(
      unitCalc(msTaken),
      unit,
      colour
    );
    if (timeMeasurement) {
      output.push(timeMeasurement);
    }
    i++;
  }

  return output.join(" ");
}

function toTimeStringOrUndefined(
  num: number,
  unit: string,
  colour: string
): string | undefined {
  return num === 0 ? undefined : `${colour}${num}${unit}\u001b[0m`;
}

function calcMinutes(totalMsTaken): number {
  return Math.floor(totalMsTaken / 1000 / 60);
}

function calcSeconds(totalMsTaken): number {
  return Math.floor((totalMsTaken % (60 * 1000)) / 1000);
}

function calcMilliseconds(totalMsTaken): number {
  return Math.floor(totalMsTaken % 1000);
}

function calcMicroSeconds(totalMsTaken): number {
  return Math.round((totalMsTaken % 1) * 1000);
}
