import { describe, test, expect } from "bun:test"
import { getCombinations, isValid } from "."

describe("main test suite", () => {
  test("Test", () => {
    const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

    const it = getCombinations(input)
    expect(it).toEqual(21)
  })

  test("Test 1", () => {
    const input = `?#?#?#?#?#?#?#? 1,3,1,6`

    const it = getCombinations(input)
    expect(it).toEqual(1)
  })

  test("Test 2", () => {
    const input = `????.#...#... 4,1,1`

    const it = getCombinations(input)
    expect(it).toEqual(1)
  })

  test("Test 3", () => {
    const input = `????.######..#####. 1,6,5`

    const it = getCombinations(input)
    expect(it).toEqual(4)
  })

  test("Test 4", () => {
    const input = `?###???????? 3,2,1`

    const it = getCombinations(input)
    expect(it).toEqual(10)
  })

  test("Test Checksum function", () => {
    expect(isValid("#.#.###", [1, 1, 3])).toBe(true)
    expect(isValid("#.##.##", [1, 2, 2])).toBe(true)
    expect(isValid("#.??.##", [1, 2, 2])).toBe(true)
    expect(isValid(".##", [1])).toBe(false)
    expect(isValid(".###", [2])).toBe(false)
    expect(isValid(".##", [2])).toBe(true)
    expect(isValid(".###", [3])).toBe(true)
    expect(isValid("###..##....", [3, 2, 1])).toBe(false)
    expect(isValid('.#.#?#?#?#?#?#?', [1, 3, 1, 6])).toBe(true)
    expect(isValid(".###..##.#..", [3, 2, 1])).toBe(true)
    expect(isValid(".###..##.#.#", [3, 2, 1])).toBe(false)
  })

  test("File", async () => {
    const input = await Bun.file("input.txt").text()
    expect(getCombinations(input)).toBe(7032)
  })
})
