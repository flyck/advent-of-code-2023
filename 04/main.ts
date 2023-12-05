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
