import { assertEquals } from "@std/assert";
const data = await Deno.readTextFile("word-search-data.txt")


const getXmasBackAndFourthCount = (data: string) => {
  const xmasRegex = /XMAS/gm
  const backwardsXmasRegex = /SAMX/gm
  let count = 0

  const forwardsVal = Number(data.match(xmasRegex)?.length)
  const backwardsVal = Number(data.match(backwardsXmasRegex)?.length)
  count += isNaN(forwardsVal) ? 0 : forwardsVal
  count += isNaN(backwardsVal) ? 0 : backwardsVal
  return count
}

let amountOfXmas = 0

// Getting horizontal values
amountOfXmas += getXmasBackAndFourthCount(data)


// Getting vertical values
const rows = data.split('\n')

const columns = Array.from({ length: rows[0].length }, (_, i) =>
  rows.map(row => row[i]).join("")
)

columns.forEach((column) => {
  amountOfXmas += getXmasBackAndFourthCount(column)
})

const generateDiagonal = (rows: string[]) => {
  const diagonalArray: string[][] = []
  rows.forEach((_, i) => {
    const tempArray: string[] = []
    tempArray.push(rows[i][0])
    Array.from({ length: i }).forEach((_, j) => {
      tempArray.push(rows[i-(j + 1)][j + 1])
    })
    diagonalArray.push(tempArray)
  })
  rows.forEach((_, i) => {
    const tempArray: string[] = []
    Array.from({ length: rows.length - i }).forEach((_, j) => {
      tempArray.push(rows[i-j])
    })
    console.log(rows[rows.length -i])
    // tempArray.push(rows[-i][0])
    diagonalArray.push(tempArray)
  })
  return diagonalArray
}

const testArray = [
  "123",
  "456",
  "789"
]

// generateDiagonal(rows)

const correctArray = [
  ["1"],
  ["4","2"],
  ["7","5","3"],
  ["8","6"],
  ["9"]
]

Deno.test(function addTest() {
  assertEquals(generateDiagonal(rows), correctArray)
})

console.log(generateDiagonal(testArray))

// console.log(data.split("\n")[0].length)
// console.log(amountOfXmas)
