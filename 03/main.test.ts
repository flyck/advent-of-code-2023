import { describe, test, expect } from "vitest"
import * as fsProm from 'node:fs/promises';
import { sumOfPartNumbers } from "./main"

describe("Testsuite Part 1", () => {
  test("Example", () => {
    const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

    expect(sumOfPartNumbers(input)).toBe(4361)
  })

  test("Input document", async () => {
    let data
    try {
      data = (await fsProm.readFile("input.txt")).toString()
    } catch (error) {
      throw new Error("Couldnt read test file: " + error)
    }

    expect(sumOfPartNumbers(data)).toBe(538046)
  })
})
