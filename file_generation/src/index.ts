import { amounts, writeToTxt, getOrderedMen, generateAllCombinations, getPairs } from "./utils";

const allCombinations: string[] = generateAllCombinations();

const orderedMen = getOrderedMen(allCombinations);

for (let index = 0; index < orderedMen.length; index++) {
  writeToTxt("answers", orderedMen[index].join("\n"), `${amounts[index]}`);
}

const pairs = getPairs(orderedMen)

for (let index = 0; index < pairs.length; index++) {
  writeToTxt(
    "input",
    pairs[index].map((pair) => pair.join()).join("\n"),
    `${amounts[index]}`
  );
}
