import { describe, test, expect } from "bun:test"
import { getShortestPath } from "."

describe("Testsuite Part 1", () => {
  test("Sample input", () => {
    const input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`
    const it = getShortestPath(input)

    expect(it).toBe(102)
  })

  // test("File input", async () => {
  //   const input = await Bun.file("input.txt").text()
  //   const it = getShortestPath(input)

  //   expect(it).toBe(102)
  // })
})
