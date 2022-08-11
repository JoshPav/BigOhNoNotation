const red = "\x1b[31m";
const green = "\x1b[32m";
const escape = "\x1b[0m";

export function assertOrderCorrect(
  expected: string[],
  actual: string[]
): boolean {
  if (expected.length !== actual.length) {
    console.error(`${red}🤔 Results did not match 🤔${escape}`);
    return false;
  }

  for (let index = 0; index < expected.length; index++) {
    if (expected[index] !== actual[index]) {
      console.error(`${red}🤔 Results did not match 🤔${escape}`);
      return false;
    }
  }

  console.info(`${green}😎 Results matched 😎${escape}`);
  return true;
}
