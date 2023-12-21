export function numberOfWays(inputRaw: string): number {
  const input = parseInput(inputRaw)

  let result: number[] = []

  input.forEach((race) => {
    let waysToWin: number[] = []

    for (let holdDown = 0; holdDown < race.time; holdDown++) {
      const speed = holdDown
      const myDistance = speed * (race.time - holdDown)

      // check the win condition
      if (myDistance > race.distance) {
        waysToWin.push(holdDown)
      }
    }

    result.push(waysToWin.length)
  })

  return result.reduce((previous, current) => { return previous * current })
}

export interface WaysToWin extends Result {
  waysToWin: number
}

export type Result = {
  time: number
  distance: number
}

export function parseInput(input: string): Result[] {
  let result: Result[] = []

  const inputLines = input.split("\n")

  // the first row are the times
  const times = inputLines[0].split(":")[1]
    .split(" ")
    .filter(elem => elem != "")
    .map((elem) => parseInt(elem))
  const distances = inputLines[1].split(":")[1]
    .split(" ")
    .filter(elem => elem != "")
    .map((elem) => parseInt(elem))

  times.forEach((elem, index) => { result.push({ time: elem, distance: distances[index] }) })

  return result
}
