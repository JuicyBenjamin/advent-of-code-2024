const data = await Deno.readTextFile("corrupted-data.txt")

const multiplyRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm

const matches = data.matchAll(multiplyRegex)

let total = 0

for (const match of matches) {
  const [_, num1, num2 ] = match
  total += Number(num1) * Number(num2)
}

// answer to part 1
console.log(total)

const dontArray = data.split("don't")
const doArray: string[] = []

dontArray.forEach((dontPart, index) => {
  // The first element has an implied do
  if (index === 0) doArray.push(dontPart)

  dontPart.split('do').forEach((doPart, index) => {
    // The first element has an implied dont
    if (index === 0) return
    doArray.push(doPart)
  })
})

const doData = doArray.join('')

const doMatches = doData.matchAll(multiplyRegex)

let doTotal = 0

for (const doMatch of doMatches) {
  const [_, num1, num2 ] = doMatch
  doTotal += Number(num1) * Number(num2)
}

// answer to part 2
console.log(doTotal)