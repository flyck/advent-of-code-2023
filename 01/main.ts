/**
 * Find the first and last digit in each row and sum them. If only one digit exists it is
 * both. Return the total sum
 */
export function sumCorrection(input: string) {
  let sum = 0

  input.split("\n").forEach(line => {
    const first = line.split('').find((elem) => !isNaN(parseInt(elem))) || "0"
    const last = line.split('').findLast((elem) => !isNaN(parseInt(elem))) || "0"
    sum += parseInt(first + last)
  })

  return sum
}

/**
 * Find the first and last number or digit in each row and sum them. Can be a spelled out word, too. If
 * only one number exists it is both. Return the total sum
 */
export function sumCorrection2(input: string) {
  let sum = 0

  input.split("\n").forEach(line => {
    const first = line.split('').find((elem) => !isNaN(parseInt(elem))) || "0"
    const last = line.split('').findLast((elem) => !isNaN(parseInt(elem))) || "0"
    sum += parseInt(first + last)
  })

  return sum
}
