import { describe, test, expect } from "bun:test"
import { getHashSum } from "./index"

describe("Part 1 Testsuite", () => {
  test("Example 1", () => {
    const it = getHashSum("HASH")
    expect(it).toBe(52)
  })

  test("Full Example", () => {
    const it = getHashSum("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7")
    expect(it).toBe(1320)
  })

  test("File Input", async () => {
    const input = await Bun.file("input.txt").text()

    const it = getHashSum(input)
    expect(it).toBe(514639)
  })
})
