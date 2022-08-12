export function trackExecutionTime<T>(
  func: () => T,
  preRun: (currentRun: number, totalRuns: number) => any,
  postRun: (result: T, timeTaken: number) => any,
  timesToRun: number = 10,
  precisionLevel: number = 3
): number[] {
  const timesPerRun: number[] = [];

  for (let index = 0; index < timesToRun; index++) {
    preRun(index + 1, timesToRun);

    const startTime = performance.now();

    const res = func();

    const endTime = performance.now();

    const timeTaken = endTime - startTime;

    console.log(`Time taken ${timeTaken.toPrecision(precisionLevel)}ms`);
    timesPerRun.push(timeTaken);

    postRun(res, timeTaken);
  }
  const avgTime: number = timesPerRun.reduce((a, b) => a + b, 0);

  console.log(`Average time: ${avgTime.toPrecision(precisionLevel)}ms\n`);

  return timesPerRun;
}
