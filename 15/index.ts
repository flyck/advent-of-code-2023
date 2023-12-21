export function getHashSum(input: string) {
  const values = input.split(",")

  let results: number[] = []

  values.forEach((value) => {
    let currentVal = 0

    value = value.replace("\n", "")

    if (!value) return

    value.split("").forEach((char) => {
      // Determine the ASCII code for the current character of the string.
      const code = char.charCodeAt(0)
      // Increase the current value by the ASCII code you just determined.
      currentVal += code
      // Set the current value to itself multiplied by 17.
      currentVal = currentVal * 17
      // Set the current value to the remainder of dividing itself by 256.
      currentVal = currentVal % 256
    })

    results.push(currentVal)
  })

  return sum(results)
}

function sum(input: number[]): number {
  return input.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0,
  );
}
