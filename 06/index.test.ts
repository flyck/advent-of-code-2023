import { describe, test, expect } from "bun:test"
import { numberOfWays, parseInput } from "."


describe("Testsuite part 1", () => {
  test("Example Input", () => {
    const input = `Time:      7  15   30
Distance:  9  40  200`
    const it = numberOfWays(input)
    expect(it).toEqual(288)
  })

  test("Given the input it should return the correct output", () => {
    const input = `Time:      7  15   30
Distance:  9  40  200`
    const it = parseInput(input)
    expect(it).toEqual([{ time: 7, distance: 9 }, { time: 15, distance: 40 }, { time: 30, distance: 200 }])
  })

  test("Input file", async () => {
    const input = await Bun.file("input.txt").text()
    const it = numberOfWays(input)
    expect(it).toBe(449550)
  })
})
