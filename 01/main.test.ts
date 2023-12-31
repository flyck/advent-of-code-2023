import { describe, test, expect } from "vitest"
import * as fsProm from 'node:fs/promises';
import { sumCorrection } from "./main"

describe("Calibration Sum Testsuite Part 1", () => {
  test("Example", () => {
    const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

    expect(sumCorrection(input)).toBe(142)
  })

  test("Input document", async () => {
    let data
    try {
      data = (await fsProm.readFile("input.txt")).toString()
    } catch (error) {
      throw new Error("Couldnt read test file: " + error)
    }

    expect(sumCorrection(data)).toBe(55017)
  })
})
