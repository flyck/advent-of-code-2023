import { describe, test, expect } from "vitest"
import * as fsProm from 'node:fs/promises';
import { minimumSum, sumOfPossibleGameIds } from "./main"

describe("Testsuite Part 1", () => {
  test("Example", () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    expect(sumOfPossibleGameIds(input, {
      red: 12,
      green: 13,
      blue: 14
    })).toBe(8)
  })

  test("Input document", async () => {
    let data
    try {
      data = (await fsProm.readFile("input.txt")).toString()
    } catch (error) {
      throw new Error("Couldnt read test file: " + error)
    }

    expect(sumOfPossibleGameIds(data, {
      red: 12,
      green: 13,
      blue: 14
    })).toBe(2164)
  })
})

describe("Testsuite Part 2", () => {
  test("Example", () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    expect(minimumSum(input)).toBe(2286)
  })

  test("Input document", async () => {
    let data
    try {
      data = (await fsProm.readFile("input.txt")).toString()
    } catch (error) {
      throw new Error("Couldnt read test file: " + error)
    }

    expect(minimumSum(data)).toBe(69929)
  })
})
