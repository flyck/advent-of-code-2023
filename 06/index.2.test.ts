import { describe, test, expect } from "bun:test"
import { singleRaceWays } from "./index.2"


describe("Testsuite part 2", () => {
  test("Example Input", () => {
    const input = `Time:      7 15 30
Distance:  9 40 200`
    const it = singleRaceWays(input)
    expect(it).toEqual(71503)
  })

  test("Input file", async () => {
    const input = await Bun.file("input.txt").text()
    const it = singleRaceWays(input)
    expect(it).toBe(449550)
  })
})
