/**
 * Approach: Go through each character in the line grid and read the occuring numbers. Once a
 * number is found, check all neighbours to check for symbols. If a symbol was found, add it to
 * the sum
 */
export function sumOfPartNumbers(input: string) {
  let sum = 0
  let buildingNumber = false
  let number = ""

  const lines = input.split("\n")

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]

    if (!line) continue

    for (let x = 0; x < line.length; x++) {
      // handle the case the we are in a new line and were still building a number at the end of
      // the previous line
      if (x == 0 && buildingNumber) {
        const nearSymbol = isNearSymbol(lines, line.length - 1, y - 1, number.length)
        if (nearSymbol) {
          console.log("Adding flipover number " + number)
          sum += parseInt(number)
        }
        buildingNumber = false
        number = ""
      }

      // skip consecutive dots
      if (line[x] == "." && !buildingNumber) {
        continue
      }

      // dots complete a number and triggers the neighbouring symbol search
      if (line[x] == "." && buildingNumber) {
        const nearSymbol = isNearSymbol(lines, x - 1, y, number.length)
        if (nearSymbol) {
          //console.log("Adding number " + number)
          sum += parseInt(number)
        }
        buildingNumber = false
        number = ""
        continue
      }

      // numbers get added to the number
      if (!isNaN(parseInt(line[x]))) {
        buildingNumber = true
        number += line[x]
        continue
      }

      // default case is a symbol was hit (neither a dot nor nuber), so we can add our number without searching neighbours
      if (buildingNumber) {
        sum += parseInt(number)
        number = ""
        buildingNumber = false
      }
    }
  }

  // handle the case that we went through the entire array and ended on a number
  if (buildingNumber) {
    const nearSymbol = isNearSymbol(lines, lines[lines.length - 1].length - 1, lines.length - 1, number.length)
    if (nearSymbol) {
      sum += parseInt(number)
    }
  }

  return sum
}

function isNearSymbol(lines: string[], x: number, y: number, length: number): boolean {
  let nearSymbol = false

  // search one row above and one below
  for (let i = y - 1; i <= y + 1; i++) {
    const leftBoundary = x - length
    const rightBoundary = x + 1

    for (let p = leftBoundary; p <= rightBoundary; p++) {
      // console.log(`coordinate ${i}/${p}`)

      // skip the center of the box
      if (i == y && p != leftBoundary && p != rightBoundary) {
        // console.log("skipping")
        continue
      }


      const elem = (lines[i] ?? [])[p]
      if (elem != undefined && elem != "." && isNaN(parseInt(elem))) {
        nearSymbol = true
        break
      }
    }
  }

  return nearSymbol
}
