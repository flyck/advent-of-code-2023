export function sumOfPossibleGameIds(games: string, possibleBag: { [key: string]: number }) {
  let possibleGames: number[] = []

  games.split("\n").forEach((game) => {
    if (!game) return // skip empty lines

    const [title, results] = game.split(":")
    const id = parseInt(title.split(" ")[1])

    const mismatch = results.split(";").some((result) => {
      const entries = result.split(",")
      const badEntries = entries.some((entry) => {
        const [amount, color] = entry.trim().split(" ")

        if (parseInt(amount) > possibleBag[color]) {
          console.debug(`Found color ${color} in drawing ${result} to be mismatching!`)
          return true
        }
      })

      return badEntries
    })

    if (!mismatch) possibleGames.push(id)
  })

  return sum(possibleGames)
}

function sum(array1: number[]): number {
  return array1.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0,
  );
}

function power(array1: number[]): number {
  return array1.reduce(
    (accumulator, currentValue) => accumulator * currentValue, 1,
  );
}

export function minimumSum(games: string) {
  let minimumPowers: number[] = []

  games.split("\n").forEach((game) => {
    if (!game) return // skip empty lines

    const [title, results] = game.split(":")

    let minimumBag: { [key: string]: number } = {
      red: 0,
      blue: 0,
      green: 0
    }

    results.split(";").forEach((result) => {
      const entries = result.split(",")

      entries.forEach((entry) => {
        const [amount, color] = entry.trim().split(" ")

        if (parseInt(amount) > minimumBag[color]) {
          minimumBag[color] = parseInt(amount)
        }
      })
    })
    const currentPower = power(Object.values(minimumBag))
    console.debug(`Calculated power ${currentPower} for row ${game}`)
    minimumPowers.push(currentPower)
  })

  return sum(minimumPowers)
}
