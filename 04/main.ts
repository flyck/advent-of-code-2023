export function scratchcardPoints(input: string) {
  let sum = 0

  const scratchcards = input.split("\n")
  scratchcards.forEach((scratchcard) => {
    let points = 0

    if (!scratchcard) return

    const [title, numbers] = scratchcard.split(":")
    const [winners, drawn] = numbers.split("|")

    const winnerNumbers = parseNumbers(winners)
    const drawnNumbers = parseNumbers(drawn)

    drawnNumbers.forEach((number) => {
      console.debug("Looking at " + number)
      if (winnerNumbers.includes(number)) {
        if (points >= 1) points = points * 2
        if (points == 0) points = 1
      }
    })

    console.debug(`Card ${title} had ${points} points`)
    sum += points
  })

  return sum
}

/**
 * Extracts numbers from a given string which contains numbers, surrounded by spaces
 */
function parseNumbers(input: string): number[] {
  return input.split(" ")
    .map((elem) => parseInt(elem))
    .filter((elem) => !isNaN(elem))
}


export function scratchCardCopyPoints(input: string) {
  let sum = 0

  const scratchcards = input.split("\n")
  let reservedCopy: { [key: number]: number } = {}
  scratchcards.forEach((scratchcard, index) => {
    let points = 0

    if (!scratchcard) return

    const [title, numbers] = scratchcard.split(":")
    const [winners, drawn] = numbers.split("|")

    const winnerNumbers = parseNumbers(winners)
    const drawnNumbers = parseNumbers(drawn)

    drawnNumbers.forEach((number) => {
      if (winnerNumbers.includes(number)) {
        points++
      }
    })

    // get if we have extra copies
    let extraCopies = reservedCopy[index] ?? 0

    // for each match we have, add one copy to that number of following cards, multiplied with the
    // extra copies we have of our current card
    for (let walkingIndex = 1; points > 0; points--) {
      console.debug(`Adding ${1 + extraCopies} copies of the card ${index + walkingIndex + 1}`)
      if (!reservedCopy[index + walkingIndex]) {
        reservedCopy[index + walkingIndex] = 1 + extraCopies
      } else {
        reservedCopy[index + walkingIndex] += 1 + extraCopies
      }

      walkingIndex++
    }

    console.debug(`Had a multiplier of ${extraCopies}, adding that many points to the sum`)
    sum += 1 + extraCopies
  })

  return sum
}
