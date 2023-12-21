import { describe, test, expect } from "bun:test"
import { Rank, determineRank, sortCards, totalScore } from "./index"


describe("Testsuite part 2", () => {
  test("Example Input", () => {
    const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
    const it = totalScore(input)
    expect(it).toEqual(6440)
  })

  test("Ranking", () => {
    expect(determineRank("T55J5")).toEqual({ rank: Rank.THREE_OF_A_KIND, cards: ["5"] })
    expect(determineRank("26543")).toEqual({ rank: Rank.HIGH_CARD, cards: ["6"] })
  })

  test("Sorting", () => {
    expect(sortCards("25436".split(""))).toEqual("65432".split(""))
    expect(sortCards("52243".split(""))).toEqual("54322".split(""))
  })

  test("Input file", async () => {
    const input = await Bun.file("input.txt").text()
    const it = totalScore(input)
    expect(it).toBe(253933213)
  })
})
