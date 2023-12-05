export function lowestLocation(input: string) {
  let resolvedSeeds: number[] = []

  const lines = input.split("\n")

  const order = ["seed", "soil", "fertilizer", "water", "light", "temperature", "humidity", "location"]
  const { seeds, maps } = parseInput(lines)

  console.log("Rules: " + JSON.stringify(maps))

  seeds.forEach((seed) => {
    let currentValue = seed

    // go through the order to resolve the seeds location
    for (let i = 0; i < order.length - 1; i++) {
      const mapKey = `${order[i]}-to-${order[i + 1]}`
      currentValue = resolveValue(maps[mapKey], currentValue)
    }
    resolvedSeeds.push(currentValue)
  })

  // sort number ascending
  const resolvedSeedsSorted = resolvedSeeds.sort((a: number, b: number) => a - b)

  // return only the lowest resolved location number
  return resolvedSeedsSorted[0]
}

function parseInput(lines: string[]): {
  seeds: number[], maps: { [key: string]: { destStart: number; sourceStart: number; rangeLength: number }[] }
} {
  let seeds: number[] = []
  let maps: { [key: string]: { destStart: number, sourceStart: number, rangeLength: number }[] } = {}

  let extractingMap = false
  let currentMap = ""
  lines.forEach((line) => {
    // extract seeds
    if (line.includes("seeds:")) {
      seeds = parseSeeds(line)
      return
    }

    if (line.includes("map:")) {
      // extract map
      extractingMap = true
      currentMap = line.split(" ")[0]
      return
    }

    // skip empty lines
    if (!line) {
      return
    }

    // if its nothing else we can assume a mapping
    if (extractingMap) {
      if (!maps[currentMap]) {
        maps[currentMap] = [getMapValues(line)]
      } else {
        maps[currentMap] = maps[currentMap].concat(getMapValues(line))
      }
    } else {
      throw "Unexpected situation: " + line
    }
  })
  return { seeds, maps }
}

function resolveValue(map: { destStart: number; sourceStart: number; rangeLength: number }[], val: number) {
  // return the original as the default
  let resolvedValue: number = val

  map.forEach((rule) => {
    if (rule.sourceStart <= val && val <= rule.sourceStart + rule.rangeLength) {
      // map it taking into account the offset
      resolvedValue = (val - rule.sourceStart) + rule.destStart
    }
  })

  return resolvedValue
}

/**
 * parse the seeds from a given line
 * example: "seeds: 79 14 55 13" -> [79, 14, 55, 13]
 */
function parseSeeds(line: string): number[] {
  return line
    .split(":")[1]
    .split(" ")
    .map((elem) => parseInt(elem.trim()))
    .filter((elem) => !isNaN(elem))
}

function getMapValues(input: any): { destStart: number; sourceStart: number; rangeLength: number } {
  const numbers = input
    .split(" ")
    .map((elem: string) => parseInt(elem))

  return {
    destStart: numbers[0],
    sourceStart: numbers[1],
    rangeLength: numbers[2]
  }
}
