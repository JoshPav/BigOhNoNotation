import fs from "fs";
import fse from "fs-extra";
import { PaperSlip } from "../types/types";

export function writeCsvFile(headers: string[], data: (string | number)[][]) {
  const fileLines = `${headers.join(",")}\n${data
    .map((row) => row.join(","))
    .join("\n")}`;

  const fileName = `output/results/${Date.now()}.csv`;

  fse.outputFile(fileName, fileLines, (err) => {
    if (err) console.error(err);
    else console.log(`Saved results to ${fileName}`);
  });
}

export function readInputFile(num: number): PaperSlip[] {
  return readFromTxtFile("input", num).map(toSlip);
}

export function readResultFile(num: number): string[] {
  return readFromTxtFile("answers", num);
}

function readFromTxtFile(folder: string, num: number): string[] {
  return fs
    .readFileSync(`../files/${folder}/${num}.txt`)
    .toString("utf-8")
    .split("\n");
}

function toSlip(line: string): PaperSlip {
  const [person, neighbor] = line.split(",");
  return { person, neighbor };
}
