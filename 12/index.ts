export function getCombinations(input: string): number {
  const lines = input.split("\n")
  let combinations: string[] = []

  lines.forEach((line) => {
    if (!line) return

    const [info, checksum] = line.split(" ")
    const checksumNumbers = checksum.split(",").map((elem) => parseInt(elem))

    // console.log(`Checking string ${info} with checksum ${checksum}`)

    // aproach: divide and conquer to rule out bad paths instead of trying every combination
    const result = divide(info, checksumNumbers, 0)

    // console.log(`Found ${result.length} possible combos for ${info} and checksum ${checksum}: ` + JSON.stringify(result))
    combinations = combinations.concat(result)
  })

  return combinations.length
}

function divide(info: string, checksum: number[], index: number): string[] {
  // check if we are still valid
  const valid = isValid(info, checksum)

  // if we are at the end and still valid, return the current string
  // this string no longer contains any questionmarks and is valid
  if (index == info.length) {
    // console.log("I am at the end, string " + info + " is " + (valid ? "valid" : "invalid"))
    return valid ? [info] : []
  }

  // if we are no longer valid, disregard this run
  if (!valid) {
    if (info.indexOf("?") > 0) { console.log("Probably saved a run here by exciting early: " + info) }
    //console.log("Exciting while string is: " + info)
    return []
  } else {
    // console.log("Still valid path: " + info)
  }

  if (info[index] == "?") {
    return [
      ...divide(info.slice(0, index) + "#" + info.slice(index + 1), checksum, index + 1),
      ...divide(info.slice(0, index) + "." + info.slice(index + 1), checksum, index + 1)
    ]
  }
  return divide(info, checksum, index + 1)
}

/**
 * check if a given string could be valid
 * defaults to true once the first questionmark is found
 */
export function isValid(info: string, checksum: number[]) {
  const letters = info.split("")
  let invalid = false
  let foundQuestionMark = false

  const reverseChecksum = [...checksum].reverse()

  let streak = 0
  let checkNumber: number | undefined
  letters.forEach((letter) => {
    // make sure we go through the checksum numbers
    if (checkNumber == undefined) checkNumber = reverseChecksum.pop()

    // skip execution if we already determined the input is invalid
    if (invalid || foundQuestionMark) { return }

    if (letter == "?") { foundQuestionMark = true; return }

    // skip dots when we dont count a streak
    if (letter == "." && !streak) { return }

    if (letter == "." && streak > 0) {
      if (streak != checkNumber) {
        invalid = true
      }
      checkNumber = undefined
      streak = 0
      return
    }

    if (letter == "#") {
      streak++
    }
  })

  // console.log(`streak: ${streak}, checknumber: ${checkNumber}, foundQuestionMark: ${foundQuestionMark}`)

  if (foundQuestionMark && !invalid) {
    // console.log("found a questionmark and was valid so far: " + !invalid)
    return true
  }

  // handle the case that we went through the letters and we are still on a streak
  if (streak > 0 && streak != checkNumber) {
    // console.log("we are still on a streak but the checknumber doesnt match -> invalid")
    invalid = true
  }

  if (streak == 0 && checkNumber != undefined) {
    // console.log(`checkNumber ${checkNumber} is still unverified but we are not on a streak!`)
    invalid = true
  }

  if (reverseChecksum.length != 0) {
    // console.log("We are at the end but the checkNumbers are not all done")
    invalid = true
  }

  return !invalid
}
