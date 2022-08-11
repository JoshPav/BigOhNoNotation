import fs from "fs";
import { Slip } from "../types/types";

export function readInputFile(num: number): Slip[] {
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

function toSlip(line: string): Slip {
  const [person, neighbor] = line.split(",");
  return { person, neighbor };
}
