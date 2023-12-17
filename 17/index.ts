let shortestPathCost = Infinity
let moves: Move[] = []

/**
 * Approach: save the currently shortest path. Explore all options one after the other but abort
 * once it gets longer than the currently known shortest path.
 *
 * Dijkstra wouldnt work because it is based on the shortest path between each node. But the shortest
 * path might be invalid, and alternatives are not recorded in the result map.
 */
export function getShortestPath(input: string) {
  const inputMap = input
    .split("\n")
    .filter((val) => val != "")
    .map((val) => val.split("").map((elem) => parseInt(elem)))

  // first block cost doesnt count, so initial pathCost is 0
  findYourWay(inputMap, "0/0", [], ["0/0"], 0)

  console.log("Moves: " + moves)

  return shortestPathCost
}

function findYourWay(inputMap: number[][], position: string, previousMoves: Move[], previousPositions: string[], pathCost: number) {
  let myOptions: Move[] = [Move.RIGHT, Move.DOWN, Move.UP, Move.LEFT]

  let myMoves = [...previousMoves]
  let myPositions = [...previousPositions]

  // console.log(previousPositions)
  // console.log(shortestPathCost)
  // printMap(inputMap, previousPositions)

  myOptions.forEach((availableMove) => {
    // dont do illegal moves
    if (!isAllowed(inputMap, myMoves, availableMove, position, myPositions)) {
      return
    }

    let newPosition = move(position, availableMove)
    const currentCost = pathCost + getCost(inputMap, newPosition)
    myMoves.push(availableMove)
    myPositions.push(newPosition)

    // dont continue if we are above the shortest possible cost
    if (currentCost > shortestPathCost) {
      // console.log("This move is too costly!")
      return
    }

    // dont continue if we reached the end
    if (reachedEnd(inputMap, newPosition)) {
      console.log("Reached the end!" + currentCost + " " + previousPositions)
      if (currentCost < shortestPathCost) {
        shortestPathCost = currentCost
        console.log(`Found new shortest path: ` + currentCost)
        printMap(inputMap, previousPositions)
        moves = myMoves
      }
      return
    }

    findYourWay(inputMap, newPosition, myMoves, myPositions, currentCost)
  })
}

function printMap(inputMap: number[][], previousPositions: string[]) {
  let output = ""

  inputMap.map((row, y) => {
    row.map((elem, x) => {
      let myPosition = `${x}/${y}`
      if (previousPositions.includes(myPosition)) {
        output += "."
      } else {
        output += elem
      }
    })
    output += "\n"
  })

  console.log(output)
}

function reachedEnd(inputMap: number[][], position: string) {
  const maxY = inputMap.length - 1
  const maxX = inputMap[0].length - 1

  const [x, y] = getCoordinate(position)
  if (x == maxX && y == maxY) {
    return true
  }
  return false
}

function isAllowed(inputMap: number[][], previousMoves: Move[], newMove: Move, position: string, previousPositions: string[]) {
  // check if this would be the 4th same move in a row or a reverse
  const moveCopy = [...previousMoves].reverse()
  const fourthMove = moveCopy.slice(0, 2).every((move) => move == newMove)

  // if we have already made at least 3 moves and the last three are all the same as the one I am going to make, this is invalid
  if (fourthMove && moveCopy.length >= 3) {
    //console.log("Move illegal because it is the fourth move")
    return false
  }

  const [dx, dy] = getCoordinate(newMove)
  const [x, y] = getCoordinate(position)
  // if we are outside the map it, is an illegal move
  if (inputMap[y + dy] == undefined || inputMap[y + dy][x + dx] == undefined) {
    //console.log("Move illegal because it is outside of the map")
    return false
  }

  // if we have already visited that field it is an illegal move (prevent infinity loop)
  const newPosition = move(position, newMove)
  if (previousPositions.includes(newPosition)) {
    //console.log("Move is illegal because we have already been here")
    return false
  }

  return true
}

function move(position: string, move: Move): string {
  const [dx, dy] = getCoordinate(move)
  const [x, y] = getCoordinate(position)

  return `${x + dx}/${y + dy}`
}

function getCost(inputMap: number[][], position: string): number {
  const [x, y] = getCoordinate(position)
  return inputMap[y][x]
}

function getCoordinate(position: string) {
  return position.split("/").map((val) => parseInt(val))
}

enum Move {
  LEFT = "-1/0",
  RIGHT = "1/0",
  UP = "0/-1",
  DOWN = "0/1"
}
