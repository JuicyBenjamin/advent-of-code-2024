const data = await Deno.readTextFile("location-ids.txt")

const locationIDArray = data.split('\n')

const column1: number[] = []
const column2: number[] = []

locationIDArray.forEach((line) => {
  const lineArray = line.split('   ')
  column1.push(Number(lineArray[0]))
  column2.push(Number(lineArray[1]))
})

const sortedColumn1 = column1.sort((a, b) => (a - b))
const sortedColumn2 = column2.sort((a, b) => (a - b))

let totalDistance: number = 0

const getDiff = (num1: number, num2: number) => num1 > num2 ? num1 - num2 : num2 - num1

locationIDArray.forEach((_, index) => {
  totalDistance += (getDiff(sortedColumn1[index], sortedColumn2[index]))
})

console.log(totalDistance)