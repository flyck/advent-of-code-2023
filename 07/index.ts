import { FILE } from "dns"

const ORDER = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

export function totalScore(input: string): number {
  let score = 0

  const placements = input.split("\n").filter((line) => line != "")

  let ranks: RankAndCardAndBid[] = []

  // get all ranks and their related card
  placements.forEach((placement) => {
    const [hand, bid] = placement.split(" ")
    const rank = determineRank(hand)
    ranks.push({ ...rank, bid: parseInt(bid), hand: hand.split("") })
  })


  let multiplier = placements.length
  Object.values(Rank).forEach((rank, asd) => {
    // console.log("Rank: " + asd)
    const myRankResults = ranks.filter((rankAndCard) => rankAndCard.rank == rank)
    // console.log(myRankResults)

    if (myRankResults.length == 1) {
      score += multiplier * myRankResults[0].bid
      multiplier--
    }

    if (myRankResults.length > 1) {
      const sorted = sortResults(myRankResults)

      sorted.forEach((entry) => {
        // console.log(`Adding number: ${multiplier} * ${entry.bid}`)
        score += multiplier * entry.bid
        multiplier--
      })
    }
  })

  return score
}

// all ranks from highest to lowest
export enum Rank {
  FIVE_OF_A_KIND = "FIVE_OF_A_KIND",
  FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
  FULL_HOUSE = "FULL_HOUSE",
  THREE_OF_A_KIND = "THREE_OF_A_KIND",
  TWO_PAIR = "TWO_PAIR",
  ONE_PAIR = "ONE_PAIR",
  HIGH_CARD = "HIGH_CARD",
}

interface RankAndCardAndBid { rank: Rank, cards: string[], bid: number, hand: string[] }

export function sortResults(input: RankAndCardAndBid[]): RankAndCardAndBid[] {
  return input.sort(compareCards)
}

function compareCards(a: RankAndCardAndBid, b: RankAndCardAndBid): number {
  const cardsA = a.hand.map((card) => ORDER.indexOf(card));
  const cardsB = b.hand.map((card) => ORDER.indexOf(card));;

  // Compare each card number
  for (let i = 0; i < cardsA.length; i++) {
    if (cardsA[i] !== cardsB[i]) {
      return cardsA[i] - cardsB[i]; // Higher number wins
    }
  }

  // If all card numbers are the same, compare the next property (if any)
  // For example, if you have another property called "name", you can add:
  // return a.name.localeCompare(b.name);

  return 0; // Objects are considered equal
}

export function determineRank(hand: string): { rank: Rank, cards: string[] } {
  const cards = hand.split("")

  const occurrences = getOccurrences(hand)

  let foundPairs: string[] = []
  let foundFive = ""
  let foundFour = ""
  let foundThree = ""
  Object.entries(occurrences).forEach(([card, occurrence]) => {
    if (occurrence == 5) {
      foundFive = card
    }
    if (occurrence == 4) {
      foundFour = card
    }
    if (occurrence == 3) {
      foundThree = card
    }
    if (occurrence == 2) {
      foundPairs.push(card)
    }
  })

  // found 5 check
  if (foundFive != "") {
    return { rank: Rank.FIVE_OF_A_KIND, cards: [foundFive] }
  }

  // found 4 check
  if (foundFour != "") {
    return { rank: Rank.FOUR_OF_A_KIND, cards: [foundFive] }
  }

  // full house check
  if (foundThree != "" && foundPairs.length == 1) {
    return { rank: Rank.FULL_HOUSE, cards: [foundThree, foundPairs[0]] }
  }

  // three of a kind check
  if (foundThree != "" && foundPairs.length == 0) {
    return { rank: Rank.THREE_OF_A_KIND, cards: [foundThree] }
  }

  // two pairs check
  if (foundPairs.length == 2) {
    return { rank: Rank.TWO_PAIR, cards: sortCards(foundPairs) }
  }

  // one pair check
  if (foundPairs.length == 1) {
    return { rank: Rank.ONE_PAIR, cards: foundPairs }
  }

  // high card is the default
  return { rank: Rank.HIGH_CARD, cards: sortCards(cards).slice(0, 1) }
}

// returns the cards sorted by ascii code in descending order
export function sortCards(cards: string[]): string[] {
  return cards.sort((a: string, b: string) => ORDER.indexOf(a) - ORDER.indexOf(b))
}

function getOccurrences(hand: string): { [key: string]: number } {
  let occurrences: { [key: string]: number } = {}

  hand.split("").forEach((card) => {
    if (occurrences[card]) {
      occurrences[card] += 1
    } else {
      occurrences[card] = 1
    }
  })

  return occurrences
}
